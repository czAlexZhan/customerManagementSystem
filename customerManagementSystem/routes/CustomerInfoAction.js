var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/',function(req,res){
    if(req.session.sys_user_id){
        res.render('home',{title:"用户记录"});
    }else {
        res.redirect('/login');
    }
});
module.exports = router;
