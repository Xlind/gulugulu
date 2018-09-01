$(function(){

    // nav收缩展开
    $('.navLive-item>a').on('click',function(){
        if (!$('.navLive').hasClass('navLive-mini')) {
            if ($(this).next().css('display') == "none") {
                //展开未展开
                $('.navLive-item').children('ul').slideUp(300);
                $(this).next('ul').slideDown(300);
                $(this).parent('li').addClass('navLive-show').siblings('li').removeClass('navLive-show');
            }else{
                //收缩已展开
                $(this).next('ul').slideUp(300);
                $('.navLive-item.navLive-show').removeClass('navLive-show');
            }
        }
    });

    //nav-mini切换
    $('#mini').on('click',function(){
        if (!$('.navLive').hasClass('navLive-mini')) {
            $('.navLive-item.nav-show').removeClass('navLive-show');
            $('.navLive-item').children('ul').removeAttr('style');
            $('.navLive').addClass('navLive-mini');
        }else{
            $('.navLive').removeClass('navLive-mini');
        }
    });
});