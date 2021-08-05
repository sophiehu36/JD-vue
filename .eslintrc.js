module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/vue3-essential", "@vue/standard"],
  parserOptions: {
    parser: "babel-eslint"
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    quotes: [0, "double"],
    semi: [1, "always"], //语句强制分号结尾
    "no-tabs": [1, { allowIndentationTabs: true }],
    "comma-dangle": [1, "only-multiline"],
    "space-before-function-paren": [1, "never"]
  }
};
