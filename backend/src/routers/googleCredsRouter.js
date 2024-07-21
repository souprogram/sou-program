import { Router } from 'express';
import axios from 'axios';

import { handleGoogleUser } from '../controllers/UserController.js';

export const googleCredsRoutes = () => {
    const router = Router();

    router.post('/google/auth', async (req, res) => {
        try {
            const code = req.headers?.authorization;
            // Exchange the authorization code for an access token
            const response = await axios.post(
                'https://oauth2.googleapis.com/token',
                {
                    code,
                    client_id: process.env.GOOGLE_CLIENT_ID,
                    client_secret: process.env.GOOGLE_CLIENT_SECRET,
                    redirect_uri: 'postmessage',
                    grant_type: 'authorization_code',
                }
            );
            const accessToken = response.data.access_token;

            // Fetch user details using the access token
            const userResponse = await axios.get(
                'https://www.googleapis.com/oauth2/v3/userinfo',
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            const googleUserData = userResponse.data;

            const authUser = await handleGoogleUser(res, googleUserData);

            return res.status(200).json({
                message: `User sucessfully logged in!`,
                data: { authUser },
            });
        } catch (error) {
            console.error(`[POST] Google Auth error: ${error.message}`);
            return res.status(500).json({
                message: `[POST] Google Auth error: ${error.message}`,
                data: {},
            });
        }
    });

    return router;
};
