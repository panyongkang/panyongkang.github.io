title: 博客增加B站追番页面
author: PanXiaoKang
cover: https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2950647569,1131126252&fm=26&gp=0.jpg
tags:
  - 二次元
  - 哔哩哔哩
  - hexo-bilibili-bangumi
  - 番剧
categories:
  - 工具插件
date: 2021-02-05 14:26:00

---

## 哔哩哔哩番剧页面插件

博客使用了[hexo-bilibili-bangumi](https://github.com/HCLonely/hexo-bilibili-bangumi)，提供哔哩哔哩的个人番剧页的展示。

## 安装方式

### 安装

```
npm install hexo-bilibili-bangumi --save
```

### 更新

```
npm install hexo-bilibili-bangumi --update --sav
```

## 配置修改

### 站点配置文件修改

将下面的配置写入站点的配置文件 `_config.yml` 里(不是主题的配置文件).

```
# B站番剧页面插件
bangumi:
  enable: true
  path: bilibili/index.html
  vmid: 520059030
  title: '追番列表'
  quote: '生命不息，追番不止！'
  show: 1
  loading:
  metaColor:
  color:
  webp:
  progress:  
```

### 标签参数

|   标签    |                             说明                             |
| :-------: | :----------------------------------------------------------: |
|  enable   |                           是否启用                           |
|   path    |           番剧页面路径，默认是 bangumis/index.html           |
|   vmid    |                 哔哩哔哩番剧页面的 vmid(uid)                 |
|  title:   |                         该页面的标题                         |
|   quote   |             写在页面开头的一段话，支持 html 语法             |
|   show    |     初始显示页面：0: 想看 , 1: 在看 , 2: 看过，默认为 1      |
|  loading  |                图片加载完成前的 loading 图片                 |
| metaColor |                meta 部分 (简介上方) 字体颜色                 |
|   color   |                         简介字体颜色                         |
|   webp    | 番剧封面使用 webp 格式 (此格式在 safari 浏览器下不显示，但是图片大小可以缩小 100 倍左右), 默认 true |

## vmid 获取

登录哔哩哔哩后前往 https://space.bilibili.com/ 页面，网址最后的一串数字就是 vmid。

> 注意：追番列表需要设置为公开才行

## 使用

在 hexo generate 或 hexo deploy 之前使用命令更新番剧数据！

```
hexo bangumi -u
```

> 删除数据命令:hexo bangumi -d

### 配置在站点上
* 在 source 目录下新建一个文件夹
* 命名为 bilibili (自己随意起一个)
* 将配置文件里的 path 设置为 bilibili/index.html
* 在需要引入的地方引入 /bilibili/ 即可，例如放在导航栏：- 番剧 || /bilibili/ || fa fa-play-circle

`注意`：由于自定义path为`bilibili/index.html`，执行hexo g会在public文件下自动生成`bilibili/index.html`文件,不必到source文件下再次创建。