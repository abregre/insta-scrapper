import express from 'express'
import { getAllProfiles, deleteAllProfiles, getProfile } from '../controllers/profiles'


export default (router: express.Router) => {
    router.get('/profiles', getAllProfiles)
    router.delete('/profiles',  deleteAllProfiles)
    router.get('/profiles/:username', getProfile)
}