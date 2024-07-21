import { Router } from 'express';
import {
    initiatePasswordReset,
    resetPassword,
} from '../controllers/PasswordController.js';

export const passwordRouter = () => {
    return Router()
        .post('/password/initiate-reset', initiatePasswordReset)
        .post('/password/reset', resetPassword);
};
