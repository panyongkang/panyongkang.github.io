title: Shell脚本语言
author: PYK
message: 您好，本篇文章需密码访问，请谅解！
password: card0113
cover: https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1602418785986&di=b642a03405f7ef5adb954f58cdcf70c9&imgtype=0&src=http%3A%2F%2Fwww.eazylinux.com%2Fwp-content%2Fuploads%2F2016%2F09%2Fbashshell.png
tags: [Shell,脚本]
categories: [Linux]
date: 2020-05-05 22:22:00

---

## 语法解释

* #!/bin/bash：是shell脚本的第一行，它代表的意思是该文件使用的是bash语法。如果不设置该行，那么你的shell脚本就不能被执行。
* **#** ：是一个约定的标记，它告诉系统这个脚本需要什么解释器来执行，即使用哪一种 Shell。
* ''#‘’ ：是单行注释
* 多行注释可以使用

```markdown
:<<EOF
注释内容...
注释内容...
注释内容...
EOF
```

EOF 也可以使用其他符号代替。如：<<! 注视内容！等格式。

* chmod +x：是为脚本设置可执行权限；Linux下文件的权限类型一般包括读，写，执行。对应字母为 r、w、x。

### 变量操作

- 创建普通变量： name=“test” （=两边不可有空格）
- 创建只可函数体中使用的局部变量： local name=“test” （使用local修饰的变量在函数体外无法访问，并且local只能在函数体内使用）
- 使用变量： echo $name 或者 echo ${name} （推荐使用大括号版）
- 变量重新赋值： name=“new_test” （将原值覆盖）
- 只读变量： name=“only_read” -> readonly name （使用readonly标识后的变量，不可被修改）
- 删除变量： unset name; （删除之后不可访问，删除不掉只读变量）

### 参数传递

- 获取参数值：
  - $0 ： 固定，代表执行的文件名
  - $1 ： 代表传入的第1个参数
  - $n ： 代表传入的第n个参数
- $#：参数个数
- $*： 以一个单字符串显示所有向脚本传递的参数。如"$*“用「”」括起来的情况、以"$1 $2 … $n"的形式输出所有参数
- $@：与$*相同，但是使用时加引号，并在引号中返回每个参数。
- $$
  ：脚本运行的当前进程号
  $$
- $！：后台运行的最后一个进程的ID
- $?： 显示最后命令的退出状态。0表示没有错误，其他任何值表明有错误。
- $* 与 $@ 区别
  - 相同点：都是引用所有参数。
  - 不同点：只有在双引号中体现出来。假设在脚本运行时写了三个参数 1、2、3，，则 " * " 等价于 “1 2 3”（传递了一个参数），而 “@” 等价于 “1” “2” “3”（传递了三个参数）。

### 输出

**echo**
仅用于字符串的输出，没有使用printf作为输出的移植性好，建议使用printf

**printf**

> printf 不会像 echo 自动添加换行符，我们可以手动添加 \n
> 无大括号，直接以空格分隔

- 格式：`printf format-string [arguments...]` 其中（format-string: 格式控制字符串、arguments: 参数列表）
- 案例：`printf "%-10s %-8s %-4.2f\n" 郭靖 男 66.1234`
- %s %c %d %f 都是格式替代符
  - d：Decimal 十进制整数 对应位置参数必须是十进制整数，否则报错!
  - s：String 字符串 对应位置参数必须是字符串或者字符型 否则报错
  - c：Char 字符 对应位置参数必须是字符串或者字符型 否则报错
  - f：Float 浮点 对应位置参数必须是数字型 否则报错
- `%-10s` ： 指一个宽度为10个字符（-表示左对齐，没有则表示右对齐），任何字符都会被显示在10个字符宽的字符内，如果不足则自动以空格填充，超过也会将内容全部显示出来。
- `%-4.2f` ：指格式化为小数，宽度为4个字符，其中 `.2`指保留2位小数。

### 文件引用

引用其他的文件之后，可以使用其变量、函数等等，相当于将引用的文件包含进了当前文件
有两种方式：

* **.** file_path\file_name
* **source** file_path\file_name

## shell与linux命令的联系

shell是linux命令集的概称，是属于命令行的人机界面。shell 是一个用C语言编写的程序，它是用户使用Linux的桥梁。Shell既是一种命令语言，又是一种程序设计语言。shell是指一种应用程序，这个应用程序提供了一个界面，用户通过这个界面访问操作系统内核的服务。

## shell与linux命令的区别

1.linux命令直接在命令行执行，就是在当前的shell环境下执行，比如涉及到一些环境变量的时候，必须在当前shell环境里执行。

2.使用Shell脚本执行的话，会fork一个子进程，所有操作都在子进程进行。如果涉及到一些在脚本里设置环境变量的东西，脚本结束了，环境变量也就消失了。 如果是修改环境变量的话，需要特别注意下。

3.shell可以重复或批量地执行一些命令。可以把要重复执行的命令写到脚本里面执行。而命令行的话就需要一个一个的输入命令，相对而言麻烦一些。

# 定时任务脚本

## 柜面文件归档

### 上传备份文件到远程服务器(putFile.sh)

```shell
#!/bin/bash

#上传备份文件
loalPath=/home/abcs/abs/bakup/file/
servPath=/logserver01/abcs/abs/file/
servIp=172.26.4.27
userName=user1
userPswd=ftp@2026
t1=`date +%Y%m%d -d "1 days ago"` # 计算获取昨天的时间，用来匹配备份包的名字
cd $loalPath
fileName=abs_file_${t1}.tar.gz
echo "文件名："${fileName}
echo "开始上传："`date`
#将备份文件上传到日志服务器
# 调用 ftp 程序
/usr/bin/ftp -ni <<!
open $servIp #主动连接到指定的 $serverIP 服务器。
user $userName $userPswd #使用刚才定义的账号和密码进行远程登录认证。
lcd $loalPath #切换当前这台Linux服务器指定的目录。
cd ${servPath} #切换远程目标服务器上的目录
bin #切换为“二进制传输模式” 上传 .tar.gz 压缩包时必须用 bin 模式。如果用了默认的 ASCII 模式去传压缩包，传过去的文件会损坏，解压不了。
prom #关闭交互提示
passive #采用“被动模式”
put $fileName #上传单个文件
bye #断开并退出 FTP 连接
! #这里的 ! 是脚本里的结束标记。它对应开头那个 <<!，告诉 Shell：“FTP 的交互指令到这里就结束了，脚本继续往下执行”。
echo "上传完成："`date`

```

#### 内容补充：

2. 进入 FTP 交互模式

```shell
/usr/bin/ftp -ni <<!
```

* **`/usr/bin/ftp`** ：调用系统标准的 FTP 客户端程序。
* **`-n`** ：禁用自动登录（因为我们要在下面手动用 `user` 命令输入账号，防止它尝试用 `.netrc` 文件）。
* **`-i`** ：关闭“多文件传输时的交互提示”。如果不加这个，上传多个文件时 FTP 会问“确定要传这个文件吗？”，加了就能静默自动传。
* **`<<!`** ：这是一个 Shell 的“输入重定向”符号。告诉终端：**把接下来直到遇到 `!` 这一行之前的所有内容，都当作前面 `/usr/bin/ftp` 的输入。**

使用 `crontab -e` 命令**去修改 `crontab` 里配置的定时执行脚本：**

```
30 0 * * * sh /home/abcs/abs/bakup/putFile.sh >> /home/abcs/abs/bakup/runFile.log 2>&1
```

加了 `2>&1` 后，就算脚本半夜报错了，日志里出现报错信息也会追加在 `runFile.log` 里，就可以根据错误信息定位问题。

**新加的这个 `2>&1` 是什么意思？**

* **`2`** ：代表“标准错误”通道（报错信息的通道）。
* **`1`** ：代表“标准输出”通道（成功信息的通道）。
* **`&1`** ：意思是“把 2 号通道的报错，也塞进 1 号通道里去”。

## 柜面交易画面数据迁移

### 昨日画面数据归档(mvtradedata.sh)

- **重要备注**：脚本里写了两步 `mv` 再整体 `mv`，是为了**规避直接移动大目录时报错**（跨盘报错、目录已存在报错）。
- **核心逻辑**：先把文件（logFileMd5.txt, TAB_DATA_FILE）从原目录迁移到临时目录（abcsdata），再将临时目录整体移动回历史目录（abcshis），以此完成归档。
- **经验总结**：以后迁移大数据目录，先移小文件，再移空目录，成功率最高。

```shell
#!/bin/bash

#将1天前的交易画面数据转移到历史目录（abcsdata-abcshis）
t1=`date +%Y%m%d -d "1 days ago"`
path=/home/abcs/abs/bakup/

mv  /abcshis/${t1}/logFileMd5.txt /abcsdata/${t1}/
mv  /abcshis/${t1}/TAB_DATA_FILE /abcsdata/${t1}/

echo "开始将"${t1}"的交易画面数据转移到历史目录"`date` >>${path}runMvtrandata.log

mv /abcsdata/${t1} /abcshis/

echo "画面转移完成"`date` >>${path}runMvtrandata.log
```

## 柜面ABS日志归档(bakupLog.sh)

```shell
#/bin/bash

path=/home/abcs/abs/bakup/
cd $path

echo "======================================================" >>${path}runLog.log
echo "开始执行服务器日志归档任务："`date` >>${path}runLog.log

echo "***********************bakLog.sh***********************" >>${path}runLog.log
#日志备份
#sh bakLog.sh >>${path}runLog.log
sh bakLog.sh

echo "" >>${path}runLog.log

echo "***********************putLog.sh***********************" >>${path}runLog.log
#上传日志
sh putLog.sh >>${path}runLog.log

echo "" >>${path}runLog.log

echo "***********************delLog.sh***********************" >>${path}runLog.log
#删除15天前的日志
sh delLog.sh >>${path}runLog.log

echo "执行日志归档任务完成："`date` >>${path}runLog.log
echo "======================================================" >>${path}runLog.log
echo "" >>${path}runLog.log

```

### 备份日志文件，删除原文件(bakLog.sh)

```shell
#/bin/bash
#服务器日志备份
#获取IP最后一段
ipAddr=`/sbin/ifconfig -a |grep "inet"|grep -v "127.0.0.1"|grep -v "inet6"|awk '{print $2}'|tr -d "addr:"|awk -F '.' '{print $4}'`
today=`date +%Y%m%d`

tarfilename="abs"$ipAddr"_log_"$today.tar.gz
tarfiledir="/home/abcs/abs/bakup/log"
echo "时间："$today
echo "归档文件："$tarfilename
if [ ! -d $tarfiledir ];then
  mkdir -p $tarfiledir
fi
echo "开始备份日志："`date`

tar -czvPf $tarfilename /home/abcs/abs/log/
mv $tarfilename $tarfiledir

echo "日志备份完成："`date`
echo "开始删除日志："`date`

rm -rf /home/abcs/abs/log/*

echo "日志删除完成："`date`
if [ ! -d "/abcshis/"$today ];then
  cd /abcshis
  mkdir $today
fi

echo "|"$tarfilename"="`md5sum $tarfiledir/$tarfilename | awk '{ print $1}' `>>/abcshis/$today/logFileMd5.txt


```

**拆解指令：**

1. `/sbin/ifconfig -a`：列出本机所有网卡信息。
2. `|grep "inet"`：只保留包含 `inet`（IPv4 地址）的行。
3. `|grep -v "127.0.0.1"`：`-v` 是反向匹配，**排除**掉本地回环地址 `127.0.0.1`（本地自己）。
4. `|grep -v "inet6"`：**排除**掉 IPv6 地址（`inet6` 不是常用的局域网 IP）。
5. `|awk '{print $2}'`：用 `awk` 把该行按空格分割，只取 **第 2 列** （即 IP 地址本身，比如 `192.168.1.55`）。
6. `|tr -d "addr:"`：用 `tr` 删掉（`-d`）字符串里的 `addr:` 前缀（旧版 Linux 会打印 `inet addr:192.168.1.55`）。
7. `|awk -F '.' '{print $4}'`：用 `-F` 指定以 `.` 为分隔符，只取 **第 4 段** （比如 `192.168.1.55` 的第 4 段就是 `55`）。

**`ifconfig` 提取 IP 的写法** ：排除掉回环和 IPv6，用 `awk` 取第二列删掉前缀，最后用 `awk -F '.'` 只取最后一段数字，用于给备份文件名加个“设备唯一标识”。

**拆解指令：**

1. `echo "|"$tarfilename"="`：打印一个 `|`，加上文件名，加上 `=`。
2. ``md5sum $tarfiledir/$tarfilename``：用 **反引号（）** 包裹里面的命令（这叫“命令替换”），表示**先执行** `md5sum` 算出该文件的 MD5 值。
3. `| awk '{ print $1}'`：MD5 命令输出是一长串（`哈希值 文件名`），用 `awk` 只取第 1 列（即哈希值本身），把文件名丢掉。
4. `>>/abcshis/$today/logFileMd5.txt`：把拼接好的这整行内容， **追加** （`>>`）写入到指定路径的 `logFileMd5.txt` 文件里。

**`md5sum` 拼接写法** ：用反引号 ``` 把 `md5sum` 命令包起来执行，输出结果用 `awk` 取第一列（去掉文件名），配合 `echo` 和 `>>` 拼装成 `|文件名=MD5值` 的格式，追加写入校验文件。

**【目录判断与创建】**

* `if [ ! -d $path ];then`：判断 `$path` 这个“目录不存在”。 -d：是 Directory（目录） 的缩写。专门用来判断一个路径是不是“已存在的目录”。
* `mkdir -p $path`：创建该目录。`-p` 表示 **递归创建多级目录** ，且 **目录已存在时不报错** 。
* **建议** ：不管是不是多级，写脚本时无脑加 `-p`，最省心。

`tar -czvPf` 参数拆解：

* **`-c`** ：Create，**创建**新的压缩包。
* **`-z`** ：gZip，调用 gzip 进行 **压缩** （生成 `.gz` 结尾的文件）。
* **`-v`** ：Verbose， **显示过程** 。在打包时，会把正在压缩的文件名一行行显示出来。
* **`-P`** ： **保留绝对路径** （这是你脚本里最特殊、最容易被忽略的一个参数！）。
* **`-f`** ：File， **指定压缩包的文件名** （后面必须紧跟文件名）。

### 上传备份文件到远程服务器

```shel
#!/bin/bash

#上传日志文件
loalPath=/home/abcs/abs/bakup/log/
servPath=/logserver01/abcs/abs/log/
servIp=172.22.3.15
userName=ftpuser
userPswd=ftp@2026

t1=`date +%Y%m%d -d "1 days ago"`
ipAddr=`/sbin/ifconfig -a |grep "inet"|grep -v "127.0.0.1"|grep -v "inet6"|awk '{print $2}'|tr -d "addr:"|awk -F '.' '{print $4}'`
cd $loalPath
fileName=abs${ipAddr}_log_${t1}.tar.gz
echo "文件名："${fileName}
echo "开始上传："`date`
#将日志文件上传到日志服务器
/usr/bin/ftp -ni <<!
open $servIp
user $userName $userPswd
lcd $loalPath
cd ${servPath}
bin
prom
passive
put $fileName
bye
!
echo "上传完成："`date`

```

运行日志runLog.log：

```markdown
***********************putLog.sh***********************
文件名：abs52_log_20260818.tar.gz
开始上传：2026年 08月 19日 星期三 00:30:30 CST
Local directory now /home/abcs/abs/bakup/log
Interactive mode on.
Passive mode off.
Could not create file.
上传完成：2026年 08月 19日 星期三 00:30:30 CST
```

### 删除15天前的备份文件

```shell
#!/bin/bash

#删除15天前的日志
t1=`date +%Y%m%d -d "15 days ago"`
ipAddr=`/sbin/ifconfig -a |grep "inet"|grep -v "127.0.0.1"|grep -v "inet6"|awk '{print $2}'|tr -d "addr:"|awk -F '.' '{print $4}'`
cd $loalPath

filePath=/home/abcs/abs/bakup/log/
fileName=abs${ipAddr}_log_${t1}.tar.gz

echo "文件名："${filePath}${fileName}

echo "开始删除日志文件："`date`
rm -rf ${filePath}${fileName}
echo "删除日志文件完成："`date`
```

运行日志：

```markdown
***********************delLog.sh***********************
文件名：/home/abcs/abs/bakup/log/abs52_log_20260804.tar.gz
开始删除日志文件：2026年 08月 19日 星期三 00:30:30 CST
删除日志文件完成：2026年 08月 19日 星期三 00:30:30 CST
执行日志归档任务完成：2026年 08月 19日 星期三 00:30:30 CST
```
