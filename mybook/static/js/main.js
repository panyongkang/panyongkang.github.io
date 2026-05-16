function ismMobile(){
	var w = $(window).width(); 
	if(w>768){
		return false
	}else{
		return true
	}
}
function openBook(obj) {

	if (obj == "withOutAnimat") {

		$(".book-left-z").css("display", "inherit");

		$(".main-b").css("display", "none");

		$("#book-left").addClass("mainy3");

		$(".mains").css("margin-left", 0);

		$(".nav-box").css("opacity", 1);

		$("#nav-menu").css("margin-left", 0);

		$(".book-shadow").addClass("book-shadow-on");

	} else {

		$("#book-left").addClass("mainy");

		$(".mains").animate({

			"margin-left": '0px'

		}, 2000);

		$(".book-shadow").addClass("book-shadow-on");

		setTimeout(function () {

			$(".book-left-z").css("display", "inherit");

			$("#Book-cover").css("display", "none");

			$("#book-left").addClass("mainy2");

			$("#book-left").removeClass("mainy");

			$(".nav-box").css("opacity", 1);

			$("#nav-menu").css("margin-left", 0);

		}, 1000);

	}

}



function closedBook(obj) {

	if (obj == "withOutAnimat") {

		$(".book-left-z").css("display", "none");

		$(".main-b").css("display", "inherit");

		$("#book-left").removeClass("mainy3");

		$(".mains").css("margin-left", -300);

		$(".nav-box").css("opacity", 0);

		$("#nav-menu").css("margin-left", -50);

		$(".book-shadow").removeClass("book-shadow-on");

	} else {

		$(".nav-box").css("opacity", 0);

		$("#nav-menu").css("margin-left", -50);

		$(".mains").animate({

			"margin-left": '-300px'

		}, 2000);

		$("#book-left").removeClass("mainy2");

		$("#book-left").removeClass("mainy3");

		$("#book-left").addClass("mainx");

		$(".book-shadow").removeClass("book-shadow-on");

		setTimeout(function () {

			$(".book-left-z").css("display", "none");

			$("#Book-cover").css("display", "inherit");

			$("#book-left").removeClass("mainx");

			$("#book-left").addClass("mainx2");

			setTimeout(function () {

				$("#book-left").removeClass("mainx2");

			}, 1000);

		}, 1000);

	}

};

var fsss = 0;



function fullScreen2() {

	fsss = 1;

	$("#fullScreen").text("退出全屏");

}



function exitFullScreen2() {

	fsss = 0;

	$("#fullScreen").text("全屏显示");

}



function fullScreen() {

	var elem = document.body;

	if (elem.webkitRequestFullScreen) {

		elem.webkitRequestFullScreen();

		fullScreen2()

	} else if (elem.mozRequestFullScreen) {

		elem.mozRequestFullScreen();

		fullScreen2()

	} else if (elem.requestFullScreen) {

		elem.requestFullscreen();

		fullScreen2()

	} else {

		notice.notice_show("浏览器不支持全屏API或已被禁用", null, null, null, true, true);

	}

}



function exitFullScreen() {

	var elem = document;

	if (elem.webkitCancelFullScreen) {

		exitFullScreen2()

		elem.webkitCancelFullScreen();

	} else if (elem.mozCancelFullScreen) {

		exitFullScreen2()

		elem.mozCancelFullScreen();

	} else if (elem.cancelFullScreen) {

		exitFullScreen2()

		elem.cancelFullScreen();

	} else if (elem.exitFullscreen) {

		exitFullScreen2()

		elem.exitFullscreen();

	} else {

		notice.notice_show("浏览器不支持全屏API或已被禁用", null, null, null, true, true);

	}

}



function imgbig(obj) {

	img_box_q = $(obj).parent(".img_box")

	img_tape_top = $(obj).parent().find('.img_tape_top');

	img_tape_buttom = $(obj).parent().find('.img_tape_buttom');

	img_src = $(obj).attr('src');

	img_title_q = $(obj).attr('title');

	img_top = img_box_q.offset().top;

	img_left = img_box_q.offset().left;

	img_width = img_box_q.width();

	img_height = img_box_q.height();

	img_tape_top.animate({

		'top': -20,

		'left': -50,

		'opacity': 0

	}, 200);

	img_tape_buttom.animate({

		'bottom': -20,

		'right': -55,

		'opacity': 0

	}, 200);

	setTimeout(function () {

		img_box_q.css("visibility", "hidden");

		$("#img_top_box_bg").css("display", "inline");

		$("#img_top_box_bg").append("<div id='img_top_box'><img/><span id='img_title_q'></span></div>");

		$("#img_top_box").children("img").attr("src", img_src);

		$("#img_top_box").children("#img_title_q").text(img_title_q);

		$("#img_top_box").css({

			"top": img_top,

			"left": img_left,

			"width": img_width,

			"height": img_height

		});

		$("#img_top_box_bg").css({

			"background": "rgba(0,0,0,0.3)"

		});

		getImageWidth(img_src, function (w, h) {

			$("#img_top_box").css({

				"top": "calc(50% - " + h / 2 + "px)",

				"left": "calc(50% - " + w / 2 + "px)",

				"width": w,

				"height": h

			});

		});

	}, 200);



}



function imgClosed() {
	$("#img_top_box").css({
		"top": img_top,
		"left": img_left,
		"width": img_width,
		"height": img_height
	});
	$("#img_top_box").css({
		"pointer-events": "none"
	})
	$("#img_top_box_bg").css({
		"background": "rgba(0,0,0,0.0)"
	});
	setTimeout(function () {
		img_box_q.css("visibility", "visible");
		$("#img_top_box_bg").css("display", "none");
		$("#img_top_box").remove();
		img_tape_top.animate({
			'top': 5,
			'left': -30,
			'opacity': 1

		}, 200);

		img_tape_buttom.animate({

			'bottom': 5,

			'right': -35,

			'opacity': 1

		}, 200);

	}, 500);

}



function getImageWidth(url, callback) {

	var img = new Image();

	img.src = url;

	if (img.complete) {

		callback(img.width, img.height);

	} else {

		img.onload = function () {

			callback(img.width, img.height);

		}

	}

}

function imgStyle(obj) {
	for (var i = 0; i < obj.length; i++) {

		var img_1 = obj.eq(i);

		var img_title = img_1.attr("title");

		img_1.wrapAll("<div class='img_box'></div>");

		var img_box = img_1.parent(".img_box");

		img_box.append(

			"<span class='img_tape img_tape_top'></span><span class='img_tape img_tape_buttom'></span><span class='img_title'></span>"

		);

		img_box.find(".img_title").text(img_title);

	};

}
var muscisCovertatus = false;

var muscistatus = false;

var srcOnline = $("#music").attr("src");

var musicdesk = false;



function loadMusic(obj) {

	var server = obj.attr("server");

	var cover = obj.attr("cover");

	$(obj).append("<div class='music_record_img'></div>");

	// console.log(cover);

	if (server == null) {

		obj.children(".music_record_img").css("background-image", "url(" + cover + ")");

	} else if (cover == null && server != null) {

		var m_id = obj.attr("songid");

		var htmlobj = $.ajax({

			url: "https://api.i-meto.com/meting/api?server="+server+"&type=song&id=" + m_id,

			async: false

		});

		htmlobj2 = JSON.parse(htmlobj.responseText);

		console.log(htmlobj2);

		obj.children(".music_record_img").css("background-image", "url(" + htmlobj2[0].cover + ")");

		obj.attr("title", htmlobj2[0].name + "-" + htmlobj2[0].artist);

		obj.attr("url",htmlobj2[0].url);

		obj.attr("cover",htmlobj2[0].cover);

	}

};

function loadMeting(obj) {

	var server = obj.attr("server");

	var cover = obj.attr("cover");

	$(obj).append("<div class='music_record_img'></div>");

	// console.log(cover);

	if (server == null) {

		obj.children(".music_record_img").css("background-image", "url(" + cover + ")");

	} else if (cover == null && server != null) {

		var m_id = obj.attr("songid");

		var htmlobj = $.ajax({

			url: "?music=" + server + "=" + m_id,

			async: false

		});

		htmlobj2 = JSON.parse(htmlobj.responseText);

		obj.children(".music_record_img").css("background-image", "url(" + htmlobj2.pic + ")");

		obj.attr("title", htmlobj2.name + "-" + htmlobj2.artist);

		obj.attr("url",htmlobj2.url);

		obj.attr("cover",htmlobj2.pic);

	}

};

function musicPlay(obj) {

	var music = document.getElementById("music");

	var url = $(obj).attr("url");

	var cover = $(obj).attr("cover");

	var name = $(obj).attr("title");

	var music_record = $("#music_record");

	var top = $(obj).offset().top;

	var right = $(window).width() - $(obj).offset().left - 106;

	$("#music").attr("src", url);

	if(url == null){

		alert("装载音乐失败,");

		return;

	}

	if(music_record.length>0){

		if(musicdesk == false){

			music_record.css({"right":380,"top":180,"opacity":0,"z-index":0});

			setTimeout(() => {

				music_record.remove();

			}, 900);	

		}else if(musicdesk == true){

			music_record.remove();

			$(".music_record_desk_temp").css("visibility", "visible");

			$(".music_record_desk_temp").removeClass("music_record_desk_temp");

		}	

	}

	if($(obj).attr("musicdesk") != null){

		$(obj).addClass("music_record_desk_temp");

		$(obj).css("visibility", "hidden");

		setTimeout(() => {

			$("#body-bg").prepend("<div id='music_record'><div class='music_record_img'></div></div>");

			var music_record = $("#music_record");

			music_record.css("display","block");

			music_record.children(".music_record_img").css("background-image", "url(" + cover + ")");

			$("#music_rod").css("transform", "rotate(0deg)");

			setTimeout(() => {

				$("#music_record").css({

					"animation-name": "lds-gear",

					"animation-play-state": "running"

				});

				music.play();
				$("#muisc-ku").css({'pointer-events':''})
				$("#music_box").attr("title",name);

				musicdesk = true;

				muscistatus= true;

			}, 400);

			$(".music-link").css({"visibility":"visible"});

			$(".music-link").animate({"opacity":1},1000);

		}, 1000);

	}else{

		$("#music_record").remove();

		$(".music-link-desk").css("visibility", "visible");

		$(".music-link-desk").removeClass("music_record_desk_temp");

		$(obj).css({"visibility":"hidden","opacity":0});

		$("#body-bg").prepend("<div class='music_record_temp'><div class='music_record_img'></div></div>");

		var temp = $(".music_record_temp");

		temp.children(".music_record_img").css("background-image", "url(" + cover + ")");

		temp.css({

			"top": top,

			"right": right

		});

		setTimeout(() => {

			temp.css({

				"top":"",

				"right":""

			});

		},0);

		setTimeout(() => {

			$("#body-bg").prepend("<div id='music_record'><div class='music_record_img'></div></div>");

			var music_record = $("#music_record");

			music_record.css("display","block");

			music_record.children(".music_record_img").css("background-image", "url(" + cover + ")");

			temp.remove();

			$("#music_rod").css("transform", "rotate(0deg)");

			setTimeout(() => {

				$("#music_record").css({

					"animation-name": "lds-gear",

					"animation-play-state": "running"

				});

				music.play();

				$("#music_box").attr("title",name);

				musicdesk = false;

				muscistatus= true;

			}, 400);

		}, 1000);

	}

}







function rightSchedule() {

	$("#rightSchedule").text("0%");

	document.getElementById("postbox").addEventListener('ps-scroll-y', function () {

		var post_top = $("#postbox").scrollTop();

		var post_height = $("#post_box").height() + $("#comments").height() - 698;

		var rightSchedule = parseInt((post_top / post_height) * 100);

		$("#rightSchedule").text(rightSchedule + "%");

	});

}



function catalogClickList(obj) {

	$(obj).parents("#archives").find("a").animate({

		"font-weight": 400

	}, 100);

	$(obj).animate({

		"font-weight": 900

	}, 100);

	var ca = $(obj).parents(".al_mon_list").prev(".al_year");

	var cb = $(obj).parents("#archives").find(".al_year");

	var cac = ca.css("font-weight");

	if (cac != 900) {

		cb.animate({

			"font-weight": 100

		}, 100);

		ca.animate({

			"font-weight": 900

		}, 100);

	};

}

document.onreadystatechange = function () {

	if (document.readyState == "complete") {

		$("#loading").css("opacity", "0");

		$("#loading").css("pointer-events", "none");

		$("#loading").css("background-image", "url()");

		setTimeout(() => {

			$("#loading").css("display", "none");

		}, 1000);

	}

}

$(document).ready(function () {

	var music = document.getElementById("music");

	$('#img_top_box_bg').on('mousewheel', function (event) {

		imgClosed()

	});

	$(document).pjax('[pajx-right] a, a[pajx-right]', '#axjx_box', {

		fragment: '#axjx_box',

		timeout: 8000

	});

	$(document).pjax('[pajx-left] a, a[pajx-left]', '.book-left-z', {

		fragment: '.book-left-z',

		timeout: 8000

	});

	$(document).on('pjax:start', function () {

		NProgress.start();

	});

	$(document).on('pjax:end', function () {

		NProgress.done();

	});

	$("#Book-cover").click(function () {

		openBook()

	});

	$("#fullScreen").click(function () {

		if (fsss == 0) {

			fullScreen();

		} else if (fass = 1) {

			exitFullScreen();

		}

	});

	$("#chiji_box").click(function () {

		var dom_a = $(this).css("left");

		if (dom_a == "-200px") {

			$(this).css("left", 0);

		} else {

			$(this).css("left", -200);

		};

	});

	$("#tea_box").click(function () {

		var dom_a = $(this).css("right");

		if (dom_a == "-120px") {

			$(this).css("right", 0);

		} else {

			$(this).css("right", -120);

		};

	});

	$("#closed").dblclick(function () {

		var a = $(".mains").css("margin-left");

		if (a == "0px") {

			closedBook();

		} else {

			openBook();

		}

	});

	$("#music_box").click(function () {
		var src = music.getAttribute("src");
		if (src == "") {
			$("#music_name").css("top", "140px");
			$("#music_name").text("没有放唱片");
			setTimeout(() => {
				$("#music_name").css("top", "80px");
			}, 2000);
		} else if (muscistatus == false) {
			music.play();
			$("#music_record").css({
				"animation-name": "lds-gear",
			"animation-play-state": "running"
			});
			muscistatus = true;
			$("#music_rod").css("transform", "rotate(0deg)");
			// $("#music_name").css("top","220px");
		} else if (muscistatus == true) {
			music.pause();
			$("#music_rod").css("transform", "rotate(-13deg)");
			$("#music_record").css({
				"animation-play-state": "paused"
			});
			muscistatus = false;
		};
	});
	$("a[musicdesk]").each(function(){
		$(this).addClass("music-link-desk");
		loadMusic($(this));
	})
	$("a[musicdesk]").click(function () {
		$("#muisc-ku").css({'pointer-events':'none'})
		musicPlay(this);
	})
	music.volume = 0.3;

	// $("#music_v_box").click(function(e){

	// 	// var music = document.getElementById("music");

	// 	var height =$("#music_v_box").height();

	// 	var yy = e.originalEvent.y || e.originalEvent.layerY || 0; 

	// 	var top = $(this).offset().top;

	// 	$("#music_volume_c").css("top",(yy-top)/height*100+"%");

	// 	music.volume = 1-((yy-top)/height);

	// 	// console.log((yy-top)/94*100);

	// });

	var move=false;//移动标记 

	$("#music_volume_c").mousedown(function(e){

		move=true; 

		// console.log(move)

	});

	$(document).mousemove(function(e){ 

		if(move){ 

		var y=e.pageY;

		var top =$("#music_v_box").offset().top;

		var height =$("#music_v_box").height();

		if(top < y && y< (top+height)){

			$("#music_volume_c").css("top",(y-top)/height*100+"%");

			music.volume = 1-((y-top)/height);

		}

		} 

		}).mouseup(function(){ 

		move=false; 

	}); 

});