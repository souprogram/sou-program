import { Users } from '../models/models.js';
import { hashPassword } from '../services/authService.js';
import { sendEmailConfirmationRequest } from './RegistrationController.js';
import { sendMail } from '../services/emailService.js';
import {
    generateTokenFromUser,
    getAuthUserData,
} from '../services/authService.js';
import { addAuthCookieToRes } from '../services/cookieService.js';
import { userTypeEnum } from '../enums/userTypeEnum.js';
import { userStatusEnum } from '../enums/userStatusEnum.js';

export const index = async (req, res) => {
    try {
        return res.json({
            message: 'User fetched successfully',
            data: { users: await Users() },
        });
    } catch (error) {
        console.error(`[GET] User error: ${error.message}`);
        return res.status(500).json({
            message: 'Internal server error',
            data: {},
        });
    }
};

export const getByIDs = async (req, res) => {
    try {
        return res.json({
            message: 'User fetched successfully',
            data: await Users().whereIn('id', req.body.ids),
        });
    } catch (error) {
        console.error(`[GET] User error: ${error.message}`);
        return res.status(500).json({
            message: 'Internal server error',
            data: {},
        });
    }
};

export const create = async (req, res) => {
    try {
        await Users().insert({
            name: req.body.name.trim(),
            surname: req.body.surname.trim(),
            email: req.body.email.trim(),
            email_verified: req.body.email_verified,
            username: req.body.username.trim(),
            password: await hashPassword(req.body.password),
            profile_picture_key: req.body.profile_picture_key,
            bio: req.body.bio.trim(),
            type: req.body.type,
            status: req.body.status,
        });

        const user = await Users()
            .where({ email: req.body.email.trim() })
            .first();

        // send welcome email to user
        const subject = 'Dobrodošao/la u Šou program!';
        const anchorTag = `<a href="${process.env.FRONTEND_URL}/login">Login</a>`;
        const html = `Hej ${user.name} ${user.surname}! Dobrodošao u udrugu Šou Program.<br>Klikni na link ispod kako se ulogirao/la na app! Vidimo se online!<br>${anchorTag}`;
        sendMail({ mailTo: user.email, subject, html });

        // send email confirmation request to user
        await sendEmailConfirmationRequest(user);

        return res.status(201).json({
            message: 'User created successfully',
            data: {},
        });
    } catch (error) {
        console.error(`[POST] User error: ${error.message}`);
        return res.status(500).json({
            message: error.message,
            data: {},
        });
    }
};

export const update = async (req, res) => {
    const userBeforeUpdate = await Users().where({ id: req.params.id }).first();
    try {
        await Users().where({ id: req.params.id }).update({
            name: req.body.name.trim(),
            surname: req.body?.surname?.trim(),
            email: req.body.email.trim(),
            profile_picture_key: req.body.profile_picture_key,
            bio: req.body.bio.trim(),
            type: req.body.type,
            email_verified: req.body.email_verified,
            status: req.body.status,
        });
        const userAfterUpdate = await Users()
            .where({ id: req.params.id })
            .first();

        // send email to user if his status changed
        if (userBeforeUpdate.status !== userAfterUpdate.status) {
            await sendStatusEmail(
                userAfterUpdate.email,
                userAfterUpdate.status
            );
        }

        return res.json({
            message: 'User updated successfully',
            data: {},
        });
    } catch (error) {
        console.error(`[PATCH] User error: ${error.message}`);
        return res.status(500).json({
            message: 'Internal server error',
            data: {},
        });
    }
};

export const destroy = async (req, res) => {
    try {
        await Users().where({ id: req.params.id }).del();
        return res.status(204).end();
    } catch (error) {
        console.error('[DELETE] User error:', error.message);
        return res.status(500).json({
            message: 'Internal server error',
            data: {},
        });
    }
};

export const handleGoogleUser = async (res, googleUserData) => {
    // case 1: user already exists
    const email = googleUserData.email;
    const surname = googleUserData.family_name ?? null;

    try {
        const user = await Users().where({ email }).first();
        if (user) {
            const authUser = await getAuthUserData(
                user.username,
                user?.password,
                {
                    googleLogin: true,
                }
            );

            if (authUser.status !== 'active')
                throw new Error('User account is not active');

            const token = generateTokenFromUser(authUser);
            addAuthCookieToRes(res, token);
            return user;
        }
    } catch (error) {
        throw new Error(error.message);
    }

    // case 2: user does not exist - create a new user

    // generate username
    let randomUsername = email.split('@')[0] + Math.floor(Math.random() * 1000);
    while (
        (await Users().where({ username: randomUsername }).first()) !==
        undefined
    ) {
        randomUsername = email.split('@')[0] + Math.floor(Math.random() * 100);
    }

    try {
        await Users().insert({
            name: googleUserData.given_name,
            surname,
            email,
            email_verified: googleUserData.email_verified,
            username: randomUsername,
            password: null,
            profile_picture_key: null,
            bio: '',
            type: userTypeEnum.STUDENT,
            status: userStatusEnum.PENDING,
        });

        const user = await Users().where({ email }).first();
        if (!user) throw new Error('User not created');

        // send email to user
        const subject = 'Poslan zahtjev za registraciju na Šou program';
        const content = `Hej ${googleUserData.given_name} ${
            surname ?? ''
        },\n\nUspješno si započeo proces registracije!\nKada demonstrator odobri tvoj zahtjev, dobiti ćeš potvrdu registracije na email!\n\nVidimo se uskoro,\nŠou program ekipa`;
        sendMail({ mailTo: email, subject, content });
        // Notify admin about new user
        const subject2 = 'Novi zahtjev za registraciju';
        const anchorTag2 = `<a href="${process.env.FRONTEND_URL}/search?id=${user.id}">Pregledaj zahtjev</a>`;
        const html2 = `Zaprimljen je novi zahtjev za registraciju korisnika ${
            googleUserData.given_name
        } ${
            surname ?? ''
        }.<br>Klikni na link ispod kako bi odobrio/la zahtjev!<br>${anchorTag2}`;
        sendMail({
            mailTo: process.env.ADMIN_EMAIL,
            subject: subject2,
            html: html2,
        });

        return user;
    } catch (error) {
        throw new Error(error.message);
    }
};
const sendStatusEmail = async (email, status) => {
    try {
        const subject = 'Promjena statusa korisničkog računa';
        const contentActive = `Vaš korisnički račun je aktiviran! Sada se možete ulogirati na Šou program! Vidimo se online!`;
        const contentPendingOrInactive = `Vaš korisnički račun je deaktiviran! Za više informacija obratite se administratoru!`;

        sendMail({
            mailTo: email,
            subject,
            content:
                status === 'active' ? contentActive : contentPendingOrInactive,
        });
    } catch (error) {
        throw new Error(error.message);
    }
};
