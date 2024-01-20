import { Router } from 'express';
import { register, confirmEmail, checkUsernameAvailability, checkEmailAvailability  } from '../controllers/RegistrationController.js';
import { createUserValidation } from '../validation/models/userValidation.js';

export const registrationRouter = () => {
    return Router()
        .get('/registration/confirm', confirmEmail)
        .get('/registration/availability/username', checkUsernameAvailability)
        .get('/registration/availability/email', checkEmailAvailability)
        .post('/registration', [createUserValidation], register)    
};
