title: Butterfly主题配置Valine评论及邮件提醒
cover: https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2010232996,1620516668&fm=26&gp=0.jpg
author: PanXiaoKang
tags: [评论系统,Valine Admin,邮件提醒]
categories: [Hexo博客]
date: 2021-01-21 14:34:00

---

## 概述

博客也上线很久了，但之前配置的Valine评论系统注册使用的[LeanCloud](https://leancloud.app/)是国内版-华北节点的，由于国内的域名需要审核备案，比较麻烦，因此改用[LeanCloud](https://leancloud.app/)国际版，顺便记录一下博主踩过的坑。

## 为博客配置Valine评论系统

Valine评论系统的配置其实很简单，在这里就简单介绍一下。

* 首先要去[LeanCloud官网](https://www.leancloud.cn/)注册一个帐号，账号注册成功后，我们在控制台创建一个应用，如下：

![img](https://img-blog.csdnimg.cn/20200710120906355.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM1MTE3MDI0,size_16,color_FFFFFF,t_70)

![img](https://img-blog.csdnimg.cn/20200710120918650.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM1MTE3MDI0,size_16,color_FFFFFF,t_70)

* 应用创建完成后，点击应用小卡片右上角的设置按钮进入到应用设置面板，在此面板下的【设置 | 应用Keys】菜单下，获取应用的AppID和AppKey，如下图：

![img](https://img-blog.csdnimg.cn/2020071012093913.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM1MTE3MDI0,size_16,color_FFFFFF,t_70)

* 然后将AppID和AppKey这两个属性值复制粘贴到Butterfly主题的_config.yml配置文件中，由于之前配置了华北节点的AppID和AppKey,只需要将国际版的AppID和AppKey复制粘贴过去即可。代码如下：

```
valine:
  enable: true # if you want use valine,please set this value is true
  appId: 在国际版的配置中心查看并粘贴 # leancloud application app id
  appKey: 在国际版的配置中心查看并粘贴 # leancloud application app key
  notify: false # valine mail notify (true/false) https://github.com/xCss/Valine/wiki
  verify: false # valine verify code (true/false)
  pageSize: 10 # comment list page size
  avatar: monsterid # gravatar style https://valine.js.org/#/avatar
  lang: en # i18n: zh-cn/en
  placeholder: 来吧，造作吧，快活吧，肆无忌惮吧！(～￣▽￣)～ # valine comment input placeholder(like: Please leave your footprints )
  guest_info: nick,mail,link #valine comment header info
  recordIP: false # Record reviewer 
  serverURLs: # This configuration is suitable for domestic custom domain name users, overseas version will be automatically detected (no need to manually fill in)
  bg: /img/comment_bg.png # valine background
  count: true # top_img显示评论数
```

* 此时，我们的博客页面已经出现了评论面板了，如下所示：

![图片](评论面板.png "评论面板.png")

* 最后，我们在leancloud中的应用设置界面中，通过【设置 | 安全中心】菜单，将我们博客的域名添加到安全中心，如下：

![图片](安全中心.png "安全中心.png")

* 如果配置完之后没有出现评论面板，那你可要认真看看对应的主题应该怎么配置Valine评论系统了，如果使用最新版的Butterfly主题后，配置了Valine但是没有出现评论面板，应该是漏写了一处配置，如下：

![img](https://img-blog.csdnimg.cn/20200710121050308.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM1MTE3MDI0,size_16,color_FFFFFF,t_70)

加上以上语句就可以正常显示评论面板了，当然了，修改了配置文件得需要重新部署上传才能生效。

## 为Valine评论系统增加邮件提醒功能

配置了Valine评论系统就能在博客查看评论留言，如果别人给我发的评论，我还要到后台去看，实在是太麻烦了，于是找到了一个好项目[valine-admin](https://github.com/DesertsP/Valine-Admin)。Valine Admin是[Valine评论系统](https://deserts.io/diy-a-comment-system/)的扩展和增强，主要实现评论邮件通知，评论管理，垃圾评论过滤等功能。

本博客教程使用[LeanCloud国际版](https://leancloud.app/)做演示，注意要进入的是国际版，以免出问题也不知道问题在哪。

### 云引擎“一键”部署

进入评论系统数据库所在的LeanCloud应用。进入“云引擎-设置”，设置环境变量以及云引擎域名。**以下参数需要正确设置。云引擎域名（ADMIN_URL参数）用于评论后台管理，如 。

| 变量                   | 示例                                    | 说明                                                                                                                 |
| ---------------------- | --------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| SITE_NAME              | 沙漠                                    | [必填]博客名称                                                                                                       |
| SITE_URL               | [http://www.xyym.cf/](http://www.xyym.cf/) | [必填]博客首页地址                                                                                                   |
| **SMTP_SERVICE** | QQ                                      | [新版支持]邮件服务提供商，支持QQ，163、126，Gmail以及[更多](https://nodemailer.com/smtp/well-known/#supported-services) |
| SMTP_USER              | [xxxxxx@qq.com](mailto:xxxxxx@qq.com)      | [必填] SMTP登录用户                                                                                                  |
| SMTP_PASS              | ccxxxxxxxxch                            | [必填] SMTP登录密码（QQ邮箱需要获取独立密码,也就是授权码）                                                           |
| 发件人名称             | 沙漠                                    | [必填]发件人                                                                                                         |
| SENDER_EMAIL           | [xxxxxx@qq.com](mailto:xxxxxx@qq.com)      | [必填]发件邮箱                                                                                                       |
| ADMIN_URL              | https://xxx.leanapp.cn/                 | [建议] Web主机二级域名（云引擎域名），用于自动唤醒                                                                   |
| BLOGGER_EMAIL          | [xxxxx@gmail.com](mailto:xxxxx@gmail.com)  | [任选]博主通知收件地址，替换使用SENDER_EMAIL                                                                         |
| AKISMET_KEY            | xxxxxxxx                                | [任选] Akismet键用于垃圾评论检测，设置MANUAL_REVIEW打开人工审核，留空不使用反垃圾                                    |

![图片](自定义环境变量.png "自定义环境变量.png")

以上图片中关于"SMTP_PASS"的值获取方式如下：

首先打开QQ邮箱界面，然后依次点击【设置 | 账户】菜单，如下：

![img](QQ邮箱界面.png "QQ邮箱界面.png")

然后下拉到下方，找到开启IMAP/SMTP服务，如下：

![img](授权码生成.png "授权码生成.png")

开启后会得到一串字符串，将那一串字符串复制粘贴到云引擎面板中的"SMTP_PASS"属性后面作为它的值。要是先前开启了QQ邮箱登录保护，导致"开启服务"不能使用，用手机下载"QQ安全中心"，先把"邮箱登录保护"关闭就可以使用了。

切换到“云引擎-部署”，部署模式选择“部署项目-Git部署”，分支“主”，手动部署目标环境为“生产环境”在[Leancloud](https://leancloud.cn/dashboard/#/apps)云引擎设置界面，填充代码库并保存：[https://github.com/DesertsP/Valine-Admin.git](https://github.com/DesertsP/Valine-Admin.git)，设置好即可一键部署了。

[![部署3](https://github.com/DesertsP/Valine-Admin/raw/master/assets/imgs/deploy4.png)](https://github.com/DesertsP/Valine-Admin/blob/master/assets/imgs/deploy4.png)

## 评论管理

首先需要设置管理员信息。访问管理员注册页面 `https://云引擎域名/sign-up`，注册管理员登录信息，如：[https://xyym.avosapps.us/sign-up](https://xyym.avosapps.us/sign-up) ,注册好QQ邮箱号和密码之后即可登录管理评论信息了。

[![注册](https://github.com/DesertsP/Valine-Admin/raw/master/assets/imgs/signup2.png)](https://github.com/DesertsP/Valine-Admin/blob/master/assets/imgs/signup2.png)

- 注：使用原版Valine如果遇到注册页面不显示直接重定向至登录页的情况，请手动删除_User表中的全部数据。

## 定时任务设置

关于自动休眠的官方说法：[点击查看](https://leancloud.cn/docs/leanengine_plan.html#hash633315134)。目前实现了两个云函数定时任务来解决云引擎休眠的问题：

- 自动唤醒，定时访问Web APP二级域名阻止云引擎休眠；
- 每天定时检查过去24小时内漏发的邮件通知。

进入“云引擎-定时任务”，创建两个定时任务。

[![img](https://github.com/DesertsP/Valine-Admin/raw/master/assets/imgs/cron4.png)](https://github.com/DesertsP/Valine-Admin/blob/master/assets/imgs/cron4.png)

选择self-wake云函数，Cron表达式为 `0 */30 0-16 * * ?`，表示每天早0点到晚16点每隔30分钟访问云引擎。

选择resend-mails云函数，Cron表达为 `0 0 0 * * ?`，表示每天0点检查过去24小时内漏发的通知邮件并补发。

- [关于国际版时区的问题](https://github.com/DesertsP/Valine-Admin/issues/63#issuecomment-533784574)：国际版使用UTC-0时间，注意与内部时间对应。

**至此，Valine Admin已经可以正常工作。**
