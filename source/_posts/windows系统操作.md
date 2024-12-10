title: windows系统操作
author: PanYuKang
top: true
tags:

  - cmd指令
  - 系统操作

categories:

  - windows系统

date: 2020-04-15 14:23:00

---

### cmd窗口操控指令

msinfo32.exe:查看系统详细信息
msconfig:查看电脑上的所有程序状态
cleanmgr:清理磁盘垃圾
chkdsk d: /f :检查和修复磁盘，d:指的是d盘，/f是修复指令
ping.exe:快速检查网络是否通畅or网络连接速度
mstsc:远程操控电脑，回车输入ip地址即可
calc.exe:打开电脑计算器
winver:检查windows版本
dxdiag:显示系统配置信息
write:字板
Msconfig.exe:系统配置实用程序
mplayer2:媒体播放机
mspaint:画图板
tsshutdn:60秒倒计时关机命令
rononce -p:15秒关机
shutdown -s -t 00:关机命令
shutdown -r -t 00:重启命令
rundll32.exe powrprof.dll,SetSuspendState 0,1,0：进入睡眠模式
psr:步骤记录器
slmgr.vbs -xpr:查看计算机是否永久激活（当前许可证状态的截止日期）
slmgr.vbs -dlv:查看详细的许可证信息
devmgmt.msc:打开设备管理器
charmap：打开字符映射大全表
services.msc：调出系统后台服务
regedit：打开注册表编辑器
recent:查看电脑操作记录
ipconfig:查看本机IP地址
ipconfig /flushdns：清除DNS缓存
diskmgmt.msc：-磁盘管理程序
notepad：打开记事本
psr.exe：步骤记录器
osk:打开虚拟键盘
Net user:查看本机账户情况
nslookup+对方网站域名:查看网站IP地址
msg/server:对方电脑IP*对方电脑屏幕要弹出的文本：向对方电脑发送一条文本提示
color+色彩代码：修改CMD窗口文字颜色

attrib +s +h 文件名称 :设置文件名称隐藏

attrib -s -h 文件名称：设置文件名称显示

dir /a ：显示所有文件和文件夹，包括隐藏属性的

### Windows PowerShell

怎么查看电脑硬盘是否SSD固态硬盘呢？

右键开始图标，选择Windows PowerShell，打开命令提示符，输入Get-PhysicalDisk，回车，显示硬盘参数，查看MediaType，即可知道硬盘是HDD（机械硬盘）还是SSD（固态硬盘）。

![image-20220220202058688](https://cdn.jsdelivr.net/gh/panyongkang/MyImgBed/img/%E6%9F%A5%E7%9C%8B%E7%A1%AC%E7%9B%98%E7%B1%BB%E5%9E%8B.png)

### 桌面操作

Alt+Tab：一键切换程序

Alt+F4:立即关闭程序

Alt+空格+X:最大化窗口

win+V:可查看之前复制的内容
win+D:直接显示桌面
win+E:秒开文件管理

Fn + Esc：可以方便地切换 Fn 键模式，帮助你直接使用功能键而无需按住 Fn 键

win+L:一键锁屏
win+X:组合键菜单
win+X+UU:快速关机
Ctrl+W:快速关闭当下页面
win+I:打开windows设置
win+G：打开游戏栏
win+shift+S:任意截图
按PrintScreen按键：全屏截图
windows+M:关闭所有窗口
Ctrl+shift+Esc:打开任务管理器

win11如何关闭或开启Fn+热键快捷方式：
按住FN+ESC切换即可。

### 文件操作

Ctrl+shift+N:新建文件夹
永久删除：点击文件，按Delete可永久删除
重命名：缓慢点击两次文件的名称，可以重命名
Ctrl+Z:撤销操作
Ctrl+Y:取消撤销的操作

### 系统操作

#### 注册表备份

1. 使用win+R运行命令：regedit，打开注册表编辑器
2. 打开路径：计算机\HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Session Manager\Configuration Manager
3. 然后右击窗格空白部分，选择“新建DWORD（32位）值”，将新键值命名为“EnablePeriodicBackup”
4. 双击“EnablePeriodicBackup”，将其赋值为“1”
5. 关闭注册表编辑器，重新启动电脑。重启系统后，Windows 10会自动在每次开机时备份注册表。
6. 通过路径：“C:\Windows\System32\config\RegBack"可以查看到最新版备份文件。

#### win10更新后导致蓝屏

    问题：win10更新后电脑发烫，可能是更新依赖不兼容导致，关机后再开机时发现蓝屏了。

    报错信息：“你的电脑未正确启动"

    解决流程：无论是卸载更新或系统还原点，或者网上的进入安全模式BIOS都无法解决，最后通过“重置此电脑”，保留个人文件（除了删除c盘内容数据，其他盘不变）。
    重置完成后可以进入系统，但是系统还原点也没有了，需要后面再设置，以防万一。
    注意：重置此电脑可以只删除c盘数据，其他盘可保留，重装系统就全部需要重新安装分区，所以提前做好系统还原点很重要。

#### win10系统还原

    Win10系统安装完以后，系统还原是默认处于关闭状态的。
    点击计算机图标右键进入“属性”选项
    点击左侧的“系统保护”
    可以看到“系统还原”处于灰色状态，选择需要保护的磁盘点击“配置”
    点击“启用系统保护”按钮，最大使用量设置为10%，然后点击“确定”按钮。
    返回系统属性界面点击“创建”，输入还原点名称如：“系统还原”，然后创建等待。
    在系统属性界面点击“系统还原”，根据提示下一步，选择还原时间点，点击“完成”等待重启即可。

#### 端口被占用

    端口被占用解决办法：
    cmd的命令步骤：
    netstat –ano 查询所有进程
    tasklist|findstr 7248 找到端口对应的进程号7248
    taskkill -f -im javaw.exe 杀死javaw.exe该进程
    注：javaw.exe是占用端口的程序,根据自己的情况进行修改

#### 编写vbs小程序运行报错

    刚创建的txt文件写入：CreateObject("SAPI.SpVoice").Speak"你想说的话"

    遇到问题：运行VB代码脚本的时候提示：Microsoft VBScript 编译器错误 错误 ‘800a0409’ 未结束的字符串常量
    原因是：编码错误
    解决方法：另存为编码是ANSI的txt文档，修改后缀，重新运行。（因为默认是utf8）

#### Microsoft Store商店加载页面

```
问题：Microsoft Store商城无法加载页面。
方案：
调整 Internet 选项 
 打开 IE 浏览器，点击设置，打开 Internet 选项，点击高级
 勾选 “使用SSL 3.0”、”使用 TLS 1.0“、”使用 TLS 1.1“、”使用 TLS 1.2“，应用后重启电脑，查看能否解决问题。 
```

#### 开启上帝模式

    在桌面新建一个文件夹，命名为"上帝模式.{ED7BA470-8E54-465E-825C-99712043E01C}"，即可打开完全控制面板模式。

#### IDM未能成功加载扩展程序

    IDM安装后，在安装目录中找到IDMGCExt.crx的文件，将其拖到Chrome的扩展程序页面中即可。

#### 处理器火力全开

    打开cmd窗口，输入msconfig,点击引导，选择高级选项，将处理器个数的数值开到最大，然后确定重启就行了。

#### 修复电脑卡顿

    在搜索栏搜索命令提示符，右键“以管理员身份运行”，然后输入指令：sfc/?,然后再次输入指令：sfc/?,该命令用于扫描系统的完整性和修复出现的问题。

#### 沙盒功能

1. 在“开始菜单”输入“Windows功能”，打开“启用或关闭Windows功能”设置；
2. 然后在里面找到“Windows沙盒”，勾选后确认，耐心等待系统自动配置好后重启系统；
3. win10沙盒开启要求

   * 双核以上CUP，且CPU支持虚拟化并且已经在BIOS中开启虚拟化；
   * 系统版本为64位Windows10专业版或企业版1903 build 18305或更新的版本；
   * 至少4G内存且尚有1G的磁盘空间；
4. 沙盒是一种能够在隔离的环境中运行未知exe.msi文件的程序，在沙盒中运行所有程序都不会影响电脑，类似于开了一个虚拟机。
5. 虚拟机和沙盒的主要区别

   * 当沙盒中的应用程序退出后，其所做的更改会被丢弃；而当虚拟机退出后，其所做的更改会被保存下来；
   * 沙盒中的application和其他application共享机器的硬件资源；而虚拟机在安装时需要为其指定内存memory和cpu核且虚拟机不和其他application共享硬件资源。因此虚拟机实际上是很耗系统资源的。

### 电脑开启卓越性能

1. 右击电脑左下角的win，选择Windows PowerShell
2. 输入指令powercfg -duplicatescheme e9a42b02-d5df-448d-aa00-03f14749eb61回车，确认打开卓越性能
3. 鼠标右击桌面，选择显示设置
4. 选择左边菜单电源和睡眠，点击其他电源设置
5. 点开隐藏附加计划，选择卓越性能就开启了

注意：打开这个新模式肯定会让你感觉电脑快了一些。不过还是要提醒一下笔记本用户，如果使用这个“卓越性能”模式的话，会让笔记本的功耗大大增加，降低电池的续航能力，所以要想开启这个模式请尽量在插电的情况下开启。

### Dism++系统备份与还原

**备份系统**

[Dism++下载](http://www.chuyu.me/zh-Hans/)

下载完成，解压后双击Dism++x64.exe程序就能使用。打开程序后，点击“工具箱”，选择“系统备份”，映像文件路径例如：D:\win10备份.wim（后面的后缀一定得是“ `.wim` ” )。选择好备份路径后点击“确定”按钮，等待进度条走完，显示“准备就绪“就说明备份已经完成。

最好把备份后的系统拷贝到U盘或其它盘，因为以后重装系统会删除C盘，一般不会删除D、E、F盘这些。以防万一。

**还原系统**

点击”系统还原“，点击”浏览“，选择之前备份的那个“ win10备份.wim ”文件，勾选”添加引导“，点击”确定“，等待自动安装完就可以了。

详细可参考：[bitten](https://www.cnblogs.com/PowerTips/p/12483252.html) 教程

### Win10永久激活密钥

#### Win10专业版

以管理员身份打开cmd命令窗口里依次输入：

```
slmgr /ipk VK7JG-NPHTM-C97JM-9MPGT-3V66T

slmgr /skms kms.xspace.in

slmgr /ato
```

然后再输入命令 `slmgr.vbs -xpr`查看是否永久激活。

**若提示：**错误 0xc004c003 激活服务器确定指定的产品密钥被阻止 。很可能使用该产品密钥的人过多，被封了。以下是可用的产品密钥，但不是永久激活：

```
专业版:
W269N-WFGWX-YVC9B-4J6C9-T83GX
```

#### Win10家庭版

在cmd窗口里依次输入：

```
slmgr /ipk TX9XD-98N7V-6WMQ6-BX7FG-H8Q99

slmgr/skms kms.03k.org

slmgr/ato
```

#### Win10企业版

在cmd窗口里依次输入：

```
slmgr /ipk NPPR9-FWDCX-D2C8J-H872K-2YT43

slmgr/skms kms.03k.org

slmgr/ato
```

#### Win10教育版

在cmd窗口里依次输入：

```
slmgr /ipk NW6C2-QMPVW-D7KKK-3GKT6-VCFB2

slmgr/skms kms.03k.org

slmgr/ato
```
