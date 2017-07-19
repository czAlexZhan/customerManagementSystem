var log4js = require('log4js');
var option = require('./conf/log4Conf');

log4js.configure(option);

module.exports.logger = function(name){
	var logger = log4js.getLogger(name);
	logger.setLevel("INFO");
	return logger;
}