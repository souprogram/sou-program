import { Router } from 'express';
import { login, logout, me } from '../controllers/AuthController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

export const authRouter = () => {
    return Router()
        .post('/auth/login', login)
        .use(authMiddleware)
        .post('/auth/logout', logout)
        .post('/auth/me', me);
};
