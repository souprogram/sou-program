import fs from 'fs';
import { google } from 'googleapis';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

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

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_REDIRECT_URI,
    passReqToCallback: true
  },
  function(accessToken, refreshToken, profile, cb) {
    
    return cb(null, profile);
  }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    done(null, id);
});

export { googleAuth };
