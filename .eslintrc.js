module.exports = {
  parser: "babel-eslint",
  extends: ["airbnb", "prettier"],
  plugins: ["prettier"],
  rules: {
    strict: 0,
    "prettier/prettier": "error",
    "react/prefer-stateless-function": [0, { ignorePureComponents: false }],
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
    "react/sort-comp": [0],
    "react/prop-types": 0,
    "no-underscore-dangle": [0]
  }
};
