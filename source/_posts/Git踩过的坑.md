title: Git踩过的坑
author: PanXiaoKang
tags:
  - Git
  - 小乌龟
categories:
  - Linux
cover: https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2995460172,2828421452&fm=26&gp=0.jpg
date: 2020-04-15 23:14:00

---

### 常用git命令

详情链接：[传送门](https://blog.csdn.net/ThinkWon/article/details/101450420)　

> git clone -b 指定分支名称 ssh.//gitxxxxxxx.git //克隆指定分支的代码
>
> git branch -v //查看当前分支
>
> git checkout 分支名称 //切换分支
>
> git push origin 分支名称 //推送远程分支
>
> git status //查看当前分支状态
>
> git add . //添加当前所有文件
>
> git add filePath1 filePath2 //添加单个或多个文件路径至暂存区
>
> git reset . // 撤销所有暂存区的文件
>
> git cmmmit -m "备注信息" //提交本地分支仓库
>
> git push //推送当前分支至远程分支仓库
>
> git remote -v //查看远程仓库地址
>
> git remote set-url origin NEW_URL //修改地址
>
> git merge main //将主分支的更改合并到当前分支中
>
> git pull origin 主分支 //拉取主分支并合并代码到当前分支
>
> git config user email //重新设置邮箱
>
> git commit --amend --reset--author 重新修改提交内容
>
> npm cache clean -f //强制清理缓存
>
> npm cache verify //用于验证npm缓存完整性
>
> npm run watch //监听单个文件的变化
> git remote show origin //显示本地仓库关联的远程仓库的详细信息

### SVN和Git的区别

1. git是分布式的scm,svn是集中式的。(最核心)
2. git是每个历史版本都存储完整的文件,便于恢复,svn是存储差异文件,历史版本不可恢复。(核心)
3. git可离线完成大部分操作,svn则不能。
4. git有着更优雅的分支和合并实现。
5. git有着更强的撤销修改和修改历史版本的能力
6. git速度更快,效率更高。

总结：

1. 当研发成本比较低，协作开发人数不多，开发人员对于版本管理的水平参差不齐的时候，或者对于代码的安全性要求更高一点的时候，适合用svn。
2. 而对于很多人参与开发，代码量比较大，或者高频次协作，跨公司，跨地域合作的情况下，更适合用git。

### 使用过程中Bug记录

问题：本地新建仓库，需要关联远程github仓库：

    处理：
		git remote add origin 仓库地址url
    远程仓库有变化的先拉取同步一下：$ git pull --rebase origin master
    新建空仓库推送：$ git push -u origin master
    之后就可以直接：git push

问题：更新拒绝，远程项目有你本地没有的更新

    原因：之前上传后面在github上直接创建README.md和修改，没有在本地仓库合并
    解决办法：
		git remote -v :查看当前远程库
    git fetch:从远程仓库下载新分支与数据
    git merge: 从远程仓库提取数据并尝试合并到当前分支
    git push origin master:推送到Github

问题：eclipse中git的安装、配置和使用：

链接：[传送门](https://blog.csdn.net/kuailexiaomeng/article/details/99604799)

问题：删除本地文件：

    方法：
	rm -rf 文件或文件夹
	git add .
	git commit -am “删除文件或文件夹”

问题：删除了本地仓库文件夹后推送github出错：

解决办法总结：

    错误：src refspec e-shop does not match any
	命令：git add .
		 Git commit -m “提交”
	错误：The current branch master has no upstream branch.
	命令：git push --set-upstream origin master
		 Git push

问题：git push到GitHub的时候遇到! [rejected] master -> master (non-fast-forward)的问题

办法：

    1、git pull origin master --allow-unrelated-histories //把远程仓库和本地同步，消除差异

    2、重新add和commit相应文件

    3、git push origin master

    4、此时就能够上传成功了

问题：git问题ERROR: Repository not found.的解决办法

    处理：
    修改url路径：git remote set-url origin git@github.com:xxxxxx/xxxxxx.git
    查看是否成功：git remote -v

问题：已经提交到github但是没有设置.gitignore:

```
	在git相关项目目录下git Beah命令窗口
	创建.gitignore文件：$ touch .gitignore
	.gitignore中可以忽略的文件如下：
	#maven
	target/

	#IDEA
	.idea/
	*.iml

	#eclipse
	.settings/
	.metadata/
	.classpath
	.project
	Services/
	Git在添加.gitignore之前就push了项目
	为避免冲突可以先同步下远程仓库：$ git pull
	在本地项目目录下删除暂存区内容：$ git rm -r --cached .

	然后再添加：$ git add .

	然后再次提交：$ git commit -m "add .gitignore"

	最后上传到github：$ git push
```

---
