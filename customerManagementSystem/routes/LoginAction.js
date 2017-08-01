var express = require('express');
var router = express.Router();
var loginService = require('../service/LoginService');
var md5Service = require('../service/MD5Service');
var logger = require('../service/LogService').logger('loginAction');

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
    logger.info('进入登录post方法');
    userName = req.body.userName;
    password = req.body.password;

    loginService.getUserInfoByUserName(userName,function (err,data) {
        if(err){
            console.log(err);
            logger.error('数据库查询出错->'+err);
        }else{
            var userInfo = data[0];
            if(userInfo != undefined){
                //判断密码是否相同
                var Depassword = userInfo.USER_PASSWORD.toString();
                if(password == md5Service.aesDecrypt(Depassword,"zhanxw")){
                    req.session.sys_user_id = userInfo.SYS_USER_ID;
                    logger.info(userInfo.SYS_USER_ID+"->登录成功");
                    res.send(200,{flag:true,msg:"登陆成功"});
                }else{
                    logger.info(userName+"->登陆失败，密码错误");
                    res.send(200,{flag:false,msg:"登陆失败，密码错误"})
                }
            }else{
                res.send(200,{flag:false,msg:'此用户未注册'});
            }
        }
    });

    logger.info('退出登录post方法');
});
router.post('/register',function (req, res) {

    userName = req.body.userName;
    password = req.body.password;
    //密码加密
    var encryptoPassword = md5Service.aesEncrypto(password,'zhanxw');
    loginService.registerUserInfo(userName,encryptoPassword,function (err, data) {
        if(err){
            console.log(err);
            logger.error('数据库查询出错->'+err);
        }else if(data == null) {
            logger.info(userName + "->已存在");
            res.send(200, {flag: false, msg: "此用户已存在"});
        }else{
                var insertId = data.insertId;
                if(insertId != undefined){
                    req.session.sys_user_id = insertId;

                    logger.info(userName+"->注册成功：id"+insertId);
                    res.send(200,{flag:true,msg:"注册成功"});

                    // res.redirect('/login');
                    res.send(200,{msg:"注册成功"});

                }
            }
    });
    logger.info('退出注册post方法');

});

router.get('/loginOut',function (req, res) {
    req.session.sys_user_id = null;
    res.redirect('/login');
});
module.exports = router;
