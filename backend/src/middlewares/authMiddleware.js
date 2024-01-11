import { verifyToken } from '../services/authService.js';
import { getCookieTokenFromReq } from '../services/cookieService.js';

export const authMiddleware = (req, res, next) => {
    const accessToken = getCookieTokenFromReq(req);
    if (!accessToken) {
        throw new Error('Unauthorized');
    }

    const tokenPayload = verifyToken(accessToken);
    if (!tokenPayload) {
        throw new Error('Unauthorized');
    }

    const { id, username, type } = tokenPayload;
    req.authUser = { id, username, type };

    if (!id || !username || !type) {
        throw new Error('Unauthorized');
    }

    return next();
};
