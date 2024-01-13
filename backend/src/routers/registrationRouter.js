import { Router } from 'express';
import { register, confirmEmail  } from '../controllers/RegistrationController.js';
import { createUserValidation } from '../validation/models/userValidation.js';

export const registrationRouter = () => {
    return Router()
        .get('/registration/confirm', confirmEmail)
        .post('/registration', [createUserValidation], register)    
};
