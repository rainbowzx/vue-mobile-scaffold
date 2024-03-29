// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path');
var verV = require('../package.json');
module.exports = {
    build: {
        prodEnv: require('./prod.env'),
        qaEnv: require('./qa.env'),
        qbEnv: require('./qb.env'),
        devEnv: require('./dev.env'),
        index: path.resolve(__dirname, '../dist/index.html'),
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: verV.version,
        assetsPublicPath: `https://yh-static.yingyinglicai.com/${verV.name}/${process.env.env_config}/`,
        useEslint: true,
        // assetsPublicPath: './',
        productionSourceMap: true,
        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: true,
        productionGzipExtensions: ['js', 'css'],
        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        bundleAnalyzerReport: process.env.npm_config_report
    },
    dev: {
        env: require('./development.env'),
        port: 8086,
        autoOpenBrowser: true,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {
            '/app/**': {
                target: 'http://****.****.org',
                changeOrigin: true,
                cookieDomainRewrite: { 
                },
                // secure: false,
                logLevel: 'debug',
                withCredentials: true,
                onProxyReq: function (proxyReq, req, res) {
                },
                onProxyRes: function (proxyRes, req, res) {
                }
            }
        },
        // CSS Sourcemaps off by default because relative paths are "buggy"
        // with this option, according to the CSS-Loader README
        // (https://github.com/webpack/css-loader#sourcemaps)
        // In our experience, they generally work as expected,
        // just be aware of this issue when enabling this option.
        cssSourceMap: false
    }
};
