/**
 * Created by 詹 on 2017/8/9.
 */
const express = require('express');
const router = express.Router();
const customerInfoService = require('../service/CustomerInfoService');
const logger = require('../service/LogService').logger('viewCustomerInfoAction');

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
module.exports = router;