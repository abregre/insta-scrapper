import express from 'express';

import { getUserByEmail, createUser } from '../db/users';
import { authentication, generateRandomString } from '../helpers/index';

export const register = async (req: express.Request, res: express.Response) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).send({ message: 'Missing required information' });
        }
        const user = await getUserByEmail(email);
        if (user) {
            return res.status(400).send({ message: 'User already exists' });
        }
        const salt = generateRandomString();
        const hashedPassword = authentication(password, salt);

        const newUser = await createUser({
            username,
            email,
            authentication: {
                password: hashedPassword,
                salt
            }

        });
        return res.status(201).send({ user: newUser });

    } catch (error) {
        console.log(error);
        return res.status(400).send({ message: error.message });
    }
}

export const login = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send({ message: 'Missing required information' });
        }
        const user = await getUserByEmail(email).select('+authentication.salt +authentication.password');
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        const hashedPassword = authentication(password, user.authentication.salt);

        if (hashedPassword !== user.authentication.password) {
            return res.status(403).send({ message: 'Invalid credentials' });
        }

        const salt = generateRandomString();
        const sessionToken = authentication(salt, user.authentication.password);
        user.authentication.sessionToken = sessionToken;
        await user.save();
        res.cookie('session-token', sessionToken, {
            domain: 'localhost',
        })

        return res.status(200).send({ user: user });
    } catch (error) {
        console.log(error);
        return res.status(400).send({ message: error.message });
    }
}