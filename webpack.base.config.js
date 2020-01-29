const  path=require('path');
const  webpack=require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");//该插件的主要是为了抽离css样式,防止将样式打包在js中引起页面样式加载错乱的现象;
function resolve(dir) {
    return path.join(process.cwd(),dir);
}
const src=resolve('src');//主文件目录
const node_modules=resolve('node_modules');//node文件目录
const HappyPack=require('happypack');//同一时间处理多个任务，发挥多核 CPU 电脑的威力
const HappyThreadPool = HappyPack.ThreadPool({
    size: require('os').cpus().length//剩余cup
});

module.exports = {
    entry: {
        main: resolve('src/main.js'),
    },
    output: {
        filename: '[name].[hash:6].js',
        path: path.join(__dirname, 'build'),
        chunkFilename: "chunk/[chunkhash:6].js",
        publicPath: "/"
    },
    resolve: {
        modules: ['node_modules', src],
        extensions: ['.js', '.jsx', '.scss', '.css'],
        alias: {
            '@': src,
            '~':node_modules
        }
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].[chunkhash:8].css",
            chunkFilename: "css/[name].[chunkhash:8].css"
        }),
        new HappyPack({
            id: 'js',
            threadPool: HappyThreadPool,
            loaders: ['babel-loader']
        }),
    ],
    optimization: {
        splitChunks: {
            chunks: 'initial',
            cacheGroups: {
                modules: {
                    test: /node_modules/, // 指定是node_modules下的第三方包
                    name: "common/modules", // 打包后的文件名，任意命名
                    minChunks: 2,//最小引用2次
                    minSize: 0 // 只要超出0字节就生成一个新包
                },
                pulic: {    // 抽离自己写的公共代码
                    name: 'common/pulic',  // 打包后的文件名，任意命名
                    // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
                    test: /src\/components|src\/lib/,
                    priority: 10,
                    minChunks: 2,//最小引用2次
                    minSize: 0
                }
            }
        },
        runtimeChunk: {
            name: 'common/manifest'
        }
    },
    module: {
        rules: [{
            test: /\?bundle\.js[x]?$/,
            exclude: [/node_modules/],
            use: [{
                loader: 'bundle-loader',
                options: {
                    lazy: true,
                    name: '[name]'
                }
            }]
        }, {
            test: /\.js[x]?$/,
            exclude: [/node_modules/],
            use: [{
                loader: 'happypack/loader?id=js'
            }]
        },  {
            test: /\.s[c|a]ss$/,
            use:[
                MiniCssExtractPlugin.loader,
                {
                loader: 'css-loader'
                }, {
                    loader: 'postcss-loader',
                }, {
                    loader: 'sass-loader'
                }]
        },{
            test: /\.less$/,
            use:[
                MiniCssExtractPlugin.loader,
                {  
                    loader: 'css-loader'
                }, {
                    loader: 'postcss-loader',
                }, {
                    loader: 'less-loader'
                }]
        }, {
            test: /\.css$/,
            use:[
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader'
                }, {
                    loader: 'postcss-loader',
                }]
        }, {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url-loader',
            query: {
                limit: 1024,
                name: path.posix.join('static', 'images/[hash:6].[ext]')
            }
        }, {
            test: /\.(woff2?|eot|ttf|otf|TTF)(\?.*)?$/,
            loader: 'url-loader',
            query: {
                limit: 1024,
                name: path.posix.join('static', 'fonts/[hash:6].[ext]')
            }
        }]
    }
}