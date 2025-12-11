#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🚀 Quick Commit - Analyzing changes...\n');

// Check if we're in a git repository
try {
  execSync('git rev-parse --git-dir', { stdio: 'pipe' });
} catch (error) {
  console.error('❌ Error: Not a git repository');
  console.error('   Run "git init" first');
  process.exit(1);
}

// Check for uncommitted changes
let statusOutput;
try {
  statusOutput = execSync('git status --porcelain', { encoding: 'utf8' });
} catch (error) {
  console.error('❌ Error: Could not check git status');
  process.exit(1);
}

if (!statusOutput.trim()) {
  console.log('✅ No changes to commit. Working directory clean!');
  process.exit(0);
}

// Parse git status to understand what changed
const lines = statusOutput.trim().split('\n');
const changes = {
  modified: [],
  added: [],
  deleted: [],
  renamed: []
};

lines.forEach(line => {
  const status = line.substring(0, 2);
  const file = line.substring(3);

  if (status.includes('M')) changes.modified.push(file);
  else if (status.includes('A')) changes.added.push(file);
  else if (status.includes('D')) changes.deleted.push(file);
  else if (status.includes('R')) changes.renamed.push(file);
  else if (status === '??') changes.added.push(file);
});

// Generate smart commit message based on changes
function generateCommitMessage(changes) {
  const messages = [];

  // Detect specific patterns
  const isGalleryUpdate = changes.added.some(f => f.includes('assets/')) &&
                         changes.modified.some(f => f.includes('Portfolio.tsx'));

  const isStyleUpdate = changes.modified.some(f =>
    f.includes('.css') || f.includes('tailwind') || f.includes('Navbar') || f.includes('styles')
  );

  const isComponentUpdate = changes.modified.some(f =>
    f.includes('.tsx') || f.includes('.jsx')
  );

  const isBuildConfig = changes.modified.some(f =>
    f.includes('vite.config') || f.includes('package.json') || f.includes('tsconfig')
  );

  const isScriptUpdate = changes.modified.some(f => f.includes('scripts/'));

  // Build commit message based on what changed
  if (isGalleryUpdate) {
    const newImages = changes.added.filter(f => f.includes('assets/'));
    if (newImages.length > 0) {
      const imageName = path.basename(newImages[0], path.extname(newImages[0]));
      messages.push(`Add ${imageName} gallery`);
    } else {
      messages.push('Update gallery');
    }
  }

  if (isStyleUpdate && !isGalleryUpdate) {
    if (changes.modified.includes('src/components/Navbar.tsx')) {
      messages.push('Update navbar styles');
    } else {
      messages.push('Update styles');
    }
  }

  if (isComponentUpdate && !isGalleryUpdate && !isStyleUpdate) {
    const components = changes.modified
      .filter(f => f.includes('components/'))
      .map(f => path.basename(f, '.tsx'))
      .slice(0, 2);

    if (components.length > 0) {
      messages.push(`Update ${components.join(' and ')} components`);
    }
  }

  if (isBuildConfig) {
    messages.push('Update build configuration');
  }

  if (isScriptUpdate) {
    messages.push('Update automation scripts');
  }

  // Default message if we couldn't detect specific patterns
  if (messages.length === 0) {
    if (changes.modified.length > 0) {
      messages.push(`Update ${changes.modified.length} file${changes.modified.length > 1 ? 's' : ''}`);
    }
    if (changes.added.length > 0) {
      messages.push(`Add ${changes.added.length} file${changes.added.length > 1 ? 's' : ''}`);
    }
    if (changes.deleted.length > 0) {
      messages.push(`Delete ${changes.deleted.length} file${changes.deleted.length > 1 ? 's' : ''}`);
    }
  }

  return messages.join(', ');
}

const commitMessage = generateCommitMessage(changes);

// Show what will be committed
console.log('📝 Changes detected:');
if (changes.modified.length > 0) {
  console.log(`   Modified: ${changes.modified.length} file(s)`);
  changes.modified.slice(0, 5).forEach(f => console.log(`     - ${f}`));
  if (changes.modified.length > 5) console.log(`     ... and ${changes.modified.length - 5} more`);
}
if (changes.added.length > 0) {
  console.log(`   Added: ${changes.added.length} file(s)`);
  changes.added.slice(0, 5).forEach(f => console.log(`     - ${f}`));
  if (changes.added.length > 5) console.log(`     ... and ${changes.added.length - 5} more`);
}
if (changes.deleted.length > 0) {
  console.log(`   Deleted: ${changes.deleted.length} file(s)`);
  changes.deleted.slice(0, 3).forEach(f => console.log(`     - ${f}`));
}

console.log(`\n💬 Commit message: "${commitMessage}"`);
console.log('\n⏳ Committing and pushing...\n');

try {
  // Add all changes
  execSync('git add .', { stdio: 'inherit' });

  // Commit with generated message
  execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });

  // Push to remote
  console.log('\n⬆️  Pushing to GitHub...');
  execSync('git push', { stdio: 'inherit' });

  console.log('\n✅ Done! Changes committed and pushed successfully.');
  console.log(`   Commit: "${commitMessage}"\n`);

} catch (error) {
  console.error('\n❌ Error during git operations');
  console.error('   You may need to pull changes first or resolve conflicts');
  process.exit(1);
}
