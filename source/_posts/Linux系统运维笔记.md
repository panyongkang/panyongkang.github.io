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

.bashrc文件常用配置内容：

```bash
# .bashrc

# Source global definitions
if [ -f /etc/bashrc ]; then
        . /etc/bashrc
fi

# Uncomment the following line if you don't like systemctl's auto-paging feature:
# export SYSTEMD_PAGER=

# User specific aliases and functions
export CURDATE=`date +%Y%m%d`
alias tlog='cd /apphome/ctbsabs/abs/log/teller/${CURDATE}/$1'
alias conf='cd /apphome/ctbsabs/abs/configuration/ && vim -n  deviceIsDebug.properties'
alias trade='cd /apphome/ctbsabs/abs/workspace/FCBank/trade/Trade/'
alias up='cd /apphome/ctbsabs/abs/upload_files/up && ls'
alias bank='cd /apphome/ctbsabs/abs/workspace/bank && ls'
# 筛选文件路径和内容同时匹配两个关键词
function grepa() {
    k1="$1"
    k2="$2"

    if [[ -z "$k1" || -z "$k2" ]]; then
	echo "---------- ga 命令使用说明 ----------"
        echo "该命令用于混合匹配：文件路径中包含一个关键词，同时文件内容中包含另一个关键词。"
        echo "用法：ga <内容关键词> <路径关键词>"
        echo "例如：ga 'tadVarMap().commCode' '020702'"
        echo "------------------------------------"
        return 1
    fi

	echo "<<<<< 混合匹配（文件路径中包含一个关键词，文件内容包含另一个关键词） >>>>>"
	echo "【路径含 '$k1'，内容含 '$k2'】"
	find . -type f -path "*${k1}*" -print0 | xargs -0 grep -Hn --color=always "$k2"
	echo "【路径含 '$k2'，内容含 '$k1'】"
	find . -type f -path "*${k2}*" -print0 | xargs -0 grep -Hn --color=always "$k1"

}
alias ga='grepa'
grepws() {
    local keywords=()
    local output_file=""
    local mode="or"
    local auto_download=false
    local default_output_dir="/apphome/ctbsabs/abs/upload_files/up/TestDirectory/111111"
  
    # 解析参数
    while [[ $# -gt 0 ]]; do
        case "$1" in
            -o|--output)
                output_file="$2"
                shift 2
                ;;
            -a|--and)
                mode="and"
                shift
                ;;
            -d|--download)
                auto_download=true
                shift
                ;;
            -h|--help)
                echo "---------- gaws 命令使用说明 ----------"
                echo "用法: gaws [选项] <关键词1> [关键词2 ...]"
                echo "选项:"
                echo "  -o, --output <文件>  导出交易码"
                echo "                      仅文件名: 保存到默认路径 $default_output_dir/"
                echo "                      完整路径: 保存到指定路径"
                echo "  -d, --download      生成文件后自动下载到本地"
                echo "  -a, --and           使用且运算（默认是或运算）"
                echo "  -h, --help         显示帮助信息"
                echo ""
                echo "示例:"
                echo "  gaws '3005300000402'                          # 仅查询"
                echo "  gaws -o 统计.txt '3005300000402'              # 保存到默认路径"
                echo "  gaws -o 统计.txt '3005300000402' -d           # 保存并下载"
                echo "  gaws -o /apphome/ctbsabs/abs/upload_files/up/临时统计.txt '3005300000402'     # 保存到指定路径"
                echo "  gaws -o /apphome/ctbsabs/abs/upload_files/up/临时统计.txt '3005300000402' -d  # 指定路径保存并下载"
                echo "------------------------------------"
                return 0
                ;;
            *)
                keywords+=("$1")
                shift
                ;;
        esac
    done
  
    # 检查是否有关键词
    if [[ ${#keywords[@]} -eq 0 ]]; then
        echo "错误：请至少输入一个关键词"
	echo "使用 gaws -h 查看帮助"
        return 1
    fi
  
    # 如果指定了输出文件但没有路径，使用默认路径
    if [[ -n "$output_file" ]]; then
        if [[ "$output_file" != */* ]]; then
            # 确保默认输出目录存在
            if [[ ! -d "$default_output_dir" ]]; then
                mkdir -p "$default_output_dir" 2>/dev/null || {
                    echo "错误：无法创建默认目录 $default_output_dir"
                    return 1
                }
            fi
            output_file="$default_output_dir/$output_file"
            echo "<<<<< 文件将保存到默认路径: $output_file >>>>>"
        else
            # 对于完整路径，确保目录存在
            local output_dir=$(dirname "$output_file")
            if [[ ! -d "$output_dir" ]]; then
                mkdir -p "$output_dir" 2>/dev/null || {
                    echo "错误：无法创建目录 $output_dir"
                    return 1
                }
            fi
            echo "<<<<< 文件将保存到指定路径: $output_file >>>>>"
        fi
    fi
  
    echo "<<<<< 搜索关键词: ${keywords[*]} (模式: $mode) >>>>>"
  
    # 构建搜索模式
    local search_pattern=""
    if [[ "$mode" == "or" ]]; then
        # 或运算：关键词1|关键词2|...
        search_pattern=$(IFS="|"; echo "${keywords[*]}")
    else
        # 且运算：需要分别匹配每个关键词
        search_pattern="${keywords[0]}"
    fi
  
    # 提取交易码
    echo "<<<<< 提取交易码 >>>>>"
  
    # 用于存储所有交易码和对应的接口码关系
    declare -A transaction_keywords
    declare -A keyword_transactions
  
    if [[ "$mode" == "or" ]]; then
        # 或运算模式 - 分别统计每个关键词
        for keyword in "${keywords[@]}"; do
            echo "=== 接口码: $keyword ==="
            keyword_transactions[$keyword]=$(grep -rl "$keyword" . | \
                grep -oE '/(t[0-9]+|[0-9]{6,}[a-zA-Z0-9]*)/' | \
                sed 's/\///g' | sort -u)
  
            if [[ -n "${keyword_transactions[$keyword]}" ]]; then
                echo "${keyword_transactions[$keyword]}"
                echo "--- 发现 $(echo "${keyword_transactions[$keyword]}" | wc -l) 个交易码 ---"
    
                # 记录交易码与关键词的关系
                while IFS= read -r transaction; do
                    if [[ -n "$transaction" ]]; then
                        transaction_keywords["$transaction"]+=" $keyword"
                    fi
                done <<< "${keyword_transactions[$keyword]}"
            else
                echo "未找到匹配的交易码"
                echo "--- 发现 0 个交易码 ---"
            fi
            echo
        done
  
        # 汇总所有交易码
        transaction_codes=$(printf "%s\n" "${!transaction_keywords[@]}" | sort -u)
  
    else
        # 且运算模式 - 找出同时包含所有关键词的文件
        echo "=== 查找同时包含所有关键词的文件 ==="
  
        # 第一步：找出包含每个关键词的文件列表
        local temp_files=()
        for keyword in "${keywords[@]}"; do
            temp_file=$(mktemp)
            grep -rl "$keyword" . > "$temp_file"
            temp_files+=("$temp_file")
        done
  
        # 第二步：找出包含所有关键词的文件交集
        if [[ ${#temp_files[@]} -gt 1 ]]; then
            # 取第一个和第二个文件的交集
            common_files=$(comm -12 <(sort "${temp_files[0]}") <(sort "${temp_files[1]}"))
  
            # 继续与剩余文件取交集
            for ((i=2; i<${#temp_files[@]}; i++)); do
                common_files=$(comm -12 <(echo "$common_files" | sort) <(sort "${temp_files[i]}"))
            done
  
            # 从共同文件中提取交易码
            transaction_codes=$(echo "$common_files" | \
                grep -oE '/(t[0-9]+|[0-9]{6,}[a-zA-Z0-9]*)/' | \
                sed 's/\///g' | sort -u)
        else
            # 只有一个关键词时，直接提取交易码
            transaction_codes=$(cat "${temp_files[0]}" | \
                grep -oE '/(t[0-9]+|[0-9]{6,}[a-zA-Z0-9]*)/' | \
                sed 's/\///g' | sort -u)
        fi
  
        # 清理临时文件
        for temp_file in "${temp_files[@]}"; do
            rm -f "$temp_file"
        done
    fi
  
    # 显示汇总结果
    if [[ -n "$transaction_codes" ]]; then
        echo "<<<<< 汇总结果 >>>>>"
        if [[ "$mode" == "or" && ${#keywords[@]} -gt 1 ]]; then
            # 多关键词或运算时显示详细关系
            while IFS= read -r transaction; do
                if [[ -n "$transaction" ]]; then
                    keywords_for_transaction=$(echo "${transaction_keywords[$transaction]}" | sed 's/^ *//;s/ *$//')
                    echo "$transaction (涉及接口码: $keywords_for_transaction)"
                fi
            done <<< "$transaction_codes"
        else
            # 单关键词或且运算时简单显示
            echo "$transaction_codes"
        fi
        echo "<<<<< 共发现 $(echo "$transaction_codes" | wc -l) 个交易码 >>>>>"
    else
        echo "未找到匹配的交易码"
        if [[ -n "$output_file" ]]; then
            echo "<<<<< 未找到交易码，不生成输出文件 >>>>>"
            return 0
        fi
    fi
  
    # 只有指定了输出文件时才导出
    if [[ -n "$output_file" && -n "$transaction_codes" ]]; then
        # 尝试导出文件
        {
            echo "# 搜索关键词: ${keywords[*]}"
            echo "# 搜索模式: $mode"
            echo "# 生成时间: $(date)"
            echo "# 交易码列表:"
            if [[ "$mode" == "or" && ${#keywords[@]} -gt 1 ]]; then
                # 多关键词或运算时导出详细关系
                while IFS= read -r transaction; do
                    if [[ -n "$transaction" ]]; then
                        keywords_for_transaction=$(echo "${transaction_keywords[$transaction]}" | sed 's/^ *//;s/ *$//')
                        echo "$transaction # 涉及接口码: $keywords_for_transaction"
                    fi
                done <<< "$transaction_codes"
            else
                # 单关键词或且运算时简单导出
                echo "$transaction_codes"
            fi
        } > "$output_file"
  
        # 检查文件是否成功创建
        if [[ -f "$output_file" ]]; then
            echo "<<<<< 交易码已导出到: $output_file >>>>>"
  
            # 如果指定了自动下载，执行sz命令
            if [[ "$auto_download" == true ]]; then
                echo "<<<<< 开始下载文件 >>>>>"
                if command -v sz >/dev/null 2>&1; then
                    sz "$output_file"
                else
                    echo "错误：sz命令不可用，请安装lrzsz包"
                    echo "CentOS: sudo yum install -y lrzsz"
                    echo "Ubuntu: sudo apt-get install -y lrzsz"
                fi
            fi
        else
            echo "<<<<< 错误：无法创建文件 $output_file >>>>>"
        fi
    fi
  
    # 显示详细匹配内容
    if [[ -z "$output_file" ]]; then
        echo "<<<<< 详细匹配内容 >>>>>"
        if [[ "$mode" == "or" ]]; then
            # 或运算：显示所有匹配的内容
            grep -rn --color=always -E "$search_pattern" .
        else
            # 且运算：只显示同时包含所有关键词的文件内容
            if [[ -n "$common_files" ]]; then
                # 对每个共同文件，高亮显示所有关键词
                while IFS= read -r file; do
                    if [[ -n "$file" ]]; then
                        echo "=== 文件: $file ==="
                        # 使用grep同时匹配所有关键词并高亮显示
                        grep -Hn --color=always -e "${keywords[0]}" "$file"
                        for ((i=1; i<${#keywords[@]}; i++)); do
                            grep -Hn --color=always -e "${keywords[i]}" "$file"
                        done
                    fi
                done <<< "$common_files"
            else
                echo "没有找到同时包含所有关键词的文件"
            fi
        fi
    fi
}

alias gaws='grepws'
```

.bash_profile文件常用配置内容：

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

| 命令         | 统计范围                  | 输出内容                        | 适用场景                       |
| ------------ | ------------------------- | ------------------------------- | ------------------------------ |
| `du -sh *` | 当前目录下所有文件/子目录 | 总计大小（易读格式）            | 快速查看当前目录下各项目总大小 |
| `du -h`    | 当前目录下所有文件/子目录 | 逐项列出大小 + 总计（易读格式） | 详细分析目录内各文件占用情况   |
| `df -h`    | 整个文件系统（分区）      | 分区总容量、已用、可用等        | 快速检查磁盘分区整体使用率     |

---

### **`du -sh *`**

**功能：**

* 统计当前目录下所有文件和子目录的总大小，并以人类可读的格式（如 GB、MB）显示。

**选项解析：**

* `-s`（summary）：仅显示总大小，不显示子目录详情。
* `-h`（human-readable）：自动转换单位为 K/M/G。
* `*`：匹配当前目录下的所有文件和子目录。
* sudo du -sh /* 2>/dev/null：其中 `2>/dev/null`表示忽略无权限访问的目录。

**特点**：

* 会递归遍历当前目录下的所有文件和子目录，适合快速查看当前目录下各项目的总大小。

**适用场景**：

* 快速定位当前目录下占用空间较大的文件或目录，例如整理文件时筛选大文件。

---

### **`du -h`**

**功能**：

* 显示当前目录下所有文件和子目录的磁盘使用量，以人类可读的格式逐项列出，并在最后显示总和。

**特点**：

* 需要遍历目录结构，若目录层级深或文件多，执行时间较长。

**适用场景**：

* 需要逐层分析目录空间占用，例如排查某个特定目录下的空间异常。

---

### **`df -h`**

**功能**：

* 显示指定文件系统的磁盘空间使用情况，包括总容量、已用空间、可用空间及挂载点，以人类可读格式呈现。

**特点**：

* 直接读取文件系统元数据，速度快，适合整体查看磁盘分区状态。
* 可能统计被删除但仍被进程占用的文件（如 `df` 仍显示占用，而 `du` 不统计）。

**适用场景**：

* 快速检查磁盘分区的整体使用率，例如发现某个分区快满时初步定位问题。

---

### 常见场景示例

若服务器空间存储满了，可以删除前一个月以上的日志记录；

比如当前是6月，可以把5月份之前的都删了：

```
rm -rf 202205*
```

## **文件权限信息**

### 查看当前目录文件权限

```
ls -la | awk '
{
  printf "%-30s %-10s %-15s\n", $9, $1, $3":"$4
}' | column -t
```

### 权限字符串解析

Linux 权限字符串由 10 个字符组成，分为四部分：

```
d rwx rwx r-x
│  │   │   └── 其他用户权限 (others)
│  │   └────── 所属组权限 (group)
│  └────────── 所有者权限 (user)
└───────────── 文件类型
```

1. **文件类型** ：

* `d`：目录
* `-`：普通文件
* `l`：符号链接

1. **权限组** （每组3字符）：

* 顺序：读(r)、写(w)、执行(x)
* `-` 表示无此权限
* 例：`rwx` = 读写执行全权限，`r-x` = 可读可执行不可写

### SIT 环境权限分析（用户 absview）

例如SIT 权限列表：

```
config.ini                    -rwxr-xr-x  ctbs:ctbs
deviceIsDebug.properties      -rw-r--r--  ctbs:ctbs
abs_share.properties          -rwxrwxr-x  ctbs:ctbs
FtpClientConfig.properties    -rw-r--r-x  ctbs:ctbs
org.eclipse.update            drwxrwxr-x  ctbs:ctbs
tft.conf                      -rw-r--r-x  ctbs:ctbs
tft_conf.properties           -rw-r--r-x  root:root
```

#### 权限矩阵（对 absview 用户）：

| 文件名                     | 类型 | 所有者 | 组   | 用户权限 | 组权限 | 其他权限 | absview 可读 | absview 可写 | absview 可执行 |
| -------------------------- | ---- | ------ | ---- | -------- | ------ | -------- | ------------ | ------------ | -------------- |
| config.ini                 | 文件 | ctbs   | ctbs | rwx      | r-x    | r-x      | ✅           | ❌           | ✅             |
| deviceIsDebug.properties   | 文件 | ctbs   | ctbs | rw-      | r--    | r--      | ✅           | ❌           | ❌             |
| abs_share.properties       | 文件 | ctbs   | ctbs | rwx      | rwx    | r-x      | ✅           | ❌           | ✅             |
| FtpClientConfig.properties | 文件 | ctbs   | ctbs | rw-      | r--    | r-x      | ✅           | ❌           | ✅             |
| org.eclipse.update         | 目录 | ctbs   | ctbs | rwx      | rwx    | r-x      | ✅           | ❌           | ✅             |
| tft.conf                   | 文件 | ctbs   | ctbs | rw-      | r--    | r-x      | ✅           | ❌           | ✅             |
| tft_conf.properties        | 文件 | root   | root | rw-      | r--    | r-x      | ✅           | ❌           | ✅             |

#### 关键结论：

1. **所有文件所有者都是 ctbs** ，但当前用户是 absview
2. **absview 对所有文件都不可写** ，因为：

* 不属于 ctbs 组
* 其他用户权限中都没有写(w)权限

1. **唯一 root 拥有的文件** ：tft_conf.properties

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
