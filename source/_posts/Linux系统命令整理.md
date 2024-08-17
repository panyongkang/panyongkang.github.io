title: Linux系统命令整理
author: PanYuKang
tags:

  - linux
categories:
  - Linux
date: 2020-04-12 17:24:00

cover: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3143865248,1602619424&fm=26&gp=0.jpg'

---

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

### 上线时常用的命令

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

### 常用Linux命令整理

    1.	查找文件：find / -name filename.txt
	2.	查看tomcat程序是否运行：ps -ef|grep tomcat
	3.	查看端口8080的使用情况：netstat -tln | grep 8080
	4.	查看进程：ps -fu [用户名]
	5.	终止进程：kill -9 [线程号]
	6.	查看文件，包含隐藏文件：ls -al
	7.	当前工作目录：pwd
	8.	复制文件：cp source dest
	9.	递归复制整个文件夹到自定义目录：cp -r sourceFolder targetFolder
	10.	创建目录：mkdir newfolder
	11.	删除目录：rmdir deleteEmptyFolder
	12.	删除文件包括其子文件:rm -rf deleteFile
	13.	使用超级管理员执行删除命令：sudo rm a.text
	14.	移动文件：mv temp/movefile/targetFolder
	15.	切换用户：su -username
	16.	修改文件权限：chmod 777 file.java
	17.	压缩文件：tar -czf test.tar.gz/test1/test2
	18.	列出压缩文件列表：tar -tzf test.tar.gz
	19.	解压文件：tar -xvzf test.tar.gz
	20.	查看文件头10行：head -n 10 example.txt
	21.	查看文件尾10行：tail -n 10 example.txt
	22.	查看日志文件：tail -f example.log
	23.	启动Vi编辑器：vi
	24.	远程登录：ssh username@ip
	25.	远程拷贝：cp sourecFile romoteUserName@remoteIp:remoteAddr
    	26.	以兆为单位显示磁盘利用率：df -m
	27.	以G 为单位显示磁盘利用率:df -H
	28.	用来查看AIX 系统的，以G为单位显示磁盘使用情况:df -g

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

## 虚拟机安装linux系统CentOS 7的学习整理

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
