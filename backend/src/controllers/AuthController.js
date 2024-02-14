import { Users } from '../models/models.js';
import {
    generateTokenFromUser,
    getAuthUserData,
} from '../services/authService.js';
import {
    addAuthCookieToRes,
    removeAuthCookieFromRes,
} from '../services/cookieService.js';

export const login = async (req, res) => {
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
};

export const logout = async (req, res) => {
    removeAuthCookieFromRes(res);
    return res.json({
        message: 'Logout successful',
        data: {},
    });
};

export const me = async (req, res) => {
    return res.json({
        message: ' Authenticated user retrieved successfully',
        data: await Users().where({ id: req.authUser.id }),
    });
};
