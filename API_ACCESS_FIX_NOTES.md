# API access fix notes

- Hidden Places social discovery calls the Render backend directly instead of
  same-origin `/api/social-discovery`.
- Travel Memory submissions call the Render backend directly instead of
  same-origin `/api/travel-memory`.
- Published Travel Memories are loaded through a new Render
  `GET /travel-memories` proxy route.
- Existing same-origin API route files are retained to avoid removing other
  deployment compatibility.

This bypasses Netlify Edge Access redirects for these browser API calls.
Travel Memory still requires `VOYAYAHA_WORDPRESS_URL` on Render to point to the
real WordPress host, separate from the Netlify frontend domain, and requires
the updated backend to be deployed.
