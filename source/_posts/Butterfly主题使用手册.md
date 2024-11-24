title: Butterfly主题使用手册
author: PanXiaoKang
cover: https://cdn.pixabay.com/photo/2017/05/13/03/26/professor-2308610_1280.jpg
tags:

  - Butterfly主题

categories:

  - Hexo博客

date: 2020-04-26 10:02:00

---

本篇文章只记录自己平时使用到的主题设置内容，详情可参考[传送门](https://jerryc.me/posts/4aa8abbe/#%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6%E8%AA%AC%E6%98%8E)

## 文件头

### Page Front-matter

| 属性        | 描述                                                |
| ----------- | --------------------------------------------------- |
| title       | 标题                                                |
| date        | 日期                                                |
| type        | 类型，tags,link,categories 这三个页面需要配置       |
| comments    | 是否显示评论，默认 true                             |
| description | 描述                                                |
| top_img     | 顶部图                                              |
| aside       | true 表示显示右边信息卡片，默认值；false 表示不显示 |

### Post Front-matter

| 属性       | 描述                                     |
| ---------- | ---------------------------------------- |
| title      | 标题                                     |
| date       | 时间                                     |
| tags       | 标签                                     |
| categories | 分类                                     |
| top_img    | 顶部图，除非特定需要，可以不写           |
| comments   | 是否显示评论（除非设置 false, 可以不写） |
| cover      | 缩略图（文章封面）                       |
| top        | 文章置顶 (true,false)                    |
| hide       | 是否隐藏（true，false）                  |

## 文章置頂

给文章置顶所需步骤：

1. 打开hexo根目录执行Git Bash Here窗口
2. 首先执行 npm uninstall hexo-generator-index --save
3. 然后再 npm install hexo-generator-index-pin-top --save
4. 最后在文章的front-matter区域添加 top:true即可文章置顶
5. 记得hexo clean + hexo g 才能生效

## 鼠标点击效果

配置butterfly主题下的_config.yml，将enbale值改为true即可开启：

```
# 为避免卡顿，建议只开一个
# 点击火焰特效
fireworks:
  enable: true

# 点击爱心特效
click_heart:
  enable: false
  
# 点击出现文字，文字可自行修改
ClickShowText:
  enable: true
  text:
    - 最近有点失眠
    - 每天被自己帅醒
    - 帅哥的烦恼
    - 凡人不懂
    - 富强
    - 民主
    - 文明
    - 和谐
    - 自由
    - 平等
    - 公正
    - 法治
    - 爱国
    - 敬业
    - 诚信
    - 友善
  fontSize: 30px
```

## 美化页面显示

```
beautify:
  enable: true
  title-prefix-icon: '\f0c1'
  title-prefix-icon-color: "#F47466"
```

## 跟随鼠标线条

配置 _config.yml

```
canvas_nest:
  enable: true
  color: '0,0,255' #color of lines, default: '0,0,0'; RGB values: (R,G,B).(note: use ',' to separate.)
  opacity: 0.7 # the opacity of line (0~1), default: 0.5.
  zIndex: -1 # z-index property of the background, default: -1.
  count: 99 # the number of lines, default: 99.
  mobile: false #  false 手机端不显示 true 手机端显示
```

## 动态彩带背景

配置 _config.yml

```
canvas_ribbon_piao:
  enable: true
  mobile: false # false 手機端不顯示 true 手機端顯示
```

## 首页弹幕座右铭

配置 _config.yml

```
# 主頁弹幕座右铭
subtitle:
  enable: true
  # 打字效果
  effect: true
  # 循环
  loop: true
  source: false
  # (如果有英文逗号' , '，請使用转义字符 ,)
  # 如果关闭打字效果，subtitle只会显示sub的第一行文字
  sub:
    - 世间安得双全法，不负韶华不负卿！
    - 近水楼台先得月，向阳榆木易逢春！
```
