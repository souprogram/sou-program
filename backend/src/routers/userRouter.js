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
        .use(authMiddleware)
        .get('/users', index)
        .get('/users/ids', [getUsersByIDsValidation], getByIDs)

        .post('/users', [demosMiddleware, createUserValidation], create)
        .patch('/users/:id', [demosMiddleware, updateUserValidation], update)
        .delete('/users/:id', [demosMiddleware], destroy);
};
