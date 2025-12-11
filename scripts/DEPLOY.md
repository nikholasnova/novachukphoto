# 🚀 One-Command Deploy

Deploy your entire website with AI-generated commit messages in one command!

## Quick Start

```bash
npm run deploy
```

That's it! The script will:
1. ✅ Build your site
2. ✅ Analyze changes with Claude AI
3. ✅ Generate smart commit message
4. ✅ Commit all changes
5. ✅ Push to GitHub
6. ✅ Trigger Vercel deployment

---

## What It Does

### Step-by-Step Process

```
🚀 Smart Deploy - Build, Commit, and Push
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 Step 1: Checking git repository...
   ✅ Git repository found

📋 Step 2: Checking for changes...
   📝 Changed files:
      ✏️ src/components/Portfolio.tsx
      ➕ src/assets/Sarah and Michael.jpg
      ...

📋 Step 3: Building the site...
   vite v7.2.7 building for production...
   ✓ built in 1.25s
   ✅ Build completed successfully

📋 Step 4: Analyzing changes with Claude AI...
   ✅ AI Generated: "Add Sarah & Michael gallery"

📋 Step 5: Staging changes...
   ✅ All changes staged

📋 Step 6: Creating commit...
   [main abc1234] Add Sarah & Michael gallery

📋 Step 7: Pushing to GitHub...
   ⬆️  Pushing to origin/main

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ DEPLOYMENT COMPLETE!

   📦 Build: Success
   💬 Commit: "Add Sarah & Michael gallery"
   ⬆️  Push: Success
   🌐 Vercel: Deploying (check dashboard)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## AI Commit Messages

### Claude analyzes your changes and generates professional commit messages:

**Gallery Updates:**
- `Add Marianna & Paul gallery`
- `Update portfolio with new wedding photos`

**Style Changes:**
- `Update navbar mobile styles`
- `Optimize portfolio animation performance`

**Configuration:**
- `Add image optimization to build process`
- `Update SEO meta tags`

**Bug Fixes:**
- `Fix mobile menu overflow issue`
- `Correct gallery modal z-index`

---

## Fallback Mode

If Claude CLI isn't available, the script automatically falls back to smart auto-generated messages:

- Detects gallery additions
- Identifies component updates
- Recognizes style changes
- Notes build configuration changes

---

## Requirements

### Claude CLI (Recommended)

Install Claude CLI for AI-powered commit messages:

```bash
# You already have access to Claude, so:
# Just make sure `claude` command is available in terminal
claude --version
```

If not installed:
```bash
# Follow setup at: https://docs.anthropic.com/claude/docs/claude-cli
```

### Git Configuration

Make sure your git is configured:
```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

---

## Usage Examples

### Example 1: After adding a gallery
```bash
# 1. Add gallery
npm run add-gallery -- \
  --title "Sarah & Michael" \
  --embed "<script>...</script>" \
  --image "Sarah and Michael.jpg"

# 2. Deploy (builds, commits, pushes)
npm run deploy

# Result: "Add Sarah & Michael gallery"
```

### Example 2: After style changes
```bash
# 1. Edit Navbar.tsx, About.tsx, etc.
# (make your changes)

# 2. Deploy
npm run deploy

# Result: "Update navbar and About component styles"
```

### Example 3: After any changes
```bash
# Just run:
npm run deploy

# Script analyzes, builds, commits, and pushes!
```

---

## What Gets Committed

The script commits **everything**:
- ✅ Source code changes
- ✅ New images in assets
- ✅ Build output (dist/)
- ✅ Configuration files
- ✅ Package updates

**Note:** If you want to exclude certain files, add them to `.gitignore`

---

## Error Handling

### Build Fails
```
❌ Build failed! Fix errors before deploying
```
→ Fix TypeScript/build errors, then run `npm run deploy` again

### No Changes
```
✅ No changes to commit. Everything is up to date!
```
→ Nothing to deploy, site is already current

### Push Fails
```
❌ Error: Could not push to GitHub
   You may need to pull changes first
```
→ Run `git pull` to sync, then try again

---

## Pro Tips

### 1. Preview Before Deploy
Want to see changes without deploying?
```bash
npm run dev
```

### 2. Check What Changed
```bash
git status
```

### 3. Manual Commit Message
If you want to write your own commit message:
```bash
npm run build
git add .
git commit -m "Your custom message"
git push
```

### 4. Deploy After Gallery Addition
Perfect workflow:
```bash
# Add gallery
npm run add-gallery -- \
  --title "..." \
  --embed "..." \
  --image "..."

# Deploy (builds & pushes)
npm run deploy
```

---

## Comparison

| Method | Command | Steps | Time |
|--------|---------|-------|------|
| **Manual** | Multiple | 5-6 steps | ~3 min |
| **This Script** | `npm run deploy` | 1 step | ~30 sec |

### Manual Method:
```bash
npm run build
git add .
git commit -m "Update site"
git push
# Wait for Vercel
```

### This Script:
```bash
npm run deploy
# Done! ✅
```

---

## Troubleshooting

**Q: Claude CLI not working?**
A: Script automatically falls back to smart auto-messages. You'll still get good commit messages!

**Q: Can I customize the commit message?**
A: Yes! Edit `scripts/deploy.js` and modify the Claude prompt or fallback logic.

**Q: Does it deploy to Vercel?**
A: Yes! Vercel watches your GitHub repo. Push = auto-deploy.

**Q: Can I skip the build?**
A: Not recommended. The build ensures no errors before deployment.

---

## Your Complete Workflow

### Adding a New Gallery
```bash
# 1. Add image to src/assets/
# 2. Add gallery
npm run add-gallery -- \
  --title "Couple Name" \
  --embed "PASTE_EMBED_CODE" \
  --image "image.jpg"

# 3. Deploy
npm run deploy

# Done! Site updated in ~2 minutes
```

### Making Any Other Changes
```bash
# 1. Edit files (components, styles, etc.)
# 2. Deploy
npm run deploy

# Done! AI writes commit message for you
```

---

## 🎉 You're All Set!

Your complete toolkit:
- `npm run dev` - Local development
- `npm run add-gallery` - Add galleries easily
- `npm run deploy` - Build, commit, push (ONE COMMAND!)

Welcome to painless deployments! 🚀
