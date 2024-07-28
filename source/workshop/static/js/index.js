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

// 鼠标点击烟花爆炸效果
var sparks = 75; // 每次点击爆炸产生的火花数量
var speed = 33; // 火花移动速度，数值越小速度越快
var bangs = 5; // 同时可产生的爆炸数量（过多会影响性能）
var colours = new Array('#03f', '#f03', '#0e0', '#93f', '#0cf', '#f93', '#f0c'); 
// 颜色数组：蓝色、红色、绿色、紫色、青色、橙色、粉色

// 初始化一些数组用于存储火花的位置、速度、强度等信息
var intensity = new Array();
var Xpos = new Array();
var Ypos = new Array();
var dX = new Array();
var dY = new Array();
var stars = new Array();
var decay = new Array();
var timers = new Array();
var swide = 800;
var shigh = 600;
var sleft = sdown = 0;
var count = 0;

// 添加窗口加载事件
function addLoadEvent(funky) {
  var oldonload = window.onload;
  if (typeof(oldonload) != 'function') window.onload = funky;
  else window.onload = function() {
    if (oldonload) oldonload();
    funky();
  }
}

// 初始化点击爆炸效果
addLoadEvent(clicksplode);

function clicksplode() { 
  if (document.getElementById) {
    var i, j;
    window.onscroll = set_scroll;
    window.onresize = set_width;
    document.onclick = eksplode;
    set_width();
    set_scroll();
    for (i = 0; i < bangs; i++) 
      for (j = sparks * i; j < sparks + sparks * i; j++) {
        stars[j] = createDiv('*', 13); // 创建每个火花
        document.body.appendChild(stars[j]); // 将火花添加到页面中
      }
  }
}

// 创建火花的 div 元素
function createDiv(char, size) {
  var div, sty;
  div = document.createElement('div');
  sty = div.style;
  sty.font = size + 'px monospace';
  sty.position = 'absolute';
  sty.backgroundColor = 'transparent';
  sty.visibility = 'hidden';
  sty.zIndex = '101';
  div.appendChild(document.createTextNode(char));
  return (div);
}

// 处理每次火花的移动和消失
function bang(N) {
  var i, Z, A = 0;
  for (i = sparks * N; i < sparks * (N + 1); i++) { 
    if (decay[i]) {
      Z = stars[i].style;
      Xpos[i] += dX[i];
      Ypos[i] += (dY[i] += 1.25 / intensity[N]);
      if (Xpos[i] >= swide || Xpos[i] < 0 || Ypos[i] >= shigh + sdown || Ypos[i] < 0) decay[i] = 1;
      else {
        Z.left = Xpos[i] + 'px';
        Z.top = Ypos[i] + 'px';
      }
      if (decay[i] == 15) Z.fontSize = '7px';
      else if (decay[i] == 7) Z.fontSize = '2px';
      else if (decay[i] == 1) Z.visibility = 'hidden';
      decay[i]--;
    }
    else A++;
  }
  if (A != sparks) timers[N] = setTimeout('bang(' + N + ')', speed);
}

// 处理点击事件，触发爆炸效果
function eksplode(e) { 
  var x, y, i, M, Z, N;
  set_scroll();
  y = (e) ? e.pageY : event.y + sdown;
  x = (e) ? e.pageX : event.x + sleft;
  N = ++count % bangs;
  M = Math.floor(Math.random() * 3 * colours.length);
  intensity[N] = 5 + Math.random() * 4;
  for (i = N * sparks; i < (N + 1) * sparks; i++) {
    Xpos[i] = x;
    Ypos[i] = y - 5;
    dY[i] = (Math.random() - 0.5) * intensity[N];
    dX[i] = (Math.random() - 0.5) * (intensity[N] - Math.abs(dY[i])) * 1.25;
    decay[i] = 16 + Math.floor(Math.random() * 16);
    Z = stars[i].style;
    if (M < colours.length) Z.color = colours[i % 2 ? count % colours.length : M];
    else if (M < 2 * colours.length) Z.color = colours[count % colours.length];
    else Z.color = colours[i % colours.length];
    Z.fontSize = '13px';
    Z.visibility = 'visible';
  }
  clearTimeout(timers[N]);
  bang(N);
} 

// 设置窗口宽度
function set_width() {
  var sw_min = 999999;
  var sh_min = 999999;
  if (document.documentElement && document.documentElement.clientWidth) {
    if (document.documentElement.clientWidth > 0) sw_min = document.documentElement.clientWidth;
    if (document.documentElement.clientHeight > 0) sh_min = document.documentElement.clientHeight;
  }
  if (typeof(self.innerWidth) == 'number' && self.innerWidth) {
    if (self.innerWidth > 0 && self.innerWidth < sw_min) sw_min = self.innerWidth;
    if (self.innerHeight > 0 && self.innerHeight < sh_min) sh_min = self.innerHeight;
  }
  if (document.body.clientWidth) {
    if (document.body.clientWidth > 0 && document.body.clientWidth < sw_min) sw_min = document.body.clientWidth;
    if (document.body.clientHeight > 0 && document.body.clientHeight < sh_min) sh_min = document.body.clientHeight;
  }
  if (sw_min == 999999 || sh_min == 999999) {
    sw_min = 800;
    sh_min = 600;
  }
  swide = sw_min - 7;
  shigh = sh_min - 7;
}

// 设置滚动位置
function set_scroll() {
  if (typeof(self.pageYOffset) == 'number') {
    sdown = self.pageYOffset;
    sleft = self.pageXOffset;
  }
  else if (document.body && (document.body.scrollTop || document.body.scrollLeft)) {
    sdown = document.body.scrollTop;
    sleft = document.body.scrollLeft;
  }
  else if (document.documentElement && (document.documentElement.scrollTop || document.documentElement.scrollLeft)) {
    sleft = document.documentElement.scrollLeft;
    sdown = document.documentElement.scrollTop;
  }
  else {
    sdown = 0;
    sleft = 0;
  }
}
