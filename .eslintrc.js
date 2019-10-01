module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: ["plugin:vue/essential", "@vue/prettier"],
    rules: {
        "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
        "quotes": ["error", "single"],
        "prettier/prettier": ["error", { "singleQuote": true }] //设置解决双引号变成单引号以后的prettier的提示问题。
    },
    parserOptions: {
        parser: "babel-eslint"
    },
    overrides: [{
        files: ["**/__tests__/*.{j,t}s?(x)"],
        env: {
            mocha: true
        }
    }],
    globals: { //解决全局变量未定义bug问题
        qq: 'readOnly',
        console: 'readOnly'
    }
};