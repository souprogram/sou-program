import { Router, raw } from 'express';
import { google } from 'googleapis';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { googleAuth } from '../services/googleAuthService.js';
import { uploadImage } from '../services/googleDriveService.js';

export const googleDriveRoutes = () => {
    const router = Router();

    let drive;
    try {
        drive = google.drive({ version: 'v3', auth: googleAuth() });
    } catch (error) {
        console.log(error.message);
        drive = null;
    }

    router.use(raw({ limit: '30MB', type: 'text/plain' }));

    router.post(
        '/:folder_name/:image_name',
        authMiddleware,
        async (req, res) => {
            const folderName = req.params.folder_name;
            const imageName = req.params.image_name;
            const imageBuffer = req.body;

            if (!imageBuffer) {
                return res
                    .status(400)
                    .json({ message: 'Client error', data: {} });
            }

            try {
                googleAuth();

                const imageID = await uploadImage(
                    folderName,
                    imageName,
                    imageBuffer
                );

                return res.json({
                    message: 'Image uploaded successfully',
                    data: imageID,
                });
            } catch (error) {
                console.log('Error:', error);
                return res.status(500).json({
                    message: 'Internal server error',
                    data: {},
                });
            }
        }
    );

    router.get('/:image_id', async (req, res) => {
        const imageID = req.params.image_id;
        if (!imageID) {
            return res.json({
                message: 'Image ID is empty',
                data: '',
            });
        }
        try {
            googleAuth();
        } catch (error) {
            console.log('Error:', error);
            return res.status(500).json({
                message: 'Internal server error',
                data: {},
            });
        }
        let image = null;
        try {
            image = await drive.files.get(
                {
                    fileId: imageID,
                    alt: 'media',
                },
                {
                    responseType: 'arraybuffer',
                }
            );
        } catch (error) {
            return res.json({
                message: "Image doesn't exist",
                data: '',
            });
        }

        try {
            const imageBuffer = Buffer.from(image.data);
            const imageBase64 = imageBuffer.toString('base64');

            return res.json({
                message: 'Image retrieved successfully',
                data: imageBase64,
            });
        } catch (error) {
            console.log('Error:', error);
            return res.status(500).json({
                message: 'Internal server error',
                data: {},
            });
        }
    });

    return router;
};
