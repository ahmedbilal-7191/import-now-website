# ImportNow — concept site

Static site (no build step). Uses the two supplied three.js scenes:

- `assets/globe/`  — hero globe with animated China → India trade routes
- `assets/port/`   — scroll-driven port scene (Shanghai → Chennai), 600vh pinned section

## Run locally
Browsers block modules/textures on file:// pages, so use a local server:

    python -m http.server 5500      # then open http://localhost:5500
    # or: npx serve .

Needs internet on first load (three.js via jsDelivr, Google Fonts).

## Deploy
Drag the folder to Vercel / Netlify, or push to GitHub Pages. No config needed.

## Things to edit
- Instagram follower count: `data-count="83"` in index.html (hero stats)
- Shipping routes and map locations: `routes` in main.js
- Mobile navigation and WhatsApp shortcut: index.html and main.js
- Guides: the four tiles link to `blog.html`, which isn't included
- Port-scene length: `.port-story { height: 600vh }` in styles.css
