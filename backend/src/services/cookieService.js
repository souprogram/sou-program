import { now } from './datetimeService.js';

const COOKIE_NAME = 'sp_session';

export const getCookieTokenFromReq = (req) => {
    const authCookie = req.cookies?.[COOKIE_NAME];
    if (!authCookie) {
        return null;
    }

    return authCookie;
};

export const addAuthCookieToRes = (res, accessToken) => {
    res.cookie(COOKIE_NAME, accessToken, {
        expires: now().add(1, 'year').toDate(),
        httpOnly: true,
        secure: true,
        sameSite: 'none',
    });
};

export const removeAuthCookieFromRes = (res) => {
    res.clearCookie(COOKIE_NAME);
};
