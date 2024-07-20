import { Users } from '../models/models.js';
import {userTypeEnum} from '../enums/userTypeEnum.js';

export const authorizationMiddleware = async (req, res, next) => {
    const requestedUser = await Users().where({ id: req.params.id }).first();
    if (!requestedUser) {
        return res.status(404).json({ error: 'Requested user not found' });
    }
    
    const operation = req.method;
    const requestingUserId = req.authUser.id;
    const requestedUserId = req.params.id;
    const operationOnSelf = requestingUserId === requestedUserId;
    const isRequestingUserAdmin = req.authUser.username === 'admin';
    const isRequestingUserDemonstrator = req.authUser.type === userTypeEnum.DEMONSTRATOR;
    const isRequestingUserStudent = req.authUser.type === userTypeEnum.STUDENT;

    // Admins can edit/delete all users except DELETE themselves
    if (isRequestingUserAdmin) {
        if (operationOnSelf && operation === 'DELETE') {
            return res.status(401).json({ error: 'Deleting the admin account is not allowed' });
        }
        return next();
    }

    // Demonstrators can only edit/delete students and themselves
    if (isRequestingUserDemonstrator) {
        if (requestedUser.type !== userTypeEnum.STUDENT && !operationOnSelf) {
            return res.status(401).json({ error: 'Demonstrators cannot edit/delete other demonstrators' });
        }
        return next();
    }

    // Students can only edit/delete themselves
    if (isRequestingUserStudent) {
        if (!operationOnSelf) {
            return res.status(401).json({ error: 'Students cannot edit/delete other students' });
        }
        return next();
    }

    // If none of the above roles match, user is unauthorized
    return res.status(401).json({ error: 'User is not authorized for this operation' });
};
