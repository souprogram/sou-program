import { Router } from 'express';
import { register, checkUsernameAvailability, confirmEmail, testUpdate  } from '../controllers/RegistrationController.js';
import { createUserValidation } from '../validation/models/userValidation.js';

export const registrationRouter = () => {
    return Router()
        .get('/registration/:username', checkUsernameAvailability)
        .get('/registration/:email', checkUsernameAvailability)
        .post('/registration', [createUserValidation], register)
        .get('/registration/confirm', confirmEmail)
        .get('/test', testUpdate);      
};
