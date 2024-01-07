import { Router } from 'express';
import { register } from '../controllers/RegisterController.js';
import { createUserValidation } from '../validation/models/userValidation.js';

export const registerRouter = () => {
    return Router()
        .post('/registration', [createUserValidation], register)      
};
