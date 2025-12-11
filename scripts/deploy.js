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
  const file = line.substring(3);
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

const prompt = `You are analyzing changes to a photography portfolio website. Based on these file changes, generate a concise, professional git commit message (one line, max 72 characters).

Changed files:
${changedFiles.map(({ action, file }) => `${action}: ${file}`).join('\n')}

Rules:
- Use conventional commit format when applicable (feat:, fix:, style:, chore:, etc.)
- Be specific but concise
- Focus on WHAT changed, not implementation details
- Examples: "Add Marianna & Paul gallery", "Update navbar mobile styles", "Optimize image loading", "Fix portfolio animation"

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
  // Fallback to simple auto-generated message
  console.log('   ⚠️  Claude CLI not available, using basic message\n');

  // Simple fallback logic
  if (changedFiles.some(f => f.file.includes('assets/') && f.action === 'added')) {
    commitMessage = 'Add new gallery';
  } else if (changedFiles.some(f => f.file.includes('Portfolio.tsx'))) {
    commitMessage = 'Update portfolio';
  } else if (changedFiles.some(f => f.file.includes('Navbar'))) {
    commitMessage = 'Update navbar';
  } else if (changedFiles.some(f => f.file.includes('styles') || f.file.includes('.css'))) {
    commitMessage = 'Update styles';
  } else if (changedFiles.some(f => f.file.includes('vite.config') || f.file.includes('package.json'))) {
    commitMessage = 'Update build configuration';
  } else {
    commitMessage = `Update ${changedFiles.length} file${changedFiles.length > 1 ? 's' : ''}`;
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
