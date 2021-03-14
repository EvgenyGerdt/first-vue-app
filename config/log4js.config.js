const log4js = require('log4js')

log4js.configure({
    disableClustering: true,

    appenders: {
        console: {
            type: 'console',
        },
    },

    categories: {
        default: {
            appenders: ['console'],
            level: 'debug'
        }
    }
})

const log = log4js.getLogger()

module.exports = log
