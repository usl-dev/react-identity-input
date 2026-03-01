/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { visualizer } from "rollup-plugin-visualizer";
import path from "path";
import fs from "fs";

/** Copy flag SVGs to dist so getFlag() URLs resolve when the package is consumed */
function copyFlagsPlugin() {
  return {
    name: "copy-flags",
    writeBundle(
      options: { dir?: string },
      _bundle: Record<string, { fileName?: string }>
    ) {
      const outDir = options.dir
        ? path.resolve(process.cwd(), options.dir)
        : path.resolve(__dirname, "dist");
      const flagsDest = path.join(outDir, "assets", "flags");
      const flagsSrc = path.resolve(__dirname, "src", "assets", "flags");
      if (!fs.existsSync(flagsSrc)) return;
      fs.mkdirSync(flagsDest, { recursive: true });
      const files = fs.readdirSync(flagsSrc);
      for (const f of files) {
        if (f.endsWith(".svg")) {
          fs.copyFileSync(path.join(flagsSrc, f), path.join(flagsDest, f));
        }
      }
    },
  };
}

export default defineConfig({
  plugins: [
    react(),
    dts({ insertTypesEntry: true }),
    copyFlagsPlugin(),
    visualizer({
      filename: "dist/stats.html",
      gzipSize: true,
      brotliSize: true,
      open: false,
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "react-intl-phone-username-input",
      fileName: (format) =>
        format === "es" ? "index.esm.js" : "index.cjs.js",
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: (id) => {
        if (id === "react" || id === "react-dom" || id === "react/jsx-runtime")
          return true;
        if (id === "libphonenumber-js" || id.startsWith("libphonenumber-js/"))
          return true;
        return false;
      },
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "jsxRuntime",
          "libphonenumber-js": "libphonenumberJs",
          "libphonenumber-js/mobile/examples": "libphonenumberJsExamples",
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./vitest.setup.ts",
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
  },
});
