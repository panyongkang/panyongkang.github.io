title: Hexo+mypages搭建整合流程
tags:
  - Hexo
categories:
  - Hexo博客
author: xiaokang
date: 2020-04-10 13:41:00

cover: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2010232996,1620516668&fm=26&gp=0.jpg'

---
## 搭建个人博客踩坑记录：

## 访问博客地址github.io被拒绝

问题：本来运行好好的，前段时间执行了添加路由的脚本.bat文件，导致hosts文件被修改，导致无法连接。可通过查看C:\Windows\System32\drivers\etc目录下的hosts文件，用cmd窗口ping+panyongkang.github.io,如果ip地址变成了本机的127.0.0.1,连接超时，说明地址被修改了。

解决办法：可通过[站长之家](http://ip.tool.chinaz.com/)查询到自己网站原来的ip地址为185.199.110.153，直接在hosts文件中添加185.199.110.153  panyongkang.github.io，然后在cmd窗口ping+panyongkang.github.io查看数据包丢失为0，说明已成功，网页又可以愉快的访问啦。

### 整合个人博客与个人网页
	问题处理:之前把个人网页mypages放到了.deploy_git中，导致每次hexo g 再hexo d的时候删除了mypages,要把个人网页放在source中才能正常部署  
	
	问题：把readme.md放入source中，重新发布却生成了readme.html?  
	
	处理方法：
		1. 找到hexo站点根目录下的_config.yml文件
		2. 在skip_render后面添加README.md
		3. 然后重新输入：
			hexo clean
			hexo g
			hexo d  
	
	问题：添加自定义HTML页面，使页面不被渲染
	处理方法：在博客根目录的配置文件_config.yml文件里设置跳过渲染
		#跳过渲染
		skip_render: 
  			- "README.md"
                			- "mypages/**"

>跳过渲染具体参考：[https://blog.csdn.net/qq_40922859/article/details/100877777](https://blog.csdn.net/qq_40922859/article/details/100877777 "跳过渲染")

### 搭建博客

参考地址：<https://liuxiangyang.space/2020/02/01/00012/#%E6%B7%BB%E5%8A%A0-SSH-Key-%E5%88%B0-GitHub>

	1.问题：hexo更换主题后出现问题：WARN No layout: index.html?  
		处理：只要把theme下的文件夹名称改为主题名称就显示正常了。
		参考地址：https://blog.csdn.net/robot_starscream/article/details/95590573
	
	2.问题：hexo d后 ERROR Deployer not found: git
		处理：npm install --save hexo-deployer-git
	
	3.问题：安装npm install -g hexo-cli报错
		处理：查看当前镜像：npm get registry
		切换原来的镜像：npm config set registry https://registry.npmjs.org/  
		参考地址：https://blog.csdn.net/ShelleyLittlehero/article/details/83444703  
	4.问题：4000端口 被占用
		处理： 
		 
		方法一： netstat -ant |grep 4000查看
		然后kill掉该进程
		
		方法二：可以在_config.yml内加上
		server:
		  port: 4001
		  compress: true
		  header: true
		修改成4001端口
		
		方法三：windows任务管理器 – 进程 – 找到 ‘Node.js’ 为前缀的进程名，然后主动关闭进程即可

### hexo主题安装:  
参考地址：<https://jerryc.me/posts/21cfbf15/#%E5%BF%AB%E9%80%9F%E9%96%8B%E5%A7%8B>

	安装之后，执行命令如下：  
	清空缓存：hexo clean  
	重新生成datebase:hexo g  
	打开本地仓库服务：hexo s  
	上传到远程仓库：hexo d


### 发送文章到博客  
	1. 找到md的文件，把它复制到你hexo博客文件夹 中 source 下的 _posts 中，默认只有一个 hello-world.md。  
	2. 复制完之后然后使用文本编辑器打开它，在第一行加上title，内容自定，如title: this is my first blog
	3. 接着在你博客站点文件夹下右键空白处，选择Git Bash Here，输入 hexo g (完整命令为hexo generate)，用于生成静态文件
	4. 然后 输入 hexo s(完整命令为hexo server)，用于启动服务器，主要用来本地预览；完成后 打开浏览器输入 localhost:4000，会发现多了你刚写的那篇博客
	5. 最后输入hexo d(hexo deploy)，用于将本地文件发布到github等git仓库上；
	6. 再次输入网址查看，就可以看到发布的文章了  
	
	问题：hexo d执行后发现本地未添加成功
	处理：在Hexo根目录的_config.yml中修改url为自己的github访问地址：https://panyongkang.github.io/
	注意：修改后本地可以看见发布的文章，但是github上却没有，Google浏览器需要ctrl+F5刷新一下就可以了。
### Hexo可视化编写  
	安装Hexo Admin
	npm install --save hexo-admin  
	启动本地服务
	hexo s -d
	然后打开localhost:4000/admin/就可以在线编辑了  
	手动部署更新到github
	hexo g -d 
	注意：更新发布后需要退出Git Bash窗口，否则github Pages上面无法更新
	自动部署：学习中。。。









---