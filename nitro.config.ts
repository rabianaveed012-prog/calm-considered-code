import { defineConfig } from "nitro/config";

export default defineConfig({
  routeRules: {
    "/**": { headers: { "X-Content-Type-Options": "nosniff" } },
  },
});
