import { mkdir, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const sourceDir = path.join(rootDir, 'assets', 'projects');
const outputDir = path.join(sourceDir, 'thumbs');
const supportedExtensions = new Set(['.png', '.jpg', '.jpeg', '.webp']);
const targetWidth = 960;

async function generateProjectThumbnails() {
  await mkdir(outputDir, { recursive: true });

  const entries = await readdir(sourceDir, { withFileTypes: true });
  const images = entries.filter((entry) => entry.isFile() && supportedExtensions.has(path.extname(entry.name).toLowerCase()));

  let totalBefore = 0;
  let totalAfter = 0;

  for (const image of images) {
    const sourcePath = path.join(sourceDir, image.name);
    const sourceStats = await stat(sourcePath);
    const metadata = await sharp(sourcePath).metadata();
    const outputName = `${path.parse(image.name).name}.webp`;
    const outputPath = path.join(outputDir, outputName);

    await sharp(sourcePath)
      .resize({ width: targetWidth, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 84, effort: 6, smartSubsample: true })
      .toFile(outputPath);

    const outputStats = await stat(outputPath);
    totalBefore += sourceStats.size;
    totalAfter += outputStats.size;

    console.log(
      `${image.name}: ${metadata.width}x${metadata.height} ${(sourceStats.size / 1024).toFixed(1)}KB -> ${outputName} ${(outputStats.size / 1024).toFixed(1)}KB`
    );
  }

  console.log(
    `Project thumbnails ready: ${(totalBefore / (1024 * 1024)).toFixed(2)}MB -> ${(totalAfter / (1024 * 1024)).toFixed(2)}MB`
  );
}

generateProjectThumbnails().catch((error) => {
  console.error('Failed to generate project thumbnails:', error);
  process.exitCode = 1;
});