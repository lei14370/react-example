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
        host: '0.0.0.0',//主机地址
        port: 8989,//端口号
        proxy: {
            "/api": {
                target: "http://127.0.0.1:3000",
                secure: false
            }
        }
    }
});
