import { Users } from '../models/models.js';
import { PasswordTokens } from '../models/models.js';
import {
    generateTokenFromUser,
    verifyToken,
    hashPassword,
} from '../services/authService.js';
import { sendMail } from '../services/emailService.js';

export const initiatePasswordReset = async (req, res) => {
    try {
        const user = await Users().where({ email: req.body.email }).first();

        if (!user) {
            return res.status(404).json({
                message:
                    'Ne postoji korisnik sa email adresom: ' + req.body.email,
                data: {},
            });
        }

        const token = generateTokenFromUser(user);
        sendResetPasswordEmail(user.email, token);

        await PasswordTokens().insert({
            user_id: user.id,
            token,
            expiry_date: new Date(Date.now() + 1000 * 60 * 60 * 24), // 24 hours
        });

        return res.status(200).json({
            message: 'Reset password email sent',
            data: {},
        });
    } catch (error) {
        console.error(`[POST] Reset password error: ${error.message}`);
        return res.status(500).json({
            message: error?.message ?? 'Internal server error',
            data: {},
        });
    }
};

const sendResetPasswordEmail = (email, token) => {
    const link = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
    const anchorTag = `<a href="${link}">Resetiraj lozinku</a>`;
    const subject = 'Obnova lozinke';
    const html = `Hej,<br><br>Klikni na link ispod kako bi obnovio svoju lozinku!<br>${anchorTag}<br>Vidimo se uskoro,<br>Šou program ekipa`;
    sendMail({ mailTo: email, subject, html });
};

export const resetPassword = async (req, res) => {
    try {
        const { password, token } = req.body;
        if (!password || !token) {
            return res.status(400).json({
                message: 'Valid password and token are required',
                data: {},
            });
        }

        const passwordToken = await PasswordTokens()
            .where({ token })
            .andWhere('expiry_date', '>', new Date())
            .first();

        if (!passwordToken) {
            return res.status(404).json({
                message: 'Token not found or expired',
                data: {},
            });
        }

        const tokenPayload = verifyToken(token);
        if (!tokenPayload) {
            return res.status(401).json({ error: 'Invalid token' });
        }
        const hashedPassword = await hashPassword(password);
        await Users()
            .where({ id: passwordToken.user_id })
            .update({ password: hashedPassword });

        await PasswordTokens().where({ token }).del();

        return res.status(200).json({
            message: 'Password reset successful',
            data: {},
        });
    } catch (error) {
        console.error(`[POST] Reset password error: ${error.message}`);
        return res.status(500).json({
            message: error?.message ?? 'Internal server error',
            data: {},
        });
    }
};
