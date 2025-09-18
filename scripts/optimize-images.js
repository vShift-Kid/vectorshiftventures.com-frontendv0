#!/usr/bin/env node

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Configuration
const inputDir = './public';
const outputDir = './public/optimized';
const formats = ['webp', 'avif'];
const sizes = [
  { width: 320, suffix: '-sm' },
  { width: 640, suffix: '-md' },
  { width: 1024, suffix: '-lg' },
  { width: 1920, suffix: '-xl' }
];

// Supported image extensions
const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff'];

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Function to get all image files recursively
function getImageFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      getImageFiles(filePath, fileList);
    } else {
      const ext = path.extname(file).toLowerCase();
      if (imageExtensions.includes(ext)) {
        fileList.push(filePath);
      }
    }
  });
  
  return fileList;
}

// Function to optimize a single image
async function optimizeImage(inputPath, outputDir) {
  const fileName = path.basename(inputPath, path.extname(inputPath));
  const inputDir = path.dirname(inputPath);
  const relativePath = path.relative('./public', inputDir);
  
  console.log(`Processing: ${inputPath}`);
  
  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    // Generate different sizes and formats
    for (const format of formats) {
      for (const size of sizes) {
        const outputFileName = `${fileName}${size.suffix}.${format}`;
        const outputPath = path.join(outputDir, relativePath, outputFileName);
        
        // Create directory if it doesn't exist
        const outputDirPath = path.dirname(outputPath);
        if (!fs.existsSync(outputDirPath)) {
          fs.mkdirSync(outputDirPath, { recursive: true });
        }
        
        // Resize and convert
        await image
          .resize(size.width, null, {
            withoutEnlargement: true,
            fit: 'inside'
          })
          .toFormat(format, {
            quality: format === 'avif' ? 80 : 85,
            effort: format === 'avif' ? 6 : 4
          })
          .toFile(outputPath);
        
        console.log(`  Generated: ${outputPath}`);
      }
    }
    
    // Also create a responsive image manifest
    const manifestPath = path.join(outputDir, relativePath, `${fileName}.json`);
    const manifest = {
      original: inputPath.replace('./public', ''),
      formats: {}
    };
    
    for (const format of formats) {
      manifest.formats[format] = {};
      for (const size of sizes) {
        const fileName = path.basename(inputPath, path.extname(inputPath));
        const outputFileName = `${fileName}${size.suffix}.${format}`;
        manifest.formats[format][size.width] = `/${relativePath}/${outputFileName}`;
      }
    }
    
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
    console.log(`  Manifest: ${manifestPath}`);
    
  } catch (error) {
    console.error(`Error processing ${inputPath}:`, error.message);
  }
}

// Main function
async function main() {
  console.log('🖼️  Starting image optimization...');
  
  const imageFiles = getImageFiles(inputDir);
  console.log(`Found ${imageFiles.length} images to process`);
  
  for (const imageFile of imageFiles) {
    await optimizeImage(imageFile, outputDir);
  }
  
  console.log('✅ Image optimization complete!');
  console.log(`Optimized images saved to: ${outputDir}`);
}

// Run the script
main().catch(console.error);
