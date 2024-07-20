import { Router } from 'express';
import axios from 'axios';
import { Users } from '../models/models.js';
import {
    generateTokenFromUser,
    getAuthUserData,
} from '../services/authService.js';
import {
    addAuthCookieToRes,
} from '../services/cookieService.js';


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
            const { email } = userResponse.data;
            // If the user already exists in the DB log them in
            const user = await Users().where({ email }).first();
            if (user) {
                const authUser = await getAuthUserData(user.username, user.password, { googleLogin: true });
                const token = generateTokenFromUser(authUser);
                addAuthCookieToRes(res, token);
        
                if(authUser.status !== 'active') throw new Error('User account is not active');
        
                return res.json({
                    message: 'Login successful',
                    data: { authUser },
                });
            }
            // TODO nastavi ako user ne postoji

            return res
                .status(200)
                .json({ message: `User details sucessfully fetched!`, data: userDetails });
        } catch (error) {
            console.error(`[POST] Google Auth error: ${error.message}`);
            return res.status(500).json({
                message: `[POST] Google Auth error: ${error.message}`,
                data: {}
            });
        }
    });

    return router;
};

// TODO upute za dalje
// Verify if the User Exists: Check if the user, identified by their email or a unique identifier from the userDetails, already exists in your database. This can be done by querying your user model or database.

// Create or Update User Record: Depending on whether the user exists, you may need to create a new user record or update an existing one. This involves saving the userDetails to your database. You might use models and services related to user management, such as those possibly defined in UserController.js or directly interacting with the database through models defined in models.js.

// Generate Authentication Token: Once the user record is created or updated, generate an authentication token for the user. This token is typically a JWT (JSON Web Token) that the user can use to authenticate subsequent requests to your API. You might have a service for authentication that can handle this, such as the functionality that might be present in AuthController.js.

// Return Response: Finally, return a response to the client that includes the authentication token and any other relevant user information. This response signifies that the authentication process is complete, and the user can now be considered logged in.

// If a user initially signs in with Google and later tries to log in the regular way (using a username and password), you'll need to handle this scenario carefully to ensure a smooth user experience and maintain security. Here's a step-by-step approach to manage this situation:

// Check User's Sign-in Method: When a user attempts to log in, check their sign-in method in your database. You should have a field indicating whether the user signed up via Google, another social login, or a regular email/password.

// No Password Set: If the user signed up through Google and has not set a password in your system, you should prompt them to either sign in using Google again or set a password for their account.

// Setting a Password: If the user chooses to set a password, you can send them an email with a link to create a password for their account. This ensures that the email address is verified and secures the process.

// Password Exists: If the user has already set a password (perhaps they signed up regularly and then linked their Google account, or set a password after signing up with Google), allow them to log in with their email and password as usual.

// Security Considerations: Always ensure that any process for setting or resetting passwords is secure. Use email verification, enforce strong passwords, and consider implementing multi-factor authentication (MFA).