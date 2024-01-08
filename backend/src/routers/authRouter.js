import { Router } from 'express';
import { login, logout, me } from '../controllers/AuthController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const authRouter = () => {
    const router = Router();

    router.post('/login', login);

    router.use(authMiddleware);
    router.post('/logout', logout);
    router.post('/me', me);

    return router;
};

export { authRouter };
