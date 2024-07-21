import { validatedRequest } from '../baseValidation.js';

export const getUsersByIDsValidation = async (req, res, next) => {
    return validatedRequest({
        data: req.body,
        rules: { ids: ['required', 'array'] },
        errorMessage: '[GET] Get user validation failed',
        res,
        next,
    });
};

export const createUserValidation = async (req, res, next) => {
    return validatedRequest({
        data: req.body,
        rules: {
            name: ['required', 'string', 'max:30'],
            surname: ['required', 'string', 'max:30'],
            email: ['required', 'email'],
            username: ['required', 'string', 'max:30', 'no_whitespace'],
            password: ['required', 'string', 'password'],
            profile_picture_key: ['present', 'string'],
            bio: ['present', 'string'],
            type: ['required', 'string'],
        },
        errorMessage: '[POST] Create user validation failed',
        res,
        next,
    });
};

export const updateUserValidation = async (req, res, next) => {
    return validatedRequest({
        data: req.body,
        rules: {
            name: ['required', 'string', 'max:30'],
            surname: ['present', 'string', 'max:30'],
            email: ['required', 'email'],
            profile_picture_key: ['present', 'string'],
            bio: ['present', 'string'],
            type: ['required', 'string'],
            status: ['required', 'string'],
        },
        errorMessage: '[PATCH] Update user validation failed',
        res,
        next,
    });
};
