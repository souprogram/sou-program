import { Router, json } from 'express';
import { googleAuth } from '../services/googleAuthService.js';
import passport from 'passport';
import { Users } from '../models/models.js';
import { createUser } from '../controllers/RegistrationController.js';



export const googleCredsRoutes = () => {
    const router = Router();

    router.get('/google/auth', async (req, res) => {
        const oauth2Client = googleAuth();
        const url = oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: [
                'https://www.googleapis.com/auth/userinfo.profile',
                'https://www.googleapis.com/auth/userinfo.email',
                'https://www.googleapis.com/auth/drive',
            ],
        });
        return res.redirect(url);
    });

    router.get('/google/redirect',passport.authenticate('google'), async (req, res) => {
        try {
            const user = req.user;
            // const existingUser = await Users().where({ email: user.emails[0].value }).first();

    
            // if (existingUser) {
            //     // The user is logging in, not registering
            //     // Do something with the user
            //     // req.session.user = user;
            //     // res.redirect('/login');
            // } else {
            //     // The user is registering
            //     const userData = {
            //         body: {
            //             name: user.name.givenName,
            //             surname: user.name.familyName,
            //             email: user.emails[0].value,
            //             email_verified: user.emails[0].verified,
            //             username: user.emails[0].value,
            //             password: 'null',
            //             profile_picture_key: '',
            //             bio: '',
            //             type: 'student',
            //             status: 'pending',
            //         },
            //     };
            //     await createUser(userData);
            //     const newUser = await Users().where({ email: user.emails[0].value }).first();
            //     req.session.user = newUser;
            //     console.log('User created');
            // }
            // res.send('User created');
    
        } catch (error) {
            console.error(`[AUTH] Google authentication error: ${error.message}`);
            // return res.redirect(`${process.env.FRONTEND_URL}/error?login=true`);
            return res.send('Error: ' + error.message);
        }
    });
        
    return router;
};
