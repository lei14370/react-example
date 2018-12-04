const webpack=require('webpack');
const base=require('./webpack.config.base');
const webpackMerge=require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCSSAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
var UglifyJsPlugin=require('uglifyjs-webpack-plugin');

module.exports=webpackMerge(base,{
    mode:'production',
    output: {
        publicPath: "/back/"
    },
    //压缩js
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    compress: {
                        ie8: true, // React doesn't support IE8
                        warnings: false,
                        drop_debugger: true,
                        drop_console: true
                    },
                    mangle: {
                        ie8: true
                    },
                    output: {
                        comments: false,
                        ie8: true
                    }
                }
            })
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: '"production"'
            }
        }),
        new CleanWebpackPlugin(['build']),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new OptimizeCSSAssetsWebpackPlugin({
            cssProcessorOptions: {
                reduceIdents: {
                    keyframes: false
                }
            }
        }),
        new HtmlWebpackPlugin({
            inject: true,
            template: path.join(__dirname, 'src/index.html'),
            // cdn: `${Constants.CDN_URL}/lib`,
            favicon: path.join(__dirname, 'src/favicon.ico'),
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            },
            chunksSortMode: 'dependency',
        }),
        new CompressionWebpackPlugin({
            filename: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp(
                '\\.(js|css|html)$'
            ),
            threshold: 10240,
            minRatio: 0.8
        })
    ]
})