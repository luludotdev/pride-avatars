import { default as common } from "@luludev/configs/oxlint/common";
import { default as nextjs } from "@luludev/configs/oxlint/nextjs";
import { default as react } from "@luludev/configs/oxlint/react";
import { default as reactCompiler } from "@luludev/configs/oxlint/react-compiler";
import { defineConfig } from "oxlint";

export default defineConfig({
  extends: [common, react, reactCompiler, nextjs],
  settings: { react: { version: "19" } },
  ignorePatterns: ["**/dist/*"],
  globals: {
    es2024: "readonly",
    browser: "readonly",
  },
});
