title: Hexo博客恢复笔记
author: PanXiaoKang
top: false
cover: https://pic.imgdb.cn/item/6638eeca0ea9cb14035bbfe7.gif
tags: [hexo恢复,问题记录]

categories: [Hexo博客]

date: 2020-11-22 16:22:00

---

## win10系统恢复Hexo博客

### 安装[Node.js](https://nodejs.org/zh-cn/)，[git](https://git-scm.com/downloads)

![1.png](1.png)
重新安装git最新版本，但是cmd窗口无法识别的原因是没有配置D:\Program Files\Git\bin环境变量到Path路径中，配置好就能在cmd中通过git version查看版本信息了。

因为安装最新版的Node.js，环境变量自动已配置好了，也自动安装了npm,一般可以直接通过cmd窗口查看到安装的版本信息。但npm使用的是外网，不稳定，接下来还需要安装cnpm，选择国内淘宝镜像，下载速度更快，避免报出很多错误。

Node.js环境配置：因为执行类似的npm install express -g 安装语句时，默认是安装到【C:\Users\用户名\AppData\Roaming\npm】路径中，占C盘空间。

 例如：我希望将全模块所在路径和缓存路径放在我node.js安装的文件夹中，则在我安装的文件夹【D:\Program Files\nodejs】下手动创建两个文件夹【node_global】及【node_cache】如下图：

![2.png](2.png)

 创建完两个空文件夹之后，打开cmd命令窗口，输入

```
npm config set prefix "D:\Develop\nodejs\node_global"
npm config set cache "D:\Develop\nodejs\node_cache"
```

查看配置好的信息：npm config list,确保已经切换好路径。
![3.png](3.png)

在系统环境变量PATH，输入路径D:\Program Files\nodejs\node_global\node_modules，此后所安装的模块都会安装到该路径下 。

 配置完后，安装个module测试下，我们就安装最常用的express模块

打开cmd窗口，命令如下：

```
npm install express -g     # -g是全局安装的意思
```

安装好之后就会保存到该路径下面。
![4.png](4.png)

具体教程可参考：[Node.js安装及环境配置](https://huaweicloud.csdn.net/639fefcbdacf622b8df90a44.html?spm=1001.2101.3001.6650.4&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7Eactivity-4-125403896-blog-131660180.235%5Ev40%5Epc_relevant_anti_vip&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7Eactivity-4-125403896-blog-131660180.235%5Ev40%5Epc_relevant_anti_vip&utm_relevant_index=9)

### 安装cnpm,下载淘宝镜像

在cmd窗口执行命令：

```bash
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

输入cnpm -v输入是否正常

```
cnpm -v
```

若报错，'cnpm' 不是内部或外部命令，也不是可运行的程序 或批处理文件。

原因是下载cnpm的cnpm和cnpm.cmd两个文件需要放在D:\Program Files\nodejs目录下面，

具体请参考这篇文章：https://blog.csdn.net/pengyujuan/article/details/103693369

检查一下镜像站是否正常

```
npm config get registry
```

```
cnpm config get registry
```

### 配置SSH key

先查看C:\Users\用户名.ssh下有无ssh文件夹，没有则创建，一般重装系统是需要重新生成的。

创建命令：

```
cd ~/.ssh #查看有无ssh
ssh-keygen -t rsa -C "邮件地址" #创建ssh文件
```

![5.png](5.png)

打开用户目录，找到.ssh\id_rsa.pub文件，记事本打开并复制里面的内容，打开你的github主页，进入个人设置 -> SSH and GPG keys -> New SSH key：
![6.png](6.png)

新建好的ssh密钥，先测试一下是否成功：

```
ssh -T git@github.com
```

#### 配置多个ssh文件

因为先前生成的id_rsa.pub文件已经给gitlab进行配置，所以需要手动修改文件名：

```
ssh-keygen -t rsa -C "xxx@xxx.com"
```

这里需要注意，该命令会默认生成为 `id_rsa` 的公钥和 `id_rsa.pub` 的私钥文件。为了防止后续生成别的 ssh 被覆盖，这里推荐手动修改文件名。这里修改为 `github_id_rsa`

![1704119588144](1704119588144.png)

问题1：测试连接失败

```
潘永康@LAPTOP-15NPH500 MINGW64 ~/.ssh
$ ssh -T git@github.com
git@github.com: Permission denied (publickey).
```

是因为修改了默认文件名导致的。

#### 问题解决

连接的时候指定自己重命名的私钥文件名就好了。

```
$ ssh -T -i github_id_rsa git@github.com
Hi panyongkang! You've successfully authenticated, but GitHub does not provide shell access.

```

但这不是最终解决方案。多个ssh的时候需配置config文件，以致于不会找不到对应的SSH。

#### 配置 config 文件

在.ssh文件夹中手动创建config文件或者输入命令 `touch config`生成，并按下面的模板填写，该文件用于配置私钥对应的服务器。

```
# gitlab
Host gitlab.com
HostName gitlab.com
PreferredAuthentications publickey
IdentityFile ~/.ssh/id_rsa

# github
Host github.com
HostName github.com
PreferredAuthentications publickey
IdentityFile ~/.ssh/github_id_rsa
```

ssh配置详情可参考：https://blog.csdn.net/qq_55558061/article/details/124117445

### Github访问ping不通

通过cmd窗口执行命令：

```
ping github.com
```

若出现连接超时的情况，可能是被某网络服务提供商屏蔽了，这时候需要修改一下host文件：

```
140.82.113.3 github.com
```

可以访问[sites.ipaddress.com](https://sites.ipaddress.com/github.com/) 获取目前github.com实际ip后再进行修改。

**然后刷新DNS**

Windows：在 CMD 窗口输入：ipconfig /flushdns

### 用户名 邮箱配置

```
git config --global user.name "xxx"// 你的github用户名，非昵称
git config --global user.email  "xxx@qq.com"// 填写你的github注册邮箱
```

### 进入到博客(Hexo)文件夹

文件夹只需要删除node_modules、 public、 .git 、.deploy_git，剩下的保留。

### 关联Github项目

```
git init
git remote add origin git@github.com:panyongkang/panyongkang.github.io.git
```

查看关联好的的url是否成功：

```
git remote -v
```

### 安装hexo

所有必备的应用程序安装完成后，即可在cmd窗口使用 npm 安装 Hexo。

```
npm install -g hexo
```

### 安装项目依赖

```
npm install
```

在hexo文件使用git执行下载，若出现报错解决方法如下。

查看所有全局已安装的模块

```
npm ls -g
```

### 问题记录

问题1：执行npm install失败，错误为fatal: Too many arguments.

换成cnpm install就好了，原因是之前cnpm路径没有配置好，用npm网络被限，导致node_modules无法下载到当前hexo根目录下面。

问题2：git bash中用不了hexo的命令?

错误：bash: hexo: command not found

原因：环境变量没有配置好，要找到正确的hexo安装地址，比如我把我npm的下载地址都改到d盘了，我的path就是D:\Program Files\nodejs\node_global\node_modules\hexo-cli\bin

问题3：环境配置好之后，执行Hexo命令还是失败？

错误：ERROR Cannot find module 'hexo' from 'E:\MyBlog\blog\Hexo'

原因：当前Hexo目录没有node_modules依赖包，执行很多次npm install也下载不出来，甚至报错，可以考虑删除和清理缓存后，再次通过cnpm install下载依赖包，刷新一下node_modeles就有了。

命令如下：

```
rm -rf node_modules

npm cache clean --force

cnpm install  ##因为依赖太多，npm install下载报错，外网不稳定的缘故吧
```

问题4：Github时不时连接报错： ssh: connect to host github.com port 22: Connection timed out

原因：通常是由于 SSH 连接的问题，可能与网络环境、端口被限制等有关。默认不配置连接的是github.com,端口22，SSH 使用 22 端口，HTTPS 则使用 443 端口，443 端口通常不会被限制。可以强制使用 SSH 的备用端口。

解决方案：

打开.ssh/config文件（如果没有则创建一个）并添加以下内容：

方法1：（无需代理）

```
# github向阳榆木
Host github.com
HostName ssh.github.com
PreferredAuthentications publickey
IdentityFile ~/.ssh/id_rsa
Port 443
# gitee偏偏💖雨季
Host gitee.com
HostName gitee.com
PreferredAuthentications publickey
IdentityFile ~/.ssh/Giteeblog_id_rsa
```

方法2：（代理工具必须开启才能正常工作，关闭后会导致代理不可用）

```
# github
Host github.com
#HostName ssh.github.com
HostName github.com
PreferredAuthentications publickey
IdentityFile ~/.ssh/github_id_rsa
#Port 443
User git
ProxyCommand "D:\\Program Files\\Git\\mingw64\\bin\\connect.exe" -S 127.0.0.1:10808 %h %p

# gitlab
Host gitlab.com
HostName gitlab.com
PreferredAuthentications publickey
IdentityFile ~/.ssh/id_rsa
```

然后保存再测试一下连接是否成功：

```
ssh -T git@github.com
```

### 执行hexo命令

在hexo根目录使用git窗口依次执行以下命令：

```
hexo version #查看安装版本信息
hexo g  #生成public目录的本地预览文件
hexo s #本地预览，浏览器中输入 http://localhost:4000/打开
hexo d  # 部署上传到github仓库
```

**不要用hexo init初始化，部分文件已经拷贝生成，如果不慎使用，则站点配置文件_config.yml会被初始化为默认值**

### 添加备份

```
git add .
git commit -m 'modify'
git push origin hexo
```

问题：git add . 无法备份themes/Butterfly

错误：

> Changes not staged for commit:
> (use "git add < file>..." to update what will be committed)
> (use "git restore < file>..." to discard changes in working directory)
> (commit or discard the untracked or modified content in submodules)
> modified:   themes/Butterfly (modified content, untracked content)

原因：因为之前备份themes/Butterfly下面还有.git，冲突了，删除掉，然后hexo根目录的.git也删除重新初始化生成即可。

问题：git add . 后使用git status查看报错

错误信息：

> Changes not staged for commit:
> (use "git add < file>..." to update what will be committed)
> (use "git restore < file>..." to discard changes in working directory)
> modified:  "source/_posts/\347\263\273\347\273\237\351\207\215\350\243\205-Hexo\345\215\232\345\256\242\346\201\242\345\244\215.md"

原因：估计是我刚创建的md文件名称命名有问题，命名不允许用"-"连接，改了之后删除.git重新生成就好了。

### 备份的文件描述

1. `_config.yml` 文件：站点配置文件，很多功能、插件需要修改该配置文件应用生效。
2. `node_modules` 文件夹：包含依赖的模块。
3. `package.json` 文件：依赖的模块列表。
4. `package-lock.json` 文件：依赖的模块安装记录。
5. `public` 文件夹：包含生成的网页静态文件。
6. `scaffolds` 文件夹：包含创建的文章、分类、标签界面的模板。博客的定制修改会对模板进行修改。
7. `source` 文件夹：包含生成网页所需要的源文件，包括包含我们心血的 Markdown 文稿，这也是最重要的内容。
8. `themes` 文件夹：其中 `landscape` 是默认的主题，其他文件夹是克隆下来时的主题。

**最终需要备份文件列表如下：**

```
scaffolds
source
themes
.gitignore
.gitmodules
_config.yml
package.json
```
