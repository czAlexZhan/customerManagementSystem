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
    // if($(this).hasClass('searchIn')){
        $($search).removeClass('searchIn');
        $($record).removeClass('recordIn');
        $($search).addClass('searchOut');
        $($record).addClass('recordOut');
        $search_table.fadeIn();
    // }else{
    //     $(this).removeClass('searchOut');
    //     $(this).addClass('searchIn');
    //     $('#search_table').fadeOut();
    // }

});
$record.click(function(){
    // if($(this).hasClass('recordIn')){
    //     $(this).removeClass('recordIn');
    //     $(this).addClass('recordOut');
    // }else{
    //     $(this).removeClass('recordOut');
    //     $(this).addClass('recordIn');
    // }
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