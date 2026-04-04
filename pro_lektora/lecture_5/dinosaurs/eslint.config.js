import js from "@eslint/js";
import globals from "globals";
import json from "@eslint/json";
import { defineConfig } from "eslint/config";

export default defineConfig([
	{
		files: ["**/*.{js,mjs,cjs}"],
		plugins: { js },
		extends: ["js/recommended"],
		languageOptions: { globals: globals.node, ecmaVersion: 2025 },
		rules: {
			indent: ["error", "tab"],
			"linebreak-style": ["error", "unix"],
			quotes: ["error", "double"],
			semi: ["error", "always"],
		},
	},
	{ files: ["**/*.json"], plugins: { json }, language: "json/json", extends: ["json/recommended"] },
]);
