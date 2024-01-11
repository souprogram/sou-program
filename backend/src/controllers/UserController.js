import { Users } from '../models/models.js';
import { hashPassword } from '../services/authService.js';
import { tryCatch } from '../utils/tryCatch.js';

export const index = tryCatch(async (req, res) => {
    return res.json({
        message: 'User fetched successfully',
        data: { users: await Users() },
    });
});

export const getByIDs = tryCatch(async (req, res) => {
    return res.json({
        message: 'User fetched successfully',
        data: await Users().whereIn('id', req.body.ids),
    });
});

export const create = tryCatch(async (req, res) => {
    await Users().insert({
        name: req.body.name.trim(),
        surname: req.body.surname.trim(),
        email: req.body.email.trim(),
        username: req.body.username.trim(),
        password: await hashPassword(req.body.password),
        profile_picture_key: req.body.profile_picture_key,
        bio: req.body.bio.trim(),
        type: req.body.type,
    });

    return res.status(201).json({
        message: 'User created successfully',
        data: {},
    });
});

export const update = tryCatch(async (req, res) => {
    await Users().where({ id: req.params.id }).update({
        name: req.body.name.trim(),
        surname: req.body.surname.trim(),
        email: req.body.email.trim(),
        profile_picture_key: req.body.profile_picture_key,
        bio: req.body.bio.trim(),
        type: req.body.type,
    });

    return res.json({
        message: 'User updated successfully',
        data: {},
    });
});

export const destroy = tryCatch(async (req, res) => {
    await Users().where({ id: req.params.id }).del();
    return res.status(204).end();
});
