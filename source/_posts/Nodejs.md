title: Nodejs
author: PanXiaoKang
cover: https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=238001970,1745368623&fm=26&gp=0.jpg
tags: [Nodejs,npm]
categories: [前端技术]
date: 2021-01-03 19:16:00

---

## Node.js简介

 Node.js 就是运行在服务端的 JavaScript。它让 JavaScript 成为与PHP、Python 等服务端语言平起平坐的脚本语言。Node.js是一个事件驱动I/O服务端JavaScript环境，基于Google的V8引擎，V8引擎执行Javascript的速度非常快，性能非常好。

## npm简介

npm 是javascript的包管理工具，是前端模块化下的一个标志性产物，当一个网站依赖的js代码越来越多，程序员发现这是一件很麻烦的事情，于是npm就出来了。这一点和maven、gradle十分相似，只不过maven、gradle是用来管理java jar包的，而npm是用来管理js包的。

简单地说，就是通过npm下载模块，复用已有的代码，提高工作效率。

1. 从社区的角度：把针对某一特定问题的模块发布到npm的服务器上，供社区里的其他人下载和使用，同时自己也可以在社区里寻找特定的模块的资源，解决问题。
2. 从团队的角度：有了npm这个包管理工具，复用团队既有的代码也变的更加地方便。

## Node.js和npm的发展

npm作者已经将npm开发完成，于是发邮件通知 jQuery、Bootstrap、Underscore 作者，希望他们把 jquery、bootstrap 、 underscore 放到npm远程仓库，但是没有收到回应，于是npm的发展遇到了瓶颈。
Node.js作者也将Node.js开发完成，但是 Node.js 缺少一个包管理器，于是他和 npm 的作者一拍即合、抱团取暖，最终 Node.js 内置了 npm。
后来的事情大家都知道，Node.js 火了。随着 Node.js 的火爆，大家开始用 npm 来共享 JS 代码了，于是 jQuery 作者也将 jQuery 发布到 npm 了。所以现在，你可以使用 npm install jquery 来下载 jQuery 代码。现在用 npm 来分享代码已经成了前端的标配。

## Node.js和npm的安装

Node.js的[安装教程](https://www.runoob.com/nodejs/nodejs-install-setup.html)直接上菜鸟教程有详细介绍。由于最新版的Node.js内置了npm，所以就一并安装了。有时候我们只想单独安装npm，不想安装Node.js，这个好像是不行的。

## npm 全局安装和局部安装的区别

### 安装命令

**全局安装**

```
npm install webpack -g 或 npm install webpack --global
```

**本地安装**

```
npm install webpack 或 npm install webpack --save-dev
```

### 安装位置

全局安装：
安装到全局环境里面，包安装在Node安装目录下的node_modules文件夹中，一般在 \Users\用户名\AppData\Roaming\ 目录下，可以使用npm root -g查看全局安装目录。

> C:\Users\lenovo>npm root -g
> D:\Program Files\nodejs\node_global\node_modules

本地安装：
把安装包信息写入package.json文件的devDependencies字段中，包安装在指定项目的node_modules文件夹下。

### 调用方式

全局安装：
用户可以在命令行中直接运行该组件包支持的命令。

本地安装：
直接通过require()的方式引入项目中node_modules目录下的模块。

### 全局安装局限性

1.全局安装，不能直接通过require()的方式去引用模块

在js实例代码中，默认下node.js会在NODE_PATH和目前js所在项目下的node_modules文件夹下去寻找模块，全局安装需要手动解决包路径的配置问题，当然你也可以复制全局安装的node_modules文件夹到项目下，还有办法可以选择将环境变量的NODE_PATH设置为C:\Program Files\nodejs。

2.不利于包的更新管理

可能需要为每个包重新命名，如gulp@3.8.1、gulp@3.9.1...，为了区别不同项目使用指定的包，保证模块之间的相互依赖，区别每个项目正常运行。

### 本地安装的重要性

本地安装可以让每个项目拥有独立的包，不受全局包的影响，方便项目的移动、复制、打包等，保证不同版本包之间的相互依赖，这些优点是全局安装难以做到的。另外，本地安装包对于项目的加载会更快。缺点，如每次新项目都要本地安装所依赖的包，安装包时间相对较长。

## npm的使用

### 发布包

使用npm发布之前必须先进入[npm官网](https://www.npmjs.com/)注册自己的账户。

1. 本地创建自己需要发布的目录文件。执行npm init命令，生成package.json文件。
2. 发布自己的npm包。命令如下：

第一次发布包：

- 添加账号

```
npm adduser // 输入自己的npm账号、密码、邮箱
```

非第一次发布包：

- 登录npm

```
npm login // 输入账号、密码、邮箱，登录后方可发包
```

`注意:`npm adduser成功的时候默认你已经登陆了，所以不需要再接着npm login.

- 发布包

```
npm publish
```

- 取消发布

```
npm unpublish [--force] // 不成功可以强制取消
```

### 查看发布的包信息

登录[npm官网](https://www.npmjs.com/) ，即可看到刚才发布的包，如果网不是很好，可能等一会才能看到。

### 更新包

更新包和发布包的命令是一样的，更新包只需修改package.json里面的 `version`字段，也可以使用npm 自带的版本控制命令修改版本号，更新的步骤为：

1. 修改包的版本（package.json里的version字段）
2. npm publish //发布
3. npm version  //查看版本信息

**npm有一套自己的版本控制标准——Semantic versioning（语义化版本）**

**具体体现为：**

对于"version":"x.y.z"

> **1. 修复bug,小改动，增加z**
>
> **2. 增加了新特性，但仍能向后兼容，增加y**
>
> **3. 有很大的改动，无法向后兼容,增加x**

例如：初始的项目为1.0.0版本，相关变动如下：

若是1中情况，变为1.0.1

若是2中情况，变为1.1.0

若是3中情况，变为2.0.0

### 删除上传的包

**注意:**根据规范，只有在发包的24小时内才允许撤销发布的包

由于本人发布的包是测试包，不希望污染npm网站，所以在测试成功后需要删除包。

终端打开包项目，输入命令：

```
npm unpublish --force //实际上是执行撤销操作
```

删除后重新登录[npm网站](https://www.npmjs.com/)上搜索这个包，发现已经不存在了。超过24小时已发布的包，一般不允许删除，若非要删除则可以通过邮件联系npm官网人员进行彻底删除。

### NPM常用命令

如查看xxx包的最新版本信息：npm view xxx versions  或者  npm info xxx

使用npm安装指定版本的包：npm i xxx@4.11.0 --save-dev

使用npm升级指定版本的包：npm update xxx --save-dev

安装xxx最新版本的包：npm i xxx@latest --save-dev

使用npm查看已安装的包列表：npm list

使用npm查看已安装某一指定包的版本信息：npm list xxx

## 重装NVM版本管理

记录win10系统重装后所遇到的一些问题记录。

### 什么是nvm

　　  nvm就是nodejs version manage 叫做nodejs 版本管理，而nodejs有很多版本，场景如下:

　　  1、而你手上开发的有多个项目又分别是不同的nodejs版本，咱们就可以用nvm轻松切换！

　　  2、假设你正在开发的项目开始使用的nodejs版本是8.0，而现在因为某些原因，你需要升级 或者 降级 nodejs 版本，也可以使用 nvm 轻松切换。

### npm install express -g

安装module测试失败了，报错如下图：

![图片](https://cdn.jsdelivr.net/gh/panyongkang/MyImgBed/img/npm%E9%94%99%E8%AF%AF1.png)

![image-20220102140205526](https://cdn.jsdelivr.net/gh/panyongkang/MyImgBed/img/npm%E9%94%99%E8%AF%AF2.png)

具体原因未知，只是先使用npm install -g cnpm --registry=https://registry.npm.taobao.org下载cnpm 后，利用cnpm install express -g下载成功；

### cnpm的使用

虽然下载成功了，但是cmd窗口访问很慢：

![image-20220103123701601](https://cdn.jsdelivr.net/gh/panyongkang/MyImgBed/img/cnpm%E6%B5%8B%E8%AF%95.png)

首先来看看默认的registry是什么

```npm
npm config get registry
```

因为此时的镜像是：

```
C:\Users\pyk>npm config get registry
https://registry.cnpmjs.org/
```

原因就是使用cnpm镜像也可以下载，但还是很慢，需要切换成淘宝镜像：

```
npm config set registry https://registry.npm.taobao.org
```

再次查看是否切换成功：

![image-20220103130858019](https://cdn.jsdelivr.net/gh/panyongkang/MyImgBed/img/%E5%88%87%E6%8D%A2%E9%95%9C%E5%83%8F.png)

成功后重新使用npm,cnpm命令就会快很多了。

### 重新配置SSH key

简介：什么是[ssh](https://so.csdn.net/so/search?q=ssh)：ssh是Secure Shell（安全外壳协议）的缩写，建立在应用层和传输层基础上的安全协议。为了便于访问github，要生成ssh公钥，这样就不用每一次访问github都要输入用户名和密码。

#### ①检查SSH Keys

首先，要查看在电脑上是否已经存在SSH keys。运行Git Bash 然后输入：

```
$ ls -al ~/.ssh
```

![image-20220103135123055](https://cdn.jsdelivr.net/gh/panyongkang/MyImgBed/img/%E6%A3%80%E6%9F%A5ssh.png)

这个命令就是检查是否已经存在 id_rsa.pub 或 id_dsa.pub 文件，如果文件已经存在，那么你可以跳过步骤2，直接进入步骤3。很明显重装系统后空空如也，下次记得及时备份！

#### ②生成SSH key

1.在Git Bash中输入下面命令，引号内一定是你的Github注册邮箱地址

```
ssh-keygen -t rsa -C "2549315545@qq.com"
```

2. 等待几秒，当提示让你输入保存地址时，官方特别推荐放在默认位置就可以了。所以这里直接输入回车，提示如下：

```
Enter file in which to save the key (/c/Users/pyk/.ssh/id_rsa):[直接输入回车]
```

3. 将会提示你输入一个密码串(这里输入密码时不会显示在屏幕上的，只要输入正确按回车就好):

```
Enter passphrase （empty for no passphrase）: [输入你想设置的密码]
Enter same passphrase again：[在输入一遍密码]
＃虽然说这里可以设置为空，但是推荐用一个更加安全的密码
```

4. 输完密码之后，你将会得到你的SSH的[print](https://ws1.sinaimg.cn/large/ad3a9ce5gy1foroi8j00ej217s0oojxi.jpg)或者id。

![image-20220103142639972](https://cdn.jsdelivr.net/gh/panyongkang/MyImgBed/img/%E7%94%9F%E6%88%90SSH%20key.png)

当你看到上面这段代码时，就说明你的 SSH key 已经创建成功，你只需要添加到github的SSH key上就可以了。

打开用户目录，找到.ssh\id_rsa.pub文件，记事本打开并复制里面的内容，打开你的github主页，进入个人设置 -> SSH and GPG keys -> New SSH key：

![image-20220103143655648](https://cdn.jsdelivr.net/gh/panyongkang/MyImgBed/img/%E9%87%8D%E6%96%B0%E9%85%8D%E7%BD%AESSH%20key.png)

新建好的ssh密钥，先测试一下是否成功：

```
ssh -T git@github.com
```

![image-20220103143840563](https://cdn.jsdelivr.net/gh/panyongkang/MyImgBed/img/%E6%B5%8B%E8%AF%95%E8%BF%9E%E6%8E%A5.png)

**用户名 邮箱配置**

```
git config --global user.name "xxx"// 你的github用户名，非昵称
git config --global user.email  "xxx@qq.com"// 填写你的github注册邮箱
```

**进入到博客(Hexo)文件夹**

文件夹只需要删除node_modules、 public、 .git 、.deploy_git，剩下的保留。

**关联Github项目**

```
git init
git remote add origin git@github.com:panyongkang/panyongkang.github.io.git
```

查看关联好的的url是否成功：

```
git remote -v
```

![image-20220103145949299](https://cdn.jsdelivr.net/gh/panyongkang/MyImgBed/img/%E5%85%B3%E8%81%94%E6%B5%8B%E8%AF%95.png)

**全局安装hexo**

所有必备的应用程序安装完成后，即可在 `cmd窗口`使用 npm 安装 Hexo。

```
npm install -g hexo
```

**安装项目依赖**

在hexo文件中使用 `git bash`执行以下命令进行下载:

```
##不建议使用npm install，因为可能会报错
cnpm install
```

**执行hexo命令**

在hexo根目录使用git窗口依次执行以下命令：

```
hexo version #查看安装版本信息
hexo g  #生成public目录的本地预览文件
hexo s #本地预览，浏览器中输入 http://localhost:4000/打开
hexo d  # 部署上传到github仓库
```

**不要用hexo init初始化，部分文件已经拷贝生成，如果不慎使用，则站点配置文件_config.yml会被初始化为默认值**

错误记录：bash: hexo: command not found

原因：环境变量没有配置好，要找到正确的hexo安装地址，比如我把我npm的下载地址都改到d盘了，我的path就是D:\softwarenodejs\node_global

![image-20220103155942140](https://cdn.jsdelivr.net/gh/panyongkang/MyImgBed/img/Hexo%E7%8E%AF%E5%A2%83%E9%85%8D%E7%BD%AE%E8%B7%AF%E5%BE%84.png)

一定要配置在有hexo.cmd的路径，否则无论使用cmd窗口还是git bash窗口还是无法执行hexo命令：

![image-20220103160123934](https://cdn.jsdelivr.net/gh/panyongkang/MyImgBed/img/Hexo%E9%94%99%E8%AF%AF%E8%B7%AF%E5%BE%84.png)

如果bin路径下面没有hexo.cmd,系统环境变量path就不能使用bin下面的路径：

![image-20220103160235698](https://cdn.jsdelivr.net/gh/panyongkang/MyImgBed/img/%E7%B3%BB%E7%BB%9F%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F.png)

如果不确定全局下载的路径，可以执行 `npm config get prefix`，会得到 `node_modules的全局安装目录`，设置到 `PATH`中，就可以了。

## API接口开发

### API简介

API，全称是  **Application Programming Interface** ，中文意思是  **应用程序编程接口** 。它是一些预先定义的函数，包括接口地址、传入参数和返回参数。API的作用是 **在应用程序之间提供一种可控的、标准化的访问方式** 。

使用API，程序员可以无需了解底层实现细节，就可以调用其他应用程序的功能。这使得应用程序之间可以 **轻松地进行通信和共享数据** 。

简单理解：一个接口就是 ``服务中的一个路由规则``，根据请求响应结果。

API通常以**URL**形式表示，例如：

```
https://api.example.com/users/123
```

该URL表示一个API，用于获取用户ID为123的用户信息。

API不仅可以用URL表示，还可以用其他方式表示，例如：

* **函数调用：** 一些编程语言提供API函数，可以直接在代码中调用。
* **库：** 一些API以库的形式提供，需要在程序中引入才能使用。

### 开发实现方案

常见的服务端开发技术栈组合：

* Tomcat+Java+MySQL
* Node.js+JavaScript+MongoDB

使用Node.js可以编写API接口服务来调用大量文章内容、图片、视频和音频，而无需将它们存储在后端数据库中。

以下是一些实现方案：

**1.使用文件系统存储内容**

将文章内容、图片、视频和音频存储在文件系统中，例如本地磁盘或云存储。
使用Node.js编写API接口，根据请求参数从文件系统中读取相应的内容并返回。
这种方案的优点是简单易行，成本低。
缺点是文件系统的扩展性可能有限，并且难以实现内容的实时更新。

**2.使用内容分发网络（CDN）存储内容**

将文章内容、图片、视频和音频存储在CDN中，CDN可以将内容分发到全球各地的节点，从而提高访问速度。
使用Node.js编写API接口，根据请求参数从CDN中获取相应的内容并返回。
这种方案的优点是访问速度快，扩展性好。
缺点是成本较高，需要付费使用CDN服务。

**3.使用其他存储服务**

可以使用其他存储服务来存储内容，例如对象存储服务或数据库。
使用Node.js编写API接口，根据请求参数从存储服务中获取相应的内容并返回。
这种方案的优点是灵活性和可扩展性好。
缺点是成本可能较高，具体取决于所使用的存储服务。

### 常见数据库比较

| 特性         | Redis                                      | MongoDB    | Oracle   | MySQL    |
| ------------ | ------------------------------------------ | ---------- | -------- | -------- |
| 类型         | 非关系型                                   | 非关系型   | 关系型   | 关系型   |
| 数据模型     | 键值对、列表、集合、<br />有序集合、哈希表 | JSON文档   | 表格     | 表格     |
| 结构化数据   | 有限                                       | 不擅长     | 擅长     | 擅长     |
| 非结构化数据 | 擅长                                       | 擅长       | 不擅长   | 不擅长   |
| 可扩展性     | 非常高                                     | 较高       | 较高     | 较高     |
| 事务支持     | 否                                         | 否         | 是       | 是       |
| 一致性       | 弱一致性                                   | 最终一致性 | 强一致性 | 强一致性 |
| 复杂查询     | 有限                                       | 不擅长     | 擅长     | 擅长     |

**举例说明:**

* **Redis** 是一款高性能的非关系型数据库，用于缓存、消息队列、领导选举和其他用例。它以其速度、可扩展性和灵活性而闻名。Redis 通常用于需要处理大量数据的实时应用程序。
* **MongoDB** 是一款使用非关系型数据库的应用程序。它存储有关产品、订单和客户的信息。每个产品都有一个文档，其中包含有关其名称、描述、价格和库存数量的信息。每个订单都有一个文档，其中包含有关订单日期、客户信息和所订购产品的详细信息。每个客户都有一个文档，其中包含他们的姓名、地址和电子邮件地址的信息。
* **Oracle** 是一款功能强大的关系型数据库，可用于各种应用程序。它擅长处理结构化数据并支持复杂查询。Oracle 通常用于需要高性能和可靠性的企业应用程序。
* **MySQL** 是一款流行的关系型数据库，以其易用性和可扩展性而闻名。它通常用于 Web 应用程序和小型企业应用程序。

**总结：**

关系型数据库擅长处理结构化数据，而非关系型数据库擅长处理非结构化数据。关系型数据库还支持事务和强一致性，这对于需要高数据完整性的应用程序很重要。非关系型数据库通常比关系型数据库更具可扩展性，并且可以更轻松地处理大量非结构化数据。

选择哪种类型的数据库取决于您的特定需求。如果您需要处理大量结构化数据并且需要强一致性，那么关系型数据库是一个不错的选择。如果您需要处理大量非结构化数据并且需要可扩展性，那么非关系型数据库可能是一个更好的选择。

**Redis** 是一种独特的非关系型数据库，它提供了一些其他数据库没有的功能。它非常快速且可扩展，使其成为实时应用程序的理想选择。Redis 还支持各种数据结构，这使其适用于各种用例。如果您需要一种快速、可扩展且通用的数据库，那么 Redis 值得考虑。
