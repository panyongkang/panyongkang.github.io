/**
 * 搜索右侧导航
 */
function search_right_navigation(currtype,window_w) {
    var eq = 0;
    if(currtype == 1 && window_w < 768) {
        eq = 1;
    }
    var link =   $('.x_left-nav ul li a').eq(eq).css({'background-color':'#fff'}).attr('data');
    $('#engine').attr('src',link);

    $('.x_left-nav ul li a').click(function(){
        $('.x_left-nav ul li a').removeAttr('style');
		links = $(this).css({'background-color':'#fff'}).attr('data')
		$('#engine').attr('src',links);
        //$('#mb').show();
    });
    /*
    var frm = document.getElementById('engine');  
    $(frm).load(function(){
        $('#mb').hide();
    });
    $('#menu').click(function(){
        $('.menubig').show();
    });
    */
}

/**
 * 首页创建swiper
 * @param {*} currindex 
 */
function home_create_swiper(currindex) {
    var mySwiper = $('.swiper-container').swiper({
		onSlideChangeEnd: function(swiper){
			var index = swiper.activeLoopIndex;
			home_changeTab(index);
		},
        initialSlide : currindex,
        progress:true,
        onProgressChange: function(swiper){
            for (var i = 0; i < swiper.slides.length; i++){
            var slide = swiper.slides[i];
            var progress = slide.progress;
            var rotate = -90*progress;
            if (rotate<-90) rotate=-90;
            if (rotate>90) rotate=90;
            var translate = progress*swiper.width/2;  
            var opacity = 1 - Math.min(Math.abs(progress),1);
            slide.style.opacity = opacity;
            swiper.setTransform(slide,'rotateY('+rotate+'deg) translate3d('+translate+'px,0,0)');
            }
        },
        onTouchStart:function(swiper){
            for (var i = 0; i < swiper.slides.length; i++){
            swiper.setTransition(swiper.slides[i], 0);
            }
        },
        onSetWrapperTransition: function(swiper, speed) {
            for (var i = 0; i < swiper.slides.length; i++){
            swiper.setTransition(swiper.slides[i], speed);
            }
        }
    });
    //return mySwiper;

    home_swiper_init(mySwiper, currindex);
}
function home_create_swiper2(currindex) {
    var mySwiper = $('.swiper-container').swiper({
		onSlideChangeEnd: function(swiper){
			var index = swiper.activeLoopIndex;
			home_changeTab(index);
		},
        initialSlide : currindex
    });
    //return mySwiper;

    home_swiper_init(mySwiper, currindex);
}

/**
 * 首页初始化 Swiper
 * @param {*} mySwiper 
 * @param {*} currindex 
 */
function home_swiper_init(mySwiper,currindex) {
    home_changeTab(currindex); //初始化
    $('#navbtn a').eq(currindex).css({"border-radius":"0", "background-color":"#000"}); //初始化
    $('#navbtn a').click(function(){
        var i = $(this).attr('rel');
        mySwiper.swipeTo(i, 500, false);
		home_changeTab(i);
    });

	var xxx = $(window).height() - 150;
    $('.main').css("min-height",xxx+'px');
}

/**
 * 更换首页导航
 */
function home_changeTab(index) {
    var h = $('#slide'+index).height() + 10;
    $('#slide'+index).parent().css('height', h+'px');
    $('.swiper-wrapper, .swiper-container').css('height', h+'px');
    $('#navbtn a').removeAttr("style");
    $('#navbtn a').eq(index).css({"border-radius":"0", "background-color":"#000"});
    setCookie( 'currIndex', index, 7200 );
}

// ---------------------------------

//设置cookie  
function setCookie(cname, cvalue, exdays) {  
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires + "; path=/; domain=xsldh.com";
}

//获取cookie  
function getCookie(cname) {  
    var name = cname + "=";  
    var ca = document.cookie.split(';');  
    for(var i=0; i<ca.length; i++) {  
        var c = ca[i];  
        while (c.charAt(0)==' ') c = c.substring(1);  
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);  
    }  
    return "";  
} 