import { createFileRoute } from "@tanstack/react-router";

const RENDER_BACKEND = (
  process.env.TRAVEL_API_BASE_URL || import.meta.env.VITE_TRAVEL_API_BASE_URL ||
  "https://voyayaha-backend-stable.onrender.com"
).replace(/\/$/, "");

export const Route = createFileRoute("/api/travel-memory")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const contentType = request.headers.get("content-type") || "";
          const body = await request.arrayBuffer();

          const upstream = await fetch(`${RENDER_BACKEND}/travel-memory`, {
            method: "POST",
            body,
            headers: {
              Accept: "application/json",
              ...(contentType ? { "Content-Type": contentType } : {}),
            },
          });

          const responseBody = await upstream.text();
          return new Response(responseBody, {
            status: upstream.status,
            headers: {
              "content-type":
                upstream.headers.get("content-type") || "application/json",
              "cache-control": "no-store",
            },
          });
        } catch (error) {
          console.error("Travel Memory submission proxy error:", error);
          return Response.json(
            {
              error:
                "Could not reach the Voyayaha Travel Memory service. Please try again shortly.",
            },
            { status: 502 },
          );
        }
      },
    },
  },
});
