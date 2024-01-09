import { Router } from 'express';
import {
    create,
    destroy,
    index,
    update,
} from '../controllers/ProfilePostController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import {
    createProfilePostValidation,
    updateProfilePostValidation,
} from '../validation/models/profilePostValidation.js';

export const profilePostRouter = () => {
    return Router()
        .use(authMiddleware)
        .get('/', index)
        .post('/', [createProfilePostValidation], create)
        .patch('/:id', [updateProfilePostValidation], update)
        .delete('/:id', destroy);
};
