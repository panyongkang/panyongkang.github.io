title: Github+PicGo+Typora搭建个人图床
author: PanXiaoKang
cover: https://cdn.jsdelivr.net/gh/qqlcx5/figure-bed@1.0/img/20200710230327.jpg
tags:
  - 图床搭建
  - Github
  - PicGo
  - 教程笔记
categories:
  - 网站搭建手册
date: 2021-05-30 18:44:00

---

## 为什么搭建图床

1. 为了方便以后对图片资源进行统一管理。
2. 博客网站大量引用外部图片或上传大量图片，导致访问网站时性能下降，采用CDN加速图片加载，提高博客网站性能。
3. 免费的图床很多，比如聚合图床就很不错，但是有些重要的图片资源还是要保存在个人仓库中，以防万一服务商跑路导致数据丢失（虽然概率很低，但也不是不可能）。
4. 本地图片资源越来越多，存储空间有限，上传到Github既可以备份数据，又能节约空间，难道不香吗？
5. 成本为零，搭建过程简单。

## 使用GitHub存储图片的优缺点

优点：

1. 免费、稳定（不会突然跑路）。

缺点：

1. 每个仓库只有1GB容量，不过可以通过建立多个仓库解决。
2. 上传的图片是公开的，别人可以通过访问你的GitHub仓库看到。

## 配置Github步骤

### 1.注册github账户（不必赘述）

### 2.新建仓库

点击 git 主页右上角的 + 创建 New repository；
![img](https://cdn.jsdelivr.net/gh/panyongkang/MyImgBed/img/tuchuang1.jpg)

### 3.创建 token 并复制保存

点击右上角头像，然后进入设置Settings;
点击”Personal access tokens”按钮;
点击generate new token 按钮;

填 description（也是随心填），勾选复选框 repo ，接着到页面底部 Generate token 就完成了；
![img](https://cdn.jsdelivr.net/gh/panyongkang/MyImgBed/img/tuchuang2.png)

注：创建成功后，会生成一串`token`，这串`token`之后不会再显示，所以第一次看到的时候，可以建个文本文件好好保存，忘记了只有重新生成，每次都不一样。

## 下载安装PicGo

### 1.下载&安装

git地址：[PicGo](https://github.com/Molunerfinn/PicGo)

### 2. 配置图床

仓库名 即你的仓库名
分支名 默认 master

Token 就是刚刚复制的那一串字符
存储路径 这个可以填也可以不填，填了的话图片就上传到仓库名下的子目录
域名 https://raw.githubusercontent.com/[username]/[仓库名]/master

![image-20210530193350586](https://cdn.jsdelivr.net/gh/panyongkang/MyImgBed/img/image-20210530193350586.png)

注意：图中的域名为什么是cdn开头，后文要说。

注意：分支原来默认是master，但从2020.10.01开始，github的默认分支名变更为main。若是创建仓库时使用的分支名是main,设定自定义域名：https://cdn.jsdelivr.net/gh/[github用户名]/[仓库名]@main。此处的分支一定要填写@main，否则默认使用master分支。而现在github创建的默认分支名为main，如果不指定，则会出现图片不能上传的情况。

## 进阶使用教程

### 1.使用cdn解决GitHub国内访问缓慢的问题

使用jsDelivr CDN 加速访问（jsDelivr 是一个免费开源的 CDN 解决方案）

将自定义域名设置为【https://cdn.jsdelivr.net/gh/用户名/图床仓库名 】。

### 2.使用githubPlus替代PicGo自带GitHub上传工具

PicGo自带的GitHub上传工具，不能同步删除GitHub仓库中的图片，这会导致我们在上传了不需要的图片后，产生冗余资源（强迫症表示很难受），因此，我们需要利用PicGo强大的插件功能实现同步操作相册和仓库图片

1.点击PicGo左侧菜单最下方的插件设置，在搜索框中输入github-plus

2.点击灰色的安装按钮

![image-20210530193636369](https://cdn.jsdelivr.net/gh/panyongkang/MyImgBed/img/image-20210530193636369.png)

3.安装完成后在左侧菜单找到github-plus，设置方法和Github图床设置基本一致。

![image-20210530193756496](https://cdn.jsdelivr.net/gh/panyongkang/MyImgBed/img/image-20210530193756496.png)

4.别忘了设置后保存设置并点击“设为默认图床”按钮。

## MarkDown编辑器

使用MarkDown语法写文章，我使用的编辑器是typora，一款非常好用的编辑器。在一个编辑框内，编辑完成后，可以马上显示MarkDown语法效果。

并且Typora可以和PicGo联合在一起使用，当你在编辑器中插入、粘贴图片时，Typora+PicGo的组合方式，可以自动把图片上传至github保存。

### 下载安装

可以访问typora下载地址进行下载【https://www.typora.io/】。

下载完成后正常步骤安装即可。

### 配置方法

在typora顶部菜单界面，选择“文件” - > "偏好设置"，设置图片存储方式。

![image-20210530195635571](https://cdn.jsdelivr.net/gh/panyongkang/MyImgBed/img/%E4%B8%8A%E4%BC%A0%E5%9B%BE%E7%89%87%E8%AE%BE%E7%BD%AE.png)

选择图片存储方式：上传图片。

上传服务：PicGo(app)

PicGo路径：picGo安装的地址

设置完成，点击“验证图片上传”，提示上传成功，即代表配置成功。

注意一点，typora图片验证中的端口，需要与picGo中的server设置内的端口一致，否则typora中不能正常上传。

**picGo监听端口设置**

选择“PicGo设置”-->"设置server"

![image-20210530200329523](https://cdn.jsdelivr.net/gh/panyongkang/MyImgBed/img/PicGo%E7%AB%AF%E5%8F%A3%E8%AE%BE%E7%BD%AE.png)

【此处有坑】如果监听端口不是36677，则需要修改为36677。否则会出现picGo能正常上传图片，而typora上传图片失败的情况。

![image-20210530200500732](https://cdn.jsdelivr.net/gh/panyongkang/MyImgBed/img/%E8%AE%BE%E7%BD%AE%E7%9B%91%E5%90%AC%E7%AB%AF%E5%8F%A3.png)

**总结：**Github+PicGo+Typora+CDN加速的搭建是最佳的搭配方式，加快了图片的访问速度，又解决了原来Typora文本编辑图片不便的问题，只需要复制粘贴即可上传到图床，自动生成链接地址，简直是完美！

