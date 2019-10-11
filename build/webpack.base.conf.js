var path = require('path');
var utils = require('./utils');
var config = require('../config');
var vueLoaderConfig = require('./vue-loader.conf');
var webpack = require('webpack');

function resolve (dir) {
    return path.join(__dirname, '..', dir);
}
const vuxLoader = require('vux-loader');

const webpackConfig = {
    entry: {
        appMain: './src/main.js'
    },
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production'
            ? config.build.assetsPublicPath
            : config.dev.assetsPublicPath
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src')
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|vue)$/,
                loader: 'eslint-loader',
                enforce: 'pre',
                include: [resolve('src'), resolve('test')],
                options: {
                    formatter: require('eslint-friendly-formatter'),
                    // 不符合Eslint规则时只警告(默认运行出错)
                    // emitWarning: !config.dev.showEslintErrorsInOverlay
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src'), resolve('test')]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            vue: {
                // use custom postcss plugins
                postcss: [require('postcss-px2rem')({
                    baseDpr: 2, // base device pixel ratio (default: 2)
                    threeVersion: false, // whether to generate @1x, @2x and @3x version (default: false)
                    remVersion: true, // whether to generate rem version (default: true)
                    remUnit: 75, // rem unit value (default: 75)
                    remPrecision: 6 // rem precision (default: 6)
                })]
            }
        })
    ]
};

module.exports = vuxLoader.merge(webpackConfig, {
    plugins: [
        'vux-ui',
        {
            name: 'less-theme',
            path: 'src/static/theme.less'
        },
        {
            name: 'after-less-parser',
            fn: function (source) {
                if (this.resourcePath.replace(/\\/g, '/').indexOf('vux/src/components') > -1) {
                    source = source.replace(/px/g, 'PX');
                }
                // 自定义的全局样式大部分不需要转换
                if (this.resourcePath.replace(/\\/g, '/').indexOf('App.vue') > -1) {
                    source = source.replace(/px/g, 'PX').replace(/-1PX/g, '-1px');
                }
                return source;
            }
        },
        {
            name: 'style-parser',
            fn: function (source) {
                if (this.resourcePath.replace(/\\/g, '/').indexOf('vux/src/components') > -1) {
                    source = source.replace(/px/g, 'PX');
                }
                // 避免转换1PX.less文件路径
                if (source.indexOf('1PX.less') > -1) {
                    source = source.replace(/1PX.less/g, '1px.less');
                }
                return source;
            }
        }
    ]
});
