const express = require('express')
const router = express.Router()
var commonFun = require('../core/commonFun');
var logfile = require('../core/log-file-system');


router.get('/log-files',function(req,res,next){
		console.log("entered in log api")
		logfile.logFiles(function(err,data){
			if(err){
				res.status(400).send(err);
			} else {
				res.status(200).send({status:true,message:"successfully display",data: data});
			}
		})
	})
router.get('/logs',function(req,res,next){
		var file = (commonFun.isset(req.query.file))?req.query.file:'logs.txt';
		var page = parseInt(commonFun.isset(req.query.page)?req.query.page:1);
		logfile.logLists(file,page,function(err,data){
			if(err){
				res.status(400).send(err);
			} else {
				res.status(200).send({status:true,message:"successfully display",data: data});
			}
		})
	})

module.exports = router