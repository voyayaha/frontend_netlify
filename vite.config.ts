import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import netlify from "@netlify/vite-plugin-tanstack-start";

// Netlify owns the server/SSR deployment for this build.
// The Lovable wrapper's built-in Nitro target is disabled so it does not
// select its default Cloudflare target during the Netlify build.
export default defineConfig({
  nitro: false,
  tanstackStart: {
    server: { entry: "server" },
  },
  vite: {
    plugins: [netlify()],
  },
});
