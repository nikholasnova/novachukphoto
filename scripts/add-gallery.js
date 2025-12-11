#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Parse command line arguments
const args = process.argv.slice(2);

function showUsage() {
  console.log(`
📸 Add Gallery Script - Novachuk Photography
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Usage Option 1 (EASIEST - Paste full embed code):
  npm run add-gallery -- \\
    --title "Gallery Title" \\
    --description "Description" \\
    --embed "<script>...</script><template>...</template><script>...</script>" \\
    --image "image.jpg"

Usage Option 2 (Manual - Specify each part):
  npm run add-gallery -- \\
    --title "Gallery Title" \\
    --description "Description" \\
    --embedId "abc123" \\
    --slug "-slug" \\
    --image "image.jpg"

Required Arguments:
  --title         Gallery title (e.g., "Marianna & Paul")
  --description   Short description for the gallery tile
  --image         Image filename in src/assets/ (e.g., "Marianna and Paul-273.jpg")

EITHER (Option 1):
  --embed         Full embed code from novachukphoto.gallery (paste entire script block)

OR (Option 2):
  --embedId       Gallery embed ID from novachukphoto.gallery
  --slug          URL slug (e.g., "-mariannapaul")

Optional Arguments:
  --textContent   Full text content for the embed (defaults to empty string)

Example 1 (EASIEST):
  npm run add-gallery -- \\
    --title "Sarah & Michael" \\
    --description "A beautiful spring wedding" \\
    --embed "<script> const searchread_abc123 = \`\`;</script><template data-pt-type='blog' data-pt-slideshowid='abc123' ></template><script src='https://www.novachukphoto.gallery/-sarahmichael/slideswebcomponentembed.js/abc123?features=lightbox&filtertags=' type='text/javascript' data-pt-scriptslideshowid='abc123'></script>" \\
    --image "Sarah and Michael.jpg"

Example 2 (Manual):
  npm run add-gallery -- \\
    --title "Sarah & Michael" \\
    --description "A beautiful spring wedding" \\
    --embedId "abc123def456" \\
    --slug "-sarahmichael" \\
    --image "Sarah and Michael.jpg"
`);
  process.exit(1);
}

// Parse arguments into object
function parseArgs(args) {
  const parsed = {};
  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith('--')) {
      const key = args[i].substring(2);
      const value = args[i + 1];
      if (!value || value.startsWith('--')) {
        console.error(`❌ Error: Missing value for --${key}`);
        showUsage();
      }
      parsed[key] = value;
      i++; // Skip next arg since we used it as value
    }
  }
  return parsed;
}

// Parse embed code to extract embedId and slug
function parseEmbedCode(embedCode) {
  // Extract embedId - look for data-pt-slideshowid or the ID in the URL
  const embedIdMatch = embedCode.match(/data-pt-slideshowid='([^']+)'/);
  if (!embedIdMatch) {
    console.error(`❌ Error: Could not extract embedId from embed code`);
    console.error(`   Make sure you copied the full embed code from novachukphoto.gallery`);
    process.exit(1);
  }
  const embedId = embedIdMatch[1];

  // Extract slug - look for the URL pattern
  const slugMatch = embedCode.match(/novachukphoto\.gallery\/([-\w]+)\//);
  if (!slugMatch) {
    console.error(`❌ Error: Could not extract slug from embed code`);
    console.error(`   Make sure you copied the full embed code from novachukphoto.gallery`);
    process.exit(1);
  }
  const slug = slugMatch[1];

  return { embedId, slug };
}

// Validate required arguments
function validateArgs(parsed) {
  // Check basic required fields
  const basicRequired = ['title', 'description', 'image'];
  const basicMissing = basicRequired.filter(key => !parsed[key]);

  if (basicMissing.length > 0) {
    console.error(`❌ Error: Missing required arguments: ${basicMissing.map(k => `--${k}`).join(', ')}\n`);
    showUsage();
  }

  // Check if we have either --embed OR both --embedId and --slug
  if (!parsed.embed && (!parsed.embedId || !parsed.slug)) {
    console.error(`❌ Error: You must provide EITHER:`);
    console.error(`   --embed "full embed code"`);
    console.error(`   OR both --embedId and --slug\n`);
    showUsage();
  }

  // If embed code is provided, parse it
  if (parsed.embed) {
    const { embedId, slug } = parseEmbedCode(parsed.embed);
    parsed.embedId = embedId;
    parsed.slug = slug;
    console.log(`\n✅ Parsed embed code successfully:`);
    console.log(`   Embed ID: ${embedId}`);
    console.log(`   Slug: ${slug}`);
  }

  return true;
}

// Generate a unique ID based on existing galleries
function getNextId(portfolioContent) {
  const idMatches = portfolioContent.match(/id:\s*(\d+)/g);
  if (!idMatches) return 1;

  const ids = idMatches.map(match => parseInt(match.match(/\d+/)[0]));
  return Math.max(...ids) + 1;
}

// Convert image filename to camelCase variable name
function imageToVarName(imageFilename) {
  // Remove extension
  const nameWithoutExt = imageFilename.replace(/\.[^/.]+$/, '');
  // Convert to camelCase
  return nameWithoutExt
    .split(/[\s&-]+/)
    .map((word, index) => {
      if (index === 0) return word.toLowerCase();
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join('') + 'Img';
}

function addGallery(options) {
  const { title, description, embedId, slug, image, textContent = '' } = options;

  // Paths
  const portfolioPath = path.join(__dirname, '../src/components/Portfolio.tsx');
  const assetsPath = path.join(__dirname, '../src/assets', image);

  // Check if image exists
  if (!fs.existsSync(assetsPath)) {
    console.error(`❌ Error: Image file not found: src/assets/${image}`);
    console.error(`   Please make sure the image is in the src/assets/ folder.`);
    process.exit(1);
  }

  // Read Portfolio.tsx
  let portfolioContent = fs.readFileSync(portfolioPath, 'utf8');

  // Generate variable name for import
  const imageVarName = imageToVarName(image);

  // Get next ID
  const nextId = getNextId(portfolioContent);

  console.log(`\n📸 Adding new gallery...`);
  console.log(`   Title: ${title}`);
  console.log(`   Image: ${image} (as ${imageVarName})`);
  console.log(`   ID: ${nextId}`);
  console.log(`   Embed ID: ${embedId}`);

  // Add import statement
  const importRegex = /(import.*from.*['"].*assets.*jpg['"];?\n)/;
  const lastImportMatch = portfolioContent.match(importRegex);

  if (!lastImportMatch) {
    console.error('❌ Error: Could not find image imports in Portfolio.tsx');
    process.exit(1);
  }

  const newImport = `import ${imageVarName} from '../assets/${image}';\n`;
  portfolioContent = portfolioContent.replace(
    importRegex,
    `$1${newImport}`
  );

  // Create new gallery object
  const newGallery = `  {
    id: ${nextId},
    embedId: "${embedId}",
    slug: "${slug}",
    title: "${title}",
    description: "${description}",
    thumbnail: ${imageVarName},
    textContent: \`${textContent}\`
  },\n`;

  // Insert at the beginning of portfolioItems array
  const arrayStart = portfolioContent.indexOf('const portfolioItems: BlogPost[] = [');
  if (arrayStart === -1) {
    console.error('❌ Error: Could not find portfolioItems array in Portfolio.tsx');
    process.exit(1);
  }

  const insertPosition = portfolioContent.indexOf('[', arrayStart) + 1;
  const beforeInsert = portfolioContent.substring(0, insertPosition);
  const afterInsert = portfolioContent.substring(insertPosition);

  // Insert new gallery at the beginning
  portfolioContent = beforeInsert + '\n' + newGallery + afterInsert;

  // Write back to file
  fs.writeFileSync(portfolioPath, portfolioContent, 'utf8');

  console.log(`\n✅ Gallery added successfully!`);
  console.log(`\n📋 Next steps:`);
  console.log(`   1. Review the changes in src/components/Portfolio.tsx`);
  console.log(`   2. Test the site locally: npm run dev`);
  console.log(`   3. Commit and push: git add . && git commit -m "Add ${title} gallery" && git push`);
  console.log(`\n`);
}

// Main execution
if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
  showUsage();
}

const parsed = parseArgs(args);
validateArgs(parsed);
addGallery(parsed);
