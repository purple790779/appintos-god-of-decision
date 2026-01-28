import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const inputPath = 'C:/Users/JAY/.gemini/antigravity/brain/29fdfdeb-091c-4509-9fcd-402fce372c5a/god_of_decision_icon_1769607839473.png';
const outputPath = 'C:/Users/JAY/.gemini/antigravity/brain/29fdfdeb-091c-4509-9fcd-402fce372c5a/god_of_decision_icon_600_guide.png';

async function processImage() {
    try {
        console.log(`Processing: ${inputPath}`);
        // Create a white background 600x600
        const background = {
            create: {
                width: 600,
                height: 600,
                channels: 4,
                background: { r: 255, g: 255, b: 255, alpha: 1 }
            }
        };

        // Resize original to fit cover or contain? 
        // DALL-E images usually have the subject in center. 1024x1024.
        // We just resize to 600x600.

        // First resize input
        const resizedInput = await sharp(inputPath)
            .resize(600, 600)
            .toBuffer();

        // Composite (though simple resize might suppress background if original has one, but creating a fresh canvas ensures strict dimensions and background)
        await sharp(background)
            .composite([{ input: resizedInput }])
            .png()
            .toFile(outputPath);

        console.log(`Success: ${outputPath}`);
    } catch (err) {
        console.error('Error processing image:', err);
    }
}

processImage();
