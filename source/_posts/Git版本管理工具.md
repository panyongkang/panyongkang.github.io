title: Git版本管理工具
author: PanXiaoKang
tags: [Git,小乌龟,版本管理]
categories: [Linux]
cover: https://mpimg.cn/view.php/7525c2aceaedd74b8442023375bd65e0.jpg
date: 2020-04-15 23:14:00

---

## **主流版本控制工具及市场占比**

目前，市场上主要的版本控制工具有：

| 版本控制工具                         | 类型   | 主要特点                      | 2024年市场占比（大致估算） |
| ------------------------------------ | ------ | ----------------------------- | -------------------------- |
| **Git**                        | 分布式 | 主流，灵活，适合大规模协作    | **>90%**             |
| **SVN（Subversion）**          | 集中式 | 传统，适用于代码库管理        | **<5%**              |
| **Mercurial**                  | 分布式 | 简单易用，曾被 Bitbucket 支持 | **<1%**              |
| **Perforce（Helix Core）**     | 集中式 | 适合大型企业和游戏开发        | **~1-2%**            |
| **TFS（Azure DevOps Server）** | 集中式 | 微软生态，适合企业项目        | **<2%**              |
| **Fossil**                     | 分布式 | 轻量级，集成 Bug 跟踪         | **极少**             |
| **Bazaar**                     | 分布式 | Ubuntu 曾使用，现在较冷门     | **几乎无市场份额**   |

---

## **详细介绍**

### **(1) Git（占比 >90%）**

* **类型** ：分布式版本控制系统（DVCS）
* **特点** ：
  * 速度快，适合分布式团队协作
  * 主流开源社区（GitHub、GitLab、Bitbucket）广泛支持
  * 适用于大部分软件开发场景

### **(2) SVN（Subversion） （占比 <5%）**

* **类型** ：集中式版本控制系统（CVCS）
* **特点** ：
  * 适合企业级项目、文档管理
  * 但对于分布式协作不够灵活，市场份额持续下降

### **(3) Mercurial（占比 <1%）**

* **类型** ：分布式版本控制
* **特点** ：
  * 类似 Git，但更加简单
  * Bitbucket 曾支持，但 2020 年放弃，用户逐渐减少

### **(4) Perforce（Helix Core） （占比 ~1-2%）**

* **类型** ：集中式版本控制系统
* **特点** ：
  * 适用于大型企业、游戏开发、影视行业（如 Unity、Epic Games 使用）
  * 处理大文件更高效，但操作较复杂

### **(5) TFS / Azure DevOps Server（占比 <2%）**

* **类型** ：集中式版本控制（也支持 Git）
* **特点** ：
  * 微软出品，集成于 Azure DevOps
  * 企业内网项目、.NET 开发团队常用

### **(6) Fossil（占比极少）**

* **类型** ：分布式
* **特点** ：
  * 轻量级，集成 Wiki、Bug 跟踪
  * 主要由 SQLite 开发者使用

### **(7) Bazaar（几乎没有市场份额）**

* **类型** ：分布式
* **特点** ：
  * Ubuntu 曾经用过，但现在基本没人用了

---

## **3. 结论**

* **Git 绝对是主流** ，市场份额超过 90%，各大平台都支持。
* **SVN 仍然在一些老旧企业或文档管理场景使用** ，但份额已经很小。
* **Perforce、TFS 等在特定行业（游戏、企业级项目）仍有一定市场** 。
* **Mercurial、Fossil、Bazaar 等基本被淘汰或小众使用** 。

## 常用git命令

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

## SVN和Git的区别

1. git是分布式的scm,svn是集中式的。(最核心)
2. git是每个历史版本都存储完整的文件,便于恢复,svn是存储差异文件,历史版本不可恢复。(核心)
3. git可离线完成大部分操作,svn则不能。
4. git有着更优雅的分支和合并实现。
5. git有着更强的撤销修改和修改历史版本的能力
6. git速度更快,效率更高。

总结：

1. 当研发成本比较低，协作开发人数不多，开发人员对于版本管理的水平参差不齐的时候，或者对于代码的安全性要求更高一点的时候，适合用svn。
2. 而对于很多人参与开发，代码量比较大，或者高频次协作，跨公司，跨地域合作的情况下，更适合用git。

## 问题记录

### 问题：本地新建仓库，需要关联远程github仓库：

    处理：
		git remote add origin 仓库地址url
    远程仓库有变化的先拉取同步一下：$ git pull --rebase origin master
    新建空仓库推送：$ git push -u origin master
    之后就可以直接：git push

### 问题：更新拒绝，远程项目有你本地没有的更新

    原因：之前上传后面在github上直接创建README.md和修改，没有在本地仓库合并
    解决办法：
		git remote -v :查看当前远程库
    git fetch:从远程仓库下载新分支与数据
    git merge: 从远程仓库提取数据并尝试合并到当前分支
    git push origin master:推送到Github

### 问题：eclipse中git的安装、配置和使用：

链接：[传送门](https://blog.csdn.net/kuailexiaomeng/article/details/99604799)

### 问题：删除本地文件：

    方法：
	rm -rf 文件或文件夹
	git add .
	git commit -am “删除文件或文件夹”

### 问题：删除了本地仓库文件夹后推送github出错：

解决办法总结：

    错误：src refspec e-shop does not match any
	命令：git add .
		 Git commit -m “提交”
	错误：The current branch master has no upstream branch.
	命令：git push --set-upstream origin master
		 Git push

### 问题：git push到GitHub的时候遇到! [rejected] master -> master (non-fast-forward)的问题

办法：

    1、git pull origin master --allow-unrelated-histories //把远程仓库和本地同步，消除差异

    2、重新add和commit相应文件

    3、git push origin master

    4、此时就能够上传成功了

### 问题：git问题ERROR: Repository not found.的解决办法

    处理：
    修改url路径：git remote set-url origin git@github.com:xxxxxx/xxxxxx.git
    查看是否成功：git remote -v

### 问题：已经提交到github但是没有设置.gitignore:

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

### 问题：本地的修改与远程仓库的更新有冲突

在执行 `git pull` 时遇到以下错误：

```
error: Your local changes to the following files would be overwritten by merge:
        source/mypages/xkzhdh/Integrated.html
Please commit your changes or stash them before you merge.
```

这意味着你本地的修改与远程仓库的更新有冲突，Git 不允许直接覆盖你的本地更改。你可以通过以下几种方式解决这个问题：

#### 1. **提交本地更改**

如果你希望保留本地的修改并将其纳入版本控制，可以先提交这些更改，然后再拉取远程更新。

```bash
# 添加所有更改到暂存区
git add .

# 提交更改
git commit -m "提交本地修改"

# 拉取远程更新
git pull
```

#### 2. **暂存本地更改**

如果你不想立即提交本地更改，但希望暂时保存它们以便拉取远程更新，可以使用 `git stash`。

```bash
# 暂存本地更改
git stash

# 拉取远程更新
git pull

# 恢复暂存的更改
git stash pop
```

如果恢复时出现冲突，你需要手动解决冲突。

#### 3. **丢弃本地更改**

如果你确定不需要本地的修改，可以直接丢弃它们，然后拉取远程更新。

```bash
# 丢弃本地更改
git checkout -- .

# 拉取远程更新
git pull
```

#### 4. **强制覆盖本地更改**

如果你确定要完全覆盖本地的更改，可以使用以下命令：

```bash
# 强制拉取远程更新，覆盖本地更改
git fetch --all
git reset --hard origin/<branch-name>
```

注意：这将永久丢弃本地的所有未提交更改，请谨慎使用。

#### 总结

- **提交本地更改**：适合需要保留本地修改的情况。
- **暂存本地更改**：适合暂时保存本地修改，稍后再处理。
- **丢弃本地更改**：适合不需要保留本地修改的情况。
- **强制覆盖本地更改**：适合确定要完全覆盖本地修改的情况。

可根据你的需求选择合适的方式处理。
