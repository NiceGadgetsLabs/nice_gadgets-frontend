import { propertyGroups } from 'stylelint-config-clean-order';

/** @type {import('stylelint').Config} */
export default {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-prettier/recommended',
    'stylelint-config-clean-order',
  ],
  plugins: ['stylelint-prettier', 'stylelint-scss'],
  overrides: [
    {
      extends: ['stylelint-config-html'],
      files: ['*.html'],
    },
  ],
  rules: {
    'selector-class-pattern': [
      '^[a-z]([-]?[a-z0-9]+)*(__[a-z0-9]([-]?[a-z0-9]+)*)?(--[a-z0-9]([-]?[a-z0-9]+)*)?$',
      {
        message: function expected(selectorValue) {
          return `Expected class selector "${selectorValue}" to match BEM CSS pattern https://en.bem.info/methodology/css.`;
        },
        resolveNestedSelectors: true,
      },
    ],
    'custom-property-pattern': [
      '^([a-z]+(-[a-z]+)*|[a-z]+([A-Z][a-z]*)*)$',
      {
        message: function expected(customProperty) {
          return `Expected custom property "${customProperty}" to be written in kebab-case or camelCase.`;
        },
        resolveNestedSelectors: true,
      },
    ],
    'no-empty-source': null,
    'order/properties-order': [
      propertyGroups.map((properties) => ({
        emptyLineBefore: 'never',
        noEmptyLineBetween: true,
        properties,
      })),
      {
        severity: 'warning',
        unspecified: 'bottomAlphabetical',
      },
    ],
  },
  ignoreFiles: ['node_modules/**', 'dist/**'],
};
