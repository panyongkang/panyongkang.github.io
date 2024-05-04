title: Hexo指令
tags:
  - Hexo指令
  - ''
categories:
  - Hexo博客
author: panxiaokang
cover: >-
    https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2010232996,1620516668&fm=26&gp=0.jpg
date: 2020-04-10 13:23:00
---
欢迎来到[Hexo](https://hexo.io/)！这是您的第一篇文章。查看[文档](https://hexo.io/docs/)以获取更多信息。如果您在使用时HEXO得到任何问题，你可以找到答案[故障排除](https://hexo.io/docs/troubleshooting.html)或[你](https://github.com/hexojs/hexo/issues)可以问我在[GitHub](https://github.com/hexojs/hexo/issues)上。

## 快速开始

### 建立新文章

``` bash
$ hexo new 文章名称
```

### 创建新页面
```
$ hexo new page 页面名称
```


More info: [Writing](https://hexo.io/docs/writing.html)

### 运行服务器

``` bash
$ hexo server 简写：hexo s  
```

More info: [Server](https://hexo.io/docs/server.html)

### 生成静态文件

``` bash
$ hexo generate 简写：hexo g
```

More info: [Generating](https://hexo.io/docs/generating.html)

### 部署到远程站点

``` bash
$ hexo deploy 简写：hexo d //若使用了豆瓣插件，不能再用hexo d简写
```

More info: [Deployment](https://hexo.io/docs/one-command-deployment.html)

### 清除文件

``` bash
$ hexo clean
```
 ### 获取豆瓣数据

```
$ hexo douban  //若数据抓取不全时使用，默认hexo g时已经自动抓取
```

### 更新番剧数据

```
hexo bangumi -u //在hexo g或 hexo deploy之前使用
```

### 删除番剧数据

```
hexo bangumi -d
```

### 生成关系网

```
hexo net //每次hexo g之后需要hexo net生成页面并抓取标签数据
```

