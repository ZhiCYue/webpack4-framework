const path = require('path')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const util = require('./util.js')

module.exports = {
    output: {
        filename: 'js/[name].[hash:6].js',
        path: util.distResolve('static'),
        chunkFilename: 'js/[name].[hash:6].js'
    },
    module: {
        rules: [{
                test: /\.js$/,
                use: 'babel-loader',
                include: /src/,
                exclude: /node_modules/
            }, {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                }, 'css-loader', 'postcss-loader']

            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [{ loader: 'url-loader', options: { limit: 8192 } }]
            },
            {
                test: /\.html/,
                loader: 'html-loader'
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: "css/[name].[contenthash:6].css",
            chunkFilename: "css/[id].[contenthash:6].css"
        }),
        new CleanWebpackPlugin(
            [util.distResolve()], {
                root: util.rootResolve(),
                verbose: true,
                dry: false
            }
        ),
        new HtmlWebpackPlugin({
            filename: util.distResolve('index.html'),
            template: 'index.html',
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    resolve: {
        extensions: [' ', '.js', '.json', '.vue', '.scss', '.css'],
        alias: {
            '@': __dirname
        }
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: 'commons',
                    priority: 10,
                    chunks: 'initial'
                },
                styles: {
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'all',
                    minChunks: 2,
                    enforce: true
                }
            }
        }
    }
}