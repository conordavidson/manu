import nextTs from "eslint-config-next/typescript";
import nextVitals from "eslint-config-next/core-web-vitals";
import perfectionist from 'eslint-plugin-perfectionist';

import { defineConfig, globalIgnores } from "eslint/config";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    plugins: {
      perfectionist
    },
    rules: {
      "jsx-a11y/alt-text": "off",
      'perfectionist/sort-array-includes': 'error',
      'perfectionist/sort-enums': 'error',
      'perfectionist/sort-exports': 'error',
      'perfectionist/sort-imports': [
        'error',
        {
          groups: ['side-effect', 'default-import', 'wildcard-import', 'named-import'],
          newlinesBetween: 1,
          sortBy: 'specifier',
        },
      ],
      'perfectionist/sort-interfaces': 'error',
      'perfectionist/sort-intersection-types': 'error',
      'perfectionist/sort-jsx-props': 'error',
      'perfectionist/sort-named-exports': 'error',
      'perfectionist/sort-named-imports': 'error',
      'perfectionist/sort-object-types': 'error',
      'perfectionist/sort-union-types': 'error',
    },
  },
]);

export default eslintConfig;
