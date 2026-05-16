/* 分类页面引入jQuery库
 * 此文件为分类面页面的公用函数
 * 时间 2011-12-15
 */
$(function(){  
    //搜索切换
    Page.SearchForm({
        tab : $('#JsearchTab').find('input'),
        form : {
            f : $('#JsearchForm').get(0),
            k : $('#JsearchKey').get(0),
            b : $('#JsearchBtn').get(0),
            l : $('#JsearchLogo').get(0)
        },
        data : Page.Soso
    });
    //设为首页
    var setHomeObj = $('#setHome1').get(0);
    $('#setHome1').click(function(){
        Page.SetHome(setHomeObj,window.location.href);
        return false;
    });
    $(window).scroll(function(){
        $(document).scrollTop()>0?$("#JgoTop").show():$("#JgoTop").hide();
    });
    Page.goTop();
    if($(document).scrollTop()<=0){
        $("#JgoTop").hide();
    }
});
//搜索表单
var Page = {};
Page.SearchForm = function(opt){
    if(!opt) opt={};
    var tArr = opt.tab,
        tLen = tArr.length,
        form = opt.form.f,
        key = opt.form.k,
        label = opt.form.l,
        btn = opt.form.b,
        data = opt.data,
        parCache = [];
    var hInput = form.getElementsByTagName('input'),
        len = hInput.length;
    for(var i=0;i<len;i++){
        if(hInput[i].type == 'hidden') parCache.push(hInput[i]);
    }
    var setForm = function(d){
        form.action = d.action;
        label.href = d.url;
        label.getElementsByTagName('img')[0].src = d.img[0];
        label.getElementsByTagName('img')[0].art = d.img[1];
        key.name = d.name;
        btn.value = d.btn;
        if(parCache.length>0){
            for(var i=0;i<parCache.length;i++){
                var o = parCache[i];
                o.parentNode.removeChild(o);
            }
            parCache = [];
        }
        var _hPara;
        for(I in d.params){
            _hPara = document.createElement('input');
            _hPara.type = 'hidden';
            _hPara.name = I;
            _hPara.value = d.params[I];
            form.appendChild(_hPara);
            parCache.push(_hPara);
        }
    }
    //初始化
    for(var i=0;i<tLen;i++){
        var chk = tArr[i].getAttribute('checked');
        if(chk){
            setForm(data[tArr[i].getAttribute('rel')]);
        }
    }
    for(var i=0;i<tLen;i++){
        var tab = tArr[i];
        tab.onclick = function(){
            var rel = this.getAttribute('rel');
            setForm(data[rel]);
        }
    }
    btn.onclick = function(){
        if($.trim(key.value) == ''){
            window.open(label.getAttribute('href'));
            return false;
        }
    }
};
//数据配置 Data
Page.Soso = {
    soso: {
        action: "http://www.soso.com/q",
        name: "w",
        btn: "\u641c\u641c",
        img: ["static/images/soso/logo_web_s.png", "\u641c\u641c"],
        url: 'http://www.soso.com/',
        params: {
        }
    },
    sogou: {
        action: "http://www.sogou.com/sogou",
        name: "query",
        url: "http://www.sogou.com/index.php?pid=sogou-site-daohang20141021",
        img: ["static/images/sogou/sogou.png","\u641c\u7d22"],
        btn: "\u641c\u7d22",
        params: {
            pid: "sogou-site-daohang20141021"
        }
    },
    google: {
        action: "http://www.google.com.hk/search",
        name: "q",
        url: "http://www.google.com.hk/",
        img: ["static/images/google/google.png","\u8c37\u6b4c"],
        btn: "Google",
        params: {
            client: "pub-0123456789",
            channel: "2000040001",
            forid: "1",
            prog: "aff",
            hl: "zh-CN",
            source: "sdo_sb_html",
            ie: "gb2312"
        }
    },
    taobao: {
        action: "http://search8.taobao.com/browse/search_auction.htm",
        name: "q",
        btn: "\u6dd8\u5b9d\u641c\u7d22",
        img: ["../static/images/taobao/taobao.png","\u6dd8\u5b9d\u7f51"],
        url: "http://pindao.huoban.taobao.com/channel/onSale.htm?pid=mm_13902122_6928505_26714536&mode=86",
        params: {
            pid: "mm_13902122_6928505_26714536",
            mode: "86",
            commend: "all",
            search_type: "action",
            user_action: "initiative",
            f: "D9_5_1",
            at_topsearch: "1",
            sid: "(05ba391dbdcada4634d4077c189eeef7)",
            sort: "",
            spercent: "0"
        }
    }
}
Page.SetHome = function(obj,hostname){
    if(!$.browser.msie){
        alert("您的浏览器不支持自动设置主页，请使用浏览器菜单手动设置。")
        return;
    }
    var host = hostname;
    if(!host){
        host = window.location.href;
    }
    obj.style.behavior = 'url(#default#homepage)';
    obj.setHomePage(host);
}
Page.goTop = function(){
    $("#JgoTop a").click(function() {
        var doc = $(document).find("html,body");
        if (doc.filter(":animated").size()) {
            doc.stop()
        }
        doc.animate({
            scrollTop: 0
        },
        600);
        return false;
    });
}
 