import { create } from './UserController.js';
import { sendMail } from '../services/emailService.js';

export const register = async (req, res) => {
   
    try {
        // create user in db
        await create(req, res);

        // send email to user - dodati i jwt potvrdu emaila
        // send email to admin - dodati link za odobravanje registracije
        const { email, name, surname } = req.body;
        const subject = 'Poslan zahtjev za registraciju na Šou program';
        const content = `Hej ${name} ${surname},\n\nUspješno si započeo proces registracije!\nKada demonstrator odobri tvoj zahtjev, dobiti ćeš potvrdu registracije na email!\n\nVidimo se uskoro,\nŠou program ekipa`;
        sendMail({ mailTo: email, subject, content });

    } catch (error) {
        console.error(`[POST] Registration error: ${error.message}`);
        res.status(500).json({
            message: 'Internal server error',
            data: {},
        });
    }
};