// @ts-check

import common from "@luludev/eslint-config/common";
import browser from "@luludev/eslint-config/browser";
import node from "@luludev/eslint-config/node";
import typescript from "@luludev/eslint-config/typescript";
import react from "@luludev/eslint-config/react";
import jsxa11y from "@luludev/eslint-config/jsx-a11y";
import next from "@luludev/eslint-config/next";
import edge from "@luludev/eslint-config/edge";
import prettier from "@luludev/eslint-config/prettier";

/**
 * @type {import('@typescript-eslint/utils').TSESLint.FlatConfig.ConfigArray}
 */
const config = [
  {
    ignores: ["**/dist/*", "components/ui/**/*"],
  },
  ...common,
  ...browser,
  ...node,
  ...typescript,
  ...react,
  ...jsxa11y,
  ...next,
  ...edge,
  ...prettier,
  {
    settings: {
      react: {
        version: "detect",
      },
    },
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
  },
];

export default config;
