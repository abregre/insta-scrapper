import express from 'express';
import { getProfiles, deleteProfiles, getProfileByUsername } from '../db/profiles';



export const getProfile = async (req: express.Request, res: express.Response) => {
    try {
        const { username } = req.params;
        const profile = await getProfileByUsername(username);
        res.status(200).send({ profile });
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: error.message });
    }
}

export const getAllProfiles = async (req: express.Request, res: express.Response) => {
    try {
        const profiles = await getProfiles();
        res.status(200).send({ profiles });
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: error.message });
    }
}

export const deleteAllProfiles = async (req: express.Request, res: express.Response) => {
    try {
        const profiles = await deleteProfiles();
        res.status(200).send({ profiles });
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: error.message });
    }
}
