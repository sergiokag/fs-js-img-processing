import { Router } from 'express';
import apicache from 'apicache';
import resizeImage from '../services/resize.service';

const router = Router();
const cache = apicache.middleware;

router.get('/', (_, res) => {
    res.send('Hello! Visit route /api/images');
});

router.get('/api/images', cache('5 minutes'), async (req, res) => {
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
    } else {
        const message =
            'Bad request! You must set filename, width and height query params';
        res.status(400).send({
            message,
        });
    }
});

export default router;
