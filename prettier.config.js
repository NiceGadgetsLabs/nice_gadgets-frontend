/** @type {import('prettier').Config} */
export default {
  singleQuote: true,
  printWidth: 100,
  overrides: [
    {
      files: ['*.css'],
      options: {
        singleQuote: false,
      },
    },
    {
      files: ['*.md'],
      options: {
        embeddedLanguageFormatting: 'off',
      },
    },
  ],
};
