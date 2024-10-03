
// 切换背景皮肤
function myFunction() {
   var element = document.body;
   element.classList.toggle("dark-mode");
}

// 浮动公告栏start
float_box = document.getElementById("float_box");

var xPos = document.body.clientWidth;
var yPos = 0;
var step = 1;
var delay = 30;
var height = 0;
var Hoffset = 0;
var Woffset = 0;
var yon = 0;
var xon = 0;
var pause = true;
var interval;

float_box.style.top = yPos;

function closeBox() {
    clearInterval(interval);
    float_box.style.visibility = 'hidden';
}

function changePos() {
    width = document.body.clientWidth;
    height = document.body.clientHeight;
    Hoffset = float_box.offsetHeight;
    Woffset = float_box.offsetWidth;
    float_box.style.left = xPos + document.body.scrollLeft+'px';
    float_box.style.top = yPos + document.body.scrollTop+'px';


    if (yon) {
        yPos = yPos + step;
    }
    else {
        yPos = yPos - step;
    }
    if (yPos < 0) {
        yon = 1;
        yPos = 0;
    }
    if (yPos >= (height - Hoffset)) {
        yon = 0;
        yPos = (height - Hoffset);
    }
    if (xon) {
        xPos = xPos + step;
    }
    else {
        xPos = xPos - step;
    }
    if (xPos < 0) {
        xon = 1;
        xPos = 0;
    }
    if (xPos >= (width - Woffset)) {
        xon = 0;
        xPos = (width - Woffset);
    }
}

function start() {
    float_box.style.visibility = "visible";
    interval = setInterval('changePos()', delay);
}

start();
// 浮动公告栏end

//设置动态时间展示
setInterval(function() {
				var date = new Date();
				//date.getDay()拿到的值是阿拉伯数字，将他换成汉字
				var week = date.getDay()
				switch (week) {
					case 1:
						week = "星期一"
						break;
					case 2:
						week = "星期二"
						break;
					case 3:
						week = "星期三"
						break;
					case 4:
						week = "星期四"
						break;
					case 5:
						week = "星期五"
						break;
					case 6:
						week = "星期六"
						break;
					case 0:
						week = "星期日"
						break;
				}
				// 时间没有在此处一次性组合完毕是为了方便在 输出时美化
				// 组合年月日
				let ymd = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
				// 组合时分秒
				let hms = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
 
				document.getElementById("showTime").innerHTML = ymd + "&nbsp;&nbsp;" + week + "&nbsp;&nbsp; " + hms;
			}, 1000)