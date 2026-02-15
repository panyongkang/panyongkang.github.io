title: SVN版本管理工具
author: PanYuKang
cover: https://mpimg.cn/view.php/19da1f39c5a71e203465dced9a317a3f.jpg
tags: [SVN,脚本语言,版本管理,图形化工具]
categories: [脚本技术交流]
date: 2021-05-23 22:13:00

---

# SVN工作原理

SVN管理代码是在一台服务器上建立一个过程库，用于存放项目的文档、源码。用户在开发前，需要把过程库里的项目文件下载到本地，然后开发人员在本机电脑上进行开发修改。修改完成后用svn命令进行提交到过程库，也可以通过代码更新获取其他人的代码。

 SVN的优点是可以记录每个文件的每一次修改更新记录，可以回退到到任意时刻的旧的版本，可以用来管理程序源码、其他文件类型（文本、视频、图片等等）

## SVN常用命令

### 检出

```
svn checkout(co) svn地址(http或者svn协议) [本地目录] --username 用户名 [--password 密码] 
```

注：如果不带--password 参数传输密码的话，会提示输入密码，建议不要用明文的--password 选项。

不指定本地目录，则检出到当前目录下。

例如:

```
svn checkout http://blog.wanxiaohong.cn/project /project --username suvan
```

### 导出( 导出一个干净的不带.svn文件夹的目录树 )

```
svn export [-r 版本号] svn地址(http或者svn协议) [本地目录] --username 用户名
svn export 本地检出的(即带有.svn文件夹的)目录 要导出的本地目录
```

注：第一种从版本库导出干净工作目录树的形式是指定URL，如果指定了修订版本号，会导出相应的版本，如果没有指定修订版本，则会导出最新的，导出到指定位置。如果省略本地目录，URL的最后一部分会作为本地目录的名字。

第二种形式是指定本地检出的目录，所有的本地修改将会保留，但是不在版本控制下(即没提交的新文件，因为.svn文件夹里没有与之相关的信息记录)的文件不会拷贝。

例如:

```
svn export -r 168 http://blog.wanxiaohong.cn/project /project --username suvansvn export /project /newproject
```

### 添加新文件

```
svn add 文件名
#告知SVN服务器要添加文件了，然后提交文件
svn commint(ci) -m '增加新文件'
```

例如:

```
svn add new.file
svn commit -m '增加新文件'
svn add *.file #添加当前目录下所有的.file文件
svn commit -m '增加新文件'
```

### 提交

```
svn commit(ci) -m "提交的备注" [-N] [--no-unlock] 文件名
必须带上-m参数，参数可以为空，但是必须写上-m
```

例如：

```
svn commit -m "提交当前目录下的全部在版本控制下的文件"
svn commit -m "提交suvan.file" suvan.file
svn commit -m "提交suvan.file" -N --no-unlock test.php #保持锁用–no-unlock开关
```

### 更新文件

```
svn update
#在已被版本控制的目录中执行
```

例如：

```
svn update #默认将当前目录以及子目录下的所有文件都更新到最新版本
svn update -r 200 suvan.file #将本地版本库中的suvan.file还原到200版本(revision)
svn update suvan.file 更新到与服务器版本库相同版本。
#提交的时候若提示冲突，需先 update 修改文件，然后svn resolved，最后再提交commit。
```

### 删除文件

```
svn delete(del, remove, rm) svn地址(http或者svn协议)  -m  "删除备注信息文本"
或
svn delete /本地文件
svn ci -m
```

例如：

```
svn delete http://blog.wanxiaohong.cn/suvan.file -m "删除suvan.file"
或
svn delete suvan.file && svn commit -m '删除suvan.file'
```

### 加锁/解锁

```
svn lock -m "加锁备注信息" [--force] 文件名 
svn unlock
```

例如：

```
svn lock -m "加锁suvan.file" suvan.file
svn unlock suvan.file
```

### 比较差异

```
svn diff 文件名
```

例如：

```
svn diff suvan.file #将修改的文件与基础版本比较
svn diff -r 200:201 suvan.file #对版本号200和版本号201 比较差异
```

### 查看文件或者目录状态

```
svn status(stat, st) 目录路径
【?：不在svn的控制中； M：内容被修改；C：发生冲突；】
svn status -v
【第一列：当前版本号，第二列：修改后的版本号，第三列：修改人，第四列：修改的目录或文件】
```

注：svn status、svn diff和 svn revert这三条命令在没有网络的情况下也可执行

### 查看日志

```
svn log 文件名
```

    可以指定多个 “-c” 或 “-r” 选项 (但是不允许同时使用 “-c” 和 “-r” 选项)，以及混合使用前向和后向范围。 使用 -v 时，在日志信息中显示受影响的路径名。 使用 -q 时，不显示日志信息主体 (请注意，它可与 -v 并存)。 每条日志信息只会显示一次，即使指定了此版本涉及到的多个路径。默认日志信息会追溯复制历史；使用 –stop-on-copy 可以关闭这种行为，这可以用来找出分支点。

```
有效选项:
-r [--revision] ARG　　: ARG (一些命令也接受ARG1:ARG2范围)
版本参数可以是如下之一:
        NUMBER 　　版本号
        '{'DATE'} ' 在指定时间以后的版本
        ' HEAD ' 　　版本库中的最新版本
        ' BASE ' 　　工作副本的基线版本 
        ' COMMITTED ' 最后提交或基线之前 
        ' PREV ' 　　COMMITTED的前一版本
-q [--quiet]　　　　　　: 不打印信息，或只打印概要信息
-v [--verbose]　　 　　: 打印附加信息
-g [--use-merge-history] : 从合并历史使用/显示额外信息
-c [--change] ARG　　　　: 版本 ARG 引起的改变
–targets ARG　　　　　　: 传递文件 ARG 内容为附件参数
–stop-on-copy　　 　　: 查看历史不要跨越不同的副本
–incremental　　　　　　: 给予适合串联的输出
–xml　　　　　　　　　　: 输出为 XML
-l [--limit] ARG　　　　: 日值项最大值
–with-all-revprops　　: 获取所有版本属性
–with-no-revprops 　　: 没有找回版本属性
–with-revprop ARG 　　: 获取版本属性 ARG

	全局选项:
–username ARG　　 　　: 指定用户名称 ARG
–password ARG　　 　　: 指定密码 ARG
–no-auth-cache　　　　: 不要缓存用户认证令牌
–non-interactive　　　　: 不要交互提示
–trust-server-cert　　: 不提示的接受未知的 SSL 服务器证书(只用于选项 “–non-interactive”)
–config-dir ARG　　　　: 从目录 ARG 读取用户配置文件
–config-option ARG　　: 以下属格式设置用户配置选项：FILE:SECTION:OPTION=[VALUE]
```

例如：

```
svn log       #显示所有版本commit的日志信息:版本、作者、日期、comment。
svn log -r 4:20   #只看版本4到版本20的日志信息，顺序显示。
svn log -r 20:5   #显示版本20到4之间的日志信息，逆序显示。
svn log suvan.file #查看文件suvan.file的日志修改信息。
svn log -r 8 -v   #显示版本8的详细修改日志，包括修改的所有文件列表信息。
svn log -r 8 -v -q #显示版本8的详细提交日志，不包括comment。
svn log -v -r 88:866 #显示从版本88到版本866之间，当前代码目录下所有变更的详细信息 。svn log -v dir #查看目录的日志修改信息,需要加v。
svn log http://blog.wanxiaohong.cn/project #显示代码目录的日志信息。
svn log /project -v -l3 #查看最近3个版本日志
svn log -r 18 > suvan.log #将版本18的日志放入文件
或
svn log –incremental -r 18 > suvan.log
```

### 查看文件详细信息

```
svn info 文件名
```

例如：

```
svn info suvan.file
```

### SVN 帮助

```
svn help   全部功能选项
```

### 查看版本库下的文件和目录列表

```
svn list svn地址(http或者svn协议)
或
svn list svn本地版本库目录
```

例如：

```
svn list /project
```

### 版本库中创建新目录

```
svn mkdir 目录名
```

例如：

```
svn mkdir suvan
#创建完之后再提交一下,svn commit -m '新建目录suvan'
```

### 恢复本地修改

```
svn revert [--recursive] 文件名
#该命令不会存取网络，并且会解除冲突的状况。但是它不会恢复被删除的目录。
```

例如：

```
svn revert suvan.file   放弃对suvan.file的修改
```

### 把工作拷贝更新到别的URL

```
svn switch(sw) svn地址(http或者svn协议) 本地目录
```

例如：

```
svn switch http://blog.wanxiaohong.cn/newproject ./
#当前所在目录分支到http://blog.wanxiaohong.cn/newproject
```

### 解决冲突

```
svn resolved [本地目录]
```

例如：

```
svn update
C suvan.file
Updated to revision 31. 
如果更新时发生冲突，我们的工作拷贝会产生三个新的文件： suvan.file
suvan.file.mine
suvan.file.r30
suvan.file.r31
当我们解决了suvan.file的冲突，并且准备提交，运行svn resolved让我们的工作拷贝知道我们已经完成了所有事情。
我们也可以仅仅删除冲突的文件并且提交，但是svn resolved除了删除冲突文件，还修正了一些记录在工作拷贝管理区域的记录数据，所以我们推荐使用这个命令。
```

### 不checkout而查看输出特定文件或URL的内容

```
svn cat svn地址(http或者svn协议)
```

例如：

```
svn cat http://blog.wanxiaohong.cn/project/suvan.file
```

补充说明：

unix下如果想更换svn的用户名和密码:

1.临时更换

在所有命令下强制加上--username 和--password选项。

例如：

```
svn up --username suvan --password 168168
```

2.永久更换

进入 ~/.subversion目录,删除auth/,若担心误删可以先备份

```
cd ~/.subversion && rm -rf auth/
```

# Tortoise SVN图形化工具

## 常见图标含义

如图所示：

![image-20210628104206566](https://cdn.jsdelivr.net/gh/panyongkang/MyImgBed/img/svn%E5%9B%BE%E6%A0%87%E5%90%AB%E4%B9%89.png)

**绿色的勾**：图标表示这是一个最新取出的工作副本，他的Subversion状态是normal。

**灰色的勾**：灰色图标表示”只读”，如果你给一个文件设置了svn:needs-lock属性，Subversion会让此文件只读，直到你获得文件锁。只读文件具有这个重载图标来表示你必须在编辑之前先得到一个锁。

**红色感叹号**：当你开始编辑一个文件，这个文件的状态就会变成modified，图标也会变成红色圆圈带一个感叹号。这样你就可以轻易的知道自从上次更新以来都有修改过哪些文件，需要提交哪些文件。

**黄色感叹号**：三角符号带感叹号，表示在一次update中产生了一个冲突（conflict）。

**蓝色加号**：意味着这个文件或文件夹已经被计划加入到版本控制之下。

**红叉叉**：表示相应文件或文件夹被计划删除（deleted），或者表示文件缺失。

**灰色一行**：表示不受版本控制，忽略版本控制。

**蓝色问号**：暂时还没收到版本的控制，但是没有被忽略。

**锁扣**：表示文件被锁定，他的Subversion状态是normal，必须先释放锁才能让别人的更改提交。

### 项目视图

**[![img](https://ewr1.vultrobjects.com/imgspice/000/000/273/680_913_191.png)](javascript:void())- 已忽略版本控制的文件。可以通过Window → Preferences → Team → Ignored Resources.来忽略文件。**

[![img](https://ewr1.vultrobjects.com/imgspice/000/000/273/681_d54_5a9.png)](javascript:void())- **未纳入版本控制的文件，一般是新增，尚未提交的文件。**

**[![img](https://ewr1.vultrobjects.com/imgspice/000/000/273/682_831_015.png)](javascript:void())- 本地重命名或移动到其它目录的文件。**

**[![img](https://ewr1.vultrobjects.com/imgspice/000/000/273/683_60e_02b.png)](javascript:void())- 本地删除的目录。**

**[![img](https://ewr1.vultrobjects.com/imgspice/000/000/273/684_b21_24a.png)](javascript:void())- 没有任何改动的文件。**

**[![img](https://ewr1.vultrobjects.com/imgspice/000/000/273/686_bea_a43.png)](javascript:void())- 处于锁定状态的文件。**

**[![img](https://ewr1.vultrobjects.com/imgspice/000/000/273/687_f6f_510.png)](javascript:void())- 有冲突没有解决，就更新或提交的文件。**

[![img](https://ewr1.vultrobjects.com/imgspice/000/000/273/688_22e_c35.png)](javascript:void())**- 有目录树冲突的文件。一般在最近一次更新后，资源库上的文件被移动、删除或重命名。**

**[![img](https://ewr1.vultrobjects.com/imgspice/000/000/273/689_d43_bdc.png)](javascript:void())- 引用外部项目的文件，不能提交到本项目的资源库里。**

**[![img](https://ewr1.vultrobjects.com/imgspice/000/000/273/690_7c0_e7a.png)](javascript:void())- 有分支版本的文件。这些文件属于另外一个不同的工作目录而不是属于本地的父目录。**

### 迁出

**[![img](https://ewr1.vultrobjects.com/imgspice/000/000/273/691_dcb_1b8.png)](javascript:void())- 本地有更改的文件。**

**[![img](https://ewr1.vultrobjects.com/imgspice/000/000/273/692_bb9_541.png)](javascript:void())- 本地新增的文件。**

**[![img](https://ewr1.vultrobjects.com/imgspice/000/000/273/693_215_1ab.png)](javascript:void())- 本地删除的文件。**

**[![img](https://ewr1.vultrobjects.com/imgspice/000/000/273/694_892_63f.png)](javascript:void())- 本地文件属性发生变化了的文件。**

### 迁入

**[![img](https://ewr1.vultrobjects.com/imgspice/000/000/273/695_122_6fa.png)](javascript:void())-需要更新的文件。**

**[![img](https://ewr1.vultrobjects.com/imgspice/000/000/273/696_995_be7.png)](javascript:void())- 需要迁入的新增文件。**

**[![img](https://ewr1.vultrobjects.com/imgspice/000/000/273/697_5f3_e47.png)](javascript:void())- 资源库中删除了的文件。**

### 冲突

**[![img](https://ewr1.vultrobjects.com/imgspice/000/000/273/698_28f_c38.png)](javascript:void())- 资源库和本地同时有修改的文件。**

**[![img](https://ewr1.vultrobjects.com/imgspice/000/000/273/699_d3b_ef5.png)](javascript:void())- 远程资源库上已经被重命名或移动、删除的文件。**

### “与资源库同步”选项打开的界面上的一些按钮

**[![img](https://ewr1.vultrobjects.com/imgspice/000/000/273/700_717_736.png)](javascript:void())- 同步选中的文件，下拉箭头切换不同的远程目录。**

**[![img](https://ewr1.vultrobjects.com/imgspice/000/000/273/701_b14_bfe.png)](javascript:void())- 只显示需要迁入的文件。**

**[![img](https://ewr1.vultrobjects.com/imgspice/000/000/273/702_7d4_b35.png)](javascript:void())- 只显示需要提交的文件。**

**[![img](https://ewr1.vultrobjects.com/imgspice/000/000/273/703_f36_558.png)](javascript:void())- 同时显示需要更新或提交文件。**

**[![img](https://ewr1.vultrobjects.com/imgspice/000/000/273/704_98a_3bb.png)](javascript:void())- 只显示有冲突的文件。**

**[![img](https://ewr1.vultrobjects.com/imgspice/000/000/273/705_bca_4a4.png)](javascript:void())- 更新全部文件。**

**[![img](https://ewr1.vultrobjects.com/imgspice/000/000/273/706_9b4_df0.png)](javascript:void())- 提交全部文件。**

## 常用操作说明

**中文视图如下：**

![图片](https://cdn.jsdelivr.net/gh/panyongkang/MyImgBed/img/SVN%E6%93%8D%E4%BD%9C%E8%A7%86%E5%9B%BE.png)

TortoiseSVN是windows下其中一个非常优秀的SVN客户端工具。通过使用它，我们可以可视化的管理我们的版本库。不过由于它只是一个客户端，所以它不能对版本库进行权限管理。

TortoiseSVN不是一个独立的窗口程序，而是集成在windows右键菜单中，使用起来比较方便。
TortoiseSVN每个菜单项都表示什么意思

01、SVN Checkout(SVN取出)
点击SVN Checkout，弹出检出提示框，在URL of repository输入框中输入服务器仓库地址，在Checkout directory输入框中输入本地工作拷贝的路径，点击确定，即可检出服务器上的配置库。

02、SVN Update(SVN更新)
如果配置库在本地已有工作拷贝，则取得最新版本只是执行SVN Update即可，点击SVN Update，系统弹出更新提示框，点击确定，则把服务器是最新版本更新下来

03、Import（导入）
选择要提交到服务器的目录，右键选择TortoiseSVN----Import，系统弹出导入提示框，在URL of repository输入框中输入服务器仓库地址，在Import Message输入框中输入导入日志信息，点击确定，则文件导入到服务器仓库中。

04、Add(加入)
如果有多个文件及文件夹要提交到服务器，我们可以先把这些要提交的文件加入到提交列表中，要执行提交操作，一次性把所有文件提交，如图，可以选择要提交的文件，然后点击执行提交（SVN Commit）,即可把所有文件一次性提交到服务器上

05、Resolving Conflicts(解决冲突)
有时你从档案库更新文件会有冲突。冲突产生于两人都修改文件的某一部分。解决冲突只能靠人而不是机器。当产生冲突时，你应该打开冲突的文件，查找以<<<<<<<开始的行。冲突部分被标记：
<<<<<<< filename

your changes

code merged from repository
\>>>>>>> revision
Subversion为每个冲突文件产生三个附加文件：
filename.ext.mine
更新前的本地文件。
filename.ext.rOLDREV
你作改动的基础版本。
filename.ext.rNEWREV
更新时从档案库得到的最新版本。
使用快捷菜单的编辑冲突Edit Conflict命令来解决冲突。然后从快捷菜单中执行已解决Resolved命令，将改动送交到档案库。请注意，解决命令并不解决冲突，而仅仅是删除 filename.ext.mineandfilename.ext.r*文件并允许你送交。

06、Check for Modifications（检查更新）
点击Check for Modifications,系统列表所以待更新的文件及文件夹的状态.

07、Revision Graph(版本分支图)
查看文件的分支,版本结构,可以点击Revision Graph,系统以图形化形式显示版本分支.

08、Rename(改名)
SVN支持文件改名,点击Rename,弹出文件名称输入框,输入新的文件名称,点击确定,再把修改提交,即可完成文件改名

09、Delete(删除)
SVN支持文件删除,而且操作简单,方便,选择要删除的文件,点击Delete,再把删除操作提交到服务器

10、Moving(移动)
选择待移动的文件和文件夹；按住右键拖动right-drag文件（夹）到跟踪拷贝内的新地方；松开左键；在弹出菜单中选择move files in Subversion to here

11、Revert(还原)
还原操作,如刚才对文件做了删除操作,现在把它还原回来,点击删除后,再点击提交,会出现如上的提示框,点击删除后,再点击Revert,即已撤销删除操作,如果这时候点击提交,则系统弹出提示框:没有文件被修改或增加,不能提交

12、Branch/Tag(分支/标记)
当需要创建分支，点击Branch/Tag，在弹出的提示框中，输入分支文件名，输入日志信息，点击确定，分支创建成功，然后可查看文件的版本分支情况

13、Switch(切换)
文件创建分支后，你可以选择在主干工作，还是在分支工作，这时候你可以通过Switch来切换。

14、Merge(合并)
主干和分支的版本进行合并，在源和目的各输入文件的路径，版本号，点击确定。系统即对文件进行合并，如果存在冲突，请参考冲突解决。

15、Export(导出)
把整个工作拷贝导出到本地目录下,导出的文件将不带svn文件标志,文件及文件夹没有绿色的”√”符号标志。

16、Relocate(重新定位)
当svn服务器url发生变更,又不想在本地重新进行checkout操作,这时候可以使用svn relocate命令进行url的重新定位;

17、Add to Ignore List(添加到忽略列表)
大多数项目会有一些文件（夹）不需要版本控制，如编译产生的*.obj, *.lst,等。每次送交，TortoiseSVN提示那些文件不需要控制，挺烦的。这时候可以把这些文件加入忽略列表。

18、SVN其它相关功能
客户端修改用户密码:
打开浏览器,在地址栏内输入http://192.168.1.110/test/ChangePasswd,启动客户端修改用户密码的界面,输入正确的用户名,旧密码,新密码(注意密码的位数应该不小于6,尽量使用安全的密码),点击修改即可.

19、SVN Commit（版本提交）
把自己工作拷贝所做的修改提交到版本库中，这样别人在获取最新版本(Update)的时候就可以看到你的修改了。

20、Show log（显示日志）
显示当前文件(夹)的所有修改历史。SVN支持文件以及文件夹独立的版本追溯。

21、Repo-Browser（查看当前版本库）
查看当前版本库，这是TortoiseSVN查看版本库的入口，通过这个菜单项，我们就可以进入配置库的资源管理器，然后就可以对配置库的文件夹进行各种管理，相当于我们打开我的电脑进行文件管理一样。

22、Revision Graph（版本图形）
查看当前项目或文件的修订历史图示。如果项目比较大型的话，一般会建多个分支，并且多个里程碑（稳定版本发布），通过这里，我们就可以看到项目的全貌。

23、Resolved（解决冲突）
如果当前工作拷贝和版本库上的有冲突，不能自动合并到一起，那么当你提交修改的时候，tortoisesvn就会提示你存在冲突，这时候你就可以通过这个菜单项来解决冲突。冲突的解决有两种，一种是保留某一份拷贝，例如使用配置库覆盖当前工作拷贝，或者反过来。还有一种是手动解决冲突，对于文本文件，可以使用tortoiseSVN自带的工具，它会列出存在冲突的地方，然后你就可以和提交者讨论怎么解决这个冲突。同时它也对Word有很好的支持

24、Update to Revision(更新至版本)
从版本库中获取某一个历史版本。这个功能主要是方便查看历史版本用，而不是回滚版本。注意：获取下来之后，对这个文件不建议进行任何操作。如果你做了修改，那么当你提交的时候SVN会提示你，当前版本已失效（即不是最新版本），无法提交，需要先update一下。这样你所做的修改也就白费了。

25、Revert（回滚）
如果你对工作拷贝做了一些修改，但是你又不想要了，那么你可以使用这个选项把所做的修改撤销

26、Cleanup（清除状态）
如果当前工作拷贝有任何问题的话，可以使用这个选项进行修正。例如，有些文件原来是版本控制的，但是你没有通过tortoiseSVN就直接删除了，但是 tortoiseSVN还是保留着原来的信息（每个文件夹下都有一个.svn的隐藏文件夹，存放着当前文件夹下所有文件夹的版本信息）所以这就会产生一些冲突。可以使用cleanup来清理一下。

27、GetLock/ReleaseLock（加锁/解锁）
如果你不想别人修改某个文件的话，那么你就可以把这个文件进行加锁，这样可以保证只有你对这个文件有修改权。除非你释放了锁，否则别人不可能提交任何修改到配置库中

28、Branch/tag（分支/标签）
Branch是分支的意思。例如当在设计一个东西的时候，不同的人有不同的实现，但是没有经过实践检验，谁也不想直接覆盖掉其他人的设计，所以可以引出不同的分支。将来如果需要，可以将这些分支进行合并。
tag是打标签的意思。通常当项目开发到一定程度，已经可以稳定运行的时候，可以对其打上一个标签，作为稳定版。将来可以方便的找到某个特定的版本（当然我们也可以使用版本号来查找，但是数字毕竟不方便）
SVN对于分支和标签都是采用类似Linux下硬链接的方式（同一个文件可以存在两个地方，删除一个不会影响另一个，所做修改会影响另一个），来管理文件的，而不是简单的复制一份文件的拷贝，所以不会有浪费存储空间的问题存在。

29、Export（导出）
这个功能是方便我们部署用。当我们需要发布一个稳定版本时，就可以使用这个功能将整个工程导出到某个文件夹，新的文件夹将不会包含任何版本信息了。

30、Relocate（版本库转移）
当我们版本库发生转移的时候就需要用到这个功能了。例如我原先的版本库是建在U盘上的，现在转移到（复制整个配置库文件夹）开发服务器上，使用https代替文件系统的访问。因此就需要将原来的工作拷贝的目标版本库重新定位到开发服务器上。

31、create patch（创建补丁）
创建补丁。如果管理员不想让任何人都随便提交修改，而是都要经过审核才能做出修改，那么其他人就可以通过创建补丁的方式，把修改信息（补丁文件）发送给管理员，管理员审核通过之后就可以使用apply patch提交这次修改了。

32、diff (比较修改部分)
如果你修改了一个文件，又不确定改了那些地方，这时你可以在相应文件上点右键，选择diff查看，与服务器上最新版的差异

### **切换用户**

#### 通过TortoiseSVN设置清除

1. 在任意文件夹右键，选择 **`TortoiseSVN`** ->  **`Settings`** （或 `Settings`）。
2. 在设置对话框中，左侧选择  **`Saved Data`** （已保存数据）。
3. 在右侧，找到  **`Authentication data`** （认证数据）项，点击其旁边的  **`Clear`** （清除）按钮。
4. 清除后，重新检出时会弹出重新认证，重新输入用户密码认证即可。

### **按需检出单个文件**

进入浏览时，选中要检出的文档，有个**Update item to revision**（更新项目至版本）选项，这个可以直接检出单个文档，不会删除原来已经检出的文档。

### **查看锁定者**

#### **右键点击文件或文件夹**

* 在文件资源管理器中，右键点击被锁定的文件或文件夹。

#### **选择 "Check for Modifications"**

* 在右键菜单中，选择 **TortoiseSVN** ->  **Check for Modifications** 。

#### **查看锁定信息**

* 在弹出的窗口中，找到被锁定的文件。
* 如果文件被锁定，锁定者的用户名会显示在列表中。

## 版本问题记录

**问题1：**subversion.javahl.ClientException: RAlayer request failed  Could not read chunk size:远程主机强迫关闭了一个现有连接。

描述分析：svn版本不一致无法提交上传到远程仓库，将版本V1.14.10卸载后重装了V1.7.7版本，但是检出在IDE开发工具里面检出代码失败，高版本好像可以直接检出，具体原因未知。网上解释是因为SVN版本由高版本1.14.10降低到1.7.7，老版本的Totorise *SVN*不能识别新版本的.*svn*文件夹中的内容；

**解决办法**：暂时把大文件夹分开的检出，或者重新在IDE工具外面新建文件检出再重新导入工程。

**问题2：** svn共享项目时报错：appears to be working copy. please upgrade your Subversion client to use this working copy

解决办法：是因为从本地检出会生成.svn文件，由于SVN降低了版本，不能共享，需要先将.svn文件删除了，才能重新进行共享项目。

**问题3：**Could not read chunk delimiter:远程主机强迫关闭了一个现有连接。

**问题4：**共享大文件FCbank的中途报错： The operation was interrupted svn:Operation canceled.

**最终解决思路：**先从本地新建一个文件夹，将代码检出，再导入ABIDE开发工具中，然后选择共享项目，失败了不要紧，重新更新完整代码。然后再构建文件（用来建立索引路径，编译.class/java等文件），此时还是很多问号或者报红XX,共享之后会出现可以与SVN关联的选项栏；每次先构建，再还原，再更新代码到本地即可（此过程可能会重复多次）。最后就能在ABIDE开发工具中使用SVN正常提交更新代码了。大概是先【构建文件】-【共享项目】-【更新】-【还原】-【再构建更新】这几个步骤。

**错误5：**指向文件不存在

思路：可以先把错误信息删除，或把红叉叉文件改动，然后再覆盖更新。

**错误6：**同步平台组件时报错：“”无法执行。原因：不能创建或复用资源，原因是它已存在。
