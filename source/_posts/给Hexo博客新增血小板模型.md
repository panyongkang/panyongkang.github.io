title: 给Hexo博客新增血小板模型
top: true
cover: https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=234003937,2734421640&fm=26&gp=0.jpg
author: PanXiaoKang
tags:

- 血小板
- live 2D
- 模型
categories:
- 模型库
date: 2021-01-03 01:00:00

---

## 下载模型文件

血小板模型[资源包](https://cdn.imjad.cn/usr/uploads/kesshouban_v2.7z)，首先点击资源包，下载血小板的模型文件。

## 修改模型文件

该血小板模型在Hexo博客之前安装的 `hexo-helper-live2d`插件中是没有的，需要自己先下载模型文件，上传到npm,再安装到博客中。可根据原来配置的 `live2d-widget-model-unitychan`模型文件目录进行修改，让该模型在hexo博客中能够使用。把血小板的文件结构梳理成和 `unitychan`的一样，然后再进行安装操作。

## 安装模型

先将模型发布到 npm，再从npm下载到博客配置应用。具体步骤如下：

1. 本地新建一个目录命名为 `live2d-widget-model-platelet`, 右键点击 `Git Bash Here`,用已安装的 Node 环境执行 npm init, 推荐使用 live2d-widget-model-xxx 的包名。
2. 在刚刚创建的 `live2d-widget-model-platelet`目录下创建 `assets` 子目录, 把`<code style="color:green">`修改好的模型文件`</code>`放进去。
3. 使用 `npm publish`进行发布。
4. 然后使用 npm install live2d-widget-model-xxx 来安装。
5. 通过向 model.use 键入包名 (live2d-widget-model-xxx) 来使用。

## 开发并发布一个npm包

注意：在进行npm publish发布之前必须先进行 [npm官网](https://www.npmjs.com/)注册。否则上面第3步骤会出现404 错误。

发布教程如下：

1. 创建自己的npm包，如上面第2步骤已经创建和修改好文件目录，执行 `npm init`命令的目的是生成 `package.json`文件，可以看到文件中包含了我们刚才填写的信息：

   ```
   {
     "name": "live2d-widget-model-plt",
     "version": "1.0.0",
     "description": "live2d-widget-model-plt",
     "main": "index.js",
     "scripts": {
       "test": "echo \"Error: no test specified\" && exit 1"
     },
     "keywords": [
       "live2d-widget-model-plt"
     ],
     "author": "panyongkang", //这里就是事先在npm官网注册的账号名称
     "license": "ISC"
   }
   ```

   因为目录名称和路径已改变，还要修改一下 `platelet.model.json` 文件的内容:

   ```
   {
   	"type": "Live2D Model Setting",
   	"name": "live2d-widget-model-platelet",
   	"model": "moc/platelet.moc",
   	"textures": [
   		"moc/platelet.2048/texture_00.png"
   	],
   	"motions":{
   		"idle":[
   			{"file":"mtn/Idle.mtn"}
   		],
           "sleepy":[
               {"file":"mtn/Nemui.mtn"}
           ],
   		"flick_head":[
   			{"file":"mtn/Anone_Synced.mtn"}
   		],
   		"tap_body":[
   			{"file":"mtn/Dance.mtn"}
   		]
   	}
   }
   ```
2. 发布npm包的准备命令如下：

- 添加账号

```
npm adduser // 输入自己注册的npm账号名称、密码、邮箱
```

- 登录npm

```
npm login // 输入账号、密码、邮箱，登录后方可发包
```

- 发布包

```
npm publish
```

- 取消发布

```
npm unpublish [--force] // 不成功可以强制取消
```

3. 查看发布的包

   登录[npm官网](https://www.npmjs.com/) ，即可看到刚才发布的包，如果网不是很好，可能等一会才能看到。

   `<span style="color:red;">`注意：执行 `npm publish`命令可能会报403无权发布的错误，很可能是 `package.json`文件的包名 `live2d-widget-model-plt`与其他人发布的重复了，要改成没有重名的重新发布就好了。当再次发布新包或更新包时，如果报502 等代理错误，需要将代理关闭，关闭网络重新连接，等待10分钟左右（也许不用那么久）就可以重新上传包了。

## 向博客添加模型

以上工作都准备完成之后，就可以在Hexo博客根目录执行 `cnpm install live2d-widget-model-plt`命令进行下载安装了，可以通过node_modules文件中查看是否下载成功，接下来在Hexo博客的_config.yml文件中将 `unitychan`模型改为自定义npm模型即可：

```
# 设置宠物模型
live2d:
  enable: true
  scriptFrom: local
  pluginRootPath: live2dw/
  pluginJsPath: lib/
  pluginModelPath: assets/
  tagMode: false
  debug: false
  model:
    use: live2d-widget-model-plt  //在这里改成自己的血小板模型的包名即可。
  display:
    position: right
    width: 130
    height: 280
  mobile:
    show: true
```

## 干物妹小埋模型

干物妹小埋的[资源包](https://file.sword.studio/typecho%E6%8F%92%E4%BB%B6/umaru.zip) 是基于Typecho博客的模型，与Hexo博客不兼容，因此也需要修改后使用。

修改的干物妹小埋模型也上传了[npm](https://www.npmjs.com/)官网，需要使用的可以直接 `cnpm i live2d-widget-model-umaru`命令下载即可，当然也可以下载资源包自行修改，因为资源包涉及了声音的设置，不过能力有限，尚未调试成功，后续可能持续会更新。。

## 伊斯特瓦尔模型

经过某大佬修改后可通过网络直接引入到网站中使用，简直无脑复制粘贴呀！该模型可自由拖动哦！

引入CSS：

```
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/ahzoa/Live2d-Histoire@latest/JSD/css/live2d.css">
```

引入Html：

```
<!-- 伊斯特瓦尔模型 start -->
<div id="landlord" style="left:5px;bottom:0px;">
    <div class="message" style="opacity:0"></div>
    <canvas id="live2d" width="500" height="560" class="live2d"></canvas>
    <!--添加聊天窗口-->
    <div class="live_talk_input_body">
    	<div class="live_talk_input_name_body">
        	<input name="name" type="text" class="live_talk_name white_input" id="AIuserName" autocomplete="off" placeholder="你的名字" />
        </div>
        <div class="live_talk_input_text_body">
        	<input name="talk" type="text" class="live_talk_talk white_input" id="AIuserText" autocomplete="off" placeholder="要和我聊什么呀？"/>
            <button type="button" class="live_talk_send_btn" id="talk_send">发送</button>
        </div>
    </div>
    <!--主体部分-->
    <input name="live_talk" id="live_talk" value="1" type="hidden" />
    <div class="live_ico_box">
    	<div class="live_ico_item type_info" id="showInfoBtn"></div>
    	<div class="live_ico_item type_talk" id="showTalkBtn"></div>
        <div class="live_ico_item type_music" id="musicButton"></div>
        <div class="live_ico_item type_youdu" id="youduButton"></div>
        <div class="live_ico_item type_quit" id="hideButton"></div>
        <input name="live_statu_val" id="live_statu_val" value="0" type="hidden" />
        <audio src="" style="display:none;" id="live2d_bgm" data-bgm="0" preload="none"></audio>
        <!--添加音乐-->
       	<input name="live2dBGM" value="https://www.joy127.com/url/80307.mp3" type="hidden">
        <input name="live2dBGM" value="mp3音乐地址" type="hidden"><!--可添加多条音乐-->
        <input id="duType" value="douqilai,l2d_caihong" type="hidden">
    </div>
</div>
<div id="open_live2d">召唤伊斯特瓦尔</div>
<!-- 伊斯特瓦尔模型 end -->
```

引入JS：

```
<script type="text/javascript" src="https://apps.bdimg.com/libs/jquery/1.7.1/jquery.min.js"></script>
<script>
var message_Path = 'https://cdn.jsdelivr.net/gh/ahzoa/Live2d-Histoire@latest/JSD/';
var talkAPI = "";
</script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/ahzoa/Live2d-Histoire@latest/JSD/js/live2d.js"></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/ahzoa/Live2d-Histoire@latest/JSD/js/message.js"></script>
```

## 夏日美女模型

```
<!------ 用于存放Live2d模型的元素，位置可自定义 ------>
<div class="Canvas" style="position: fixed; right: 10px; bottom: 10px;z-index: 99999999" id="L2dCanvas"></div>
<!------ 依赖 JS ------>
<!---- 可选 ---->
<!-- 兼容低版本浏览器 -->
<script src="https://cdn.jsdelivr.net/npm/promise-polyfill@8/dist/polyfill.min.js"> </script>
<!-- 音频播放兼容 -->
<script src="https://cdn.jsdelivr.net/npm/howler@2.1.3/dist/howler.min.js"></script>
<!---- 必需 ---->
<script src="https://cubism.live2d.com/sdk-web/cubismcore/live2dcubismcore.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/pixi.js@4.6.1/dist/pixi.min.js"></script>
<!-- live2dv3.js -->
<script src="https://cdn.jsdelivr.net/npm/live2dv3@1.2.2/live2dv3.min.js"></script>
<!------ 加载Live2d模型 ------>
<script>
window.onload = () => {
    new l2dViewer({
        el: document.getElementById('L2dCanvas'), // 要添加Live2d的元素
        basePath: 'https://cdn.jsdelivr.net/gh/HCLonely/Live2dV3/assets', // 模型根目录
        modelName: 'biaoqiang_3', // 模型名称
        sounds: [ // 触摸播放声音
            'sounds/demo.mp3', // 相对路径是相对于模型文件夹
            'https://cdn.jsdelivr.net/npm/live2dv3@latest/assets/biaoqiang_3/sounds/demo.mp3' // 也可以是网址
        ]
    })
}
</script>
```
