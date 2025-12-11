# Gallery Management Scripts

## Add Gallery Script

Easily add new galleries to your portfolio without manually editing code.

### Quick Start (EASIEST - Just paste the embed code!)

```bash
npm run add-gallery -- \
  --title "Sarah & Michael" \
  --description "A beautiful spring wedding in the Arizona desert" \
  --embed "<script> const searchread_abc123 = \`\`;</script><template data-pt-type='blog' data-pt-slideshowid='abc123' ></template><script src='https://www.novachukphoto.gallery/-sarahmichael/slideswebcomponentembed.js/abc123?features=lightbox&filtertags=' type='text/javascript' data-pt-scriptslideshowid='abc123'></script>" \
  --image "Sarah and Michael.jpg"
```

The script automatically extracts the `embedId` and `slug` from the embed code!

### Step-by-Step Guide

#### 1. **Add your image to assets**
Place your gallery thumbnail in `src/assets/`:
```bash
# Example: Place "Sarah and Michael.jpg" in src/assets/
```

#### 2. **Copy the embed code from novachukphoto.gallery**
Just copy the entire embed script block (the whole thing!)

#### 3. **Run the command**
```bash
npm run add-gallery -- \
  --title "Gallery Title" \
  --description "Short description for the tile" \
  --embed "PASTE_ENTIRE_EMBED_CODE_HERE" \
  --image "YourImage.jpg"
```

**That's it!** The script parses the embed code automatically.

### Arguments

#### Option 1: Use Full Embed Code (RECOMMENDED)

| Argument | Required | Description | Example |
|----------|----------|-------------|---------|
| `--title` | ✅ Yes | Gallery title | `"Sarah & Michael"` |
| `--description` | ✅ Yes | Short description | `"A beautiful spring wedding"` |
| `--embed` | ✅ Yes | Full embed code from gallery service | `"<script>...</script>..."` |
| `--image` | ✅ Yes | Image filename in assets | `"Sarah and Michael.jpg"` |

#### Option 2: Manual Entry

| Argument | Required | Description | Example |
|----------|----------|-------------|---------|
| `--title` | ✅ Yes | Gallery title | `"Sarah & Michael"` |
| `--description` | ✅ Yes | Short description | `"A beautiful spring wedding"` |
| `--embedId` | ✅ Yes | Gallery embed ID | `"693b33b67538e1b0110a33f5"` |
| `--slug` | ✅ Yes | URL slug | `"-sarahmichael"` |
| `--image` | ✅ Yes | Image filename in assets | `"Sarah and Michael.jpg"` |

#### Optional (Both Options)

| Argument | Required | Description | Example |
|----------|----------|-------------|---------|
| `--textContent` | ❌ No | Full text for embed | `"Sarah & Michael\nWedding..."` |

### Real Example

Using the actual embed code from novachukphoto.gallery:

```bash
npm run add-gallery -- \
  --title "Marianna & Paul" \
  --description "A beautiful celebration of love and faith" \
  --embed "<script> const searchread_693b33b67538e1b0110a33f5 = \`\`;</script><template data-pt-type='blog' data-pt-slideshowid='693b33b67538e1b0110a33f5' ></template><script src='https://www.novachukphoto.gallery/-mariannapaul/slideswebcomponentembed.js/693b33b67538e1b0110a33f5?features=lightbox&filtertags=' type='text/javascript' data-pt-scriptslideshowid='693b33b67538e1b0110a33f5'></script>" \
  --image "Marianna and Paul-273.jpg"
```

The script will automatically extract:
- Embed ID: `693b33b67538e1b0110a33f5`
- Slug: `-mariannapaul`

### What the Script Does

1. ✅ Checks if the image exists in `src/assets/`
2. ✅ Adds the import statement to Portfolio.tsx
3. ✅ Creates a new gallery object with auto-incremented ID
4. ✅ Inserts the gallery at the **beginning** of the list (newest first)
5. ✅ Preserves all existing galleries

### After Running

1. **Review changes**: Check `src/components/Portfolio.tsx`
2. **Test locally**: `npm run dev`
3. **Commit and deploy**:
   ```bash
   git add .
   git commit -m "Add Sarah & Michael gallery"
   git push
   ```

### Troubleshooting

**Error: Image file not found**
```
❌ Error: Image file not found: src/assets/YourImage.jpg
```
→ Make sure the image is in `src/assets/` folder

**Error: Missing required arguments**
```
❌ Error: Missing required arguments: --title, --embedId
```
→ Provide all required arguments

**Need help?**
```bash
npm run add-gallery -- --help
```

### Tips

- **Image naming**: Use descriptive names like `"Couple Name-123.jpg"`
- **Title format**: Use `"Name & Name"` format for consistency
- **Slug format**: Always start with `-` (e.g., `-couplename`)
- **Description**: Keep it 1-2 sentences, engaging but concise
- **Gallery order**: Newest galleries automatically appear first
