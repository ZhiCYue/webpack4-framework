const path = require('path')

const webpack = require('webpack')
const merge = require('webpack-merge')

var configBase = require('./env.base')

var config = merge(configBase, {
    devServer: {
        contentBase: path.resolve(__dirname, '../dist'),
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:8090',
                changeOrigin: true
            }
        },
        open: true,
        inline: true,
        hot: true,
        compress: true,
        host: '127.0.0.1',
        port: 8080,
        historyApiFallback: true,
    },
})

config.output ? delete config.output : ''

module.exports = config