/**
 * Created by 詹 on 2017/8/7.
 */
const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const logger = require('../service/LogService').logger('importCustomerInfoAction');
const excelService = require('../service/excelService');
var uuidV1 = require('uuid/v1');
var fs = require('fs');
var node_xlsx = require('node-xlsx');


router.get('/',function (req, res) {
    logger.info("进入加载导入用户记录页面 importCustomerInfoAction");
    res.render('importCustomer');
    logger.info("结束加载导入用户记录页面 importCustomerInfoAction");
});
router.post('/importAction',function(req,res){
    logger.info("进入上传excel文件 importCustomerInfoAction/importAction");
    let form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.uploadDir = '../uploadFile/excelFile';
    form.keepExtensions = true;
    form.maxFieldsSize = 10 * 1024 * 1024;
    form.parse(req,function(err,fields,files){
        if(err){
            logger.info("进入上传excel文件 文件上传错误"+err);
            return;
        }
        let type = files.file.name.split('.');
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth()+1;
        let day = date.getDate();
        let uuid = uuidV1();
        let path = "/"+year+"-"+month+"-"+day+"-"+uuid+"."+String(type[type.length-1]);
        fs.renameSync(files.file.path,form.uploadDir+path);
        //验证excel
        let excel = node_xlsx.parse(form.uploadDir+path);
        let result = excelService.checkCustomerInfoExcelData(excel);

    });
});
module.exports = router;