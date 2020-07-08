const common = require('./webpack.common')
const merge = require('webpack-merge')
const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsplugin = require('optimize-css-assets-webpack-plugin')
const terserPlugin = require('terser-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin')

module.exports = merge(common, {
    mode: 'production',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'production'),
    },
    optimization: {
        minimizer: [new OptimizeCssAssetsPlugin(), new terserPlugin()]
    },
    plugins: [
        new MiniCssExtractPlugin({filename: '[name].css'}),
        new WorkboxPlugin.GenerateSW(),
        new CleanWebpackPlugin({
            // Simulate the removal of files
            dry: true,
            // Write Logs to Console
            verbose: true,
            // Automatically remove all unused webpack assets on rebuild
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false
          }),
        new HtmlWebpackPlugin({
            template: './src/client/views/index.html',
            filename: "./index.html",
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true,
                removeComments: true
            }
        })
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader,   // 3. extract css into files
                    'css-loader',                    // 2. turns css into commonjs
                    'sass-loader']                   // 1. turns sass to css
            }
        ]
    }
});