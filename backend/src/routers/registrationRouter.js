import { Router } from 'express';
import { register } from '../controllers/RegistrationController.js';
import { createUserValidation } from '../validation/models/userValidation.js';

export const registrationRouter = () => {
    return Router()
        .post('/registration', [createUserValidation], register)      
};
