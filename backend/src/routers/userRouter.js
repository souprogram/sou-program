import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
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
import { authorizationMiddleware } from '../middlewares/authorizationMiddleware.js';

export const userRouter = () => {
    return Router()
        .get('/users', [authMiddleware], index)
        .get('/users/ids', [authMiddleware, getUsersByIDsValidation], getByIDs)
        .post(
            '/users',
            [authMiddleware, authorizationMiddleware, createUserValidation],
            create
        )
        .patch(
            '/users/:id',
            [authMiddleware, authorizationMiddleware, updateUserValidation],
            update
        )
        .delete(
            '/users/:id',
            [authMiddleware, authorizationMiddleware],
            destroy
        );
};
