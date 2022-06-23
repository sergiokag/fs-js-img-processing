import { Request, Response, Router } from 'express';
import fs from 'fs';
import path from 'path';

import { resizeImage } from '../services/resize.service';

const router = Router();

router.get('/', (_, res: Response): void => {
    res.send('Hello! Visit route /api/images');
});

router.get(
    '/api/images',
    async (req: Request, res: Response): Promise<void> => {
        const { filename, width, height } = req.query;
        const imgFileName = filename as string;
        const imgWidth = +(width as string);
        const imgHeight = +(height as string);

        if (imgFileName && (imgWidth >= 1920 || imgHeight >= 1280)) {
            const message =
                'Bad request! The size of the image must be lower than 1920 x 1280!';
            res.status(400).send({
                message,
            });
            return;
        }

        if (imgFileName && imgWidth && imgHeight) {
            const processedImagePath = path.join(
                __dirname,
                `../public/processed_images/${imgFileName}_${imgWidth}_${imgHeight}.jpg`
            );

            /**
             * It returns already created images
             * if they got requested again
             * we dont recreate them
             */

            if (fs.existsSync(processedImagePath)) {
                res.setHeader('Content-Type', 'text/html');
                res.send(
                    `<body style="background-color:black; display: flex">
                    <img style="margin: auto" src="/processed_images/${imgFileName}_${imgWidth}_${imgHeight}.jpg">
                </body>`
                );
                return;
            }

            await resizeImage(imgFileName, imgWidth, imgHeight);

            res.setHeader('Content-Type', 'text/html');
            res.send(
                `<body style="background-color:black; display: flex">
                <img style="margin: auto" src="/processed_images/${filename}_${imgWidth}_${imgHeight}.jpg">
            </body>`
            );
            return;
        }

        if (!imgFileName) {
            const message =
                'Bad request! You must set fjord as a filename! Dont forget to set also the width & height';
            res.status(400).send({
                message,
            });
            return;
        }

        if (!imgWidth || !imgHeight) {
            const message =
                'Bad request! Invalid height or width input! Width & height must be digits';
            res.status(400).send({
                message,
            });
            return;
        }

        const message = 'Something has gone wrong on the server';
        res.status(500).send({
            message,
        });
    }
);

export default router;
