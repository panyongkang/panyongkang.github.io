title: Hexo博客功能添加
author: PanXiaoKang
tags: [Hexo功能]
categories: [Hexo博客]
cover: https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2010232996,1620516668&fm=26&gp=0.jpg
date: 2020-04-25 14:55:00

---

### 文章打赏

    在每篇文章的结尾有打赏的按钮，需要把收款图片复制到themes主题下的Butterfly\source\img文件夹中

    相关配置在Butterfly主题的_config.yml中
	# 打賞按鈕
	reward:
	  enable: true
	  QR_code:
	    - itemlist:
	        img: /img/wechat.jpg
	        text: 微信
	    - itemlist:
	        img: /img/alipay.jpg
	        text: 支付宝

### 文章加密

**安装**

在 hexo 根目录的 package.json 中添加 `<code>`"hexo-blog-encrypt": "1.1.*"`</code>` 依赖。
然后执行 **npm install** 命令（失败时可以 **cnpm install** 命令下载）。
该插件会自动安装

快速开始

* 首先在 _config.yml 中启用该插件:

```
# Security 设置加密
encrypt:
    enable: true
```

* 在需要加密的文章的头部加上对应的字段，如 password, message

```
title: XXXX项目
author: PanXiaoKang
tags:

  - XXX
  - XX笔记
    categories:
  - XXX
    date: 2020-04-18 23:26:00
  
message: 您好，本篇文章需密码访问，请谅解！
password: 设置自己的密码

```

### ICP备案国徽图标显示

    1.修改主题配置文件themes/Butterfly/_config.yml的ICP属性，为其添加国徽图标的路径pic：

```
ICP:  
  enable: ture  
  pic: /img/beian.png  #备案国徽小图路径  
  url: http://www.beian.gov.cn  
  text: 黔ICP备12345678号  

```

    2.修改themes/Butterfly/layout/includes/footer.pug该文件内代码

```
if theme.ICP.enable
    .icp
      a(href=theme.ICP.url)
        if theme.ICP.icon
          img.icp-icon(src=url_for(theme.ICP.icon))
        span=theme.ICP.text
```

### 友情链接添加

在 Hexo 博客目录中的 source/_data，创建一个文件 link.yml，代码如下：

```
class:
  class_name: 友情链接
  link_list:
    1:
      name: 刘向洋博主
      link: https://liuxiangyang.space/
      avatar: https://cdn.jsdelivr.net/gh/LiuXiangYang-Git/cloudimg/img-2/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20200408193536.jpg
      descr: Butterfly
    2:
      name: JerryC博主
      link: https://jerryc.me/
      avatar: https://yafine-blog.cn/medias/avatar.jpg
      descr: Butterfly
    3:
      name: Athink博主
      link: https://blog.onfree.cn/
      avatar: https://cdn.maxbill.cn/blog/img/avatar.png
      descr: 导航收藏
    4:
      name: 小破枪的书房
      link: https://pistol.city/
      avatar: https://i.loli.net/2020/02/09/IuJO45MXhRbQcrL.jpg
      descr: 结绳记事
    5:
      name: 程序羊
      link: https://www.codesheep.cn/
      avatar: https://www.codesheep.cn/css/images/codesheep_logo_heart.jpg
      descr: 知识星球
    6:
      name: CloudAndBoy
      link: https://www.clboy.cn/
      avatar: https://www.clboy.cn/upload/2019/9/cloudlandboy_big-9fd24c92e6044b04a6a64b0206bea4c1.png
      descr: 我的笔记

class2:
  class_name: 实用链接
  link_list:
    1:
      name: 喵喵博主
      link: https://sh.alynx.one/
      avatar: https://sh.alynx.one/images/FutureGazerSmall.webp
      descr: StackHarbor
    2:
      name: 试毅-思伟
      link: https://zhousiwei.gitee.io/
      avatar: https://zhousiwei.gitee.io/img/head.jpg
      descr: 特效简历
    3:
      name: Sanarous博主
      link: https://bestzuo.cn/
      avatar: https://site-1258928558.cos.ap-guangzhou.myqcloud.com/touxiang.jpg
      descr: 码农人生
```

### 如何引入图片

Hexo 有多种图片插入方式，可以将图片存放在本地引用或者将图片放在 CDN 上进行引用。

### 本地引用-绝对路径

我们可以将图片统一放在 source/images 文件夹中，通过 Markdown 语法访问它们:

```
![图片](https://media.5yun.org/images/image_name.jpg)
```

然后渲染出来的话也是绝对路径：

```
<img src="/images/image.jpg">
```

#### 本地引用-相对路径

图片除了可以放在统一的 images 文件夹中，还可以放在文章自己的目录中。文章的目录可以通过配置 _config.yml 来生成:

```
# _config.yml
post_asset_folder: true
```

将 _config.yml 文件中的配置项 post_asset_folder 设为 true 后，执行命令 $ hexo new post_name，在 source/_posts 中会生成文章 post_name.md 和同名文件夹 post_name。将图片资源放在 post_name 中，文章就可以使用相对路径引用图片资源了。

```
![图片](image_name.jpg)
```

**注意：放入文章的图片要放在与文章名对应的文件夹名才能显示。**

#### 图片命名

图片命名是一件很重要的事，因为如果命名不好，后期维护起来会比较麻烦；而我推荐的命名方式是 hexo_{function}_{id}，图片都放在 source/images 文件夹中：
hexo_post_1: 表示这张图片被用在了文章中，1 是这张图片的id，依顺序递增
hexo_thumbnail_1: 表示这张图片被用在了文章缩略图中，id 含义同上
hexo_others_1: 表示这张图片既没有被用在文章中也不是文章缩略图，id 含义同上

### hexo引入本地图片无法显示

#### 一、插件安装与配置

首先需要安装一个图片路径转换的插件，这个插件名字是hexo-asset-image

```
npm install https://github.com/CodeFalling/hexo-asset-image --save
```

但是这个插件的内容需要修改【不然可能会出Bug】

打开/node_modules/hexo-asset-image/index.js，将内容更换为下面的代码

```
'use strict';
var cheerio = require('cheerio');

// http://stackoverflow.com/questions/14480345/how-to-get-the-nth-occurrence-in-a-string
function getPosition(str, m, i) {
  return str.split(m, i).join(m).length;
}

var version = String(hexo.version).split('.');
hexo.extend.filter.register('after_post_render', function(data){
  var config = hexo.config;
  if(config.post_asset_folder){
    	var link = data.permalink;
	if(version.length > 0 && Number(version[0]) == 3)
	   var beginPos = getPosition(link, '/', 1) + 1;
	else
	   var beginPos = getPosition(link, '/', 3) + 1;
	// In hexo 3.1.1, the permalink of "about" page is like ".../about/index.html".
	var endPos = link.lastIndexOf('/') + 1;
    link = link.substring(beginPos, endPos);

    var toprocess = ['excerpt', 'more', 'content'];
    for(var i = 0; i < toprocess.length; i++){
      var key = toprocess[i];
 
      var $ = cheerio.load(data[key], {
        ignoreWhitespace: false,
        xmlMode: false,
        lowerCaseTags: false,
        decodeEntities: false
      });

      $('img').each(function(){
		if ($(this).attr('src')){
			// For windows style path, we replace '\' to '/'.
			var src = $(this).attr('src').replace('\\', '/');
			if(!/http[s]*.*|\/\/.*/.test(src) &&
			   !/^\s*\//.test(src)) {
			  // For "about" page, the first part of "src" can't be removed.
			  // In addition, to support multi-level local directory.
			  var linkArray = link.split('/').filter(function(elem){
				return elem != '';
			  });
			  var srcArray = src.split('/').filter(function(elem){
				return elem != '' && elem != '.';
			  });
			  if(srcArray.length > 1)
				srcArray.shift();
			  src = srcArray.join('/');
			  $(this).attr('src', config.root + link + src);
			  console.info&&console.info("update link as:-->"+config.root + link + src);
			}
		}else{
			console.info&&console.info("no src attr, skipped...");
			console.info&&console.info($(this));
		}
      });
      data[key] = $.html();
    }
  }
});

```

打开_config.yml文件，修改下述内容

```
post_asset_folder: true
```

### Markdown 中插入图片

如果想固定图片尺寸，可以插入 HTML 代码：

```
<img src="./xxx.png" width = "300" height = "200" alt="图片名称"/>
```

如果只需要居中的话只要在外面包围 div 标签即可：

```
<div  align="center">  
![图片名称](./xxx.png)
</div>
```

#### hexo-renderer-marked@5.0.0插件使用

由于hexo-asset-image插件已经停止维护，有时候想使用img自定义样式展示图片，可通过卸载并安装此插件进行调整。

##### 安装命令

```bash
npm uninstall hexo-asset-image --save
npm install hexo-renderer-marked@5.0.0 --save
```

##### 使用方法

```
本地写法可见：
![满屏气球特效](前端代码片段/1740881813739.png)

<img src="前端代码片段/1740881813739.png" alt="满屏特效" tyle="height:300px;border:1px solid #ddd;">

部署写法可见：
![满屏气球](1740881813739.png)
<img src="{% asset_path 1740881813739.png %}" alt="满屏气球特效" title="满屏气球特效" style="max-width: none; height:300px;">

```

##### 注意事项

* 目前本地预览与部署展示无法同时展示，可能需要单独配置样式，稍微比较麻烦，暂时懒得去研究了。
* 使用此插件之后原来默认的 `![](dir/img.png)![]` 写法不再生效，必须是 `![内容描述](dir/img.png)`。否则无法图片展示。

### 文章封面

文章的 markdown 文档上，在 Front-matter 添加 cover, 并填上要显示的图片地址。
如果不配置 cover, 可以设置显示默认的 cover.

如果不想在首页显示 cover, 可以设置为 false

配置 butterfly主题的_config.yml

```
cover:
  # 是否顯示文章封面
  index_enable: true
  aside_enable: true
  archives_enable: true
  # 封面顯示的位置
  # 三個值可配置 left , right , both
  position: both
  # 當沒有設置cover時，默認的封面顯示
  default_cover:
    - /img/post.jpg
    - /img/butterfly.jpg
```

**注意：目前只能使用命令创建文章**

$ hexo new 文章名
生成Front-matter的表头

```
title: Hexo博客功能添加整理
author: PanXiaoKang
tags:
  - Hexo功能
categories:
  - Hexo博客
date: 2020-04-14 14:55:00

cover:  http://img1.imgtn.bdimg.com/it/u=3317212999,718739958&fm=26&gp=0.jpg

---
```

然后在md文件里添加cover的图片路径地址
完成之后就可以看到封面图片了。

### 添加音乐歌单

安装此插件
hexo-tag-aplayer 将 APlayer 内嵌入博客页面的 Hexo 插件

```
$ npm install --save hexo-tag-aplayer
```

MetingJS 是基于Meting API 的 APlayer 衍生播放器，引入 MetingJS 后，播放器将支持对于 QQ音乐、网易云音乐、虾米、酷狗、百度等平台的音乐播放。

如果想在本插件中使用 MetingJS，请在 Hexo 配置文件 _config.yml 中设置：

```
aplayer:
    meting: true
```

怎么获取歌曲，歌单id(以网易云音乐为例)：

打开网易云官网，进入我的主页，选择自己的歌单，复制URL栏上的id。

博客中如何使用
在music文件夹下的index.md,编辑此文件
或者直接登录Hexo Admin在线输入下面的代码模板即可：

单曲添加：

```
{% meting "网易音乐id" "netease" "song" "theme:#555" "mutex:true" "listmaxheight:340px" "preload:auto" %}
```

歌单添加：

```
{% meting "2505260244" "netease" "playlist" "volume:0.5" "theme:#FF4081" "mode:circulation" "mutex:true" "listmaxheight:340px" "preload:auto" %}
```

配置好之后就能看到播放器了
注意：如果还没有，则需要重新hexo clean & hexo g -d 后就能在页面中显示了

有关选项列表说明：

| 选项          | 默认值       | 描述                                                               |
| ------------- | ------------ | ------------------------------------------------------------------ |
| id            | 必须值       | 歌曲 id / 播放列表 id / 相册 id / 搜索关键字                       |
| server        | 必须值       | 音乐平台:`netease`, `tencent`, `kugou`, `xiami`, `baidu` |
| type          | 必须值       | `song`, `playlist`, `album`, `search`, `artist`          |
| fixed         | `false`    | 开启固定模式                                                       |
| mini          | `false`    | 开启迷你模式                                                       |
| loop          | `all`      | 列表循环模式：`all`, `one`,`none`                            |
| order         | `list`     | 列表播放模式：`list`, `random`                                 |
| volume        | 0.5          | 播放器音量                                                         |
| lrctype       | 0            | 歌词格式类型                                                       |
| listfolded    | `false`    | 指定音乐播放列表是否折叠                                           |
| storagename   | `metingjs` | LocalStorage 中存储播放器设定的键名                                |
| autoplay      | `true`     | 自动播放，移动端浏览器暂时不支持此功能                             |
| mutex         | `true`     | 该选项开启时，如果同页面有其他 aplayer 播放，该播放器会暂停        |
| listmaxheight | `340px`    | 播放列表的最大长度                                                 |
| preload       | `auto`     | 音乐文件预载入模式，可选项：`none`, `metadata`, `auto`       |
| theme         | `#FF4081`  | 播放器风格色彩设置                                                 |

### 使用明月浩空播放器

在music文件夹下的index.md直接添加如下代码：

```
<script src="https://lib.baomitu.com/jquery/3.3.1/jquery.min.js"></script>
```

中间是内容或者歌单列表

```
<script src="https://player.lmih.cn/player/js/player.js" id="myhk" key="158720204358" m="1"></script>
```

注意：在创建顶级域名时可以随便写，但只能在如IIS服务器本地可以调用播放器音乐接口，上传到个人博客或者个人网站时需要和网站域名对应才能调用，否则提示“请检查域名设置”的错误，歌曲无法调用播放。

### 随机文章跳转

在Hexo博客根目录下themes/Butterfly/scripts(没有请自行创建)下新建 random.js 文件，内容如下：

```
hexo.extend.generator.register('random', function (locals) {
  const config = hexo.config.random || {}
  const posts = []
  for (const post of locals.posts.data) {
    if (post.random !== false) posts.push(post.path)
  }
  return {
    path: config.path || 'random/index.html',
    data: `<html><head><script>var posts=${JSON.stringify(posts)};window.open('/'+posts[Math.floor(Math.random() * posts.length)],"_self")</script></head></html>`
  }
})

```

可选配置：

在Butterfly主题下的_config.yml 添加以下配置：

```
random:
  path: # 随机链接路径，默认"random/index.html"
```

然后在导航菜单修改menu中添加菜单：

```
随机文章: /random/ || fa fa-random
```

如果不想随机跳转到某篇文章，只需在这篇文章 Front-matter 添加 random: false

配置完成后重新hexo+g生成即可生效。

### 本地搜索

1. 安装 [hexo-generator-search](https://github.com/wzpan/hexo-generator-search)，根据文档做对应配置
2. 配置 _config.yml

```
local_search:
  enable: true
  labels:
    input_placeholder: 试试看能找到啥宝藏吧!
    hits_empty: "客官，本店还未提供该服务: ${query}" # if there are no result
```

3. 然后重新hexo g 生成即可。

### 评论系统

1. [点击leancloud服务注册](https://leancloud.cn/dashboard/data.html?appid=fp5mCOihCGkpqjlVm6R7eQqk-gzGzoHsz#/)  Hexo能支持很多评论系统，但是leancloud这个最舒服，最方便。[详情点击](https://blog.thatwang.com/2019/11/06/Hexo%E5%AE%89%E8%A3%85%E5%9F%BA%E6%9C%AC%E7%82%B9/#%E8%AF%84%E8%AE%BA)
2. 在使用的主题下配置 _config.yml，开启valine为true。

```
valine:
  enable: true # if you want use valine,please set this value is true
  appId: 在配置中心查看复制 # leancloud application app id
  appKey: 在配置中心查看复制 # leancloud application app key
  notify: false # valine mail notify (true/false) https://github.com/xCss/Valine/wiki
  verify: false # valine verify code (true/false)
  pageSize: 10 # comment list page size
  avatar: monsterid # gravatar style https://valine.js.org/#/avatar
  lang: en # i18n: zh-cn/en
  placeholder: 来吧，造作吧，快活吧，肆无忌惮吧！(～￣▽￣)～ # valine comment input placeholder(like: Please leave your footprints )
  guest_info: nick,mail,link #valine comment header info
  recordIP: false # Record reviewer 
  serverURLs: # This configuration is suitable for domestic custom domain name users, overseas version will be automatically detected (no need to manually fill in)
  bg: /img/comment_bg.png # valine background
  count: true # top_img显示评论数
  
```

### 评论打字效果

配置_config.yml:

```
#打字效果
activate_power_mode:
  enable: true
  colorful: true # 冒光特效
  shake: false # 抖动特效

```

### 页脚显示网站运行时间

编辑博客根目录/themes/Butterfly/layout/includes/footer.pug 文件，在最后 span=theme.ICP.text 下一行添加以下内容：

```
#running-time
  script.
    setInterval(()=>{let create_time=Math.round(new Date(Date.UTC(2020,01,03,0,0,0)).getTime()/1000);let timestamp=Math.round((new Date().getTime()+8*60*60*1000)/1000);let second=timestamp-create_time;let time=new Array(0,0,0,0,0);if(second>=365*24*3600){time[0]=parseInt(second/(365*24*3600));second%=365*24*3600;}if(second>=24*3600){time[1]=parseInt(second/(24*3600));second%=24*3600;}if(second>=3600){time[2]=parseInt(second/3600);second%=3600;}if(second>=60){time[3]=parseInt(second/60);second%=60;}if(second>0){time[4]=second;}currentTimeHtml='本站已安全运行 '+time[0]+' 年 '+time[1]+' 天 '+time[2]+' 时 '+time[3]+' 分 '+time[4]+' 秒';document.getElementById("running-time").innerHTML=currentTimeHtml;},1000);
```

<div class="note warning">
<p>注意<code>#running-time</code> 与上面的 <code>if theme.ICP.enable</code> 对齐！
<br>要将 <code>Date.UTC(2020,01,03,0,0,0)</code> 改为你网站的起始时间！
</p>
</div>

### 修改鼠标样式

找到blog\themes\Butterfly\source\css\index.styl文件加上下面代码,url可替换为自己的。来自GamerNoTitle的支持

* 样式一

```
/**普通指针样式**/
body 
  cursor url('https://cdn.jsdelivr.net/gh/sviptzk/HexoStaticFile@latest/Hexo/img/default.cur'),default
/**链接指针样式**/
a 
  &:hover 
    cursor url('https://cdn.jsdelivr.net/gh/sviptzk/HexoStaticFile@latest/Hexo/img/pointer.cur'),pointer
```

* 样式二

```
/**普通指针样式**/
body 
  cursor url('https://cdn.jsdelivr.net/gh/TRHX/CDN-for-itrhx.com@1.0/images/mouse.cur'),default
/**链接指针样式**/
a 
  &:hover 
    cursor url('https://cdn.jsdelivr.net/gh/TRHX/CDN-for-itrhx.com@1.0/images/mouse.cur'),pointer
```

### 全局引入鼠标**跟随特效

效果如图所示：
![图片](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L2doL2Jsb2dpbWcvSGV4b1N0YXRpY0ZpbGUyQGxhdGVzdC8yMDIwLzA1LzIwLzJjNTQwNDNjNDVkN2QwMWJlNzNlM2E0ZDkzZGRhOTYzLnBuZw?x-oss-process=image/format,png)

打开butterfly主题的_config.yml配置文件，找到CDN_USE然后引入js代码即可。

```
# CDN
# 网站必须
# 可根据需要自行添加js/css
CDN_USE:
  css:
    - /css/index.css

  js:
    - https://cdn.jsdelivr.net/gh/sviptzk/HexoStaticFile@latest/Hexo/js/mouse_snow.min.js #全局引入鼠标**跟随的特效
```

网站引入的话在< head></ dead>标签里面插入即可。

```
<!--引入鼠标**跟随的特效-->
<script src="https://cdn.jsdelivr.net/gh/sviptzk/HexoStaticFile@latest/Hexo/js/mouse_snow.min.js"></script>

```

### 彩色滚动条

在\Butterfly\source\css路径下创建zdy.css文件，将下面代码保存并引入到Buttersly下面的_config.yml文件中即可。

引入zdy.css文件的位置：

```
CDN_USE:
  css:
    - /css/index.css 
    - /css/zdy.css #设置滚动条等自定义的CSS元素
```

zdy.css文件需要写入的代码：

```
/* 滚动条 */
::-webkit-scrollbar {
  width: 10px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background-color: rgba(73, 177, 245, 0.2);
  border-radius: 2em;
}

::-webkit-scrollbar-thumb {
  background-color: #49b1f5;
  background-image: -webkit-linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.4) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.4) 50%,
    rgba(255, 255, 255, 0.4) 75%,
    transparent 75%,
    transparent
  );
  border-radius: 2em;
}

::-webkit-scrollbar-corner {
  background-color: transparent;
}

::-moz-selection {
  color: #fff;
  background-color: #49b1f5;
}
```

`<code style="color:red;">`注意：夜间模式的时候无法显示彩色滚动条的颜色，切换到浅色模式就能看见了。可能与夜间模式的index.css里面的元素冲突了，暂时未找到修改方案。`</code>`

### 添加宠物动画模型

* 安装插件

hexo根目录选择git bash 输入以下代码，安装插件

```
cnpm install --save hexo-helper-live2d
```

* 下载动画
  作者[动画预览](https://huaji8.top/post/live2d-plugin-2.0/)

```
live2d-widget-model-chitose
live2d-widget-model-epsilon2_1
live2d-widget-model-gf
live2d-widget-model-haru/01 (use npm install --save live2d-widget-model-haru)
live2d-widget-model-haru/02 (use npm install --save live2d-widget-model-haru)
live2d-widget-model-haruto
live2d-widget-model-hibiki
live2d-widget-model-hijiki
live2d-widget-model-izumi
live2d-widget-model-koharu
live2d-widget-model-miku
live2d-widget-model-ni-j
live2d-widget-model-nico
live2d-widget-model-nietzsche
live2d-widget-model-nipsilon
live2d-widget-model-nito
live2d-widget-model-shizuku
live2d-widget-model-tororo
live2d-widget-model-tsumiki
live2d-widget-model-unitychan
live2d-widget-model-wanko
live2d-widget-model-z16
```

* 安装
  选好对应的模型，使用 npm install 模型的包名来安装，比如我选择的的是live2d-widget-model-ni-j 模型包，在hexo博客根目录选择git bash 输入以下代码 `<code>`$ npm install live2d-widget-model-tororo `</code>` ，执行安装就完事了。
* 配置文件
  打开Hexo根目录下的 _config.yml文件，在最后添加代码（直接复制不需要更改，第一行不需要空格）

```
live2d:
  enable: true
  scriptFrom: local
  pluginRootPath: live2dw/
  pluginJsPath: lib/
  pluginModelPath: assets/
  tagMode: false
  debug: false
  model:
    use: live2d-widget-model-tororo
  display:
    position: right
    width: 150
    height: 300
  mobile:
    show: true
```

### 添加视频插件

方法一：可以在[B站官网](https://www.bilibili.com/)上面找到喜欢的视频，点击分享按钮，复制分享的嵌入代码,然后在movie文件夹下的index.md文件直接粘贴如下代码：

```
<iframe src="//player.bilibili.com/player.html?aid=74128420&bvid=BV1eE41187ny&cid=126790035&page=6" scrolling="no" border="0" width="100%" height="300px" frameborder="no" framespacing="0" allowfullscreen="true" style="border:3px solid #009ad6;border-radius:45px"> </iframe>

```

方法二：也可以嵌入同比例缩小的视频网站代码，以下是根据自己网页布局进行修改的，在movie文件夹下的index.md文件直接粘贴：

```

<!DOCTYPE HTML>
<html>
<body>
<style>
	.iframe-body-sty{position: relative;overflow: hidden;height:600px;width: 100%;background-color: #145b7d;border-radius:25px;}
	.iframe-body-sty>#iframe-shrink{position: absolute;transform:scale(0.55);left: -300px;top: -190px;}
</style>
<div class="iframe-body-sty" >
	<iframe id="iframe-shrink" src="http://www.mvcat.com/" width="1400px" height="980px" style="border-radius:10px" ></iframe>
</div>
 
</body>
</html>

```

保存后就可以在博客上观看视频啦！
