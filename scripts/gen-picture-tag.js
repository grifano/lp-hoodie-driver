import fs from 'fs';
import path from 'path';

const folderPath = './src/images'; // Parent folder containing "section-*" folders
const outputFile = './src/partials/pictureTag.html'; // Output HTML file path

function generateHTMLForSectionFolders(folderPath) {
  const directories = fs
    .readdirSync(folderPath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory() && dirent.name.startsWith('section'))
    .map(dirent => path.join(folderPath, dirent.name));

  let htmlOutput = '';

  directories.forEach(dir => {
    const sectionName = path.basename(dir);
    const files = fs.readdirSync(dir);
    const groups = {};

    // Parse files and group them
    files.forEach(file => {
      const ext = path.extname(file);
      const nameParts = path.basename(file, ext).split('-');
      if (nameParts.length < 4) return; // Skip invalid files

      const descriptor = nameParts[2]; // e.g., "dark" or "yellow"
      const screenSize = nameParts[3].replace('@2x', ''); // Normalize screen size (remove @2x)
      const resolution = file.includes('@2x') ? '2x' : '1x';

      // Initialize nested structure if it doesn't exist
      groups[descriptor] = groups[descriptor] || {};
      groups[descriptor][screenSize] = groups[descriptor][screenSize] || {};
      groups[descriptor][screenSize][resolution] =
        groups[descriptor][screenSize][resolution] || {};

      groups[descriptor][screenSize][resolution][ext] = file;
    });

    // Generate HTML for each group
    Object.keys(groups).forEach(descriptor => {
      const html = `
<picture class="${sectionName}-${descriptor}">
  <!-- Desktop -->
  ${createSourceTags(groups[descriptor], dir, 'desktop', '(min-width: 991px)')}
  
  <!-- Tablet -->
  ${createSourceTags(groups[descriptor], dir, 'tablet', '(min-width: 768px)')}
  
  <!-- Mobile -->
  ${createSourceTags(groups[descriptor], dir, 'mobile', '(min-width: 320px)')}

  <img
    src="./images/${sectionName}/${
        groups[descriptor].mobile?.['1x']?.['.png'] || ''
      }"
    alt="Hoodie ${descriptor}"
  />
</picture>`;
      htmlOutput += html + '\n';
    });
  });

  // Write the generated HTML to a file
  fs.writeFileSync(outputFile, htmlOutput.trim());
}

// Function to create <source> tags for a device type
function createSourceTags(group, dir, screenSize, mediaQuery) {
  const types = ['.webp', '.avif', '.png'];
  const resolutions = ['1x', '2x'];

  return types
    .map(type => {
      const srcSetEntries = resolutions
        .map(res => {
          const file = group[screenSize]?.[res]?.[type];

          return file ? `./images/${path.basename(dir)}/${file} ${res}` : null;
        })
        .filter(Boolean); // Remove null entries

      if (srcSetEntries.length > 0) {
        return `
  <source
    media="${mediaQuery}"
    type="image/${type.replace('.', '')}"
    srcset="${srcSetEntries.join(', ')}"
  />`;
      }
      return '';
    })
    .join('');
}

// Execute the function
generateHTMLForSectionFolders(folderPath);
