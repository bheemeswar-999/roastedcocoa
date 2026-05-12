import fs from 'fs';
import path from 'path';

const dir = path.join(process.cwd(), 'public', 'images');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const jpegBase64 = '/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////2wBDAf///////////////////////////////////////////////////////////////////////////////////////wAARCAABAAEDAREAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAAUGB//EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEAAQUCX//EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQMBAT8BP//EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQIBAT8BP//Z';
const jpegBuffer = Buffer.from(jpegBase64, 'base64');
const files = [
  'hero-banner.jpg',
  'dark-chocolate.jpg',
  'almond-chocolate.jpg',
  'chocolate-truffles.jpg',
  'birthday-gift-box.jpg',
  'festival-chocolate-hamper.jpg',
  'customized-name-chocolates.jpg',
];

files.forEach((fileName) => {
  const filePath = path.join(dir, fileName);
  fs.writeFileSync(filePath, jpegBuffer);
});
console.log(`Created ${files.length} placeholder JPEG files in ${dir}`);
