import fs from 'fs';
import { google } from 'googleapis';


function googleAuth() {
    const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        process.env.GOOGLE_REDIRECT_URI
    );

    const creds = fs.readFileSync('creds.json');
    oauth2Client.setCredentials(JSON.parse(creds));

    return oauth2Client;
}


export { googleAuth };
