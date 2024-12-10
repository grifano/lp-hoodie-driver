import tinify from 'tinify';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

tinify.key = '4JnJ769GDfmLt86TSNYwZ613qld3crXR';

const IMAGE_FOLDER = './src/images';

const log = message => console.log(`[PROCESSOR]: ${message}`);

const compressWithTinify = async (inputPath, outputPath) => {
  try {
    log(`Compressing file: ${inputPath} to ${outputPath}`);
    const source = tinify.fromFile(inputPath);
    await source.toFile(outputPath);
    log(`Compressed and saved: ${outputPath}`);
    return outputPath;
  } catch (error) {
    log(`Error compressing with TinyPNG: ${error.message}`);
    return null;
  }
};

const convertToWebpAndAvif = async (inputPath, outputDir, baseName) => {
  const outputs = [];

  try {
    const webpPath = path.join(outputDir, `${baseName}.webp`);
    await sharp(inputPath).toFormat('webp', { quality: 80 }).toFile(webpPath);
    log(`Converted to WebP: ${webpPath}`);
    outputs.push(webpPath);

    const avifPath = path.join(outputDir, `${baseName}.avif`);
    await sharp(inputPath).toFormat('avif', { quality: 50 }).toFile(avifPath);
    log(`Converted to AVIF: ${avifPath}`);
    outputs.push(avifPath);
  } catch (error) {
    log(`Error converting to WebP/AVIF: ${error.message}`);
  }

  return outputs;
};

const extractSecondWord = folderName => {
  const words = folderName.split('-');
  return words.length > 1 ? words[1] : 'hero'; // Default to 'hero' if no second word exists
};

const processImages = async (
  inputPath,
  outputDir,
  originalBaseName,
  ext,
  folderName
) => {
  const outputs = [];
  const prefix = extractSecondWord(folderName);
  const baseName = `${prefix}-${originalBaseName}`;

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
    log(`Created output directory: ${outputDir}`);
  }

  const originalCompressedPath = path.join(outputDir, `${baseName}${ext}`);
  const compressedFile = await compressWithTinify(
    inputPath,
    originalCompressedPath
  );
  if (compressedFile) {
    outputs.push(compressedFile);

    const convertedFiles = await convertToWebpAndAvif(
      compressedFile,
      outputDir,
      baseName
    );
    outputs.push(...convertedFiles);
  }

  return outputs;
};

const processAllImages = async () => {
  log(`Processing folder: ${IMAGE_FOLDER}`);

  const directories = fs
    .readdirSync(IMAGE_FOLDER, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory() && dirent.name.startsWith('input_'));

  for (const dir of directories) {
    const dirPath = path.join(IMAGE_FOLDER, dir.name);
    const folderName = dir.name.replace('input_', '');
    const outputDir = path.join(IMAGE_FOLDER, folderName);

    if (fs.existsSync(outputDir) && fs.readdirSync(outputDir).length > 0) {
      log(`Skipping already processed folder: ${outputDir}`);
      continue;
    }

    log(`Processing folder: ${dirPath} -> ${outputDir}`);

    const files = fs
      .readdirSync(dirPath)
      .filter(file => file.match(/\.(jpg|jpeg|png)$/i));

    for (const file of files) {
      const inputPath = path.join(dirPath, file);
      const ext = path.extname(file).toLowerCase();
      const originalBaseName = path.basename(file, ext);

      await processImages(
        inputPath,
        outputDir,
        originalBaseName,
        ext,
        folderName
      );
    }
  }

  log('Processing completed.');
};

processAllImages();
