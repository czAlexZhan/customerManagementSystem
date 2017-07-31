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
    let customerInfoList = JSON.parse(req.body.customerInfoList);
    if(customerInfoList != undefined){
        let length = customerInfoList.length;
        customerInfoService.insertCustomerInfo(customerInfoList,function(err,results){
            let insertLength = results.length;
            if(err){
                logger.error('数据库查询错误->'+err)
            }
            if(insertLength != undefined && insertLength>0){
                let failedNum = length - insertLength;
                let resultsMsg = "更新成功 "+insertLength+" 行，失败 "+failedNum+" 行";
                res.send(200,{"msg":resultsMsg});
            }
        });
    }
    logger.info('退出添加用户信息方法 addCustomerInfoAction');
});
module.exports = router;
