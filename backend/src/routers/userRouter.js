import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { demosMiddleware } from '../middlewares/demosMiddleware.js';
import {
    getUsersByIDsValidation,
    updateUserValidation,
    createUserValidation,
} from '../validation/models/userValidation.js';
import {
    create,
    destroy,
    getByIDs,
    index,
    update,
} from '../controllers/UserController.js';

export const userRouter = () => {
    return Router()
        .get('/users',[authMiddleware], index)
        .get('/users/ids', [authMiddleware, getUsersByIDsValidation], getByIDs)

        .post('/users', [authMiddleware, demosMiddleware, createUserValidation], create)
        .patch('/users/:id', [authMiddleware, demosMiddleware, updateUserValidation], update)
        .delete('/users/:id', [authMiddleware, demosMiddleware], destroy);
};
