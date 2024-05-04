$(function(){
var swiper = new Swiper('.swiper-container', {
	spaceBetween: 30,
	centeredSlides: true,
	loop: true,
	autoplay: {
		delay: 2500,
		disableOnInteraction: false,
	},
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
});

//滚顶到指定地点

$(".header_nav>div").click(function() {
	let index = $(this).index();
	if(index == 0) {
		let scrollVal = $(".aboutBright").offset().top;
		$('html,body').animate({"scrollTop": scrollVal}, 1000);
	}
	if(index == 1) {
		let scrollVal = $(".my_drame").offset().top;
		$('html,body').animate({"scrollTop": scrollVal}, 1000);
	}
	if(index == 2) {
		let scrollVal = $(".work_time").offset().top;
		$('html,body').animate({"scrollTop": scrollVal}, 1000);
	}
})

$(window).scroll(function(event) {
	if($(this).scrollTop() == 0) {
		$("#toTop").hide();
	}
	if($(this).scrollTop() != 0) {
		$("#toTop").show();
	}
});
$("#toTop").click(function(event) {
	$("html,body").animate({scrollTop: "0px"},1000);
});

//设置高度
for(var k = 0; k < $(".work_time_botCent>div").length; k++) {
	var heg = $(".work_time_botCent").children("div").eq(k).height();
	$(".work_time_bot_center").children("div").eq(k).children(".line").height(heg);
}	
//动画
wow = new WOW({
    animateClass: 'animated',
});
wow.init();

});

// 节日主题切换
if (localStorage.getItem('themespring') === '1') {
	document.body.classList.add('themespring');
	}
	else if (matchMedia('(prefers-color-scheme: themespring)').matches) {
	document.body.classList.add('themespring');
}

function switchThemes() {
	var body = document.body;
	if(body.classList.contains('themespring')){
	  document.body.classList.remove('themespring');
	  localStorage.setItem('themespring','0');
	  return;
	} else {
	  document.body.classList.add('themespring');
	  localStorage.setItem('themespring','1');
	  return;
	}
  };