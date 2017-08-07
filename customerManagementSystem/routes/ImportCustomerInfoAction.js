/**
 * Created by 詹 on 2017/8/7.
 */
const express = require('express');
const router = express.Router();
const logger = require('../service/LogService').logger('importCustomerInfoAction');

router.get('/',function (req, res) {
    logger.info("进入加载导入用户记录页面 importCustomerInfoAction");
    res.render('importCustomer');
    logger.info("结束加载导入用户记录页面 importCustomerInfoAction");
});
module.exports = router;