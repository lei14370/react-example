const webpack=require('webpack');
const path=require('path');
const base=require('./webpack.config.base');
const webpackMerge=require('webpack-merge')
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports=webpackMerge(base,{
    mode:'development',
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: '"development"'
            },
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "src/index.html"),
        }),
    ],
    devtool: "source-map",
    devServer: {
        historyApiFallback: true,
        inline:true,//打包后加入一个websocket客户端
        hot:true,//热加载
        // contentBase: path.resolve(__dirname, 'dist'),//开发服务运行时的文件根目录
        host: '0.0.0.0',//主机地址
        port: 8080,//端口号
        // compress: true,//开发服务器是否启动gzip等压缩
        //https: true,
        proxy: {
            "/": {
                target: "http://47.92.5.86:8080",
                secure: false
            }
        }
    }
})