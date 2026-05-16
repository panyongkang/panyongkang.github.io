
// 枫叶飘落特效 //
jQuery(document).ready(function($){
			$(document).snowfall('clear');
			$(document).snowfall({image:"OnlyI/img/leave1.gif", flakeCount:20, minSpeed:1, minSize:8, maxSize:15,});
            $(document).snowfall({image:"OnlyI/img/leave2.gif", flakeCount:20, minSpeed:1, minSize:8, maxSize:15,});
            $(document).snowfall({image:"OnlyI/img/leave3.gif", flakeCount:20, minSpeed:1, minSize:8, maxSize:15,});
            $(document).snowfall({image:"OnlyI/img/leave4.gif", flakeCount:20, minSpeed:1, minSize:8, maxSize:15,});
		});

// 标题title切换效果//
        var originTitle = document.title;
        var titleTime;
        document.addEventListener("visibilitychange", function() {
            if (document.hidden) {
                document.title = "(つェ⊂)官人不要走~ " + originTitle;
                clearTimeout(titleTime);
            }
            else {
                document.title = "(*´∇｀*)官人回来啦~ " + originTitle;
                titleTime = setTimeout(function() {
                    document.title = originTitle;
                }, 2000);
            }
        });

<!-- 添加字体闪烁（变色）特效 -->
function magicColor(mode,t){
    t=t||10;
    let elem=document.getElementsByClassName("magic-color");
    if(!elem){
        setTimeout(function(){
            magicColor(mode,t-1);
        },400);
        return;
    }
    if(window.mcHandler==undefined){
        window.mcHandler={elements:[]};
        window.mcHandler.colorIndex=0;
        window.mcHandler.run=function(mode){
            let color=mode=="random"?("rgb("+Math.floor(Math.random()*256)+","+Math.floor(Math.random()*256)+","+Math.floor(Math.random()*256)+",1)"):["#CC0000","#9999CC","#CC3366","#669999","#FFCC00","#00CCCC","#CC00CC"][(window.mcHandler.colorIndex++)%7];
            for(var i=0,L=window.mcHandler.elements.length;i<L;i++)window.mcHandler.elements[i].style.color=color;
        }
    }
    window.mcHandler.elements=elem;
    if(window.mcHandler.timer==undefined){
        window.mcHandler.timer=setInterval(()=>{window.mcHandler.run(mode)},500);
    }
}
magicColor("");
