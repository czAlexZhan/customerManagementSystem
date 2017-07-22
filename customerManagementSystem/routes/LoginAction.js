var express = require('express');
var router = express.Router();
var loginService = require('../service/LoginService');
var md5Service = require('../service/MD5Service');

/*
post 数据
 */
var userName = "";
var password = "";

/* GET index page. */
router.get('/', function(req, res, next) {
    res.redirect('/login');
});
/* Get login page */
router.route('/login').get(function(req,res){
    if(!req.session.sys_user_id){
        res.render('login',{title:"用户登陆"});
    }else{
        res.redirect('/customerInfoAction');
    }

}).post(function(req,res){
    userName = req.body.userName;
    password = req.body.password;

    loginService.getUserInfoByUserName(userName,function (err,data) {
        var userInfo = data;
        if(userInfo != undefined){
            //判断密码是否相同
            var Depwd = md5Service.aesEncrypto(password,'zhanxw');
            if(Depwd == md5Service.aesDecrypt(userInfo.password,'zhanxw')){
                res.send(200,{flag:"success",msg:"登陆成功"});
            }else{
                res.send(200,{flag:"fail",msg:"登陆失败，密码错误"})
            }
        }else{
            res.send(200,{flag:"fail",msg:'此用户未注册'});
        }
    });


});
module.exports = router;
