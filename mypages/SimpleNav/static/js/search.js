function cls() {
for (var t = document.getElementsByTagName("INPUT"), e = 0; e < t.length; e++) "text" == t[e].type && (t[e].value = "")
}

function if_btn() {
var t, e, n = document.getElementById("kw") || document.getElementById("kw-2"),
s = document.getElementById("qingkong");
if ("" == n || null == n) return !1;
n.onfocus = function() {
e = setInterval(function() {
t = n.value, s.style.display = 0 != t ? "block" : "none"
}, 200)
}, n.onblur = function() {
clearInterval(e)
}
}
$(".Select-box ul").hover(function() {
$(this).css("height", "auto")
}, function() {
$(this).css("height", "40px")
}), $(".Select-box-2 ul").hover(function() {
$(this).css("height", "auto")
}, function() {
$(this).css("height", "46px")
}), $(".Select-box li").click(function() {
var t = $(this).attr("class"),
e = $(this).html();
"baidu_s" == t && (t = "https://www.baidu.com/s", _name = "wd"), "google_s" == t && (t = "https://www.google.com/search", _name = "q"), "bing_s" == t && (t = "https://www.bing.com/search", _name = "q"), "kaifa_s" == t && (t = "https://kaifa.baidu.com/searchPage", _name = "wd"), $(".baidu form").attr("action", t), $(".this_s").html(e), $("#kw").attr("name", _name), $(".Select-box ul").css("height", "40px")
}), $(".Select-box-2 li").click(function() {
var t = $(this).attr("class"),
e = $(this).html();
"baidu_s" == t && (t = "https://www.baidu.com/s", _name = "wd"), "google_s" == t && (t = "https://www.google.com/search", _name = "q"), "bing_s" == t && (t = "https://www.bing.com/search", _name = "q"), "kaifa_s" == t && (t = "https://kaifa.baidu.com/searchPage", _name = "wd"), $(".baidu form").attr("action", t), $(".this_s").html(e), $("#kw-2").attr("name", _name), $(".Select-box-2 ul").css("height", "48px")
}), $(".qingkong").click(function() {
cls(), $(this).css("display", "none")
})