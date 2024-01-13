import { create } from './UserController.js';
import { sendMail } from '../services/emailService.js';
import { Users } from '../models/models.js';
import { generateTokenFromUser } from "../services/authService.js";
import { verifyToken } from '../services/authService.js';

export const register = async (req, res) => {
   
    try {
        // create user in db
        await create(req, res);
       
        // send email to user
        const { email, name, surname } = req.body;
        let subject = 'Poslan zahtjev za registraciju na Šou program';
        let content = `Hej ${name} ${surname},\n\nUspješno si započeo proces registracije!\nKada demonstrator odobri tvoj zahtjev, dobiti ćeš potvrdu registracije na email!\n\nVidimo se uskoro,\nŠou program ekipa`;

        // provjeri je li user vec registriran, ako jest, funkcija create ce sama vratiti response 500
        const user = await Users().where({ email }).first();
        if (user) {
            return 
        }
        sendMail({ mailTo: email, subject, content });

        // slanje emaila useru da potvrdi svoju email adresu
        const accessToken = generateTokenFromUser(user);
        const link = `${process.env.FRONTEND_URL}/confirm?accessToken=${accessToken}`;
        subject = 'Potvrda emaila za Šou program';
        content = `Hej ${name} ${surname},\n\nKlikni na link ispod kako bi potvrdio svoj email.\n\n${link}\n\nVidimo se uskoro,\nŠou program ekipa`;
        sendMail({ mailTo: email, subject, content });
    
        // send email to admin - dodati link za odobravanje registracije


    } catch (error) {
        console.error(`[POST] Registration error: ${error.message}`);
        res.status(500).json({
            message: 'Internal server error',
            data: {},
        });
    }
};

export const confirmEmail = async (req, res) => {
    try {
        const { accessToken } = req.query;

        // check if token exists
        if (!accessToken) {
            return res.status(401).json({ error: 'Missing token' });
        }
         // check if token is valid
        const tokenPayload = verifyToken(accessToken);
        if (!tokenPayload) {
            return res.status(401).json({ error: 'Invalid token' });
        }

        // get user from db
        const { id } = tokenPayload;

        const user = await Users().where({ id }).first();
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
                data: {},
            });
        }

        const { email, name, username, email_verified, status } = user;

        // check if email is already confirmed
        if (email_verified) {
            return res.status(400).json({
                message: 'Email already confirmed',
                data: { name, username, email},
            });
        }
        
        await Users().where({ id }).update({ email_verified: true });
        
        // send email to user
        let subject = `Potvrda emaila za Šou program`;
        let content = `Hej ${name} ${surname},\n\nUspješno si potvrdio svoj email!\nKada demonstrator odobri tvoj zahtjev, dobiti ćeš potvrdu registracije na email!\n\nVidimo se uskoro,\nŠou program ekipa`;
        sendMail({ mailTo: email, subject, content });

        return res.status(200).json({
            message: 'Email successfully confirmed',
            data: { name, username, status, email },
        });

    } catch (error) {
        console.error(`[POST] Confirm email error: ${error.message}`);
        res.status(500).json({
            message: 'Internal server error',
            data: {},
        });
    }
};
    
export const checkUsernameAvailability = async (req, res) => {
    try {
        const { username } = req.params;
        const available = await Users().where({ username }).first();

   
        return res.json({
            message: 'Username check complete',
            data: { available: !available },
        });
    
        
    } catch (error) {
        console.error(`[POST] Username check error: ${error.message}`);
        res.status(500).json({
            message: 'Internal server error',
            data: {},
        });
    } 
};

export const checkEmailAvailability = async (req, res) => {
    try {
        const { email } = req.params;
        const available = await Users().where({ email }).first();

   
        return res.json({
            message: 'Email check complete',
            data: { available: !available },
        });
    
        
    } catch (error) {
        console.error(`[POST] Email check error: ${error.message}`);
        res.status(500).json({
            message: 'Internal server error',
            data: {},
        });
    } 
}