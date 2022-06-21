import path from 'path';
import fs from 'fs';

import sharp from 'sharp';

const resizeImage = async (filename: string, width: number, height: number) => {
    try {
        const imagesDirectory = path.join(__dirname, '../public/images');
        const imagePath = path.join(imagesDirectory, `${filename}.jpg`);
        const processedImageDirPath = path.join(
            __dirname,
            '../public/processed_images'
        );

        if (!fs.existsSync(processedImageDirPath)) {
            fs.mkdir(processedImageDirPath, (error) => {
                if (error) {
                    throw new Error(
                        `An error occurred during image processing! ${error}`
                    );
                }
                console.log('directory created!');
            });
        }

        return await sharp(imagePath)
            .resize(width, height)
            .toFile(
                path.join(
                    processedImageDirPath,
                    `${filename}_${width}_${height}.jpg`
                )
            );
    } catch (error) {
        throw new Error(`An error occurred during image processing! ${error}`);
    }
};

export { resizeImage };
