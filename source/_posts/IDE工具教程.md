title: IDE工具教程
author: PanYuKang
cover: 'https://cdn.jsdelivr.net/gh/panyongkang/MyImgBed/img/VSCode%E5%B7%A5%E5%85%B7%E6%95%99%E7%A8%8B.png'
tags: [使用教程,VSCode,开发工具,IDEA]

categories: [工作笔记]

date: 2022-02-04 21:47:00

---

# VSCode开发工具

## VS Code简介

VS Code 的全称是 Visual Studio Code，是一款开源的、免费的、跨平台的、高性能的、轻量级的代码编辑器。它在性能、语言支持、开源社区方面，都做得很不错。

### IDE 与 编辑器的对比

IDE 和编辑器是有区别的：

- **IDE**（Integrated Development Environment，集成开发环境）：对代码有较好的智能提示和相互跳转，同时侧重于工程项目，对项目的开发、调试工作有较好的图像化界面的支持，因此比较笨重。比如 Eclipse 的定位就是 IDE。
- **编辑器**：要相对轻量许多，侧重于文本的编辑。比如 Sublime Text 的定位就是编辑器。再比如 Windows 系统自带的「记事本」就是最简单的编辑器。

需要注意的是，VS Code 的定位是**编辑器**，而非 IDE ，但 VS Code 又比一般的编辑器的功能要丰富许多。可以这样理解：VS Code 的体量是介于编辑器和 IDE 之间。

### VS Code 的特点

- VS Code 的使命，是让开发者在编辑器里拥有 IDE 那样的开发体验，比如代码的智能提示、语法检查、图形化的调试工具、插件扩展、版本管理等。
- 跨平台支持 MacOS、Windows 和 Linux 等多个平台。
- VS Code 的源代码以 MIT 协议开源。
- 支持第三方插件，功能强大，生态系统完善。
- 自带丰富的调试功能。
- 自带  emmet：支持代码自动补全，快速地生成简单的语法结构。要知道，这个功能在 Sublime Text中，得先安装插件才行。
- VS Code 自带了 JavaScript、TypeScript 和 Node.js 的语法支持。也就是说，你在书写 JS 和 TS 时，是自带智能提示的。当然，其他的语言，你可以安装相应的**扩展包**插件，也会有智能提示。

### VS Code 与 WebStorm

前端小白最喜欢问的一个问题是：哪个编辑器/IDE 好用？是 VS Code 还是 WebStorm （WebStorm 其实是 IntelliJ IDEA 的定制版）？我来做个对比：

- **哪个更酷**：显然 VS Code 更酷。
- **内存占用情况**：根据我的观察，VS Code 是很占内存的（尤其是当你打开多个窗口的时候），但如果你的内存条够用，使用起来是不会有任何卡顿的感觉的。相比之下，IntelliJ IDEA 不仅非常占内存，而且还非常卡顿。如果你想换个既轻量级、又不占内存的编辑器，最好还是使用「Sublime Text」编辑器。
- **使用比例**：当然是 VS Code 更胜一筹。先不说别的，我就拿数据说话，我目前所在的研发团队有 200 人左右（120个后台、80个前端），他们绝大部分人都在用 VS Code 编码，妥妥的。

## 快捷键的使用

VS Code 用得熟不熟，首先就看你是否会用快捷键。以下列出的内容，都是常用快捷键，而加粗部分的快捷键，使用频率则非常高。掌握下面这些高频核心快捷键，你和你的工具，足矣露出锋芒。

### 工作区快捷键

| Mac 快捷键                 | Win 快捷键                        | 作用                                          | 备注                 |
| -------------------------- | --------------------------------- | --------------------------------------------- | -------------------- |
| **Cmd + Shift + P**  | **Ctrl + Shift + P**，Fn+F1 | 显示命令面板                                  |                      |
| **Cmd + B**          | **Ctrl + B**                | 显示/隐藏侧边栏                               | 很实用               |
| `Cmd + \`                | `Ctrl + \`                      | **创建多个编辑器**                      | 【重要】抄代码利器   |
| **Cmd + 1、2**       | **Ctrl + 1、2**             | 聚焦到第 1、第 2 个编辑器                     | 同上重要             |
| **Cmd + +、Cmd + -** | **ctrl + +、ctrl + -**      | 将工作区放大/缩小（包括代码字体、左侧导航栏） | 在投影仪场景经常用到 |
| Cmd + J                    | Ctrl + J                          | 显示/隐藏控制台                               |                      |
| **Cmd + Shift + N**  | **Ctrl + Shift + N**        | 重新开一个软件的窗口                          | 很常用               |
| Cmd + Shift + W            | Ctrl + Shift + W                  | 关闭软件的当前窗口                            |                      |
| Cmd + N                    | Ctrl + N                          | 新建文件                                      |                      |
| Cmd + W                    | Ctrl + W                          | 关闭当前文件                                  |                      |
| Cmd+~                      | Ctrl+~                            | 打开默认终端                                  |                      |

### 搜索相关

| Mac 快捷键                | Win 快捷键                | 作用                                         | 备注   |
| ------------------------- | ------------------------- | -------------------------------------------- | ------ |
| **Cmd + Shift + F** | **Ctrl + Shift +F** | 全局搜索代码                                 | 很常用 |
| **Cmd + P**         | **Ctrl + P**        | 在当前的项目工程里，**全局**搜索文件名 |        |
| Cmd + F                   | Ctrl + F                  | 在当前文件中搜索代码，光标在搜索框里         |        |
| **Cmd + G**         | **F3**              | 在当前文件中搜索代码，光标仍停留在编辑器里   | 很巧妙 |
|                           | Ctrl+Shift+X              | 打开扩展商店                                 |        |

### 跳转操作

| Mac 快捷键                          | Win 快捷键             | 作用                                       | 备注               |
| ----------------------------------- | ---------------------- | ------------------------------------------ | ------------------ |
| Cmd + `                             | 没有                   | 在同一个软件的**多个工作区**之间切换 | 使用很频繁         |
| **Cmd + Option + 左右方向键** | Ctrl + Pagedown/Pageup | 在已经打开的**多个文件**之间进行切换 | 非常实用           |
| Ctrl + Tab                          | Ctrl + Tab             | 在已经打开的多个文件之间进行跳转           | 不如上面的快捷键快 |
| Cmd + Shift + O                     | Ctrl + shift + O       | 在当前文件的各种**方法之间**进行跳转 |                    |
| Ctrl + G                            | Ctrl + G               | 跳转到指定行                               |                    |
| `Cmd+Shift+\`                     | `Ctrl+Shift+\`       | 跳转到匹配的括号                           |                    |

### 移动光标

| Mac 快捷键                    | Win 快捷键                  | 作用                             | 备注       |
| ----------------------------- | --------------------------- | -------------------------------- | ---------- |
| 方向键                        | 方向键                      | 在**单个字符**之间移动光标 | 大家都知道 |
| **option + 左右方向键** | **Ctrl + 左右方向键** | 在**单词**之间移动光标     | 很常用     |
| **Cmd + 左右方向键**    | **Fn + 左右方向键**   | 在**整行**之间移动光标     | 很常用     |
| Cmd + ←                      | Fn + ←（或 Win + ←）      | 将光标定位到当前行的最左侧       | 很常用     |
| Cmd + →                      | Fn + →（或 Win + →）      | 将光标定位到当前行的最右侧       | 很常用     |
| Cmd + ↑                      | Ctrl + Home                 | 将光标定位到文章的第一行         |            |
| Cmd + ↓                      | Ctrl + End                  | 将光标定位到文章的最后一行       |            |
| Cmd + Shift + \               |                             | 在**代码块**之间移动光标   |            |

### 编辑操作

| Mac 快捷键                    | Win 快捷键                 | 作用                                 | 备注                                   |
| ----------------------------- | -------------------------- | ------------------------------------ | -------------------------------------- |
| Cmd + C                       | Ctrl + C                   | 复制                                 |                                        |
| Cmd + X                       | Ctrl + X                   | 剪切                                 |                                        |
| Cmd + C                       | Ctrl + V                   | 粘贴                                 |                                        |
| **Cmd + Enter**         | **Ctrl + Enter**     | 在当前行的下方新增一行，然后跳至该行 | 即使光标不在行尾，也能快速向下插入一行 |
| Cmd+Shift+Enter               | Ctrl+Shift+Enter           | 在当前行的上方新增一行，然后跳至该行 | 即使光标不在行尾，也能快速向上插入一行 |
| **Option + ↑**         | **Alt + ↑**         | 将代码向上移动                       | 很常用                                 |
| **Option + ↓**         | **Alt + ↓**         | 将代码向下移动                       | 很常用                                 |
| Option + Shift + ↑           | Alt + Shift + ↑           | 将代码向上复制一行                   |                                        |
| **Option + Shift + ↓** | **Alt + Shift + ↓** | 将代码向下复制一行                   | 写重复代码的利器                       |

另外再补充一点：将光标点击到某一行的任意位置时，默认就已经是**选中全行**了，此时可以直接**复制**或**剪切**，无需点击鼠标。这个非常实用，是所有的编辑操作中，使用得最频繁的。它可以有以下使用场景：

- 场景1：假设光标现在处于第5行的**任意位置**，那么，直接依次按下 `Cmd + C` 和 `Cmd + V`，就会把这行代码复制到第6行。继续按 `Cmd + C` 和 `Cmd + V`，就会把这行代码复制到第7行。copy代码so easy。
- 场景2：假设光标现在处于第5行，那么，先按下 `Cmd + C`，然后按两下 `↑` 方向键，此时光标处于第3行；紧接着，继续按下 `Cmd + V`，就会把刚刚那行代码复制到第3行，原本处于第3行的代码会整体**下移**。

你看到了没？上面的两个场景，我全程没有使用鼠标，只通过简单的复制粘贴和方向键，就做到了如此迅速的copy代码。你说是不是很高效？

### 多光标编辑

| Mac 快捷键                          | Win 快捷键                       | 作用                                 | 备注 |
| ----------------------------------- | -------------------------------- | ------------------------------------ | ---- |
| **Cmd + Option + 上下键**     | **Ctrl + Alt + 上下键**    | 在连续的多列上，同时出现光标         |      |
| **Option + 鼠标点击任意位置** | **Alt + 鼠标点击任意位置** | 在任意位置，同时出现光标             |      |
| Option + Shift + 鼠标拖动           | Alt + Shift + 鼠标拖动           | 在选中区域的每一行末尾，出现光标     |      |
| Cmd + Shift + L                     | Ctrl + Shift + L                 | 在选中文本的所有相同内容处，出现光标 |      |

其他的多光标编辑操作：（很重要）

- 选中某个文本，然后反复按住快捷键「 **Cmd + D** 」键（windows 用户是按住「**Ctrl + D**」键）， 即可将全文中相同的词逐一加入选择。
- 选中一堆文本后，按住「**Option + Shift + i**」键（windows 用户是按住「**Alt + Shift + I**」键），既可在**每一行的末尾**都创建一个光标。

### 删除操作

| Mac 快捷键                   | Win 快捷键                 | 作用                   | 备注                                      |
| ---------------------------- | -------------------------- | ---------------------- | ----------------------------------------- |
| Cmd + shift + K              | Ctrl + Shift + K           | 删除整行               | 「Cmd + X」的作用是剪切，但也可以删除整行 |
| **option + Backspace** | **Ctrl + Backspace** | 删除光标之前的一个单词 | 英文有效，很常用                          |
| option + delete              | Ctrl + delete              | 删除光标之后的一个单词 |                                           |
| **Cmd + Backspace**    |                            | 删除光标之前的整行内容 | 很常用                                    |
| Cmd + delete                 |                            | 删除光标之后的整行内容 |                                           |

备注：上面所讲到的移动光标、编辑操作、删除操作的快捷键，在其他编辑器里，大部分都适用。

### 编程语言相关

| Mac 快捷键                   | Win 快捷键      | 作用                             | 备注                               |
| ---------------------------- | --------------- | -------------------------------- | ---------------------------------- |
| Cmd + /                      | Ctrl + /        | 添加单行注释                     | 很常用                             |
| **Option + Shift + F** | Alt + shift + F | 代码格式化                       | 很常用                             |
| F2                           | F2              | 以重构的方式进行**重命名** | 改代码备                           |
| Ctrl + J                     |                 | 将多行代码合并为一行             | Win 用户可在命令面板搜索”合并行“ |
| Cmd +                        |                 |                                  |                                    |
| Cmd + U                      | Ctrl + U        | 将光标的移动回退到上一个位置     | 撤销光标的移动和选择               |

## 新建一个Vue项目

确保已安装好Node.js和npm，可通过CMD窗口或终端里进行查看：

```
C:\Users\pyk>node -v
v12.18.0

C:\Users\pyk>npm -v
6.14.4
```

打开VSCode的终端：全局安装vue-cli，vue-cli可以帮助我们快速构建Vue项目。

```
npm install -g vue-cli
```

安装webpack，它是打包js的工具

```
npm install -g webpack 
```

安装完成后就可以创建我们的VUE项目了：

创建命令：

```
vue init webpack XXX(创建的项目名称)
```

***\*注意：项目名称不能有大写字母，否则会报下面的错误\****

> 报错Sorry, name can no longer contain capital letters

输入：**vue init webpack vue_test**回车，然后输入工程名称**vue_test**，后面一路回车选yes即可。

有如下提示则表示创建成功：

![image-20220204215954561](https://cdn.jsdelivr.net/gh/panyongkang/MyImgBed/img/vue%E5%88%9B%E5%BB%BA%E6%88%90%E5%8A%9F.png)

按照提示输入命令：

![image-20220204220526399](https://cdn.jsdelivr.net/gh/panyongkang/MyImgBed/img/%E5%90%AF%E5%8A%A8vue.png)

启动成功后双击 ` http://localhost:8080`打开浏览器即可查看，至此我们的第一个Vue小项目就创建好了。

## 用户代码片段配置

步骤如下：

1.在VScode主界面->点击左下角设置图标->点击用户代码片段

2.在弹出的窗口中选择->新建全局代码片段文件（也可选择项目内的代码片段，使用范围不一样而已）

3.输入文件名-回车 (文件名可自定义)

4.这时就会生成并打开对应的配置文件，注释着相关描述和一个示例

参数描述：

scope：此代码段使用的语言名称列表，例如 "typescript,javascript"（非必填）。

prefix：选择代码片段时要使用的前缀。

body：代码片段内容

description：代码片段描述。

接下来我们就可以在这个大括号里添加我们需要的代码片段了

5.比如插入一段js注释代码片段然后保存。

```
{
	// Place your 全局 snippets here. Each snippet is defined under a snippet name and has a scope, prefix, body and 
	// description. Add comma separated ids of the languages where the snippet is applicable in the scope field. If scope 
	// is left empty or omitted, the snippet gets applied to all languages. The prefix is what is 
	// used to trigger the snippet and the body will be expanded and inserted. Possible variables are: 
	// $1, $2 for tab stops, $0 for the final cursor position, and ${1:label}, ${2:another} for placeholders. 
	// Placeholders with the same ids are connected.
	// Example:
	// "Print to console": {
	// 	"scope": "javascript,typescript",
	// 	"prefix": "log",
	// 	"body": [
	// 		"console.log('$1');",
	// 		"$2"
	// 	],
	// 	"description": "Log output to console"
	// }

	"Print to jsNoteTitle": {
        "scope": "",
        "prefix": "jsNoteTitle",
        "body": [
            "/****************",
            " *@description:",
            " *@author: 小潘",
            " *@date: ${CURRENT_YEAR}-${CURRENT_MONTH}-${CURRENT_DATE} ${CURRENT_HOUR}:${CURRENT_MINUTE}:${CURRENT_SECOND}",
            " *@version: V1.0.0",
            "*************************************************************************/"
        ],
        "description": "对应开始标题注释"
    },
}
```

6.在编辑代码时只要输入jsNoteTitle就会提示出对应的代码片段，然后回车或者tab就好了。

## 踩坑记录

以下踩坑记录是不按照安装步骤导致报错，还有使用过程中出现的问题，在这里进行了简单的记录。

**错误1**：vue : 无法将“vue”项识别为 cmdlet、函数、脚本文件或可运行程序的名称。请检查名称的拼写，如果包括路径，请确保路径正确，然后再试一次。

原因：需要先全局安装Vue

```dart
// Vue CLI 2.x 安装
npm install vue-cli -g

// Vue CLI 3 安装
npm install -g @vue/cli

// 若想将2.x升级至3
npm uninstall -g vue-cli
npm install -g @vue/cli

// 查看vue版本号
C:\Program Files>vue -V
@vue/cli 4.5.12
```

**错误2**:全局安装Vue后，执行 `vue -V`命令又报错：vue : 无法加载文件 D:\softwarenodejs\node_global\vue.ps1，因为在此系统上禁止运行脚本。

![图片](https://cdn.jsdelivr.net/gh/panyongkang/MyImgBed/img/%E7%A6%81%E6%AD%A2%E8%BF%90%E8%A1%8C%E6%8A%A5%E9%94%99%E6%88%AA%E5%9B%BE.png)

原因分析：
PowerShell执行时阻止了该操作，在终端输入Get-ExecutionPolicy指令后回车，发现返回Restricted，为受限制状态。

解决办法：
在终端输入Set-ExecutionPolicy -Scope CurrentUser指令，回车，然后输入RemoteSigned指令回车，为解除限制状态。

之后，就可以用脚手架正常创建vue项目了。

**错误3**：创建项目时通过命令**vue init webpack vue_test**回车后报错：Command vue init requires a global addon to be installed.   Please run undefined @vue/cli-init and try again.

解决方法：npm install -g @vue/cli-init

然后再重新创建。

**错误4**：vue-cli · Failed to download repo vuejs-templates/webpack: connect ETIMEDOUT 20.205.243.160:443

**原因一：**
可能是你网络不好，换个网络即可
**原因二**
你没有安装webpack，在cmd窗口中输入npm install webpack -g命令即可
**原因三**
设置一下cmd代理，set http_proxy=http://自己的代理服务器IP:自己的代理服务器端口

我的主要原因是没有安装webpack,安装后重新启动VSCode编辑器。

# IntelliJ IDEA开发工具

[新建Java项目参考](https://blog.csdn.net/AmaniZ/article/details/79250652)

## 高效能插件

IntelliJ IDEA 本身已经非常强大，但搭配一些插件，确实能让开发工作更加得心应手。

| 插件名称                                 | 主要功能                                                           | 推荐指数   | 获取方式/备注                                                                                |
| :--------------------------------------- | :----------------------------------------------------------------- | :--------- | :------------------------------------------------------------------------------------------- |
| **Lombok**                         | 减少样板代码，自动生成getter/setter/toString/equals/hashCode等方法 | ⭐⭐⭐⭐⭐ | [JetBrains 插件市场](https://plugins.jetbrains.com/plugin/6317-lombok)                          |
| **SonarLint**                      | 实时检测代码中的潜在问题、漏洞和代码异味                           | ⭐⭐⭐⭐⭐ | [JetBrains 插件市场](https://plugins.jetbrains.com/plugin/7973-sonarlint)                       |
| **Alibaba Java Coding Guidelines** | 依据《阿里巴巴Java开发手册》进行代码规范检查                       | ⭐⭐⭐⭐   | [JetBrains 插件市场](https://plugins.jetbrains.com/plugin/10046-alibaba-java-coding-guidelines) |
| **CheckStyle-IDEA**                | 代码风格检查，帮助遵循编码标准                                     | ⭐⭐⭐⭐   | [JetBrains 插件市场](https://plugins.jetbrains.com/plugin/1065-checkstyle-idea)                 |
| **GsonFormat**                     | 一键根据 JSON 文本生成 Java 类                                     | ⭐⭐⭐⭐   | [JetBrains 插件市场](https://plugins.jetbrains.com/plugin/7654-gsonformat)                      |
| **Maven Helper**                   | 方便管理 Maven 项目，分析依赖冲突                                  | ⭐⭐⭐⭐   | [JetBrains 插件市场](https://plugins.jetbrains.com/plugin/7179-maven-helper)                    |
| **MyBatisX**                       | MyBatis 专属插件，XML 与 Mapper 接口方法双向跳转，SQL 高亮         | ⭐⭐⭐⭐   | [JetBrains 插件市场](https://plugins.jetbrains.com/plugin/10719-mybatisx)                       |
| **Rainbow Brackets**               | 彩虹括号，用不同颜色高亮匹配的括号，提高代码可读性                 | ⭐⭐⭐     | [JetBrains 插件市场](https://plugins.jetbrains.com/plugin/10080-rainbow-brackets)               |
| **CodeGlance**                     | 在编辑器右侧生成代码缩略图，方便快速定位和浏览大型文件             | ⭐⭐⭐     | [JetBrains 插件市场](https://plugins.jetbrains.com/plugin/7275-codeglance)                      |
| **String Manipulation**            | 提供丰富的字符串操作功能，如大小写转换、命名风格转换等             | ⭐⭐⭐     | [JetBrains 插件市场](https://plugins.jetbrains.com/plugin/2162-string-manipulation)             |
| **Key Promoter X**                 | 帮助学习和记忆 IntelliJ IDEA 快捷键                                | ⭐⭐⭐     | [JetBrains 插件市场](https://plugins.jetbrains.com/plugin/9792-key-promoter-x)                  |
| **VisualVM Launcher**              | 方便在 IDEA 内启动 VisualVM 进行 JVM 性能分析                      | ⭐⭐⭐     | [JetBrains 插件市场](https://plugins.jetbrains.com/plugin/7115-visualvm-launcher)               |
| **Translation**                    | 翻译插件，方便阅读源码中的英文注释或错误信息                       | ⭐⭐⭐     | [JetBrains 插件市场](https://plugins.jetbrains.com/plugin/8579-translation)                     |

🧠 **插件安装方式**：
在 IntelliJ IDEA 中，通过 `File` -> `Settings` -> `Plugins` 打开插件市场，搜索插件名称即可安装。安装完成后通常需要**重启 IDEA** 生效。
