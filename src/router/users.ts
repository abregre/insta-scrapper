import express from 'express'
import { getAllUsers, deleteUser, updateUser } from '../controllers/users'
import { authenticate, isOwner } from '../middlewares'

export default (router: express.Router) => {
    router.get('/users', authenticate, getAllUsers)
    router.delete('/users/:id', authenticate, isOwner, deleteUser)
    router.patch('/users/:id', authenticate, isOwner, updateUser)
}