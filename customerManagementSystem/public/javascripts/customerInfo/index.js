/**
 * Created by czAlexzhan on 2017/7/24.
 */
var $search = $('#search');
var $record = $('#record');
var $search_table = $('#search_table');
var $record_table = $('#record_table');

$('#changeBg button').on('click',function () {
   var index = Number($('.body_bg').attr('data-index'));
   if(index == 3){
       var url = "url('../../images/bg_1.jpg')";
       $('.body_bg').css({'background':url,'background-size':'cover'});
       $('.body_bg').attr('data-index','1');
   }else{
       index++;
       var url = "url('../../images/bg_"+index+".jpg')";
       $('.body_bg').css({'background':url,'background-size':'cover'});
       $('.body_bg').attr('data-index',index);
   }
});
$search.click(function(){
        $($search).removeClass('searchIn');
        $($record).removeClass('recordIn');
        $($search).addClass('searchOut');
        $($record).addClass('recordOut');
        $search_table.fadeIn();

});
$record.click(function(){
    $($search).removeClass('searchIn');
    $($record).removeClass('recordIn');
    $($search).addClass('searchOut');
    $($record).addClass('recordOut');
    $record_table.fadeIn();
});
function back(dom) {
    $($search).removeClass('searchOut');
    $($record).removeClass('recordOut');
    $($search).addClass('searchIn');
    $($record).addClass('recordIn');
    $(dom).parents('.back').parent().fadeOut();
}
function addTr(dom){
    var context = `
        <tr class="info">
            <td><input style="width:120px;" type="text" class="account" maxlength="32"><span class='msg'></span></td>
            <td><input style="width:120px;" type="text" class="target_name" maxlength="32"><span class='msg'></span></td>
            <td><input style="width:120px;" type="text" class="deal_time" onfocus="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})"><span class='msg'></span></td>
            <td><input style="width:120px;" type="text" class="connect_time" onfocus="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})"><span class='msg'></span></td>
            <td><input style="width:120px;" type="text" class="product_name" maxlength="32"><span class='msg'></span></td>
            <td><input style="width:60px;" type="text" class="product_price"><span class='msg'></span></td>
            <td><input style="width:50px;" type="text" class="isDeal"><span class='msg'></span></td>
            <td><input style="width:50px;" type="text" class="deal_times"><span class='msg'></span></td>
            <td><input style="width:50px;" type="text" class="store_name"><span class='msg'></span></td>
            <td><input style="width:50px;" type="text" class="isRepeat"><span class='msg'></span></td>
            <td><input style="width:60px;" type="text" class="repeat_name"><span class='msg'></span></td>
            <td><a href="javascript:void(0);" onclick="delTr(this)">删除</a></td>
        </tr>       
    `;
    $(dom).parents('tr').before(context);
}
function delTr(dom) {
    $(dom).parents('tr').remove();
}
function saveInfo() {
    var customerInfoList = new Array();
    var flag = true;
    $('#addInfo .msg').text("");
    $('#addInfo .info').each(function () {
        var account = $(this).find('.account').val() == undefined ? "" : $(this).find('.account').val();
        var targetName = $(this).find('.target_name').val() == undefined ? "" : $(this).find('.target_name').val();
        var dealTime = $(this).find('.deal_time').val() == undefined ? "" : $(this).find('.deal_time').val();
        var connectTime = $(this).find('.connect_time').val() == undefined ? "" : $(this).find('.connect_time').val();
        var productName = $(this).find('.product_name').val() == undefined ? "" : $(this).find('.product_name').val();
        var productPrice = $(this).find('.product_price').val() == undefined ? "" : $(this).find('.product_price').val();
        var isDeal = $(this).find('.isDeal').val() == undefined ? "" : $(this).find('.isDeal').val();
        var dealTimes = $(this).find('.deal_times').val() == undefined ? "" : $(this).find('.deal_times').val();
        var storeName = $(this).find('.store_name').val() == undefined ? "" : $(this).find('.store_name').val();
        var isRepeat = $(this).find('.isRepeat').val() == undefined ? "" : $(this).find('.isRepeat').val();
        var repeatName = $(this).find('.repeat_name').val() == undefined ? "无" : $(this).find('.repeat_name').val();

        if(account == undefined || account == ""){
            $(this).find('.account').siblings('.msg').text('*');
            flag = false;
        }
        if(targetName == undefined || targetName == ""){
            $(this).find('.target_name').siblings('.msg').text('*');
            flag = false;
        }
        if(dealTime == undefined || dealTime == ""){
            $(this).find('.deal_time').siblings('.msg').text('*');
            flag = false;
        }
        if(connectTime == undefined || connectTime == ""){
            $(this).find('.connect_time').siblings('.msg').text('*');
            flag = false;
        }
        if(productName == undefined || productName == ""){
            $(this).find('.connect_time').siblings('.msg').text('*');
            flag = false;
        }
        if(productPrice == undefined || productPrice == ""){
            $(this).find('.product_price').siblings('.msg').text('*');
            flag = false;
        }
        if(isDeal == undefined || isDeal == ""){
            $(this).find('.isDeal').siblings('.msg').text('*');
            flag = false;
        }
        if(dealTimes == undefined || dealTimes == ""){
            $(this).find('.deal_times').siblings('.msg').text('*');
            flag = false;
        }
        if(storeName == undefined || storeName == ""){
            $(this).find('.store_name').siblings('.msg').text('*');
            flag = false;
        }
        if(isRepeat == undefined || isRepeat == ""){
            $(this).find('.isRepeat').siblings('.msg').text('*');
            flag = false;
        }
        if(flag){
            var customerInfo = new Array(account, targetName, dealTime, connectTime, productName, productPrice, isDeal, dealTimes, storeName, isRepeat, repeatName,"A");
            customerInfoList.push(customerInfo);
        }
    });
    if(!flag){
        alert('先填写必填项');
    }else{
        var data = {"customerInfoList":customerInfoList};
        $.ajax({
            url:'/customerInfoAction/addCustomerInfoAction',
            type:'post',
            dataTypes:'json',
            contentType:'application/json',
            data:JSON.stringify(data),
            success:function(data){
              alert(data.msg);
              window.location.reload();
            },
            error:function(err){
                console.log(err)
            }
        });
    }
}
function findCustomerInfo(){
    var customer_account = $('#account').val();
    var target_name = $('#target_name').val();
    var product_name = $('#product_name').val();
    var isDeal = $('#isDeal:checked').val();
    if(isDeal == undefined){
        isDeal = "0";
    }
    var connectTimeStart = $('#connectTimeStart').val();
    var connectTimeEnd = $('#connectTimeEnd').val();
    var dealTimeStart = $('#dealTimeStart').val();
    var dealTimeEnd = $('#dealTimeEnd').val();

    var actionName = '/customerInfoAction/findCustomerInfoAction';
    var pageDivId = 'pageContent';
    var showDivId = 'listView1';
    var currentPage = 1;
    var pageSize = 10;

    var param = {
        customer_account:customer_account,
        target_name:target_name,
        product_name:product_name,
        isDeal:isDeal,
        connectTimeStart:connectTimeStart,
        connectTimeEnd:connectTimeEnd,
        dealTimeStart:dealTimeStart,
        dealTimeEnd:dealTimeEnd,

        currentPage:currentPage,
        pageSize:pageSize
    };
    pager.init({
        param:param,
        actionName:actionName,
        resultId:showDivId
    });
}