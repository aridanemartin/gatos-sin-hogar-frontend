import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
	plugins: [react()],
	server: {
		fs: {
			allow: [
				// Allow your project path where garoe-ui is located
				"f:/workspace/garoe-ui",
				"f:/workspace/gatos-sin-hogar-frontend", // Optional: your app's path if not already allowed
			],
		},
	},
	resolve: {
		alias: [
			{
				find: "@sass",
				replacement: path.resolve(__dirname, "src/styles/sass"),
			},
			{
				find: "@components",
				replacement: path.resolve(__dirname, "src/components/"),
			},
			{
				find: "@helpers",
				replacement: path.resolve(__dirname, "src/helpers/"),
			},
			{
				find: "@hooks",
				replacement: path.resolve(__dirname, "src/hooks/"),
			},
			{
				find: "@interfaces",
				replacement: path.resolve(__dirname, "src/interfaces/"),
			},
			{
				find: "@contexts",
				replacement: path.resolve(__dirname, "src/contexts"),
			},
			{
				find: "@consts",
				replacement: path.resolve(__dirname, "src/consts"),
			},
			{
				find: "@assets",
				replacement: path.resolve(__dirname, "src/assets"),
			},
		],
	},
});
