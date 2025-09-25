# Basheer Portfolio (React + Vite)

Interactive developer portfolio built with React 19 + Vite, Three.js helpers, Framer Motion and custom animated UI components.

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server (HMR) |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Preview the production build locally |

## Production Build

```bash
npm install
npm run build
npm run preview  # open the served production bundle
```

## Deployment Options

### 1. Vercel (Fast & Easiest)
1. Push project to GitHub (public or private)
2. Go to https://vercel.com → New Project → Import repo
3. Framework preset: "Other" (Vite auto-detected)  
4. Build Command: `npm run build`  
5. Output Directory: `dist`  
6. Deploy → done (auto redeploys on git push)

### 2. Netlify
1. Push to GitHub
2. Go to https://app.netlify.com → Add new site → Import
3. Build Command: `npm run build`  
4. Publish Directory: `dist`  
5. (Already added `netlify.toml` with SPA fallback)

### 3. GitHub Pages
1. Install gh-pages: `npm i -D gh-pages`
2. Add to `package.json` scripts:
	- `"deploy": "gh-pages -d dist"`
	- Optionally set `"homepage": "https://<username>.github.io/<repo-name>"`
3. Build & publish: `npm run build && npm run deploy`
4. Enable Pages → Branch: `gh-pages` → / (root)

### 4. Cloudflare Pages
1. Push repo to GitHub
2. Cloudflare Dashboard → Pages → Create project → Connect Git
3. Build Command: `npm run build`
4. Build Output: `dist`
5. Save → Deploy

### 5. Static Hosting (Any VPS / S3 / Nginx)
1. `npm run build`
2. Upload contents of `dist/` to your server or bucket
3. Ensure all routes (if using client routing) fall back to `index.html`

## Environment Variables (Optional)
If later you add API keys create a `.env` file and prefix variables with `VITE_` (e.g. `VITE_API_URL=`) so Vite exposes them to the client.

## Cache Busting
Vite already hashes filenames (e.g. `assets/index.abcd1234.js`) so new deploys invalidate old browser caches automatically.

## Troubleshooting
| Issue | Fix |
|-------|-----|
| Old UI still appears | Hard refresh (Ctrl+F5) or incognito. Ensure hosting purged cache. |
| Blank page after deploy | Check build logs; confirm correct output directory `dist`. |
| 404 on refresh (client routing) | Add SPA fallback (Netlify redirect / Vercel `routes`). |

## Tech Stack
- React 19 + Vite 7
- Framer Motion animations
- Three.js helpers (@react-three/*) for interactive visuals (optional sections)
- Custom electric border + animated menu components

## License
Private / Personal portfolio. Reuse structure with attribution appreciated.

