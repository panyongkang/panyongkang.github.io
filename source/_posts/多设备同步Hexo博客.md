title: 多设备同步博客
author: PanYuKang
tags:

  - 设备迁移
  - Hexo备份
  - 同步更新
categories:
  - 网站搭建手册
date: 2024-05-04 21:15:28

---

记录本人日常操作实践后的整理内容，分享给有需要的伙伴们~~~

参考渠道：

[多台电脑同步更新Hexo博客](https://blog.csdn.net/qq_30105599/article/details/118302086)

---

## 背景介绍

由于工作与出差的原因，目前随身带的是新的笔记本电脑，把旧电脑的博客项目迁移到新电脑之后，大部分时间都是使用新电脑进行文章更新，偶尔回去旧电脑也在用，之前都是用U盘进行拷贝，为了解决两台电脑的资源不同步和麻烦等问题，可以利用Github的分支进行管理。

最原始Hexo文件是在我们的电脑本地，而GitHub上传的只是Hexo生成的静态网页，即public文件夹里面的内容。

当有两台电脑时，Hexo最开始搭建在其中一台电脑上，而我们需要在另外一台电脑上同时更新我们的博客，这时候就可以使用Git的分支分别管理Hexo配置文件和静态网页内容。来实现多台电脑间博客项目的迁移与同步。

## 创建分支

最开始默认的master分支就是public上传的静态资源，这个不多说了，再新建一个名为hexo的分支，用来上传本地原始的Hexo配置文件。

## hexo设置为默认分支

将博客项目仓库的Settings->Branches->Default branch修改为hexo。

## 将创建的分支的远程仓库克隆到本地

执行命令参考：

```
git clone https://github.com/panyongkang/panyongkang.github.io.git
```

## 删去除.git文件夹以外的所有内容

1.进入当前克隆文件，执行如下命令：

```bash
git add -A
git commit -m "更新删除操作到远程仓库"
git push origin hexo

```

2.将分支克隆到本地的仓库中的.git文件夹复制到Hexo博客文件夹中。

3.在hexo博客目录下执行如下命令同步到远程的hexo分支：

```bash
git add -A
git commit -m "备份Hexo配置文件到远程仓库"
git push origin hexo

```

## 设置.gitignore文件忽略跟踪

可根据自己的需要进行配置，忽略不需要上传的文件：

```
.DS_Store
Thumbs.db
db.json
*.log
node_modules/
public/
.deploy*/
*.rar
.vscode/
```

第一次上传失败是因为Hexo中有个rar压缩包文件，可能是文件太大导致的上传失败，反正不需要上传，先回退一下。可以使用下面的命令来取消最后一次提交，但保留更改。这会将你的更改重新放回暂存区，让你可以重新提交。

```bash
git reset --soft HEAD^
```

假如已经上传成功的，发现有些文件也是无需备份的，也可以通过命令删除重新上传。

* **删除已提交的 `.vscode` 文件夹** ：

```bash
git rm -r --cached .vscode

```

* **将 `.vscode` 文件夹添加到 `.gitignore` 文件中** ：

```
.vscode/
```

这样 Git 将不再跟踪和上传 `.vscode` 文件夹中的任何内容。

* **提交并推送更改** ：

```bash
git add .gitignore
git commit -m "忽略.vscode文件夹"
git push

```

## 另一台电脑的操作

1.git bash将远程仓库克隆到本地

```
git clone 仓库地址
```

2.然后进入项目目录，安装依赖启动博客服务器，生成静态文件

```
npm i
hexo g
hexo s
```

执行以上指令后，便可以在浏览器通过http://localhost:4000/访问博客

**问题记录：**

错误：npm ERR! reason: certificate has expired（淘宝镜像过期）

执行 npm i 报错是因为淘宝证书过期的原因，以下是两种解决方案。

一、执行下面两个命令再进行npm install

```
npm cache clean --force
npm config set strict-ssl false
```

npm cache clean --force

这个命令用于清除 npm 的缓存。npm 在安装包时会将下载的包缓存到本地，以便下次使用时可以直接从缓存中获取，加快安装速度。使用 npm cache clean 可以清除缓存，而 --force 参数表示强制清除缓存，即使有其他进程正在使用缓存。

npm config set strict-ssl false

用于配置 npm 的 SSL 严格模式。默认情况下，npm 在下载包时会验证 SSL 证书的有效性，以确保安全性。通过设置 strict-ssl 为 false，可以禁用 SSL 严格模式，允许使用自签名或无效的 SSL 证书进行下载，此方法就会忽略淘宝证书过期

二、直接更换镜像源

```
npm config set registry https://registry.npmmirror.com // 设置镜像源
npm config get registry // 查看镜像源
```

也可以选择其他镜像源

腾讯：http://mirrors.cloud.tencent.com/npm/

华为：https://mirrors.huaweicloud.com/repository/npm/

中科大：https://registry.npmjs.org/

阿里：https://npm.aliyun.com/

3.写好文章后,执行Hexo命令进行发布：

```
hexo clean
hexo g
hexo net // 豆瓣插件用，可略过
hexo deploy
```

## 两台电脑同步写博客

现在的博客仓库有两个分支，master分支和hexo分支

其中，master分支用于存放Hexo生成的静态资源文件，hexo分支用于存放网站的原始文件

所以，我们在一台设备上写好一篇文章或进行了博客的修改后，别忘了在另一台电脑上先更新，再进行操作：

```
git pull hexo
```

## 注意事项

复制本地 `username.github.io`文件夹中的 `.git`文件夹到hexo项目根目录下。此时，hexo项目已经变成了和远程hexo分支关联的本地仓库了。而 `username.github.io`文件夹的使命到此为止，可以把它删掉，因为我们只是把它作为一个“中转站”的角色。

以后每次发布新文章或修改网站样式文件时，在当前Hexo目录下执行 `git add . & git commit -m "some description" & git push origin hexo`即可把环境文件推送到hexo分支。然后再 `hexo g -d`发布网站并推送静态文件到master分支。这两个分支的文件互不影响，但最好还是定期进行同步更新作为备份，以防不可抗力（磁盘损坏、电脑丢失）因素导致资源文件无法找回带来的损失。
