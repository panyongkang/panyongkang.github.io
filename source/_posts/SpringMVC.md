title: SpringMVC
cover: https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2509196815,1378040169&fm=26&gp=0.jpg
tags: [SpringMVC]
categories: [SpringMVC]
date: 2020-04-27 10:13:00

---

## SpringMVC框架

### 回顾Web编程的过程

无论使用什么技术，什么框架，无非就是为了解决主要的5个问题：

1. 视图向控制器发出请求并提交数据。
2. 控制器获取数据、对数据进行相应的类型转换、对数据进行验证、调用模型。
3. 模型进行业务处理，并将业务处理后的数据返回给控制器。
4. 控制器在将数据响应到视图。
5. 视图对响应的数据进行渲染显示。

### Spring-MVC架构（工作原理）

 ![图片](hexo_post_1.png "SpringMVC架构图")

底层执行流程：

1. 用户发送请求至前端控制器DispatcherServlet.
2. 前端控制器DispatcherServlet接收请求后，调用处理器映射器HandlerMapping.
3. 处理器映射器HandlerMapping根据请求的URL找到对应的Handler(即Controller),将处理器Handler返回给前端控制器DispatcherServlet.
4. 前端控制器DispatcherServlet通过处理器适配器HandlerAdapter调用处理器Handler.
5. 执行处理器Handler(即Controller,也叫后端控制器)。
6. 处理器Handler执行完成后，返回ModelAndView(实体数据和视图)给处理器适配器HandlerApapter。
7. 处理器适配器HandlerApapter将处理器Handler执行的结果ModelAndView返回给前端控制器DispatcherServlet。
8. 前端控制器DispatcherServlet将ModelAndView穿给视图解析器ViewReslover。
9. 视图解析器ViewReslover解析后返回具体视图View。
10. 前端控制器DispatcherServlet对视图View进行渲染（即将模型数据填充到视图中）。
11. 前端控制器DispatcherServlet响应用户。

### SpringMVC提供的组件

1. DispatcherServlet(前端控制器)
2. HandlerMapping(处理器映射器)
3. HandlerAdapter(处理器适配器)
4. ViewReslover(视图解析器)

### 需要程序员编写的组件

1. Handler（Controller）
2. View

### pom.xml和web.xml的关系

这两个文件彼此无关。但可以共存使用。
pom.xml - Maven配置文件。控制构建过程 该项目
web.xml - Web应用程序配置文件。控制部署 和Web应用程序的配置
POM文件实际上不应该与应用程序一起部署，它仅用于构建过程。

### 什么是springMVC

springMVC是一种web层的MVC框架，用于替代servlet(处理|响应请求，获取表单数据，表单校验等)

### 为什么要用springMVC

框架的作用就是用于简化编程的，相对于servlet来说，使获取表单参数，响应请求的操作变得更简单。

在web.xml中`<servlet>`标签下`<load-on-startup>`1`</load-on-startup>`的作用:
1)load-on-startup元素标记容器是否在启动的时候就加载这个servlet(实例化并调用其init()方法)。
2)它的值必须是一个整数，表示servlet应该被载入的顺序
3)当值为0或者大于0时，表示容器在应用启动时就加载并初始化这个servlet；
4)当值小于0或者没有指定时，则表示容器在该servlet被选择时才会去加载。
5)正数的值越小，该servlet的优先级越高，应用启动时就越先加载。
6)当值相同时，容器就会自己选择顺序来加载。

### SpringMVC常用的注解

1. @Controller 用于标记在一个类上，使用它标记的类就是一个SpringMVC Controller 对象。
2. @RequestMapping是一个用来处理请求地址映射的注解，可用于类或方法上。用于类上，表示类中的所有响应请求的方法都是以该地址作为父路径。常用属性有value和method。Value：指定请求的实际地址；method：指定请求的method类型， GET、POST、PUT、DELETE等；
3. @ModelAttribute 表示该Controller的所有方法在调用前，先执行此@ModelAttribute方法，可用于注解和方法参数中，可以把这个@ModelAttribute特性，应用在BaseController当中，所有的Controller继承BaseController，即可实现在调用Controller时，先执行@ModelAttribute方法。
4. @SessionAttributes即将值放到session作用域中，写在class上面。
5. @RestController
   当某个类中所有方法需要返回Json时，在类上进行标注，相当于@Controller和@ResponseBody，当标注@RestController时@Controller可以省略
6. @PathVariable
   注入URL模板变量，用于接受请求路径中传递的参数，只能用于传递并接受单个参数
7. @SessionAttributes("user")
   用于将注解中相同名称的value保存在session中
8. @Valid
   用来对客户端浏览器请求参数绑定的对象属性进行验证
9. @RequestParam：注入请求参数，相当于request.getParameter(“参数名”)
10. @ResponseBody：获取请求内容当某个方法需要返回Json时，在方法上进行标注

补充：Model层是用于前端页面数据展示的，而entity层则是与数据库进行交互做存储用途。

< mvc:annotation-driven /> 是一种简写形式，完全可以手动配置替代这种简写形式，简写形式可以让初学都快速应用默认配置方案。< mvc:annotation-driven /> 会自动注册DefaultAnnotationHandlerMapping与AnnotationMethodHandlerAdapter 两个bean,是spring MVC为@Controllers分发请求所必须的，即解决了@Controller注解使用的前提配置。

### War包和jar包的区别

1. jar包就是别人已经写好的一些类，然后对这些类进行打包。可以将这些jar包引入到你的项目中，可以直接使用这些jar包中的类和属性，这些jar包一般放在lib目录下。
2. war包是JavaWeb程序打的包，war包里面包括写的代码编译成的class文件，依赖的包，配置文件，所有的网站页面，包括html，jsp等等。一个war包可以理解为是一个web项目，里面是项目的所有东西。
3. 什么时候使用WAR文件呢？在开发阶段不适合使用WAR文件，因为在开发阶段，经常需要添加或删除Web应用程序的内容，更新 Servlet类文件，而每一次改动后，重新建立WAR文件将是一件浪费时间的事情。在产品发布阶段，使用WAR文件是比较合适的，因为在这个时候，几乎不需要再做什么改动了。

### SpringMVC三种控制器

1. ParameterizableViewController(参数控制器)：只起到跳转页面的作用。
2. AbstractCommandController(命令控制器)：可以接受实体类型的controller。
3. FormController(表单控制器)：可以接受表单数据的controller。

注解说明：

1. @GetMapping相当于@RequestMapping(method = RequestMethod.GET)。
2. @PostMapping相当于@RequestMapping(method = RequestMethod.POST)。
3. @PutMapping相当于@RequestMapping(method = RequestMethod.PUT)。跟PostMapping的区别为偏向于PutMapping更新数据，PostMapping偏向于添加数据
4. @DeleteMapping相当于@RequestMapping(method = RequestMethod.DELETE)
5. @PatchMapping
   当我们要执行的方法只支持一种请求方式的时候，这五个annotation更加方便直观。但如果一个方法需要同时支持几种请求方式的时候，就需要使用@RequestMapping了。

> 详情传送门：https://blog.csdn.net/luckyzhoustar/article/details/46874793

### SpringMVC拦截器

1. 定义：Spring web MVC的处理器拦截器类似于Servlet开发中的过滤器Filter，用于对处理器 进行预处理和后处理。
2. 常见应用场景：

  2.1、日志记录 ：记录请求信息的日志
  2.2、权限检查，如登录检查
  2.3、性能检测：检测方法的执行时间

  ![图片](hexo_post_2.jpg "拦截器与Filter的区别")

### springMVC和servlet对比

1. servlet性能好springMVC开发效率高，是对servlet的封装。
2. 如同MyBatis和JDBC，一个性能好，一个开发效率高，是对另一个的封装。

### SpringMVC和struts2的区别

1. 加载机制不同：spring mvc的入口是servlet，而struts2是filter；
2. 性能：spring mvc 在性能上会稍微比struts2快。
3. 参数传递：strus2的类属性可与所有方法共享。SpringMVC方法之间基本上是独立的，方法之间不共享变量。
4. 框架集成：springMVC和spring是无缝连接，在项目的管理和安全上比struts2高。
5. 数据验证：springMVC验证支持JSR303(一种数据验证的规范)，处理起来比Struts2相对方便灵活。
6. Ajax交互：spring mvc处理ajax的请求十分方便，只需一个注解@ResponseBody ，然后直接返回响应文本即可；而Struts2拦截器集成了Ajax，在Action中处理时一般必须安装插件或者自己写代码集成进去，使用起来也相对不方便；
7. 拦截机制的实现：spring mvc用的是独立的AOP方式实现，而struts2有自己的interceptor机制，这样导致了struts2的配置文件量又比spring mvc大；
8. RESTful架构的实现：spring mvc是方法级别的拦截，一个方法对应一个request上下文，而方法同时又跟一个url对应，所以说从架构本身上spring mvc就容易实现restful url；
9. struts2是类级别的拦截，一个类对应一个request上下文，struts2 action的一个方法可以对应一个url；而其类属性却被所有方法共享，这也就无法用注解或其他方式标识其所属方法了，所以实现restful url比较费劲。
