title: Linux系统运维笔记
author: PanYuKang
tags: [Linux,服务器,系统运维]

categories: [Linux]

date: 2020-04-12 17:24:00

cover: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3143865248,1602619424&fm=26&gp=0.jpg'

---

## Linux系统种类

Linux系统种类繁多，就像一个庞大的家族，每个成员都有自己的特点和优势。它们基于相同的Linux内核，但由于不同的软件包、配置和桌面环境，形成了各种各样的发行版。

### 按用途分类

* **服务器操作系统：**
  * **CentOS:** 基于Red Hat Enterprise Linux (RHEL)，稳定性高，适合搭建各种服务器，如Web服务器、数据库服务器等。
  * **Ubuntu Server:** 基于Ubuntu，易于安装和配置，适合个人服务器和小型企业。
  * **Debian:** 稳定性高，配置灵活，适合作为基础系统进行定制。
* **桌面操作系统：**
  * **Ubuntu Desktop:** 用户界面友好，软件包丰富，适合新手和普通用户。
  * **Fedora:** 创新性强，紧跟最新技术，适合开发者和喜欢尝鲜的用户。
  * **Linux Mint:** 基于Ubuntu，外观美观，易用性高，适合对桌面环境有较高要求的用户。
* **嵌入式系统：**
  * **嵌入式Linux:** 针对嵌入式设备优化，如路由器、智能家居设备等。

### 按社区和商业模式分类

* **社区版:** 由社区驱动开发，通常免费，如Ubuntu、Fedora。
* **商业版:** 由公司开发和维护，提供商业支持和服务，如Red Hat Enterprise Linux (RHEL)。

### 主要Linux发行版的区别

| 发行版               | 特点                               | 适用人群                           |
| -------------------- | ---------------------------------- | ---------------------------------- |
| **Ubuntu**     | 易用性强，软件包丰富，社区活跃     | 新手、开发者、普通用户             |
| **CentOS**     | 稳定性高，适合生产环境，适合服务器 | 系统管理员、企业用户               |
| **Debian**     | 配置灵活，稳定性高，适合定制化需求 | 系统管理员、开发者                 |
| **Fedora**     | 创新性强，紧跟最新技术，适合开发者 | 开发者、喜欢尝鲜的用户             |
| **Arch Linux** | 高度可定制，适合高级用户           | 系统管理员、对系统有深入了解的用户 |
| **Linux Mint** | 基于Ubuntu，外观美观，易用性高     | 普通用户                           |

### **总结**

**新手推荐** ：

* **Ubuntu、Linux Mint、Manjaro** ：易用、稳定，适合桌面和开发者。

**服务器推荐** ：

* **Debian、RHEL、CentOS Stream、AlmaLinux** ：高稳定性，企业支持丰富。

**高级用户** ：

* **Arch、Gentoo** ：极高的定制性和学习价值，适合对系统掌控力要求高的用户。

**安全研究** ：

* **Kali Linux** ：预装大量渗透测试工具，是网络安全领域的首选。

## 常用的Linux命令

### tar命令

* **功能：** tar命令主要用于打包文件或目录，它并不直接进行压缩，但可以与其他压缩工具结合使用。
* **常用选项：**
  * `-c`: 创建一个新的归档文件
  * `-x`: 从归档文件中提取文件
  * `-v`: 显示详细的处理过程
  * `-f`: 指定归档文件名
  * `-z`: 使用gzip进行压缩
  * `-j`: 使用bzip2进行压缩

### 常见的命令

    备份：tar -cvf 20190923.tar ROOT
	解压：tar -xvf 20170630.tar ROOT
	查看进程：ps -fu [用户名]
	杀掉进程：kill -9 [进程号]
	清理缓存：rm -rf Catalina	提示：一定要在tomcat的work目录下执行此命令。
	重启项目：./startup.sh
	查看日志：tail -f catalina.out
	查找日志记录：vi Catalina

    端口被占用解决：
		1.查看占用指定端口的进程：netstat -anp |grep 端口号  //注意监控状态为LISTEN表示已经被占用）
		2.查看所有端口的占用情况:netstat -nultp
		3.结束占用端口的进程:kill -9 进程pid
		4.查看是否结束占用情况：netstat -anp |grep 80

## Linux命令整理

* 查找文件：find / -name filename.txt
* 递归查找特定前缀的文件：find ./ -name 文件名*
* 查看tomcat程序是否运行：ps -ef|grep tomcat
* 查看端口8080的使用情况：netstat -tln | grep 8080
* 查看进程：ps -fu [用户名]
* 终止进程：kill -9 [线程号]
* 查看文件，包含隐藏文件：ls -al
* 当前工作目录：pwd
* 复制文件：cp source dest
* 递归复制整个文件夹到自定义目录：cp -r sourceFolder targetFolder
* 创建目录：mkdir newfolder
* 删除目录：rmdir deleteEmptyFolder
* 删除文件包括其子文件:rm -rf deleteFile
* 使用超级管理员执行删除命令：sudo rm a.text
* 移动文件：mv temp/movefile/targetFolder
* 切换用户：su -username
* 修改文件权限：chmod 777 file.java
* 压缩文件：tar -czf test.tar.gz/test1/test2
* 列出压缩文件列表：tar -tzf test.tar.gz
* 解压文件：tar -xvzf test.tar.gz
* 查看文件头10行：head -n 10 example.txt
* 查看文件尾10行：tail -n 10 example.txt
* 查看日志文件：tail -f example.log
* 启动Vi编辑器：vi
* 远程登录：ssh username@ip
* 远程拷贝：cp sourecFile romoteUserName@remoteIp:remoteAddr
* 以兆为单位显示磁盘利用率：df -m
* 以G 为单位显示磁盘利用率:df -H
* 用来查看AIX 系统的，以G为单位显示磁盘使用情况:df -g

### linux上传和下载命令

linux系统下上传命令是：rz，下载命令是：sz。

rz命令和sz命令是Linux/Unix系统同Windows进行ZModem文件传输的命令行工具。优点就是不用再开一个sftp工具登录上去上传下载文件。

1、rz命令：

rz中的r意为received(接收)。输入rz命令后 ，会弹出一个选择框，可以从本地选择文件上传到服务器(receive)。

2、sz命令：

sz中的s意为send(发送)，输入sz时，意为服务器要发送文件，既从服务器发送文件到本地，或是说本地从服务器上下载文件。

注意：不论是send还是received，动作都是在服务器上发起的。

#### 如何下载文件夹

sz默认只能下载单个文件，如果需要下载某个目录文件夹下的所有内容，可以先将其打包为压缩包，再进行下载到本地。

```
tar -czvf folder.tar.gz /服务器路径/xxxx/yyyy/folder // 将服务器路径下的文件夹进行打包压缩
sz /服务器路径/xxxx/yyyy/folder.tar.gz // 下载生成的压缩包
rm folder.tar.gz //删除压缩包
```

## alias命令

**alias** 是shell中一个非常有用的功能，可以将一长串的命令缩写成一个简短的别名，方便用户快速执行。以下步骤仅针对XShell或Finalshell工具进行操作配置。

### 临时设置

例如，设置一个短命令 `ll` 来代替 `ls -al`：

```
alias ll='ls -al'
```

执行后立即生效,但重启终端后仍然会失效。

### 永久设置

要永久设置 `alias`，可以将别名写入到配置文件中。在大多数情况下，这个文件是 `~/.bashrc` 或 `~/.bash_profile`。

1.找到.bashrc配置文件位置

```
cd ~ 切换到当前用户的home目录
ls -a 显示所有文件，包括隐藏文件
```

2.打开编辑 `.bashrc`或 `.bash_profile`文件：

```
vi ~/.bashrc
vi ~/.bash_profile
```

3.在文件末尾增加想设置的短命令，例如：

.bashrc文件内容：

```bash
#.bashrc

# Source global definitions
if [-f /etc/bashrc ]; then
          ./etc/bashrc
fi

# Uncomment the following line if you don't like systemctl's auto-paging feature:
# export SYSTEMD_PAGER=

#User specific aliases and functions

export CURDATE=`date +%Y%m%d`
alias tlog='cd /home/ctbsabs/abs/log/teller/${CURDATE}/$1'
alias abs='cd /home/ctbsabs/'
alias conf='cd /home/ctbsabs/abs/configuration/ && ls'
alias trade='cd /home/ctbsabs/abs/workspace/FCBank/trade/Trade/'
~
~
```

.bash_profile文件内容：

```bash
# .bash profile

# Get the aliases and functions
if [ -f ~/.bashrc ]; then
		.~/.bashrc
fi

#User specific environment and startup programs

PATH=$PATH:$HOME/.local/bin:$HOME/bin
export AFA_HOME=/home/ctbsafa/afa
еxport PATH=$PATH:$AFA_HOME
export LANG=zh_CN.UTF-8
cur_date=`date +%Y%m%d`
alias tlog='cd /home/ctbsafa/afa/log/app/${cur_date}'
alias jlog='cd /home/ctbsafa/afa/log/app/${cur_date)/PUBLIC/JSONPKG'
alias elog='cd /home/ctbsafa/afa/log/app/${cur_date}/PUBLIC/EsbComm'
alias clog'cd /home/ctbsafa/afa/log/app/${cur_date}/PUBLIC/CoreComm'
export PATH
~
~
```

4.保存并退出:

```
:wq
```

5.使文件立即生效：

```
source ~/.bashrc
```

6.关闭当前终端，重新打开即可。

### 注意事项

有时候没有.bash_profile文件，直接配置.bashrc文件并不会生效，需要先在.bash profile文件配置PATH环境变量才行。

1.可以创建该文件:

```
touch .bash_profile
```

2.编辑文件内容：

```
# .bash profile

# Get the aliases and functions
if [ -f ~/.bashrc ]; then
		.~/.bashrc
fi

#User specific environment and startup programs

PATH=$PATH:$HOME/.local/bin:$HOME/bin

export PATH
```

3.保存后重启会话窗口即可。

### .bashrc 和 .bash_profile 的区别

#### .bash_profile

* **加载时机** ：`.bash_profile` 文件通常在用户登录时加载。它仅在登录 shell（login shell）时被执行，也就是当你通过终端或 SSH 登录时。
* **用途** ：用于设置环境变量和启动时要执行的命令，比如配置路径（`PATH`）、设置语言环境（`LANG`）等。
* **加载其他文件** ：通常 `.bash_profile` 会包含一行代码以加载 `.bashrc` 文件（如果存在），以确保非登录 shell 也能使用相同的配置：

```shell
if [ -f ~/.bashrc ]; then
    . ~/.bashrc
fi
```

#### .bashrc

* **加载时机** ：`.bashrc` 文件在每次启动非登录 shell（non-login shell）时加载。非登录 shell 通常是在图形界面的终端中打开的新终端，或者通过命令 `bash` 启动一个新的 shell 实例。
* **用途** ：主要用于定义别名、函数、命令提示符以及其他与交互式 shell 使用相关的配置。

#### 总结

* `.bash_profile` 适合配置登录时的环境变量和一次性执行的命令。
* `.bashrc` 更适合配置日常使用的 shell 行为，比如别名、函数和命令提示符。

### 删除别名

```
unalias ll
```

### 一次执行多条命令

工作中如果经常需要进入某个目录并列出文件，可以这样设置：

```
alias goTrade='cd /path/to/home/workspace/Trade; ls -la'
```

使用 `&&`（只有当 `cd` 成功时才执行 `ls`）：

```
alias myalias='cd /path/to/dir && ls -l'
```

使用 `;`（无论 `cd` 成功与否，都会执行 `ls`）：

```
alias myalias='cd /path/to/dir; ls -l'
```

## 查看服务器空间

du-h 文件名 //查看当前文件大小

df-h //查看当前服务的空间大小

### 常见场景示例

当前目录空间日志满了，可以删除前一个月以上的日志记录；

比如当前是6月，可以把5月份之前的都删了：

```
rm -rf 202205*
```

## 虚拟机安装linux系统CentOS 7

    Wind+R：在linux系统中是锁屏

    问题：给虚拟机联网（采用NAT模式）：
	参照地址：https://blog.csdn.net/weixin_44786530/article/details/89509875

    问题：如何给centos安装中文输入法：
		目前只能在root超级用户打开terminal窗口：
		输入命令安装：yum install ibus-libpinyin
		打开ibus命令：ibus-setup
		参照地址：https://www.cnblogs.com/gwmq/p/10504681.html
		注意：安装好输入法需要重启客户机，否则设置ibus时候找不到输入法

    问题：普通虚拟用户如何打开命令窗口？
