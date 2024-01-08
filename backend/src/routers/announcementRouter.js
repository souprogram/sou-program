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
        .get('/announcements',[authMiddleware], index)

        .post('/announcements', [authMiddleware, demosMiddleware, createValidation], create)
        .patch('/announcements/:id', [authMiddleware, demosMiddleware, updateValidation], update)
        .delete('/announcements/:id', [authMiddleware, demosMiddleware], destroy);
};
