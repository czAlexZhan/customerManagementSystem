/**
 * Created by 詹 on 2017/8/9.
 */
const express = require('express');
const router = express.Router();
const customerInfoService = require('../service/CustomerInfoService');
const logger = require('../service/LogService').logger('viewCustomerInfoAction');
const formidable = require('formidable');
var uuidV1 = require('uuid/v1');
const fs = require('fs');
var path = require('path');

router.get('/',function(req,res){
    logger.info("进入查看编辑用户 viewCustomerInfoAction");
    let id = req.query.id;
    customerInfoService.getCustomerInfoById(id,function (err, results) {
       if(err){
           logger.error("查询数据库error"+err);
       } else if(results.length > 0){
           logger.info("结束查看编辑用户 viewCustomerInfoAction");
           res.render('viewCustomerInfo',{data:results[0]});
       }
    });
});
router.post('/getPhotosAction',function(req,res){
    logger.info("进入获取记录图片 /viewCustomerInfoAction/getPhotosAction");
    let id = req.body.id;
    customerInfoService.getPhotosByCustomerId(id,function(err,results){
        if(err){
            logger.error("进入获取记录图片 查询数据库出错");
        }else{
            logger.info("结束获取记录图片 /viewCustomerInfoAction/getPhotosAction");

            res.render('photoList',{data:results});
        }
    });
});
router.post('/uploadCustomerInfoAction',function (req, res) {
    logger.info('进入编辑用户信息 /viewCustomerInfoAction/uploadCustomerInfoAction');
    const form = new formidable.IncomingForm();
    const allfiles = new Array();
    form.uploadDir = '../uploadFile/uploadImages';
    form.keepExtensions = true;
    form.maxFieldsSize = 10 * 1024 * 1024;
    form.on('file',function(filed,file){
        allfiles.push([filed,file]);
    });
    form.parse(req,(err,fields) => {
        if(err){
            logger.error("进入编辑用户信息formidable获取name错误"+err);
        }else{
            let userId = req.session.sys_user_id;
            let id = fields.id;
            let customer_account = fields.account;
            let target_name = fields.target_name;
            let deal_time = fields.deal_time;
            let connect_time = fields.connect_time;
            let product_name = fields.product_name;
            let product_price = fields.product_price;
            let isDeal = fields.isDeal;
            let deal_times = fields.deal_times;
            let isRepeat = fields.isRepeat;
            let repeat_name = fields.repeat_name;
            let store_name = fields.store_name;
            let searchMap = new Map();
            searchMap.set("id",id);
            searchMap.set("customer_account",customer_account);
            searchMap.set("target_name",target_name);
            searchMap.set("deal_time",deal_time);
            searchMap.set("connect_time",connect_time);
            searchMap.set("product_name",product_name);
            searchMap.set("product_price",product_price);
            searchMap.set("isDeal",isDeal);
            searchMap.set("deal_times",deal_times);
            searchMap.set("isRepeat",isRepeat);
            searchMap.set("repeat_name",repeat_name);
            searchMap.set("store_name",store_name);
            customerInfoService.updateCustomerInfo(searchMap,userId).then(function (results) {
                let insertNum = 0;
               if(results.affectedRows > 0){
                   let filesArr = new Array();
                   for(let file of allfiles){
                       let type = file[1].name.split('.');
                       let date = new Date();
                       let year = date.getFullYear();
                       let month = date.getMonth()+1;
                       let day = date.getDate();
                       let uuid = uuidV1();
                       let path = "/"+year+"-"+month+"-"+day+"-"+uuid+"."+String(type[type.length-1]);
                       let savePath = "/uploadImages"+path;
                       fs.renameSync(file[1].path,form.uploadDir+path);
                       let photoName = "与"+customer_account+"的聊天截图";
                       filesArr.push(new Array(id,'Certificate',photoName,savePath,userId,'now()','A'));
                   }
                  customerInfoService.savaPhotos(filesArr).then(function(results){
                     if(results.affectedRows > 0){
                        res.send(200,{flag:true,msg:"保存成功"});
                     }else{
                         res.send(200,{flag:false,msg:"保存图片失败"});
                     }
                  }).catch(function(err){
                      logger.error("进入编辑用户信息 保存用户图片出错"+err);
                  });
               } else{
                   res.send(200,{flag:false,msg:"保存失败"});
               }
            }).catch(function (err) {
                logger.error("进入编辑用户信息 保存用户信息出错"+err);
            });

        }
    });

});
module.exports = router;