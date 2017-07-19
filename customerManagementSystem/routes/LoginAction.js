var express = require('express');
var router = express.Router();
var loginService = require('../service/LoginService');

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

    var userInfo = loginService.getUserInfoByUserName(userName);
});
module.exports = router;
