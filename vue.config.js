module.exports = {
    css: {
        loaderOptions: {
            // 给 sass-loader 传递选项
            sass: {
                // @/ 是 src/ 的别名
                // 所以这里假设你有 `src/variables.sass` 这个文件
                data: `@import "./src/assets/style/main.scss";` //这就是全局设置引进公共样式文件的办法。
            }
        }
    },
    devServer: {
        proxy: {
            //如果跨域的话，那么就要进行网络代理，让网络请求的时候进行指向，并重指向相关的路径，如果有必要的话。
            "/api": {
                target: "http://localhost:8889",
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    "^/api": "/api"
                }
            },
            "/server": {
                target: "http://localhost:8889",
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    "^/server": "/server"
                }
            },
        }
    },
    configureWebpack: config => {
        //设置Vue的Webpack的相关配置。
        config.externals = { //这个操作是在打包的时候对这个些依赖进行cdn化处理，进而大量压缩代码
            vue: 'Vue',
            'vue-router': 'VueRouter',
            lodash: {
                commonjs: 'lodash',
                umd: 'lodash',
                root: '_'
            },
            echarts: 'echarts'
        }
    }
};