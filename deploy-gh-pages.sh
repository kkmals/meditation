#!/bin/bash

# Build the app
echo "Building the app..."
npm run build

# Copy dist contents to root (for GitHub Pages from branch)
echo "Preparing deployment files..."
cp -r dist/* .

# Stage changes
git add index.html assets/ *.js *.json *.css registerSW.js manifest.webmanifest sw.js workbox-*.js 2>/dev/null

# Commit
git commit -m "chore: Deploy built files to GitHub Pages"

# Push
git push origin claude/coral-reef-sanctuary-app-011CUpYeSAMV4iTiX7mDu7wh

echo "✅ Deployment complete! Your site will be live at:"
echo "https://kkmals.github.io/meditation/"
