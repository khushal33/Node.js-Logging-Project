var Path = require("path");
var fs = require('fs');
var moment = require('moment');
var Config = require('./../config');


exports.logFiles =  function(_cb) {
	fs.readdir(Config.logsFolder, function(err, files){
	  	if(err){
	  		_cb(err,null);
	  	} else {
	  		_cb(null,files)
	  	}
	})
}
exports.logLists =  function(_files,_page,_cb) {
	var result ={
		page : _page,
        limit : 10,
        docs:[]
	}
	fs.readFile(Path.join(Config.logsFolder,_files), function(err, data) {
	  	if(err){
	  		_cb(err,null);
	  	} else {
	  		var tempData=data.toString().split('\n');
	  		result.docs = [];
	  		if(tempData.length>0){
	  			result.total = (tempData.length-1);
                var finish = ((result.page-1) * result.limit)+result.limit;
                var A=(result.page-1) * result.limit;
                tempData.sort(function(a,b){return moment(b.split('{{||}}')[0],"DD/MM/YYYY HH:mm:ss").format("x")-moment(a.split('{{||}}')[0],"DD/MM/YYYY HH:mm:ss").format("x");});
                do{
                    result.docs.push(tempData[A].split('{{||}}'));
                    A++;
                }while(A < finish && A < result.total);
            }
	  		_cb(null,result)
	  	}
	})
}
exports.logs =  function(_req,_by,_query,_msg,_ip,_cb) {
	var logContant = moment().format("DD/MM/YYYY HH:mm:ss");
		logContant += "{{||}}"+_by;
		logContant += "{{||}}"+JSON.stringify(_msg);
		logContant += "{{||}}"+_query;
		logContant += "{{||}}"+_req.headers["user-agent"];
		logContant += "{{||}}"+_ip;
		logContant += "\n";
    var writeLog = function(){
    	fs.exists(Path.join(Config.logsFolder,'logs.txt'), function(exists) {
    		if(exists){
    			countLine(Path.join(Config.logsFolder,'logs.txt'),function(err,data){
    				if(err){
    					_cb(err,null);
    				} else {
    					if(data){
    						fs.appendFile(Path.join(Config.logsFolder,'logs.txt'), logContant, function (err1) {
							  	if (err1){
							  		_cb(err1,null);
							  	} else {
							  		_cb(null,"dane");
							  	}
							});
    					} else {
    						writeLog();
    					}
    				}
    			})
    		} else {
    			createFile(Path.join(Config.logsFolder,'logs.txt'),function(err,data){
    				if(err){
    					_cb(err,null);
    				} else {
    					writeLog();
    				}
    			})
    		}
		});
    }
    writeLog();
}

var countLine = function(_path,_cb){
	fs.readFile(_path, function(err, data) {
	  	if(err){
	  		_cb(err,null);
	  	} else {
	  		console.log("count : ",data.toString().split('\n').length)
	  		if(data.toString().split('\n').length>1000){
	  			renameLogs(_path, function (err1,data) {
					console.log("hello",err1,data)
				  	if (err1){
				  		_cb(err1,null);
				  	} else {
				  		_cb(null,false);
				  	}
				});
	  		} else {
	  			_cb(null,true);
	  		}
	  	}
	})
}

var renameLogs = function(_path,_cb){
	fs.readdir(Config.logsFolder, function(err, files){
	  	if(err){
	  		_cb(err,null);
	  	} else {
	  		fs.rename(_path, Path.join(Config.logsFolder,('logs-'+files.length+'.txt')), function (err1) {
				if (err1){
					_cb(err1,null);
				} else {
					_cb(null,"done");
				}
			});
	  	}
	})
}

var createFile = function(_path,_cb){
	fs.writeFile(_path, '', function (err) {
		if (err){
		  	_cb(err,null);
		} else {
		  	_cb(null,"done")
		}
	});
}