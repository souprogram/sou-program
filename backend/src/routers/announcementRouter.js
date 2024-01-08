import { Router } from 'express';
import {
    create,
    destroy,
    index,
    update,
} from '../controllers/AnnouncementController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { demosMiddleware } from '../middlewares/demosMiddleware.js';
import {
    createAnnouncementValidation as createValidation,
    updateAnnouncementValidation as updateValidation,
} from '../validation/models/announcementValidation.js';

export const announcementRouter = () => {
    return Router()
        .use(authMiddleware)
        .get('/', index)

        .use(demosMiddleware)
        .post('/', [createValidation], create)
        .patch('/:id', [updateValidation], update)
        .delete('/:id', destroy);
};
