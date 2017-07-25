/**
 * Created by czAlexzhan on 2017/7/24.
 */
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
$('#search').click(function(){
    if($(this).hasClass('searchIn')){
        $(this).removeClass('searchIn');
        $(this).addClass('searchOut');
    }else{
        $(this).removeClass('searchOut');
        $(this).addClass('searchIn');
    }
});
$('#record').click(function(){
    if($(this).hasClass('recordIn')){
        $(this).removeClass('recordIn');
        $(this).addClass('recordOut');
    }else{
        $(this).removeClass('recordOut');
        $(this).addClass('recordIn');
    }
});