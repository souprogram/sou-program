import { Users } from '../models/models.js';
import {
    generateTokenFromUser,
    getAuthUserData,
} from '../services/authService.js';
import {
    addAuthCookieToRes,
    removeAuthCookieFromRes,
} from '../services/cookieService.js';
import { tryCatch } from '../utils/tryCatch.js';

export const login = tryCatch(async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        throw new Error('Username or password not defined');
    }

    const authUser = await getAuthUserData(username, password);
    const token = generateTokenFromUser(authUser);
    addAuthCookieToRes(res, token);

    return res.json({
        message: 'Login successful',
        data: { authUser },
    });
});

export const logout = tryCatch(async (req, res) => {
    removeAuthCookieFromRes(res);
    return res.json({
        message: 'Logout successful',
        data: {},
    });
});

export const me = tryCatch(async (req, res) => {
    return res.json({
        message: 'Logout successful',
        data: await Users().where({ id: req.authUser.id }),
    });
});
