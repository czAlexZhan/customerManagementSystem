var option = {
    appenders: {
        cheeseLogs: { type: 'file', filename: '../Log/cheese.log' },
        console: { type: 'console' }
    },
    categories: {
        cheese: { appenders: ['cheeseLogs'], level: 'error' },
        another: { appenders: ['console'], level: 'all' },
        default: { appenders: ['console', 'cheeseLogs'], level: 'all' }
    }
};
module.exports = option;