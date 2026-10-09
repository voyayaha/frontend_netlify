# Voyayaha stable frontend release

Baseline: previously working `voyayaha_frontend_social-top3-global-100km-v3_1`.

- Hidden Places remains the 3.1 global place-gated frontend.
- Travel Memory uses the same direct WordPress submission implementation that previously worked.
- WordPress plugin restored to the previously working CORS implementation.
- No Supabase changes.
- Use with backend `voyayaha_backend-stable-hidden-v3_1_2.zip`.

For local development, the frontend may run on `http://localhost:8080`; the bundled WordPress plugin permits localhost origins.


## Vercel migration
- Vercel/Nitro deployment is configured with `vercel.json`.
- TanStack Start `/api/*` server routes are used as Vercel Functions; no Cloudflare Worker proxy is required.
- Server-side backend URL: `TRAVEL_API_BASE_URL=https://voyayaha-backend-stable.onrender.com`.
- Cloudflare Wrangler deployment is not required for this package.
