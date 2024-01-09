import { Router } from 'express';
import fs from 'fs';
import { googleAuth } from '../services/googleAuthService.js';

export const googleCredsRoutes = () => {
    const router = Router();

    router.get('/auth', async (req, res) => {
        const oauth2Client = googleAuth();
        const url = oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: [
                'https://www.googleapis.com/auth/userinfo.profile',
                'https://www.googleapis.com/auth/drive',
            ],
        });
        return res.redirect(url);
    });

    router.get('/redirect', async (req, res) => {
        const oauth2Client = googleAuth();
        const { code } = req.query;
        const { tokens } = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);
        fs.writeFileSync('creds.json', JSON.stringify(tokens));

        return res.send('Success');
    });

    return router;
};
