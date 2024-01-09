import { create } from './UserController.js';
import { sendMail } from '../services/emailService.js';
import { Users } from '../models/models.js';
import { generateTokenFromUser } from "../services/authService.js";

export const register = async (req, res) => {
   
    try {
        // create user in db
        await create(req, res);

        // send email to user
        
        const { email, name, surname } = req.body;
        let subject = 'Poslan zahtjev za registraciju na Šou program';
        let content = `Hej ${name} ${surname},\n\nUspješno si započeo proces registracije!\nKada demonstrator odobri tvoj zahtjev, dobiti ćeš potvrdu registracije na email!\n\nVidimo se uskoro,\nŠou program ekipa`;
        sendMail({ mailTo: email, subject, content });

        // slanje emaila useru da potvrdi svoju email adresu
        const user = Users.where({ email }).first();
        const accessToken = generateTokenFromUser(user);
        const link = `http://localhost:3000/confirm/${accessToken}`;
        subject = 'Potvrdi emaila za Šou program';
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
        const { token } = req.params;
        const { id } = req.body;

        // check if token is valid
        const user = Users().where({ id }).first();
        if (!user) {
            return res.status(400).json({
                message: 'Invalid token',
                data: {},
            });
        }

        // update user
        await Users().where({ id }).update({ email_confirmed: true });

        return res.json({
            message: 'Email confirmed',
            data: {},
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