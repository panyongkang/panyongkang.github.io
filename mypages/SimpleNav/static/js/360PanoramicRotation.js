/*
*  注意拖拽的事件添加:给整个document添加
*  取模
*/

window.onload=function ()
{
	var x=0;         // 虚拟的数字
	var oImg=document.getElementById('img1');    // 获取img
	var aImg=document.getElementsByTagName('img'); // 页面上所有的img标签
	var oLastImg=oImg;     // 上一张显示的图片
	var lastX=0;
	var iSpeed=0;
	var timer=null;
	var i=0;
	
	for(i=1;i<77;i++)
	{
		(function (oNewImg){
			var oImg=new Image();
			// 图片预加载
			oImg.onload=function ()
			{
				oNewImg.src=this.src;
			};
			oImg.src='static/img/'+i+'.jpg';
			
			oNewImg.style.display='none';     // 隐藏
			
			document.body.appendChild(oNewImg);
		})(document.createElement('img'));
	}
	
	document.onmousedown=function (ev)  // 
	{
		var oEvent=ev||event;
		var disX=oEvent.clientX-x;
		
		clearInterval(timer);   // 清除定时器
		
		document.onmousemove=function (ev)
		{
			var oEvent=ev||event;
			
			x=oEvent.clientX-disX;  // 鼠标的位置-物体距离浏览器左边的距离
			
			move();
			
			iSpeed=x-lastX;
			lastX=x;
			
			//oImg.src='img/'+l+'.jpg';
			
			return false;  // 阻止默认事件
		};
		
		document.onmouseup=function ()
		{
			document.onmousemove=null;
			document.onmouseup=null;
			
			document.title=iSpeed;
			// 定时器 
			timer=setInterval(function (){
				x+=iSpeed;
				move();
			}, 30);
		};
		
		function move()
		{
			if(iSpeed>0)  // 判断正负号,大于0,减速运动
			{
				iSpeed--;
			}
			else
			{
				iSpeed++;
			}
			
			if(iSpeed==0)
			{
				clearInterval(timer);
			}
			
			var l=parseInt(-x/10);  //l为计算以后的值,每拖10个像素,走一张图
			
			if(l>0)
			{
				l=l%77;
			}  
			else
			{
				l=l+-Math.floor(l/77)*77;  // 小于0的时候,处理问题
			}
			
			document.title=iSpeed;
			
			if(oLastImg!=aImg[l])   // 判断上一张与现在的一张不同
			{
				oLastImg.style.display='none';  //把上一张图片隐藏
				aImg[l].style.display='block';  // 把当前的图片显示
				oLastImg=aImg[l];
			}
		}
		return false;
	};
};

/*
*  x    src
* -2    75  
* -1    76
* 0     0
* 1     1
* ...
* 76    76
*
**/

