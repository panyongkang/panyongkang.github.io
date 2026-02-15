

$(function(){
    var mobile = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    if (!mobile){
        // jQuery('#examples').raindrops({color:'#b5d5e1',canvasHeight:100});
        jQuery('#examples').raindrops({color:'#99d4a5',canvasHeight:200});
        // jQuery('#examples').raindrops({color:'#ddb3c2', waveLength: 700,waveHeight: 50});
        // jQuery('#examples').raindrops({color:'#a5d2da', density: 0.1, frequency: 20});
        // jQuery('#examples').raindrops({color:'#f77b7b', canvasHeight:150, waveLength: 100, rippleSpeed: 0.05, density: 0.04});
        // jQuery('#examples').raindrops({color:'#ffef92', canvasHeight:250, rippleSpeed: 0.01, frequency: 1, density: 0});
            
    }
});


// 节日主题切换模式开始
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
// 节日主题切换模式结束


