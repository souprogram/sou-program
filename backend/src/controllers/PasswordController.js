import { Users } from '../models/models.js';
import { PasswordTokens } from '../models/models.js';
import { generateTokenFromUser } from '../services/authService.js';
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
        // TODO remove disable
        // sendResetPasswordEmail(user.email, token);

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
    const anchorTag = `<a href="${link}">Reset password</a>`;
    const subject = 'Obnova lozinke';
    const html = `Hej,<br><br>Klikni na link ispod kako bi obnovio svoju lozinku!<br>${anchorTag}<br>Vidimo se uskoro,<br>Šou program ekipa`;
    sendMail({ mailTo: email, subject, html });
};
