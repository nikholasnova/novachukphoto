#!/usr/bin/env node
/**
 * Script to generate responsive image variants
 * Run with: node scripts/generate-responsive-images.js
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ASSETS_DIR = path.join(__dirname, '../src/assets');
const OUTPUT_DIR = path.join(__dirname, '../src/assets/responsive');

// Image configuration
const IMAGE_CONFIG = {
  // Hero images - larger sizes for prominent display
  hero: {
    sizes: [400, 600, 800, 1200],
    images: [
      'Marianna and Paul.jpg',
      'Marianna and Paul 120.jpg',
      'Charity and Matthew.jpg',
    ],
  },
  // Portfolio thumbnails - smaller sizes
  portfolio: {
    sizes: [300, 500, 700, 1000],
    images: [
      'P&D 829.jpg',
      'Olivia and Andrew.jpg',
      'J&A 367.jpg',
      'Laura & Trevor.jpg',
      'Marianna and Paul-273.jpg',
    ],
  },
  // About section - medium sizes
  about: {
    sizes: [400, 600, 800, 1200],
    images: ['Novachuk Photographer.jpg'],
  },
};

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Generate safe filename from original
function getSafeFilename(filename) {
  return filename
    .replace(/\s+/g, '-')
    .replace(/&/g, 'and')
    .replace(/P&D/g, 'pandd')  // Special case for P&D
    .replace(/J&A/g, 'janda')   // Special case for J&A
    .toLowerCase();
}

async function generateResponsiveImages() {
  console.log('Generating responsive images...\n');

  let totalGenerated = 0;
  let totalSkipped = 0;

  for (const [category, config] of Object.entries(IMAGE_CONFIG)) {
    console.log(`Processing ${category} images:`);

    for (const imageName of config.images) {
      const inputPath = path.join(ASSETS_DIR, imageName);

      if (!fs.existsSync(inputPath)) {
        console.log(`  - Skipping ${imageName} (file not found)`);
        continue;
      }

      const baseName = path.parse(imageName).name;
      const safeBaseName = getSafeFilename(baseName);

      for (const width of config.sizes) {
        // Generate WebP version
        const webpOutput = path.join(OUTPUT_DIR, `${safeBaseName}-${width}.webp`);
        // Generate JPG version as fallback
        const jpgOutput = path.join(OUTPUT_DIR, `${safeBaseName}-${width}.jpg`);

        // Skip if files already exist
        const webpExists = fs.existsSync(webpOutput);
        const jpgExists = fs.existsSync(jpgOutput);

        if (webpExists && jpgExists) {
          totalSkipped += 2;
          continue;
        }

        try {
          const image = sharp(inputPath);

          // Generate WebP
          if (!webpExists) {
            await image
              .clone()
              .resize(width, null, { withoutEnlargement: true })
              .webp({ quality: 85 })
              .toFile(webpOutput);
            totalGenerated++;
          }

          // Generate JPG
          if (!jpgExists) {
            await image
              .clone()
              .resize(width, null, { withoutEnlargement: true })
              .jpeg({ quality: 82, mozjpeg: true })
              .toFile(jpgOutput);
            totalGenerated++;
          }

          console.log(`  - ${imageName} @ ${width}px`);
        } catch (err) {
          console.error(`  - Error processing ${imageName} @ ${width}px:`, err.message);
        }
      }
    }
    console.log('');
  }

  console.log(`Done! Generated ${totalGenerated} images, skipped ${totalSkipped} existing.`);
}

generateResponsiveImages().catch(console.error);
