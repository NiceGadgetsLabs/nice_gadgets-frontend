/** @type {import('lint-staged').Configuration} */
export default {
  '*.{js,ts,tsx}': ['eslint --fix', 'prettier --write'],
  '*.scss': ['stylelint --fix', 'prettier --write'],
  '*.{json,md}': ['prettier --write'],
};
