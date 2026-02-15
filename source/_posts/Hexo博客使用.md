title: Hexo博客使用出错记录
author: PanXiaoKang
tags:
  - Hexo
categories:
  - Hexo博客
  - ''
cover: >-
  https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2010232996,1620516668&fm=26&gp=0.jpg
date: 2020-04-12 17:45:00
---
### 点击标签、分类等菜单栏报错  
    问题：点击分类菜单时出现“Cannot GET/xxxx”的错误  
    原因：没有初始化分类的子目录
    处理：在控制台输入，如：hexo new page "categories"，初始化分类目录 
    	  在控制台输入，如：hexo new page "tags"，初始化标签目录

### 生成的inde.md文件里需要配置
    问题：初始化的inde.md文件并没有显示内容
    原因：因为生成的文件里没有type的设置，需要手动添加
    处理：  
    标签中index.md基本配置
      title: tags  
      date: 2020-04-12 18:10:39  
      type: "tags"  
    分类中index.md基本配置
      title: categories  
      date: 2020-04-12 18:11:07  
      type: "categories"  
      
其余菜单项类似，生成后需要重新<code>hexo clean + hexo g +hexo s</code>,然后再次点开才能访问。

### 设置music跳过渲染导致错误

由于之前设置音乐的插件是MetingJS的，需要跳过渲染才行。
```
#跳过渲染
skip_render: 
  - "music/**"
```
结果后期不知道怎么就在修改后重新hexo clean +hexo g +hexo d后面导致无法上传到github中；  
报错显示gihub不能上传**.md文件，需要去掉跳过渲染music操作；  
后面将MetingJS插件的代码换成网易云音乐的外链代码即可。  

MetingJS代码：

```
{% meting "2505260244" "netease" "song" "theme:#555" "mutex:true" "listmaxheight:340px" "preload:auto" %}
```
网易云音乐外链代码：

```
<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=798 height=310
 src="https://music.163.com/outchain/player?type=0&id=2505260244&auto=0&height=430"></iframe>
```
修改后本地服务可以查看音乐链表，然后重新hexo d部署上传到github服务就可以了。否则博客修改的内容和特效均无法显示，即使gihub上面已经修改了，但仍然无法显示。（注意：这是一个大坑）