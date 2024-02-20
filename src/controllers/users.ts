import express from 'express';
import { getUsers,deleteUserById, getUserById } from '../db/users';

export const getAllUsers = async (req: express.Request, res: express.Response) => {
    try {
        const users = await getUsers();
        res.status(200).send({ users });
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: error.message });
    }
}

export const deleteUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).send({ message: 'Missing required information' });
        }
        const deletedUser = await deleteUserById(id);

        res.status(200).send({ user: deletedUser});
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: error.message });
    }
}

export const updateUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const {username} = req.body;
        if (!id || !username) {
            res.status(400).send({ message: 'Missing required information' });
        }
        const updatedUser = await getUserById(id);
        updatedUser.username = username;
        await updatedUser.save();

        res.status(200).send({ user: updatedUser});
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: error.message });
    }
}