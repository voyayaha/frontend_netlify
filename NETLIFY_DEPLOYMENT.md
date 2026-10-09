# Voyayaha Netlify deployment

## Netlify build settings
- Build command: `npm install && npm run build`
- Publish directory: `dist/client`
- Node version: `22`

The build script runs Vite and then `scripts/ensure-netlify-publish-dir.mjs`.
That helper preserves the normal `dist/client` output when present. If the build
emits `index.html` directly into `dist/`, it copies those browser files into
`dist/client/` so Netlify's configured publish directory exists. It fails with
an explanatory message instead of publishing an empty folder if neither output
layout is present.

## Environment variable
Set in Netlify:

`VITE_TRAVEL_API_BASE_URL=https://voyayaha-backend-stable.onrender.com`

The TanStack Start `/api/*` server routes are deployed through the Netlify
TanStack Start Vite plugin. The frontend's Hidden Places and Travel Memory
requests also call the Render API directly to avoid same-origin Edge Access
redirects.
