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
        .get('/', index)
        .get('/ids', [getUsersByIDsValidation], getByIDs)

        .use(demosMiddleware)
        .post('/', [createUserValidation], create)
        .patch('/:id', [updateUserValidation], update)
        .delete('/:id', destroy);
};
