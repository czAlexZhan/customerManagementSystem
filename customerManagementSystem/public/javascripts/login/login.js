/**
 * Created by 詹 on 2017/7/19.
 */
$('#login').click(function () {
    var userName = $('#userName').val();
    var password = $('#password').val();
    if(jQuery.isEmptyObject(userName) || jQuery.isEmptyObject(password)){
        $.dialog.alert({content:"请先输入用户名或密码"});
    }else{
        $.ajax({
            url:'login',
            type:'post',
            data:{userName:userName,password:password},
            dataType:'json',
            success:function (data) {
                console.log(data);
            },
            error:function(err){
                console.log(err);
            }
        });
    }

});
