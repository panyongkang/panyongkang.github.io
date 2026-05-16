$(function () {
});
function opencommentweb(e){
    var url = $(e).attr('data-url');
    layer.confirm('我们无法确认该网页是否安全，它可能包含未知的安全隐患。', {
        btn: ['取消访问', '继续访问'], //按钮
        title: '访问提示',
    }, function () {
        layer.closeAll();
        return false;
    }, function () {
        var btn = $('.layui-layer-dialog').find('.layui-layer-btn');
        btn.find('.layui-layer-btn1').attr({
            href: url,
            target: '_blank'
        });
        return true;
    });
    return false;
}

function openweb(e) {
    var url = $(e).attr('data-url');
    layer.confirm('我们收录的网站保证安全，但不保证永久安全请您仔细查看谨慎辨别，建议您不要随意泄露账号密码等安全信息！', {
        btn: ['取消访问', '继续访问'], //按钮
        title: '访问提示',
    }, function () {
        layer.closeAll();
        return false;
    }, function () {
        var btn = $('.layui-layer-dialog').find('.layui-layer-btn');
        btn.find('.layui-layer-btn1').attr({
            href: url,
            target: '_blank'
        });
        return true;
    });
    return false;
}