import fs from 'fs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdfModule = require('pdf-parse');

const pdfPath = 'C:\\Users\\JAY\\Pictures\\Screenshots\\AppsInToss_Logo_Guide_600_600.pdf';

console.log('PDF Module:', pdfModule);

try {
    const dataBuffer = fs.readFileSync(pdfPath);
    // Try to find the correct function
    const parse = typeof pdfModule === 'function' ? pdfModule : pdfModule.default;

    if (typeof parse !== 'function') {
        throw new Error('pdf-parse is not a function');
    }

    parse(dataBuffer).then(function (data) {
        console.log('--- PDF Content Start ---');
        console.log(data.text);
        console.log('--- PDF Content End ---');
    }).catch(err => {
        console.error('Error parsing PDF:', err);
    });
} catch (err) {
    console.error('Error reading file:', err);
}
