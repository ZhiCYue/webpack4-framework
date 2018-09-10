const webpack = require('webpack')

const WebpackDevServer = require('webpack-dev-server')
const childProcess = require('child_process')

const argEnv = process.env.NODE_ENV = process.argv[2]

let webpackConfig = argEnv == 'local' ? require(`./env.local.js`) : require(`./env.base.js`)
webpackConfig.mode = argEnv == 'local' ? 'development' : 'production'

let compiler = webpack(webpackConfig, (err, stats) => {
    if (err) throw err
    webpackConfig.devServer && startServer(webpackConfig.devServer)
})

// 启动服务器
function startServer(devServerConfig) {
    let server = new WebpackDevServer(compiler, devServerConfig)
    server.listen(devServerConfig.port, devServerConfig.host, (err, stats) => {
        var cmd = process.platform == 'darwin' ? 'open' : 'start'
        childProcess.exec(`${cmd} http://${devServerConfig.host}:${devServerConfig.port}`)
    })
}