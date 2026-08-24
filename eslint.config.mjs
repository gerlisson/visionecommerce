import { defineConfig, globalIgnores } from "eslint/config";
import nextPlugin from "@next/eslint-plugin-next";
import typescriptEslint from "typescript-eslint";

export default defineConfig([
  ...typescriptEslint.configs.recommended,
  nextPlugin.configs["core-web-vitals"],
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);
