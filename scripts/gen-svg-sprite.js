import fs from 'fs';
import path from 'path';
import { JSDOM } from 'jsdom';

function prettifySVG(svgString) {
  const dom = new JSDOM(svgString, { contentType: 'image/svg+xml' });
  return dom.serialize();
}

export function generateSprite(inputFolder, outputFile) {
  // Create the root element of the sprite
  const sprite = `<svg xmlns="http://www.w3.org/2000/svg"></svg>`;
  const dom = new JSDOM(sprite, { contentType: 'image/svg+xml' });
  const document = dom.window.document;
  const svgRoot = document.querySelector('svg');

  // Iterate through all SVG files in the input folder
  fs.readdirSync(inputFolder).forEach(file => {
    if (file.endsWith('.svg')) {
      const filePath = path.join(inputFolder, file);
      const svgContent = fs.readFileSync(filePath, 'utf-8');

      // Parse the SVG content and create a <symbol> element
      const fileDom = new JSDOM(svgContent, { contentType: 'image/svg+xml' });
      const svgElement = fileDom.window.document.querySelector('svg');
      const symbol = document.createElement('symbol');

      // Set ID based on the file name
      const id = path.parse(file).name;
      symbol.setAttribute('id', id);

      // Move all children from the parsed SVG into the symbol
      while (svgElement.firstChild) {
        symbol.appendChild(svgElement.firstChild);
      }

      svgRoot.appendChild(symbol);
    }
  });

  // Serialize and write the sprite to the output file
  const spriteString = prettifySVG(dom.serialize());
  fs.writeFileSync(outputFile, spriteString, 'utf-8');
  console.log(`SVG sprite saved to ${outputFile}`);
}

// Example usage
const inputFolder = './input_folder'; // Update with your folder path
const outputFile = './src/public/test/icons.svg'; // Update with your desired output path

if (!fs.existsSync(inputFolder)) {
  console.error(
    `Input folder '${inputFolder}' does not exist. Please provide a valid folder.`
  );
} else {
  generateSprite(inputFolder, outputFile);
}
