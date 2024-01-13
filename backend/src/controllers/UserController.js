import { Users } from '../models/models.js';
import { hashPassword } from '../services/authService.js';

export const index = async (req, res) => {
    try {
        return res.json({
            message: 'User fetched successfully',
            data: { users: await Users() },
        });
    } catch (error) {
        console.error(`[GET] User error: ${error.message}`);
        return res.status(500).json({
            message: 'Internal server error',
            data: {},
        });
    }
};

export const getByIDs = async (req, res) => {
    try {
        return res.json({
            message: 'User fetched successfully',
            data: await Users().whereIn('id', req.body.ids),
        });
    } catch (error) {
        console.error(`[GET] User error: ${error.message}`);
        return res.status(500).json({
            message: 'Internal server error',
            data: {},
        });
    }
};

export const create = async (req, res) => {
    try {
        await Users().insert({
            name: req.body.name.trim(),
            surname: req.body.surname.trim(),
            email: req.body.email.trim(),
            email_verified: req.body.email_verified,
            username: req.body.username.trim(),
            password: await hashPassword(req.body.password),
            profile_picture_key: req.body.profile_picture_key,
            bio: req.body.bio.trim(),
            type: req.body.type,
            status: req.body.status,
        });

        return res.status(201).json({
            message: 'User created successfully',
            data: {},
        });
    } catch (error) {
        console.error(`[POST] User error: ${error.message}`);
        return res.status(500).json({
            message: 'Internal server error',
            data: {},
        });
    }
};

export const update = async (req, res) => {
    try {
        await Users().where({ id: req.params.id }).update({
            name: req.body.name.trim(),
            surname: req.body.surname.trim(),
            email: req.body.email.trim(),
            profile_picture_key: req.body.profile_picture_key,
            bio: req.body.bio.trim(),
            type: req.body.type,
            email_verified: req.body.email_verified,
            status: req.body.status,
        });

        return res.json({
            message: 'User updated successfully',
            data: {},
        });
    } catch (error) {
        console.error(`[PATCH] User error: ${error.message}`);
        return res.status(500).json({
            message: 'Internal server error',
            data: {},
        });
    }
};

export const destroy = async (req, res) => {
    try {
        await Users().where({ id: req.params.id }).del();
        return res.status(204).end();
    } catch (error) {
        console.error('[DELETE] User error:', error.message);
        return res.status(500).json({
            message: 'Internal server error',
            data: {},
        });
    }
};
