
$(function(){

    //nav-mini切换
    $('#mini').on('click',function(){
        if (!$('.navLive').hasClass('navLive-mini')) {
            $('.navLive-item').children('ul').removeAttr('style');
            $('.navLive').addClass('navLive-mini');
            $('#live1').hide();
            $('#live2').attr('class','col-md-8 live-c7');
        }else{
            $('.navLive').removeClass('navLive-mini');
            $('#live1').show();
            $('#live2').attr('class','col-md-7 live-c7');
        }
    }
    );
});

function focusShow() {
    var f=document.getElementById('focus1');
    var p=document.getElementById('focus2');
    if(f.value==='关注'){
        f.value='取消';
        p.value=parseInt(p.value)+1;
    }else {
        f.value='关注';
        p.value=parseInt(p.value)-1;
    }
}