import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Disable warnings about the explicit use of 'any'
      "@typescript-eslint/no-explicit-any": "off",
      // Disable warnings for unused variables
      "@typescript-eslint/no-unused-vars": "off",
      // Disable warnings regarding missing or complex dependencies in useEffect hooks
      "react-hooks/exhaustive-deps": "off",
      // Other previously disabled rules
      "react/no-unescaped-entities": "off",
      "react-hooks/rules-of-hooks": "off",
      "@next/next/no-html-link-for-pages": "off",
      "@next/next/no-img-element": "off",
      "@typescript-eslint/no-empty-object-type": "off",
    },
  },
];

export default eslintConfig;
