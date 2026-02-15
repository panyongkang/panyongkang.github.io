title: SpringBoot入门
author: PanXiaoKang
cover: https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2589588367,2632593097&fm=26&gp=0.jpg
tags: [微服务框架,SpringBoot]
categories: [架构与微服务]
date: 2021-04-24 09:58:00

---

## 常用注解总结

### 启动注解@SpringBootApplication

@SpringBootApplication是一个复合注解，包含了@SpringBootConfiguration，@EnableAutoCofiguration,@ComponentScan这三个注解。

1. **@SpringBootConfiguration**继承自@Configuration,二者功能一致，标注当前类是配置类，并会将当前类内声明的一个或多个以@Bean注解标记的方法的实例纳入到spring容器中，并且实例名就是方法名。
2. **@EnableAutoConfiguration注解**，开启自动配置功能

   @EnableAutoConfiguration可以帮助SpringBoot应用将所有符合条件的@Configuration配置都加载到当前SpringBoot创建并使用的IOC容器。借助于Spring框架原有的一个工具类：SpringFactoriesLoader的支持，@EnableAutoConfiguration可以智能的自动配置功效才得以大功告成
3. **@ComponentScan：** 主要用于组件扫描和自动装配。个人理解相当于< context:component-scan>，如果扫描到有@Component @Controller @Service等这些注解的类，则把这些类注册为bean。

## Controller 相关注解

1. @Controller：标注控制器类，处理http请求；控制器中的方法可以返回一个视图，在Web开发中一般使用的少（主要是用@RestController）。
2. @RestController:复合注解，相当于@ResponseBody ＋ @Controller合在一起的作用。使用的效果是将方法返回的对象直接在浏览器上展示成json格式.
3. @RequestBody:通过HttpMessageConverter读取Request Body并反序列化为Object（泛指）对象；将json解析为java对象。

   使用场景：json传参
4. @RequestMapping:最常用的注解之一，这个注解会将 HTTP 请求的URL映射到处理方法上；在实际开发中，在具体的控制器类之前添加该注解即可。

   **详细描述**

   **@RequestMapping** 该注解可以加在方法上，也可以加在类上；如下面例子，加在类上，表示该类所有的方法都加前缀 /user 下面两种方法都是映射到 /user/list

   方法一：

   ```
   @RestController
   public class UserController {
       @Autowired
       private UserService userService;
       @RequestMapping(value = "/user/list",method = RequestMethod.GET)
       //相当于 @GetMapping("/user/list")
       public List<User> userList() {
           return userService.listUsers();
       }
   }
   ```

   方法二：

   ```
   @RestController
   @RequestMapping("/user")
   public class UserController {
       @Autowired
       private UserService userService;
       @RequestMapping(value = "/list",method = RequestMethod.GET)
       //相当于 @GetMapping("/list")
       public List<User> userList() {
           return userService.listUsers();
       }
   }
   ```
5. @GetMapping：响应GET请求。用于将HTTP get请求映射到特定处理程序的方法注解
6. @PostMapping：响应POST请求。用于将HTTP post请求映射到特定处理程序的方法注解

   一般来说，POST方法的传参不受限制，可以使用URL传参，也可以使用@RequestBody获取请求体中的json，并解析为响应的java对象。

   POST方法和GET方法可以共用一个URL，不用担心起冲突。@PutMapping、@DeleteMapping使用方式大同小异，其实从功能上来说，**@PostMapping能替代所有的请求**，但是这么使用会导致代码**语义混乱**。

**简单说明一下各种请求方法的使用场景：**

| 方法   | 场景     |
| :----- | :------- |
| GET    | 获取资源 |
| POST   | 新增资源 |
| PUT    | 更新资源 |
| DELETE | 删除资源 |

### @Controller和@RestController的区别

知识点：@RestController注解相当于@ResponseBody ＋ @Controller合在一起的作用。

1) 如果只是使用@RestController注解Controller，则Controller中的方法无法返回jsp页面，或者html，配置的视图解析器 InternalResourceViewResolver不起作用，返回的内容就是Return 里的内容。
2) 如果需要返回到指定页面，则需要用 @Controller配合视图解析器InternalResourceViewResolver才行。如果需要返回JSON，XML或自定义mediaType内容到页面，则需要在对应的方法上加上@ResponseBody注解。

例如：

1. 使用@Controller 注解，在对应的方法上，视图解析器可以解析return 的jsp,html页面，并且跳转到相应页面

若返回json等内容到页面，则需要加@ResponseBody注解

```
@CrossOrigin
@Controller
public class FileUploadController {

//跳转到上传文件的页面
@RequestMapping(value="/gouploadimg", method = RequestMethod.GET)
public String goUploadImg() {
	//跳转到 templates 目录下的 uploadimg.html
	return "uploadimg";
}

//处理文件上传
@RequestMapping(value="/testuploadimg", method = RequestMethod.POST)
public @ResponseBody String uploadImg(@RequestParam("file") MultipartFile file,
	HttpServletRequest request) {
	System.out.println("调用文件上传方法");
	String contentType = file.getContentType();
	String fileName = file.getOriginalFilename();
```

1. @RestController注解，Spring 4.0引入了 `@RestController`，相当于@Controller+@ResponseBody两个注解的结合，它会告诉Spring 将返回类型序列化为合适的格式，默认情况下为JSON 格式。返回json数据不需要在方法前面加@ResponseBody注解了，但使用@RestController这个注解，就不能返回jsp,html页面，视图解析器无法解析jsp,html页面

```
@CrossOrigin
@RestController /* @Controller + @ResponseBody*/
public class HospitalController {
//注入Service服务对象
@Autowired
private HospitalService hospitalService;

/**
 * 查询所有医院信息（未分页）
 */

@RequestMapping(value = "findAllHospital",method = RequestMethod.GET)
public  List<Hospital> findAllHospital(){
    List<Hospital> hospitalList= hospitalService.findAllHospital();
    return hospitalList;
}
```

**总结：**

共同点：都用来表示Spring某个类是否可以接收HTTP请求

异同点：**@RestController无法返回指定页面（jsp或html），而@Controller可以**；前者可以直接返回json数据，后者需要@ResponseBody辅助。

**① 是否可以返回页面**

　　答：@RestController无法返回指定页面，而@Controller可以。
　　解析：对于Controller， 如果只是使用@RestController注解，则其方法无法返回指定页面，此时配置的视图解析器 InternalResourceViewResolver不起作用，返回的内容就是 return 里的内容。 如果需要返回到指定页面，则需要用 @Controller配合视图解析器InternalResourceViewResolver才行。
**② 返回内容**
　　如果需要返回**JSON，XML或自定义mediaType内容**到页面，@RestController自己就可以搞定,这个注解对于返回数据比较方便，因为它会自动将对象实体转换为JSON格式。而@Controller需要在对应的方法加上@ResponseBody注解。

**@ResponseBody和@RequestBody区别**

1. @RequestBody是将Json格式的数据转换成Java对象
2. @ResponseBody：将Java对象转成json格式的数据

## 取请求参数值

1. @PathVariable:获取url中的变量值的（注意是URL上的，不是参数）

请求示例：http://localhost:8080/User/getUser/123

应用场景：分页查询时获取url路径的页码

代码如下：

```java
@Controller
@RequestMapping("/User")
public class HelloWorldController {

    @RequestMapping("/getUser/{uid}")
    public String getUser(@PathVariable("uid")Integer id, Model model) {
        System.out.println("id:"+id);
        return "user";
    }
}
```

2. @RequestParam:获取请求参数的值，默认是必须传参，也可设置为非必要：required=false;未传参的默认值：defaultValue = " "

请求示例：http://localhost:8080/User/getUser?uid=123

代码如下：

```java
@Controller
@RequestMapping("/User")
public class HelloWorldController {

    @RequestMapping("/getUser")
    public String getUser(@RequestParam("uid")Integer id, Model model) {
        System.out.println("id:"+id);
        return "user";
    }
}
```

3. @RequestHeader：把Request请求header部分的值绑定到方法的参数上
4. @CookieValue：把Request header中关于cookie的值绑定到方法的参数上

## 注入bean相关

1. @Repository

   DAO层注解，DAO层中接口继承JpaRepository,需要在build.gradle中引入相关jpa的一个jar自动加载。
2. @Service：用于标注业务层组件。

   * @Service是@Component注解的一个特例，作用在类上
   * @Service注解作用域默认为单例
   * 使用注解配置和类路径扫描时，被@Service注解标注的类会被Spring扫描并注册为Bean
   * @Service用于标注服务层组件,表示定义一个bean

   - @Service使用时没有传参数，Bean名称默认为当前类的类名，首字母小写
   - @Service](“serviceBeanId”)或@Service(value=”serviceBeanId”)使用时传参数，使用value作为Bean名字
3. @Scope作用域注解

   @Scope作用在类上和方法上，用来配置 spring bean 的作用域，它标识 bean 的作用域
4. @Entity实体类注解

   * @Table(name =”数据库表名”)，这个注解也注释在实体类上，对应数据库中相应的
   * @Id、@Column注解用于标注实体类中的字段，pk字段标注为@Id，其余@Column。
5. @Bean：相当于XML中的< bean>< /bean>

   @Bean明确地指示了一种方法，放在方法的上面，而不是类，产生一个bean的方法，并且交给Spring容器管理。支持别名@Bean(“xx-name”)
6. **@AutoWired:** byType方式。可以实现Bean的自动注入，完成属性、方法的组装，它可以对类成员变量、方法及构造函数进行标注，完成自动装配的工作。 当加上（required=false）时，就算找不到bean也不报错。
7. **@Qualifier：** 当有多个同一类型的Bean时，可以用@Qualifier("name")来指定。与@Autowired配合使用
8. **@Resource(name="name",type="type")：** 没有括号内内容的话，默认byName。与@Autowired干类似的事。
9. **@Component：** 泛指组件，当组件不好归类的时候，我们可以使用这个注解进行标注。

   * 把普通pojo实例化到spring容器中，虽然有了@Autowired,但是我们还是要写一堆bean的配置文件,相当麻烦,而@Component就是告诉spring,我是pojo类,把我注册到容器中吧,spring会自动提取相关信息。那么我们就不用写麻烦的xml配置文件了.

   **例如：**

   @Component用于注解通用性强的工具类（会被多方调用）。

   1. 既被控制器调用，又被服务实现类调用的类
   2. 被多个控制器/服务实现类调用的类
10. **@ComponentScan：** 组件扫描。个人理解相当于< context:component-scan>，如果扫描到有@Component @Controller @Service等这些注解的类，则把这些类注册为bean。
11. **@Value**

    @Value用来从配置文件(.properties/.yaml/.yml)中取参数。

    例如：

    ```
    # application.properties
    local.name = crx
    ```

    ```
    @Value("${local.name}")
    private String author;
    ```

    一般只有一些账户密码数据需要使用该功能。

### @Autowired和@Resources注解区别

一、@Autowired和@Resource都可以用来装配bean，都可以写在字段上，或者方法上。

二、@Autowired属于Spring的；@Resource属于J2EE的。

三、@Autowired默认按类型装配，默认情况下要求依赖对象必须存在，如果要允许null值，可以设置它的required属性为false。

**总结：**

当一个接口只有一个实现类，推荐使用@Autowired，默认byType注入，不一定 真的byType，可以修改为byName，@Resource同理；

当一个接口有多个实现类，推荐使用@Resource，默认byName注入；

**byName和byType有什么区别**

1. byName 通过**参数名**自动装配,如果一个bean的name 和另外一个bean的 property 相同,就自动装配.
2. byType 通过**参数的数据类型**自动自动装配,如果一个bean的数据类型和另外一个bean的property属性的数据类型兼容,就自动装配

## 详细描述

 **@AutoWired 和 @Resource** 这两个注解都是注入依赖的作用 比如在 UserController 里注入 UserService，在 UserService 注入 UserDao 通常用法如下 UserServiceImpl 类

```
@Service
//相当于 @Service(value = "userServiceImpl")
public class UserServiceImpl implements UserService{
    @Override
    public String sayHi() {
        return "Hi!";
    }
}
```

利用@Service注解自动将类 UserServiceImpl 注解为bean，id为 userServiceImpl，即类 UserServiceImpl 第一个字母小写的id。  @Authwired 使用

```
//方法一、寻找可以扫描到的实现了 UserService 接口的类
@Autowired
private UserService userService;
//方法二、如果有多个类实现了 UserService，需要指定时哪个实现类
@Autowired
@Qualifier("userServiceImpl")
private UserService userService;
```

 @Resource 使用

```
//方法三、寻找可以扫描到的实现了 UserService 接口的类
@Resource
private UserService userService;
//方法四、如果有多个类实现了 UserService，需要指定时哪个实现类
@Resource(name = "userServiceImpl")
private UserService userService;
```

**@Component、@Repository、@Service、@Controller** 为了控制反转（将创建对象的控制权交给Spring容器），而不需要去 new，而且创建的对象还是单例的，一举多得。 这几个注解作用是通用的，几乎一样，通常我们根据它的含义来写

| 注解        | 含义                                                                             |
| :---------- | :------------------------------------------------------------------------------- |
| @Component  | 泛指组件，当组件不属于以下三层的，或不好归类的时候，我们可以使用这个注解进行标注 |
| @Repository | 作用于持久层                                                                     |
| @Service    | 作用于业务逻辑层                                                                 |
| @Controller | 作用于控制层（spring-mvc的注解）                                                 |

注意：这些注解都是写在类上面的，不可以写在接口上，默认是创建类名首字母小写的 Bean

## 功能注解

1. @Async与@EnableAsync

   其中@Async表示这个方法为异步方法；@EnableAsync这个注解需要加在启动类上，表示支持异步操作；如果不加，则@Async将不起作用。
2. @Scheduled与@EnableScheduling

   定时任务。@EnableScheduling这个注解需要加在启动类上，表示支持定时任务
3. **@CrossOrigin**

   跨域注解，从后端解决跨域问题。

```
/**
 * 主要解决跨域问题，用的时候复制粘贴即可，不用记
 */
@Configuration
public class CrosConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("*")
                .allowedMethods("GET", "HEAD", "POST", "PUT", "DELETE", "OPTIONS")
                .allowCredentials(true)
                .maxAge(3600)
                .allowedHeaders("*");
    }
}
```

**跨域的详细例子：**

| 当前页面url               | 被请求页面url                   | 是否跨域 | 原因                           |
| :------------------------ | :------------------------------ | :------- | :----------------------------- |
| http://www.test.com/      | http://www.test.com/index.html  | 否       | 同源（协议、域名、端口号相同） |
| http://www.test.com/      | https://www.test.com/index.html | 跨域     | 协议不同（http/https）         |
| http://www.test.com/      | http://www.baidu.com/           | 跨域     | 主域名不同（test/baidu）       |
| http://www.test.com/      | http://blog.test.com/           | 跨域     | 子域名不同（www/blog）         |
| http://www.test.com:8080/ | http://www.test.com:7001/       | 跨域     | 端口号不同（8080/7001）        |

## entity层

1. 通过@Entity将实体类和数据库的表book进行映射绑定;
2. 通过@Data是lombok的注解，自动生成getter/setter/toString/equals/hashCode方法;
3. 通过@Id是给属性加主键绑定;
4. 通过 @GeneratedValue给数据库自增的id属性进行映射，否则报错

   @GeneratedValue指定主键的生成策略。有如下四个值

   TABLE：使用表保存id值

   IDENTITY：identitycolumn

   SEQUENCR ：sequence

   AUTO：根据数据库的不同使用上面三个
