import { Router } from 'express';
import { register, checkUsernameAvailability, confirmEmail  } from '../controllers/RegistrationController.js';
import { createUserValidation } from '../validation/models/userValidation.js';

export const registrationRouter = () => {
    return Router()
        .get('/registration/:username', checkUsernameAvailability)
        .get('/registration/:email', checkUsernameAvailability)
        .post('/registration', [createUserValidation], register)
        .post('/registration/confirm/:token', confirmEmail)      
};
