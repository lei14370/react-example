const webpack = require('webpack');
const baseConfig = require('./webpack.base.config');
const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCSSAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
var UglifyJsPlugin=require('uglifyjs-webpack-plugin');

// const BaiduTongjiPlugin = require('@zd/webpack-plugin/baidutongji');
// const SEOPlugin = require('@zd/webpack-plugin/seo');
// const TingYunPlugin = require('@zd/webpack-plugin/tingyun');

process.env.NODE_ENV = "production";

module.exports = merge(baseConfig, {
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
			},
      // "__CDN_URL__": `"${Constants.CDN_URL}"`
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
		// new SEOPlugin({
		// 	title: '页面加载中',
		// 	description: '',
		// 	keywords: ''
		// }),
		// new BaiduTongjiPlugin({
		// 	id: '79b69c6ef50016974011fa26d499993a'
		// }),
		// new TingYunPlugin({
		// 	cdn: `${Constants.CDN_URL}/tingyun`,
		// 	name: "test"
		// }),
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
            // chunks: [ueditor_all, ueditor_config]
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