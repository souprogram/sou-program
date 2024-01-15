import { Router } from 'express';
import { login, logout, me } from '../controllers/AuthController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { tryCatch } from '../utils/tryCatch.js';

export const authRouter = () => {
    return Router()
        .post('/login', tryCatch(login))

        .use(authMiddleware)
        .post('/logout', tryCatch(logout))
        .post('/me', tryCatch(me));
};
