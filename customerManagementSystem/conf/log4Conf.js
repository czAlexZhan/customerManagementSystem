var option = {
    appenders: { cheese: { type: 'file', filename: 'logs/.log' } },
    categories: { default: { appenders: ['cheese'], level: 'error' } }
};
module.exports = option;