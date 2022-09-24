/* eslint-env node */
// require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
    root: true,
    extends: [
        "eslint:recommended",
    ],
    rules: {
        "strict": 0,
        "semi": ["error", "always"],
        "quotes": ["error", "double", {"allowTemplateLiterals": true}],
        "object-curly-spacing": ["warn", "always"],
        "keyword-spacing": "warn"
    }
};
