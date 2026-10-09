# Voyayaha frontend/backend integration

## Hidden Places and Travel Memories
The browser now calls the Render API directly for these routes to avoid Netlify
Edge Access intercepting same-origin `/api/*` requests:
- `GET /social-discovery`
- `GET /travel-memories?per_page=100`
- `POST /travel-memory` (multipart form data)

Set this Netlify environment variable, then trigger a fresh deploy:
`VITE_TRAVEL_API_BASE_URL=https://voyayaha-backend-stable.onrender.com`

The Render backend must allow the production frontend origins in `CORS_ORIGINS`:
`https://voyayaha.com,https://www.voyayaha.com`

## IMPORTANT: WordPress must have a separate reachable origin
The Render backend's `VOYAYAHA_WORDPRESS_URL` must point to the actual WordPress
installation that hosts the Voyayaha Travel Memories plugin. Do not set it to
`https://voyayaha.com` if that hostname now serves only the Netlify frontend;
otherwise WordPress requests will still be sent to Netlify and fail.

Install `wordpress/voyayaha-travel-memories-api.php` on that WordPress site and
set on Render:
`VOYAYAHA_WORDPRESS_URL=https://YOUR-WORDPRESS-HOST`

## Deploy
- Frontend build: `npm run build`
- Render backend start: `uvicorn main:app --host 0.0.0.0 --port $PORT`
- Ensure the Render deployment includes the updated `main.py` with the new
  `GET /travel-memories` proxy route.
