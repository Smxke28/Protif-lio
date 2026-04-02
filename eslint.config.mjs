import js from "@eslint/js";
import security from "eslint-plugin-security";
import react from "eslint-plugin-react";
import jsxA11y from "eslint-plugin-jsx-a11y";

export default [
  js.configs.recommended,

  {
    ignores: [".next/**", "node_modules/**", "public/**"]
  },

  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        // Browser
        window: "readonly",
        document: "readonly",
        navigator: "readonly",
        location: "readonly",
        fetch: "readonly",
        URL: "readonly",
        URLSearchParams: "readonly",
        Blob: "readonly",
        FileReader: "readonly",
        FormData: "readonly",
        console: "readonly",
        setTimeout: "readonly",
        setInterval: "readonly",

        // Node
        process: "readonly",
        module: "readonly",
        require: "readonly"
      }
    },
    plugins: {
      security,
      react,
      "jsx-a11y": jsxA11y
    },
    settings: {
      react: {
        version: "detect"
      }
    },
    rules: {
      // 🔐 Segurança (warnings, não bloqueia commit)
      "security/detect-object-injection": "warn",
      "security/detect-unsafe-regex": "warn",

      // ✅ Qualidade (não agressivo)
      "no-unused-vars": "warn",
      "no-empty": "warn",
      "no-cond-assign": "warn",

      // ⚛️ React / Next
      "react/react-in-jsx-scope": "off",

      // ✅ Permitir console (dev)
      "no-console": "off"
    }
  }
];