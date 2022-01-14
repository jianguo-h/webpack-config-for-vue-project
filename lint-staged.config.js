module.exports = {
  './**/*.{vue,js?(x),ts?(x)}': [
    'prettier --ignore-path .eslintignore --write',
    'eslint --fix',
  ],
  'src/**/*.{css,less,scss,sass,vue}': ['prettier --write', 'stylelint --fix'],
};
