import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Users } from '../models/models.js';

export const hashPassword = async (passwordInput) => {
    const hashedPassword = await bcrypt.hash(passwordInput, 8);
    return hashedPassword;
};

export const getAuthUserData = async (username, password) => {
    const user = await Users().where({ username }).first();
    if (!user) {
        throw new Error(`No user found for username ${username}`);
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        throw new Error('Password failed to match');
    }

    return user;
};

export const generateTokenFromUser = (user) => {
    const tokenPayload = {
        id: user.id,
        username: user.username,
        type: user.type,
    };

    const accessToken = jwt.sign(
        tokenPayload,
        process.env.ACCESS_TOKEN_SECRET,
        { algorithm: 'HS512', expiresIn: '1y' }
    );

    return accessToken;
};

export const verifyToken = (accessToken) => {
    try {
        const tokenPayload = jwt.verify(
            accessToken,
            process.env.ACCESS_TOKEN_SECRET
        );
        return tokenPayload;
    } catch (error) {
        return null;
    }
};
