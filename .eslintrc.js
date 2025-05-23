module.exports = {
  env: {
    es2021: true,
    node: true,
    es6: true,
  },
  extends: ["eslint:recommended", "airbnb-base", "prettier"],
  overrides: [
    {
      env: {
        node: true,
        es6: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "no-underscore-dangle": ["error", { allow: ["_id"] }],
    "no-unused-vars": ["error", { argsIgnorePattern: "next" }],
    "consistent-return": "off",
    "no-console": ["error", { allow: ["error"] }],
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
    "max-classes-per-file": ["error", 5],
  },
};
