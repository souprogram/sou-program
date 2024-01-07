import { create } from '../models/RegisterModel.js';
import { sendMail } from '../services/emailService.js';

export const register = async (req, res) => {
   
    try {
        await create(req, res);

        // send email to user - dodati i jwt potvrdu emaila
        const { email, name, surname } = req.body;
        const subject = 'Poslan zahtjev za registraciju na Šou program';
        const content = `Hej ${name} ${surname},\n\nUspješno si započeo proces registracije!\n Kada demonstrator odobri tvoj zahtjev, dobiti ćeš potvrdu registracije na email!\n\nVidimo se uskoro,\nŠou program ekipa`;
        sendMail({ mailTo: email, subject, content });

        return res.json({
            message: 'Register successful',
            data: { authUser },
        });
    } catch (error) {
        console.error(`[POST] Register error: ${error.message}`);
        res.status(500).json({
            message: 'Internal server error',
            data: {},
        });
    }
};