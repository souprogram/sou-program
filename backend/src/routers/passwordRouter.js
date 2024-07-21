import { Router } from 'express';
import { initiatePasswordReset } from '../controllers/PasswordController.js';

export const passwordRouter = () => {
    return Router().post('/password/reset', initiatePasswordReset);
};
