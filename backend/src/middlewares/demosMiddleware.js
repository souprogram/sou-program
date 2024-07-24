import { userTypeEnum } from '../enums/userTypeEnum.js';

export const demosMiddleware = (req, res, next) => {
    if (req.authUser.type !== userTypeEnum.DEMONSTRATOR) {
        return res.status(401).json({ error: 'Unauthorized user type' });
    }

    return next();
};
