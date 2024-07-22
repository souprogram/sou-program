import { config } from 'dotenv';
config();
import { Users } from './models/Users.js';

import cors from 'cors';
import express from 'express';
import http from 'http';
import cookieParser from 'cookie-parser';
import moment from 'moment-timezone';
import { setupWebSocketServer } from './services/webSocketService.js';

import { announcementRouter } from './routers/announcementRouter.js';
import { authRouter } from './routers/authRouter.js';
import { profilePostRouter } from './routers/profilePostRouter.js';
import { userRouter } from './routers/userRouter.js';
import { registrationRouter } from './routers/registrationRouter.js';
// import { competitionRoutes } from './routes/competitionRoute';
// import { galleryRoutes } from './routes/galleryRoute';
import { googleCredsRoutes } from './routers/googleCredsRouter.js';
import { googleDriveRoutes } from './routers/googleDriveRouter.js';
import { passwordRouter } from './routers/passwordRouter.js';
import session from 'express-session';
import passport from 'passport';

moment.defaultFormat = 'YYYY-MM-DD HH:mm:ss.SSSZ';

const app = express();
app.use(
    session({
        secret: process.env.GOOGLE_CLIENT_SECRET,
        resave: false,
        saveUninitialized: true,
    })
);
app.use(cookieParser());
app.use(
    cors({
        credentials: true,
        origin: process.env.FRONTEND_URL,
        transports: ['websocket'],
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ limit: '5mb', extended: true }));

app.use('/', authRouter());
app.use('/', userRouter());
app.use('/', registrationRouter());
app.use('/', announcementRouter());
app.use('/', profilePostRouter());
// app.use('/', galleryRoutes());
// app.use('/', competitionRoutes());
app.use('/', googleDriveRoutes());
app.use('/', googleCredsRoutes());
app.use('/', passwordRouter());
// TODO remove this
app.get('/test', async (req, res) => {
    const users = await Users();
    return res.json({
        message: 'User fetched successfully',
        data: { users },
    });
});
// TODO test Helloworld
app.get('/helloworld', (req, res) => {
    return res.json({
        message: 'Hello World',
        data: {},
    });
});

const server = http.createServer(app);

const wss = setupWebSocketServer(server);

server.listen(process.env.NODE_PORT, () => {
    console.log(`Server is running on port ${process.env.NODE_PORT}`);
});
