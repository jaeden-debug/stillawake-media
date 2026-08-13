import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

/**
 * Vitest ran without a config until tests needed to import through the "@/"
 * alias that the rest of the app uses. Mirrors the `paths` entry in
 * tsconfig.json — if that moves, this has to move with it.
 */
export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
