const webpack = require("webpack");
const baseConfig = require("./webpack.base.config");
const path = require("path");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");


process.env.NODE_ENV = "production";

module.exports = merge(baseConfig, {
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: '"development"'
            }
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "src/index.html"),
            // cdn: `${Constants.CDN_URL}/lib`
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ],
    devtool: "source-map",
    devServer: {
        historyApiFallback: true,
        inline:true,//打包后加入一个websocket客户端
        hot:true,//热加载
        // contentBase: path.resolve(__dirname, 'dist'),//开发服务运行时的文件根目录
        host: '0.0.0.0',//主机地址
        port: 6565,//端口号
        // compress: true,//开发服务器是否启动gzip等压缩

        //https: true,
        // proxy: {
        //     "/": {
        //         target: "http://47.92.5.86:8081",
        //         secure: false
        //     }
        // }
    }
});
