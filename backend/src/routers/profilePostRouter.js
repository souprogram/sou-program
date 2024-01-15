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
import { tryCatch } from '../utils/tryCatch.js';

export const profilePostRouter = () => {
    return Router()
        .use(authMiddleware)
        .get('/', tryCatch(index))
        .post('/', [createProfilePostValidation], tryCatch(create))
        .patch('/:id', [updateProfilePostValidation], tryCatch(update))
        .delete('/:id', tryCatch(destroy));
};
