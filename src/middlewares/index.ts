import express from 'express';
import { get, merge } from 'lodash';

import { getUserBySessionToken } from '../db/users';

export const isOwner = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { id } = req.params;
    const userId = get(req, 'identity._id') as string;
    if (!userId) {
        return res.status(403).send({ message: 'Unauthorized' });
    }
    if (id !== userId.toString()) {
        return res.status(403).send({ message: 'Unauthorized' });
    }
    next();
}

export const authenticate = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const token = req.cookies['session-token'];
        if (!token) {
            return res.status(403).send({ message: 'Unauthorized: invalid token' });
        }
        const user = await getUserBySessionToken(token);
        if (!user) {
            return res.status(403).send({ message: 'Unauthorized: user not found' });
        }
        merge(req, { identity:user });
        next();
    } catch (error) {
        console.log(error);
        res.status(401).send({ message: error.message });
    }
}
