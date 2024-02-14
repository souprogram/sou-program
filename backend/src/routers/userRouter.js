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
import { tryCatch } from '../utils/tryCatch.js';

export const userRouter = () => {
    return Router()
        .use(authMiddleware)
        .get('/', tryCatch(index))
        .get('/ids', [getUsersByIDsValidation], tryCatch(getByIDs))

        .use(demosMiddleware)
        .post('/', [createUserValidation], tryCatch(create))
        .patch('/:id', [updateUserValidation], tryCatch(update))
        .delete('/:id', tryCatch(destroy));
};
