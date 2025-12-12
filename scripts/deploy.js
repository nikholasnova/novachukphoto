#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';

console.log('🚀 Smart Deploy - Build, Commit, and Push\n');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

// Step 1: Check if we're in a git repository
console.log('📋 Step 1: Checking git repository...');
try {
  execSync('git rev-parse --git-dir', { stdio: 'pipe' });
  console.log('   ✅ Git repository found\n');
} catch (error) {
  console.error('   ❌ Error: Not a git repository');
  console.error('      Run "git init" first\n');
  process.exit(1);
}

// Step 2: Check for uncommitted changes
console.log('📋 Step 2: Checking for changes...');
let statusOutput;
try {
  statusOutput = execSync('git status --porcelain', { encoding: 'utf8' });
} catch (error) {
  console.error('   ❌ Error: Could not check git status\n');
  process.exit(1);
}

if (!statusOutput.trim()) {
  console.log('   ℹ️  No changes detected');
  console.log('   Running build and push anyway...\n');
}

// Step 3: Build the site
console.log('📋 Step 3: Building the site...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('   ✅ Build completed successfully\n');
} catch (error) {
  console.error('   ❌ Build failed! Fix errors before deploying\n');
  process.exit(1);
}

// Step 4: Check for changes again (build might have changed dist/)
try {
  statusOutput = execSync('git status --porcelain', { encoding: 'utf8' });
} catch (error) {
  console.error('   ❌ Error: Could not check git status\n');
  process.exit(1);
}

if (!statusOutput.trim()) {
  console.log('✅ No changes to commit. Everything is up to date!');
  console.log('   Site is already deployed.\n');
  process.exit(0);
}

// Step 5: Get git diff for Claude to analyze
console.log('📋 Step 4: Analyzing changes with Claude AI...');
let diffOutput;
try {
  // Get a detailed diff of changes
  diffOutput = execSync('git diff --staged --stat', { encoding: 'utf8' });
  if (!diffOutput.trim()) {
    // If nothing staged, check unstaged changes
    diffOutput = execSync('git diff --stat', { encoding: 'utf8' });
  }
} catch (error) {
  diffOutput = '';
}

// Get list of changed files
const changedFiles = statusOutput.trim().split('\n').map(line => {
  const status = line.substring(0, 2).trim();
  const file = line.substring(3).replace(/"/g, ''); // Strip quotes from filenames
  let action = 'modified';
  if (status.includes('A') || status === '??') action = 'added';
  else if (status.includes('D')) action = 'deleted';
  else if (status.includes('M')) action = 'modified';
  return { action, file };
});

console.log('   📝 Changed files:');
changedFiles.slice(0, 10).forEach(({ action, file }) => {
  const emoji = action === 'added' ? '➕' : action === 'deleted' ? '➖' : '✏️';
  console.log(`      ${emoji} ${file}`);
});
if (changedFiles.length > 10) {
  console.log(`      ... and ${changedFiles.length - 10} more files`);
}
console.log('');

// Step 6: Generate commit message using Claude CLI
console.log('📋 Step 5: Generating commit message with AI...');

const prompt = `You are analyzing changes to a photography portfolio website. Based on these file changes, generate a descriptive, professional git commit message (one line, max 72 characters).

Changed files:
${changedFiles.map(({ action, file }) => `${action}: ${file}`).join('\n')}

Rules:
- Be SPECIFIC and DESCRIPTIVE about what changed
- If a new image is added, look at the filename to identify the couple/gallery name
- If Portfolio.tsx changed, describe what was updated (new gallery, description change, etc.)
- If Hero.tsx changed, describe the UI change (button position, text, etc.)
- If SEO/meta tags changed, mention "SEO" or the specific improvement
- Use conventional commit format when applicable (feat:, fix:, style:, chore:, etc.)
- Examples:
  * "Add Olivia & Andrew gallery with SEO updates"
  * "Center hero button on mobile and update SEO keywords"
  * "Update Marianna & Paul gallery description"
  * "Fix portfolio animation on mobile devices"

IMPORTANT: Be specific about couple names, component changes, or features - avoid generic messages like "Add new gallery" or "Update portfolio"

Commit message:`;

let commitMessage;
try {
  // Use Claude CLI to generate commit message
  // Suppress Claude's thinking output, only get the message
  const claudeOutput = execSync(`claude -p "${prompt}"`, {
    encoding: 'utf8',
    stdio: ['pipe', 'pipe', 'pipe']
  });

  // Extract just the commit message (Claude might add extra text)
  commitMessage = claudeOutput.trim().split('\n').pop().replace(/^["']|["']$/g, '').trim();

  // Fallback if message is too long or looks weird
  if (commitMessage.length > 72 || commitMessage.length < 10) {
    throw new Error('Generated message seems invalid');
  }

  console.log(`   ✅ AI Generated: "${commitMessage}"\n`);
} catch (error) {
  // Fallback to descriptive auto-generated message
  console.log('   ⚠️  Claude CLI not available, using smart fallback\n');

  // Smart fallback logic with descriptive messages
  const newImage = changedFiles.find(f => f.file.includes('assets/') && f.action === 'added');
  const portfolioChanged = changedFiles.some(f => f.file.includes('Portfolio.tsx'));
  const heroChanged = changedFiles.some(f => f.file.includes('Hero.tsx'));
  const seoChanged = changedFiles.some(f => f.file.includes('index.html'));

  if (newImage && portfolioChanged) {
    // Extract couple name from image filename
    const imageName = newImage.file.split('/').pop().replace('.jpg', '').replace('.png', '').replace(/"/g, '');
    const updates = [];
    if (seoChanged) updates.push('SEO updates');
    if (heroChanged) updates.push('hero updates');

    commitMessage = updates.length > 0
      ? `Add ${imageName} gallery with ${updates.join(' and ')}`
      : `Add ${imageName} gallery`;
  } else if (portfolioChanged && seoChanged) {
    commitMessage = 'Update portfolio and SEO keywords';
  } else if (heroChanged && seoChanged) {
    commitMessage = 'Update hero section and SEO';
  } else if (portfolioChanged) {
    commitMessage = 'Update portfolio gallery content';
  } else if (heroChanged) {
    commitMessage = 'Update hero section layout';
  } else if (seoChanged) {
    commitMessage = 'Update SEO meta tags and keywords';
  } else if (changedFiles.some(f => f.file.includes('Navbar'))) {
    commitMessage = 'Update navbar styles and layout';
  } else if (changedFiles.some(f => f.file.includes('About'))) {
    commitMessage = 'Update About section content';
  } else if (changedFiles.some(f => f.file.includes('Services'))) {
    commitMessage = 'Update Services section';
  } else if (changedFiles.some(f => f.file.includes('Contact'))) {
    commitMessage = 'Update Contact form';
  } else if (changedFiles.some(f => f.file.includes('vite.config') || f.file.includes('package.json'))) {
    commitMessage = 'Update build configuration';
  } else {
    const fileTypes = [...new Set(changedFiles.map(f => {
      if (f.file.includes('.tsx')) return 'components';
      if (f.file.includes('.css')) return 'styles';
      if (f.file.includes('.js')) return 'scripts';
      return 'files';
    }))];
    commitMessage = `Update ${fileTypes.join(' and ')}`;
  }

  console.log(`   💬 Fallback message: "${commitMessage}"\n`);
}

// Step 7: Stage all changes
console.log('📋 Step 6: Staging changes...');
try {
  execSync('git add .', { stdio: 'pipe' });
  console.log('   ✅ All changes staged\n');
} catch (error) {
  console.error('   ❌ Error: Could not stage changes\n');
  process.exit(1);
}

// Step 8: Commit
console.log('📋 Step 7: Creating commit...');
try {
  execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });
  console.log('');
} catch (error) {
  console.error('   ❌ Error: Could not create commit\n');
  process.exit(1);
}

// Step 9: Push to GitHub
console.log('📋 Step 8: Pushing to GitHub...');
try {
  execSync('git push', { stdio: 'inherit' });
  console.log('');
} catch (error) {
  console.error('   ❌ Error: Could not push to GitHub');
  console.error('      You may need to pull changes first or check your remote\n');
  process.exit(1);
}

// Success!
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
console.log('✅ DEPLOYMENT COMPLETE!\n');
console.log(`   📦 Build: Success`);
console.log(`   💬 Commit: "${commitMessage}"`);
console.log(`   ⬆️  Push: Success`);
console.log(`   🌐 Vercel: Deploying (check dashboard)\n`);
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
