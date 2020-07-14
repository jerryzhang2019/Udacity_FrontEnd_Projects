const path=require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const common = require('./webpack.common')
const {merge} = require('webpack-merge')

module.exports = merge(common,{
    mode:'development',
    devServer:{
        port:8000,
    },
    watch:true,
    plugins:[
        new HtmlWebpackPlugin({
            template:'./src/client/views/index.html'
        })
    ],
    module:{
        rules:[
            {
                test:/\.scss$/,
                use:['style-loader',
                    'css-loader',
                    'sass-loader']
            }
        ]
    }
});