import { createFileRoute } from "@tanstack/react-router";

const RENDER_BACKEND = (
  process.env.TRAVEL_API_BASE_URL || import.meta.env.VITE_TRAVEL_API_BASE_URL ||
  "https://voyayaha-backend-stable.onrender.com"
).replace(/\/$/, "");

export const Route = createFileRoute("/api/travel-memories")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        try {
          const incoming = new URL(request.url);
          const perPage = incoming.searchParams.get("per_page") || "100";
          const upstream = await fetch(
            `${RENDER_BACKEND}/travel-memories?per_page=${encodeURIComponent(perPage)}`,
            {
              headers: { Accept: "application/json" },
              cache: "no-store",
            },
          );

          const body = await upstream.text();
          return new Response(body, {
            status: upstream.status,
            headers: {
              "content-type":
                upstream.headers.get("content-type") || "application/json",
              "cache-control": "no-store",
            },
          });
        } catch (error) {
          console.error("Travel Memories proxy error:", error);
          return Response.json(
            { error: "Travel Memories service is temporarily unavailable." },
            { status: 502 },
          );
        }
      },
    },
  },
});
