import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputPath = 'C:/Users/JAY/.gemini/antigravity/brain/29fdfdeb-091c-4509-9fcd-402fce372c5a/god_of_decision_icon_1769607839473.png';
const outputPath = 'C:/Users/JAY/.gemini/antigravity/brain/29fdfdeb-091c-4509-9fcd-402fce372c5a/god_of_decision_icon_600.png';

async function processImage() {
    try {
        console.log(`Processing: ${inputPath}`);
        await sharp(inputPath)
            .resize(600, 600)
            .ensureAlpha()
            .raw()
            .toBuffer({ resolveWithObject: true })
            .then(async ({ data, info }) => {
                const pixelArray = new Uint8ClampedArray(data.buffer);
                // Simple threshold to remove white background
                for (let i = 0; i < pixelArray.length; i += 4) {
                    const r = pixelArray[i];
                    const g = pixelArray[i + 1];
                    const b = pixelArray[i + 2];
                    if (r > 240 && g > 240 && b > 240) {
                        pixelArray[i + 3] = 0;
                    }
                }

                await sharp(pixelArray, {
                    raw: {
                        width: info.width,
                        height: info.height,
                        channels: 4
                    }
                })
                    .png()
                    .toFile(outputPath);
            });

        console.log(`Success: ${outputPath}`);
    } catch (err) {
        console.error('Error processing image:', err);
    }
}

processImage();
