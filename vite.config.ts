import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: "@sass",
        replacement: path.resolve(__dirname, "src/styles/sass"),
      },
    ],
  },
});
