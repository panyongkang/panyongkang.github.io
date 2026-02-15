title: Ventoy+WePE装机教程
author: PanXiaoKang
cover: 'https://i.ytimg.com/vi/Pg9bhuXm1XA/hqdefault.jpg'
tags:

  - Ventoy
  - WePE
  - 装机教程

categories:

  - windows系统

date: 2022-02-27 14:47:00

---

## 简介

装机爱好者都在用的一款实用的多系统U盘启动制作工具“Ventoy”，它能让你免格式化制作出“多合一”启动盘，同时支持Windows、WinPE、Linux多类型的操作系统安装盘，堪称新一代装机必备神器。不过，Ventoy并没有内置PE工具，无法满足用户对于硬盘分区、数据恢复，Ghost系统安装等电脑故障和维护需求。

今天继续为大家带来一款好用的 WinPE 系统维护工具，该工具的特点在于免费纯净、无捆绑软件、体积小巧、功能齐全的 PE 系统，基于 Win10 PE 内核，全面支持 NVMe 盘，集成了实用的硬盘分区、数据恢复、系统安装和维护优化等一系列工具集。相比于目前网上流行的 Win PE 工具，如大白菜、老毛桃等等，最大的亮点是无内置捆绑软件，也不会篡改浏览器主页之类的，体验相对更好。此外，该工具还可以打包成iSO镜像，放置在Ventoy中使用，两者相结合，体验上就更为完美了，下面介绍Ventoy+WePE工具的使用方法。

## 安装与使用

Ventoy的安装使用教程不用再介绍了，具体参考这篇文章[U盘启动盘制作教程](https://xyyum.icu/2022/01/23/U%E7%9B%98%E5%90%AF%E5%8A%A8%E7%9B%98%E5%88%B6%E4%BD%9C%E6%95%99%E7%A8%8B/)即可。

然后上官网下载[WePE工具箱](https://www.wepe.com.cn/)。

* 打开微PE工具箱，生成可启动ISO镜像。具体操作是，打开 微PE工具箱 ，然后点击右下角的“光盘图标”，之后就可以将工具生成一个 ISO镜像，如图所示。

![image-20220306215507054](C:\Users\pyk\AppData\Roaming\Typora\typora-user-images\image-20220306215507054.png)

* 然后将这个生成ISO镜像的微PE工具箱文件，拷贝到在 Ventoy 的 U 盘里里面就可以了。今后通过 Ventoy 启动U盘 ，就可以选择进入微PE工具了。

## U盘重装系统

### 关机重启进BIOS

电脑的主板品牌不同，我们进入BIOS的热键也不同，就算是同一品牌的台式机和笔记本进入的方式也有所不同，联想笔记本一般使用的热键是**Fn+F2**，而U盘启动的热键是**F12**。

**好心提醒：**使用Ventoy+WEPE重装系统前请先仔细阅读[微PE优盘使用说明书](https://www.wepe.com.cn/ubook/)，否则很可能出现下面的问题记录的情况。为避免重复踩坑，特意把踩过的坑解决方法记录下来，以备不时之需。

联想笔记本开机，按键盘的“Fn+F2”键进入BIOS设置界面。
切换到“Boot”（启动“选项卡，将“Boot Mode”设置为“UEFI".
同时将“USB Boot”设置为“Enabled”。 以便支持从U盘启动系统。

### 问题记录

#### **问题1**

选择Linpus lite(aigo)启动报错

连续按F12时，弹出窗口选项Windows Boot Manager 和Linpus lite(aigo)；

在UEFI模式下安装系统时 出现：Verification failed:（15）Access Denised 报错

![1](https://forum.huawei.com/enterprise/zh/data/attachment/forum/202106/15/183925a9r2j3o6nafp1xxj.png)

问题原因：
部分UEFI引导的启动会出现蓝屏提示：Verification failed:(15) Access Denied，无法进入安装系统界面。 这是Bios开启了Secure Boot导致的；
Secure Boot是UEFI的一个子规则，它的作用是防止恶意软件侵入。实现方法是在主板出厂的时候，内置一些已缴费的公钥。任何想要在这块主板上加载的操作系统或者硬件驱动程序，都必须通过这些公钥的认证，否则主板拒绝加载。

解决方案：
关闭 电脑的Secure Boot安全启动即可 ；开机启动时连续按Fn+F2按键，把安全选项关闭即可。

#### **问题2**

进行到“正在准备要安装的文件”出现了错误，提示“Windows 无法安装所需的文件。文件可能损坏或丢失。请确保安装所需的所有文件可用，并重新启动安装。错误代码：0x80070570”

分析：没有使用WePE.iso镜像重装，而是直接点击iso直接安装，自定义安装时只是格式化了C盘和D盘，没有把其他小分区的删除导致安装出错。

#### **问题3**

使用U盘重新系统时，格式化了C系统盘和D盘后，安装失败报错：
The operating system couldn't be loaded because the kernel is missing or contains errors 错误代码:0xc0000605

分析：因为安装程序执行到自定义安装时，没有仔细看官网文档这段说明就直接安装：

在这个界面中，需要做一个操作，来提升提升安装成功率。请先定位到您系统盘的位置，观察前面有几个小分区，百十来兆的样子，有时候一个，有时候两个或三个，直接把小分区连同系统大分区一起删除。是的您没听错，选中后直接点红××删除它们，留下一个完整的“未分配空间”。需要先把其他小分区都点击删除后，才能提高安装成功率。

#### **问题4**

> your pc/device needs to be repaired
>
> a component of the operating system has expired.
>
> File:\Windows\system32\winload.efi
>
> Error code:0xc00000605

分析：提示某些组件过期，网上的思路是可以Fn+F2设置系统时间2014或更早，然后重新启动后再把时间改回来（具体没实践过）。

**解决办法：**直接把所有分区删除并清除数据、然后重新分区重新安装即可。如果没有拔出U盘需要先关闭安全启动，然后重新启动就可以进入系统了。

#### 问题5

Windows安装完成后报错：Windows 安装程序无法将 Windows 配置为在此计算机的硬件上运行。

原因：安装前只格式化了C盘，导致安装后系统引导识别失败。

解决：进入微PE界面，将其他盘的资源提前备份一下，然后打开分区工具（DiskGenius），选择快速分区，格式化所有磁盘数据再重新进行分区。然后再退出重新选择镜像进行重装。

**注意：**UEFI/Legacy BIOS 设置问题：
如果您的系统是基于UEFI启动，确保在BIOS中启用了UEFI模式，而不是传统的Legacy BIOS模式。
反之，如果系统安装需要Legacy BIOS模式，请确保您在BIOS中切换到Legacy启动模式。

解决：将Boot Mode的启动模式改成UEFI启动即可。
