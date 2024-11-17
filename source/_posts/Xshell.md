title: Xshell
author: PanXiaoKang

cover: https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3085989673,336141428&fm=115&gp=0.jpg

tags:

  - Xshell

categories:

  - Linux

date: 2020-06-01 16:30:00

---

## Xshell常用命令整理

### 命令cd——更改目录

* cd ~ 切换到用户目录，比如是root用户，则切换到/root下
* cd /tmp 切换到目录/tmp
* cd dir 切换到当前目录下的dir目录
* cd / 切换到根目录
* cd - 回到之前的目录
* cd .. 切换到到上一级目录
* cd ../.. 切换到上二级目录

### 命令ls——列出文件

* ls -la 给出当前目录下所有文件的一个长列表，包括以句点开头的“隐藏”文件
* ls a* 列出当前目录下以字母a开头的所有文件
* ls -l *.doc 给出当前目录下以.doc结尾的所有文件
* ls -lrt 会以详细列表形式显示文件和目录，按修改时间排序，并将最旧的文件显示在前，最新的显示在最后
* ls -lt 查看最近修改的文件列表
* ls -ls 快速找出占用空间较大的文件
* ls --color=auto 为不同类型的文件添加颜色，以便区分

### 命令cp——复制文件

* cp file newfile.bak 把文件file复制为新文件newfile.bak
* cp file /home/bible/ 把文件file从当前目录复制到/home/bible/目录下
* cp * /tmp 把当前目录下的所有未隐藏文件复制到/tmp/目录下
* cp -a docs docs.bak 递归性把docs目录复制为新目录docs.bak,保持文件属性，并复制所有的文件，包括以句点开头的隐藏文件。
* cp -i 在覆盖前询问用户
* cp -v 告诉用户正在做什么

### 命令mv——移动和重命名文件

* mv aflie bfile 将afile重命名为bfile
* mv afile /tmp 把当前目录下的afile移动到/tmp/目录下

### 命令rm——删除文件和目录

* rm afile 删除文件afile
* rm * 删除当前目录下的所有文件(未隐藏文件)。rm命令不删除目录，除非也指定了-r(递归)参数。
* rm -rf domed 删除domed目录以及它所包含的所有内容
* rm -i a* 删除当前目录下所有以字母a开头的文件，并且在每次删除时，提示用户进行确认

### 命令mkdir——建立目录

* mkdir photos 在当前目录中建立名为photos的目录
* mkdir -p this/that/theother 在当前目录下建立指定的嵌套子目录

### 命令rmkdir——删除目录

* rmkdir  空目录名 将删除空目录

### 命令touch——创建一个空文件

* touch aaa.txt 创建一个空文件，文件名为aaa.txt

### 命令more、less——查看文件内容

* more /etc/passwd 查看/etc/passwd的内容
* less /etc/passwd 查看/etc/passwd的内容

### 命令tail——查看文件详细信息

* tail -f aaa.txt  看aaa.txt文件的详细信息(查看实时的日志)

  例如：tail -200f normal.log (查看近200条实时运行的日志)
  tail -200 normal.log (查看近200条日志(不实时))
* tail -n x aaa.log  x:最后几行的信息

### 命令head——查看文件名字和后缀

* head -n x aaa.log 查看x行数的aaa.log文件

### 命令grep——过滤搜索文件内容

* grep -lr '关键词' . > 'D:\\\保存.txt'  在Git中进入当前目录下，通过关键词搜索并另存为txt文件保存路径信息，可用于统计文件路径。
* grep bible /etc/exports 在文件exports中查找包含bible的所有行
* tail -100 /var/log/apache/access.log | grep 404 在WEB服务器日志文件access.log的后100行中查找包含“404”的行
* tail -100 /var/log/apache/access.log | grep -v googlebot 在WEB服务器日志文件access.log的后100行中，查找没有被google访问的行
* grep -v ^# /etc/apache2/httpd.conf 在主apache配置文件中，查找所有非注释行
* grep -r '关键词' .   //搜索当前目录下所有有关键词的文件（可直接展示关键词位置)
* grep -r --exclude-dir={dir1,dir2} '关键字' .  使用 `--exclude` 排除不需要搜索的目录或文件
* grep -r --include="*.txt" '关键字' .  使用 `--include` 只搜索特定类型的文件

**在xshell上查看某个时间段的日志 ，记两种方式**

    (1) 用grep：格式为：grep -E ‘起始时间|结束时间’ 日志文件
grep -E ‘2019-10-22 09:00:05|2019-10-22 10:50:15’ common.log

    (2) 用sed命令，格式为：sed -n ‘/起始时间/,/结束时间/p’ 日志文件
sed -n ‘/2019-10-22 10:44/,/2019-10-22 10:47/p’ common.log

**使用 `ag` 或 `ripgrep` 替代 `grep`**

`ag`（The Silver Searcher）和 `ripgrep` 是两个比 `grep` 更快的搜索工具，默认支持递归搜索，特别适用于层级深、文件多的项目中。

* ag '关键字' .
* rg '关键字' .

### 命令find——查找文件

* find ./name *.doc 在当前目录中查找.doc文件
* find ./ -name 文件名* 递归查找特定前缀的文件
* find /path/to/directory -mtime -1 按修改时间搜索最近一天内修改的文件
* find .|grep page 在当前目录及其子目录中查找文件名包含page的文件 locate traceroute 在系统的任何地方查找文件名包含traceroute的文件

### 命令vi——编辑文件

* vi /etc/bubby.txt 用vi编辑文件/etc/bubby.txt
* vim /etc/bubby.txt 用vi编辑文件/etc/bubby.txt

按住 i键进入编辑模式
　　编辑完 按住Esc取消编辑
　　输入 : wq! 保存
　　        : q! 是不保存

快捷操作：

　　切换窗口：alt+1,alt+2

　　全屏：alt+回车

　　将vim挂起(暂停)：ctrl+z，暂停后可进行其他shell操作，完了之后可通过 fg 命令切换回vim界面继续编辑

　　:MR：查看历史文件记录(注意：MR大写)

　　:sp 横向切换界面窗口

　　:vsp 纵向切换界面窗口

### 命令rz、sz——文件上传下载

* 运行命令Sudo rz，即是接收文件，xshell就会弹出文件选择对话框，选好文件之后关闭对话框，文件就会上传到linux里的当前目录 。
* 运行命令Sudo sz file 就是发文件到windows上(保存的目录是可以配置)
* 比ftp命令方便多了，而且服务器不用再开FTP服务了。

### 命令cat——显示文件内容

* cat file

### netstat是查看端口是否被占用

　　例如：netstat -app|grep 10086

### 命令ps——查看进程

* ps [options]

　　DESCRIPTION(描述)：ps命令显示运行程序选项的一些信息。如果你想显示选项的一些重复信息，请使用top命令替代。 用标准语法查看系统上的每一个进程。

　　ps -e

　　ps -ef

　　ps -eF

　　ps -ely

例如：

* 查看运行的进程

  ps -ef|grep ServerRun
* 查看全部进程数

  ps -ef  | wc -l

  -e：显示所有程序。

  -f：显示UID,PPIP,C与STIME栏位。
* 查看httpd的进程数

  ps -ef | grep httpd | wc -l

### 命令kill——杀掉进程

　　[root@linux ~]# kill -signal %jobnumber

　　[root@linux ~]# kill -l

　　参数： -l ：这个是 L 的小写，列出目前 kill 能够使用的讯号 (signal) 有哪些?共有62个。

### 命令stop、start——重启tomcat

* ./catalina.sh stop
* ./catalina.sh start

### 命令top——查看cpu、内存

### 命令pwd——查看当前路径

### 命令clear——清屏

### 命令tar——打包、解包rar

* tar -cvf **.tar a.jsp b.java 将a和b打成**.rar
* tar -xvf **.tar a.jsp b.java 将**.tar 解包

### 命令diff——比较文件内容

* diff dir1 dir2 比较目录1与目录2的文件列表是否相同，但不比较文件的实际内容，不同则列出
* diff file1 file2 比较文件1与文件2的内容是否相同，如果是文本格式的文件，则将不相同的内容显示，如果是二进制代码则只表示两个文件是不同的
* comm file1 file2 比较文件，显示两个文件不相同的内容

### 命令ln——建立连接

* ln source_path target_path 硬连接
* ln -s source_path target_path 软连接

### 命令history——历史命令

* history 查看历史命令
* !100 执行第 100 条历史命令

## 工作中常用命令、快捷键

* 查看日志信息：view+报错日志
* .gz压缩包解压命令：gunzip -d filename
* .gz压缩包压缩命令：gzip filename
* :q：强制退出
* :wq:保存退出
* :w:保存
* 定位查询：？+查询的信息
* shift+G:到最后一行
* ctrl+B:向上
* ctrl+D向下

**代码升级后重启服务器流程**

将三个56环境在右下角点击为全部会话，可以进行同时命令的操作

进入modules目录下执行以下命令

停56环境服务：plstopall.sh

检查是否停止完成：showserver

先提交：svn up

再编译：ant onl

最后重启服务：plstartall.sh

检查是否启动完成：showserver

出现某个服务未启动，需要在对应目录下，将对应文件删除，再重启单独启动。

比如onlApp5服务未启动成功
输入etc命令找到pids目录
删除ltts.onl.onlApp5.pid文件:\rm+该文件
再重启即可
