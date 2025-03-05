import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import tseslint from "@typescript-eslint/eslint-plugin";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node, // Ajoute les variables globales de Node.js
      },
    },
  },
  pluginJs.configs.recommended, // Recommandations de ESLint pour JS

  // Configuration des règles TypeScript
  {
    plugins: {
      "@typescript-eslint": tseslint,
    },
    rules: {
      "@typescript-eslint/explicit-module-boundary-types": "off", // Exemples de règles spécifiques pour TypeScript
    },
  },

  // Configuration des règles React
  {
    plugins: {
      react: pluginReact,
    },
    rules: {
      "react/jsx-uses-react": "off", // Exemple de règle personnalisée pour React
      "react/jsx-uses-vars": "off",
    },
  },

  // Définir des règles personnalisées
  {
    rules: {
      "constructor-super": "off", // Désactive la règle constructor-super
    },
  },
];
