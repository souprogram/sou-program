import { Router } from 'express';
import { login, logout, me, getStatus } from '../controllers/AuthController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

export const authRouter = () => {
    return Router()
        .post('/auth/login', login)
        .post('/auth/logout',[authMiddleware], logout)
        .post('/auth/me',[authMiddleware], me)
        .post('/auth/status/:id', getStatus);
};
