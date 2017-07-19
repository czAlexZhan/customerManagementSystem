module.exports = {
	{  
    "appenders":  
        [  
            {  
                "type":"console",  
                "category":"console"  
            },  
            {  
                "category":"log_file",  
                "type": "file",  
                "filename": "./Log4js/log_file/file.log",  
                "maxLogSize": 104800,  
                "backups": 100  
            },  
            {  
                "category":"log_date",  
                "type": "dateFile",  
                "filename": "./Log4js/log_date/date",  
                "alwaysIncludePattern": true,  
                "pattern": "-yyyy-MM-dd-hh.log"  
            }  
        ],  
        "replaceConsole": true,  
	    "levels":  
	    {  
	        "log_file":"ALL",  
	        "console":"ALL",  
	        "log_date":"ALL"  
	    }  
	}  
};