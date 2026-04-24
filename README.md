# MCC Greens Pocket Guide

A lightweight personal PWA for viewing MCC green maps and hole notes.

## Replace placeholder images

Put your cleaned/cropped images into `/images` and update `holes.js` so each hole points to the correct file.

Recommended:
- `images/hole-1.png`
- `images/hole-2.png`
- ...
- `images/hole-18.png`

Then edit the notes in `holes.js`.

## Run locally

Open `index.html` directly, or run:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Deploy on Vercel

1. Create a new Vercel project.
2. Upload this folder to GitHub or use Vercel CLI.
3. Set framework preset to "Other".
4. No build command is needed.
5. Output directory can be left blank or set to root.

## Add to iPhone Home Screen

Open the Vercel URL in Safari:
Share → Add to Home Screen
