const path = require('path')

module.exports = {

    rootResolve(dir = '') {
        return path.resolve(__dirname, '..', dir);
    },

    distResolve(dir = '') {
        return path.resolve(__dirname, '../dist', dir)
    }

}