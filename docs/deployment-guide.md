# Deployment Guide

## Architecture
This is a **Static Web Application**. It requires no backend server code (Node/Python/PHP). It only serves static files (`.html`, `.css`, `.js`, assets).

## Deployment Options

### 1. Vercel / Netlify (Recommended)
- **Setup:** Connect your GitHub/GitLab repository.
- **Build Command:** (None / Leave empty)
- **Output Directory:** `.` (Current directory) or `Pro` if nested.
- **Result:** Automatic SSL, global CDN, continuous deployment.

### 2. GitHub Pages
- **Setup:** Go to Repository Settings -> Pages.
- **Source:** Select `main` branch.
- **Folder:** `/` (root).
- **Result:** Free hosting at `username.github.io/project`.

### 3. Traditional Web Server (Apache/Nginx)
- Upload all files (`index.html`, `style.css`, `script.js`, `Assets/`) to your public HTML folder (e.g., `/var/www/html`).
- Ensure permissions allow reading files (chmod 644) and executing directories (chmod 755).

## Configuration
No special environment variables (`.env`) are currently required for this project.
