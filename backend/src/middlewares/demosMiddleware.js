import { userTypeEnum } from '../enums/userTypeEnum.js';

export const demosMiddleware = (req, res, next) => {
    if (req.authUser.type !== userTypeEnum.DEMONSTRATOR) {
        throw new Error('Unauthorized');
    }

    return next();
};
