const express = require('express');
const router = express.Router();
const customerInfoService = require('../service/CustomerInfoService');
const logger = require('../service/LogService').logger('customerAction');

/* GET users listing. */
router.get('/',function(req,res){
    if(req.session.sys_user_id){
        res.render('home',{title:"用户记录"});
    }else {
        res.redirect('/login');
    }
});

router.post('/addCustomerInfoAction',function (req, res) {
    logger.info('进入添加用户信息方法 addCustomerInfoAction');
    let customerInfoList = req.body.customerInfoList;
    if(customerInfoList != undefined){
        let length = customerInfoList.length;
        customerInfoService.insertCustomerInfo(customerInfoList,function(err,results){
            let insertLength = results.affectedRows;
            if(err){
                logger.error('数据库查询错误->'+err)
            }
            if(insertLength != undefined && insertLength>0){
                let failedNum = length - insertLength;
                let resultsMsg = "更新成功 "+insertLength+" 行，失败 "+failedNum+" 行";
                res.send(200,{"msg":resultsMsg});
            }else{
                res.send(200,{"msg":"更新失败"});
            }
        });
    }
    logger.info('退出添加用户信息方法 addCustomerInfoAction');
});
router.post('/findCustomerInfoAction',function (req, res) {
    logger.info('进入查询用户记录方法 findCustomerInfoAction');
    let customer_account = req.body.customer_account;
    let target_name = req.body.target_name;
    let product_name = req.body.product_name;
    let isDeal = req.body.isDeal;
    let connectTimeStart = req.body.connectTimeStart;
    let connectTimeEnd = req.body.connectTimeEnd;
    let dealTimeStart = req.body.dealTimeStart;
    let dealTimeEnd = req.body.dealTimeEnd;
    let currentPage = req.body.currentPage;
    let pageSize = req.body.pageSize;

    let searchMap = new Map();
    searchMap.set('customer_account',customer_account);
    searchMap.set('target_name',target_name);
    searchMap.set('product_name',product_name);
    searchMap.set('isDeal',isDeal);
    searchMap.set('connectTimeStart',connectTimeStart);
    searchMap.set('connectTimeEnd',connectTimeEnd);
    searchMap.set('dealTimeStart',dealTimeStart);
    searchMap.set('dealTimeEnd',dealTimeEnd);

});
module.exports = router;
