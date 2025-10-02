import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const repo = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";

export default defineConfig({
  plugins: [react()],
  base: "/homework-31_1-tests-for-TODO/",
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./tests/setup.js",
  },
});
