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
import { tryCatch } from '../utils/tryCatch.js';

export const announcementRouter = () => {
    return Router()
        .use(authMiddleware)
        .get('/', tryCatch(index))

        .use(demosMiddleware)
        .post('/', [createValidation], tryCatch(create))
        .patch('/:id', [updateValidation], tryCatch(update))
        .delete('/:id', tryCatch(destroy));
};
