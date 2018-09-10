const path = require('path')
const webpack = require('webpack')

const VueLoaderPlugin = require('vue-loader/lib/plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

let webpackConfig = {
    output: {
        filename: '[name].[hash:6].js',
        path: path.resolve(__dirname, 'dist/static')
    },
    module: {
        rules: [{
                test: /\.js$/,
                use: 'babel-loader',
                include: /src/,
                exclude: /node_modules/
            }, {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        css: ExtractTextPlugin.extract('style-loader', 'css-loader', 'less-loader')
                    }
                },
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
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
        new ExtractTextPlugin('css/[name].[hash:6].css'),
        new CleanWebpackPlugin(
            ['dist/*'], 　 {
                root: __dirname,
                verbose: true,
                dry: false
            }
        ),
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, 'dist/index.html'),
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
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        open: true,
        inline: true,
        compress: true,
        host: '127.0.0.1',
        port: 8080,
        hot: true,
        historyApiFallback: true
    }
}

let argEnv = process.env.NODE_ENV
console.log("###################################################\n\n\n")
console.log(argEnv)
console.log("###################################################\n\n\n")

if (argEnv == 'local') {
    delete webpackConfig.output
}

module.exports = webpackConfig