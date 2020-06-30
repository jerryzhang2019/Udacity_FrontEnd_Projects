const path = require('path');

module.exports={
    entry:'./src/client/index.js',
    devtool:'source-map',
    module:{
        rules:[
            {
                test: /\.html$/i,
                use:['html-loader']
            },
            {
                test:'/\.js$/',
                exclude:/node_modules/,
                loader:"babel-loader"
            },
            {
                test:/\.(jpg|gif)$/,
                use:{
                    loader:"file-loader",
                    options:{
                        name:'[name].[hash].[ext]',
                        outputPath:'imgs'
                    }
                }
            }
        ]
    }
}