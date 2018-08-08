const path=require('path');
function resolve(dir) {
    return path.join(process.cwd(),dir)
}
module.exports={
    entry:{
        main:resolve('src/main')
    },
    output:{
        filename: '[name].[hash:6].js',
        path: path.join(__dirname, 'build'),
        chunkFilename: "chunk/[chunkhash:6].js",
        publicPath: "/"
    }
}