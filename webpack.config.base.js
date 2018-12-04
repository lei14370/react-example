const path=require('path');
const os=require('os');
const happyPack=require('happypack');
const miniCssExtractPlugin=require('mini-css-extract-plugin');
const autoPreFixer=require('autoprefixer')({
    browsers:[
        '>1%',
        'last 4 versions',
        'Firefox ESR',
        'not ie < 9', // React doesn't support IE8 anyway
    ]
});

const happyPackPool=happyPack.ThreadPool({
    size:os.cpus().length
});


function resolve(dir) {
    return path.join(process.cwd(),dir)
}
const src=resolve('src');
module.exports={
    entry:{
        main:resolve('src/main.js')
    },
    output:{
        filename: '[name].[hash:6].js',
        path: path.join(__dirname, 'build'),
        chunkFilename: "chunk/[chunkhash:6].js",
        publicPath:'/'
    },
    resolve:{
      modules:['node_modules',src],
      extensions:['js','jsx','css','scss'],
      alias:{
          "@":src
      }
    },
    plugins:[
        new happyPack({
            id:'js',
            threadPool:happyPackPool,
            loaders:['babel-loader']
        }),
        new miniCssExtractPlugin({
            fileName:'[name].[hash:6].css',
            chunkFilename: "chunkCss/[name].[chunkhash:6].css"
        })
    ],
    optimization:{
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
    module:{
        rules:[
            {
                test: /\?bundle\.js[x]?$/,
                exclude: [/node_modules/,resolve('src/ueditor')],
                use: [{
                    loader: 'bundle-loader',
                    options: {
                        lazy: true,
                        name: '[name]'
                    }
                }]
            }, {
                test: /\.js[x]?$/,
                exclude: [/node_modules/,resolve('src/ueditor')],
                use: [{
                    loader: 'happypack/loader?id=js'
                }]
            },{
                test: /\.s[c|a]ss$/,
                use:[
                    miniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader'
                    }, {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [autoPreFixer]
                    }
                }, {
                    loader: 'sass-loader'
                }]
            },{
                test: /\.less$/,
                use:[
                    miniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader'
                    }, {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [autoPreFixer]
                    }
            }, {
                loader: 'less-loader'
            }]
            }, {
                test: /\.css$/,
                    use:[
                        miniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader'
                    }, {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [autoPreFixer]
                    }
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
            }
        ]
    }
}