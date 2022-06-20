import { Router } from 'express';
import { resizeImage } from '../services/resize.service';

const router = Router();

router.get('/', (_, res) => {
    res.send('Hello! Visit route /api/images');
});

router.get('/api/images', async (req, res) => {
    const { filename, width, height } = req.query;

    if (filename && width && height) {
        const imgFileName = filename as string;
        const imgWidth = +width ? +width : 200;
        const imgHeight = +height ? +height : 200;

        await resizeImage(imgFileName, imgWidth, imgHeight);

        res.setHeader('Content-Type', 'text/html');
        res.send(
            `<body style="background-color:black; display: flex">
                <img style="margin: auto" src="/processed_images/${filename}_thumb.jpg">
            </body>`
        );
        return;
    }

    if (!filename || !width || !height) {
        const message =
            'Bad request! You must set filename, width and height query params';
        res.status(400).send({
            message,
        });
        return;
    }

    const message = 'Something has gone wrong on the server';
    res.status(500).send({
        message,
    });
});

export default router;
