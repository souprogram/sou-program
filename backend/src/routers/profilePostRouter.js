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
        .get('/profile-posts',[authMiddleware], index)
        .post('/profile-posts', [authMiddleware, createProfilePostValidation], create)
        .patch('/profile-posts/:id', [authMiddleware, updateProfilePostValidation], update)
        .delete('/profile-posts/:id',[authMiddleware], destroy);
};
