title: SpringBoot入门
author: Pyk
cover: https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2589588367,2632593097&fm=26&gp=0.jpg
tags: [微服务,SpringBoot]
categories: [架构与微服务]
date: 2021-04-24 09:58:00

---

## SpringBoot 项目标准目录结构

```
src/
└── main/
    ├── java/
    │   └── com/cake/store/          # 根包（示例：com.cake.store）
    │       ├── Application.java     # ⑦ 启动类（SpringBoot 入口）
    │       ├── config/              # ① 配置类（如 WebMvcConfig、Swagger 等）
    │       ├── controller/          # ② 控制层（提供 REST 接口）
    │       ├── service/             # ⑤ 服务层（业务逻辑）
    │       ├── mapper/              # ③ 持久层（MyBatis 接口）
    │       ├── pojo/                # ④ 实体类（与数据库表对应）
    │       ├── vo/                  # 视图对象（返回给前端的结构）
    │       ├── form/                # 表单对象（接收前端参数）
    │       └── utils/               # ⑥ 工具类（通用工具）
    └── resources/
        ├── mapper/                  # MyBatis 的 XML 映射文件（可选）
        ├── static/                  # ⑧ 静态资源（css/js/图片）
        ├── application.properties  # 核心配置文件（或 .yml）
        ├── application.yml          # 另一种格式的配置文件
        └── logback-spring.xml       # 日志配置文件
```

> **说明**：
>
> - `pojo` 也可叫 `entity`，`vo` 和 `form` 都是用于前端交互的数据载体。
> - `mapper` 包下放接口，`resources/mapper` 下放 XML 文件（如果使用 XML 方式）。

---

## 方法调用链 & 数据流转（三层架构）

整理标准调用顺序：

```
前端（浏览器/App）
    │
    │ 发送 HTTP 请求（JSON / 表单数据）
    ▼
Controller 层（控制层）  ← 提供接口，接收请求，参数校验，返回响应
    │
    │ 调用 Service 层方法（传入处理后的数据）
    ▼
Service 层（业务层）    ← 核心业务逻辑（事务、权限、缓存、计算）
    │
    │ 调用 Mapper 层方法（传入实体或条件）
    ▼
Mapper 层（持久层）     ← 与数据库交互（执行 SQL）
    │
    │ 读写数据库
    ▼
Database（数据库）
```

**数据返回路径**（逆向）：数据库 → Mapper（实体对象） → Service（业务处理后可能转为 VO/BO） → Controller（包装为 JSON） → 前端展示

> **关键点**：
>
> - **Controller 不写业务逻辑**，只做请求解析和响应封装。
> - **Service 不直接处理 HTTP 请求**，专注业务。
> - **Mapper 只做数据库操作**，不掺业务。

---

## 与 SSM 对比

| 对比维度                 | **SSM 传统方式**                                                                            | **SpringBoot 方式**                                                                         | 说明                                          |
| :----------------------- | :------------------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------ | :-------------------------------------------- |
| **核心分层思想**   | Controller → Service → Mapper                                                                   | **完全一致**                                                                                | 三层架构没有变，这是 Java Web 的基石          |
| **注解驱动**       | 使用 `@Controller`、`@Service`、`@Autowired` 等                                             | **相同**                                                                                    | 核心注解完全兼容                              |
| **SpringMVC 本质** | 需要手动配置 `DispatcherServlet`、视图解析器等                                                  | **仍然使用 SpringMVC**，但自动配置                                                          | SpringBoot 只是简化了配置，<br />没有替换 MVC |
| **依赖管理**       | 手动引入 Spring、SpringMVC、MyBatis<br />等多个包，需保证版本兼容                                 | **只需引入 `spring-boot-starter-web`、`mybatis-spring-boot-starter`**，版本由父工程管理 | 极大简化，避免版本冲突                        |
| **配置文件**       | 需要 `web.xml`、`applicationContext.xml`、<br />`spring-mvc.xml`、`mybatis-config.xml` 等 | **只需一个 `application.properties` 或 `application.yml`**                              | 绝大多数配置零配置或一行配置                  |
| **Web 容器部署**   | 打包成 `.war` 部署到外置 Tomcat / Jetty                                                         | **打包为 `.jar` 直接 `java -jar` 运行**（内置 Tomcat）                                  | 开发测试极其方便                              |
| **整合 MyBatis**   | 手动配置 SqlSessionFactory、<br />DataSource、事务管理器                                          | **自动配置**，只需在 `application.properties` 写数据库连接信息                            | 大幅减少样板代码                              |
| **日志系统**       | 手动配置 log4j / logback<br />（需写 xml 并手动加载）                                             | `logback-spring.xml` 自动生效，且支持多环境配置                                                 | 简化但依然灵活                                |
| **热部署**         | 需要额外插件或手动重启                                                                            | `spring-boot-devtools` 自动热重启                                                               | 开发体验提升                                  |
| **测试**           | 需要启动 Web 容器或 Mock 环境                                                                     | `@SpringBootTest` 一键启动上下文                                                                | 测试代码更简洁                                |

---

## 总结：SpringBoot 并没有颠覆，而是“驯服”了 SSM

> ✅ **一致的核心**：
>
> - 分层架构（Controller/Service/Mapper）
> - 注解驱动（`@Controller`、`@Service`、`@Autowired` 等）
> - SpringMVC 的本质（`@RequestMapping` 家族）
> - MyBatis 的使用方式（Mapper 接口 + XML）

> 🚀 **简化的地方**：
>
> - **配置**：从几十行 XML 变成几行 `application.properties`
> - **依赖**：从手动管理版本变成 starter 自动组合
> - **部署**：从 war 包 + 外置 Tomcat 变成 jar 包 + 内置服务器
> - **开发效率**：自动配置、热部署、测试支持大幅提升

**一句话记忆**：

> **SpringBoot = SSM 的优秀实践 + 自动配置 + 开箱即用**。
> 学会 SSM 的架构思想，就能无缝上手 SpringBoot；SpringBoot 让你专注于业务代码，而不是繁琐的配置。

## 常见注解

### 启动注解@SpringBootApplication

@SpringBootApplication是一个复合注解，包含了@SpringBootConfiguration，@EnableAutoCofiguration,@ComponentScan这三个注解。

1. **@SpringBootConfiguration**继承自@Configuration,二者功能一致，标注当前类是配置类，并会将当前类内声明的一个或多个以@Bean注解标记的方法的实例纳入到spring容器中，并且实例名就是方法名。
2. **@EnableAutoConfiguration注解**，开启自动配置功能

   @EnableAutoConfiguration可以帮助SpringBoot应用将所有符合条件的@Configuration配置都加载到当前SpringBoot创建并使用的IOC容器。借助于Spring框架原有的一个工具类：SpringFactoriesLoader的支持，@EnableAutoConfiguration可以智能的自动配置功效才得以大功告成
3. **@ComponentScan：** 主要用于组件扫描和自动装配。个人理解相当于< context:component-scan>，如果扫描到有@Component @Controller @Service等这些注解的类，则把这些类注册为bean。

## Controller层注解

### 类级别注解：声明"我是控制器"

#### @Controller vs @RestController

|        注解        | 含义                            | 返回内容                                                              | 适用场景                   |
| :-----------------: | ------------------------------- | --------------------------------------------------------------------- | -------------------------- |
|   `@Controller`   | 传统MVC控制器                   | 返回**视图名** （jsp/html），配合视图解析器跳转页面             | 老项目、需要返回页面的场景 |
| `@RestController` | RESTful控制器（Spring 4.0引入） | 返回**JSON/XML数据** ，等同于 `@Controller`+`@ResponseBody` | 前后端分离项目（当前主流） |

**一句话记忆：**

* 老项目（Spring MVC时代）用 `@Controller`，方法上加 `@ResponseBody`才能返回JSON
* 新项目（SpringBoot）直接用 `@RestController`，类里所有方法默认返回JSON

**老写法（SpringBoot 2及以前老项目常见）：**

```java
@Controller
public class UserController {
    @RequestMapping("/user/list")
    @ResponseBody   // 每个方法都要加，很啰嗦
    public List<User> list() { ... }
}
```

**新写法（SpringBoot 2/3 主流）：**

```java
@RestController
public class UserController {
    @GetMapping("/user/list")   // 类上已有@RestController，方法不用加@ResponseBody
    public List<User> list() { ... }
}
```

> **看源码时注意** ：如果看到 `@Controller` + 方法上有 `@ResponseBody`，说明是老写法或需要返回页面的混合写法。

---

### 路径映射注解：把URL绑定到方法

#### @RequestMapping（父注解，所有版本通用）

**核心关系：**

```
@RequestMapping(method = GET)     ≡  @GetMapping
@RequestMapping(method = POST)    ≡  @PostMapping
@RequestMapping(method = PUT)     ≡  @PutMapping
@RequestMapping(method = PATCH)   ≡  @PatchMapping
@RequestMapping(method = DELETE)  ≡  @DeleteMapping
```

**两种使用位置：**

| 位置             | 作用                                 | 示例                              |
| ---------------- | ------------------------------------ | --------------------------------- |
| **类上**   | 定义所有方法的**公共路径前缀** | `@RequestMapping("/api/users")` |
| **方法上** | 定义具体接口的路径（相对路径）       | `@RequestMapping("/list")`      |

**老写法（老项目大量存在）：**

```java
@RestController
@RequestMapping("/user")
public class UserController {

    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public List<User> list() { ... }

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public void add(@RequestBody User user) { ... }
}
```

**新写法（SpringBoot 2/3 推荐）：**

```java
@RestController
@RequestMapping("/api/users")   // 类级别：公共前缀，这个场景仍用@RequestMapping
public class UserController {

    @GetMapping("/list")              // 查询
    public List<User> list() { ... }

    @PostMapping                      // 新增（路径可省略，默认就是 /api/users）
    public void add(@RequestBody User user) { ... }

    @PutMapping("/{id}")              // 全量更新
    public void update(@PathVariable Long id, @RequestBody User user) { ... }

    @PatchMapping("/{id}/avatar")     // 局部更新（只改头像）
    public void updateAvatar(@PathVariable Long id, @RequestParam String url) { ... }

    @DeleteMapping("/{id}")           // 删除
    public void delete(@PathVariable Long id) { ... }
}
```

**选择建议：**

| 项目类型                   | 推荐写法                                                                            |
| -------------------------- | ----------------------------------------------------------------------------------- |
| 老项目维护（Spring + XML） | 跟着项目现有风格走，`@RequestMapping`打天下也没问题                               |
| 新项目（SpringBoot 2/3）   | 类上用 `@RequestMapping`定义前缀，方法上用 `@GetMapping/@PostMapping`等语义注解 |

---

### 参数接收注解：从请求中取值

#### @PathVariable — 取URL路径中的变量

```
请求：GET /users/123
注解：@GetMapping("/users/{id}")
取值：@PathVariable Long id  →  id = 123
```

#### @RequestParam — 取查询参数（?后面的键值对）

```
请求：GET /users?name=张三&page=1
注解：@GetMapping("/users")
取值：@RequestParam String name  →  name = "张三"
      @RequestParam(defaultValue = "1") int page  →  page = 1
```

**常用属性：**

| 属性               | 作用                                 | 示例                                  |
| ------------------ | ------------------------------------ | ------------------------------------- |
| `required`       | 是否必传，默认 `true`              | `@RequestParam(required = false)`   |
| `defaultValue`   | 未传时的默认值                       | `@RequestParam(defaultValue = "1")` |
| `name`/`value` | 指定参数名（参数名和变量名不一致时） | `@RequestParam("uid") Long id`      |

#### @RequestBody — 取请求体中的JSON，反序列化为Java对象

```
请求：POST /users，Body: {"name":"张三","age":25}
注解：@PostMapping("/users")
取值：@RequestBody UserDTO dto  →  dto.getName() = "张三"
```

> **注意** ：一个方法只能有 **一个** `@RequestBody`，因为请求体只能读一次。

#### @RequestHeader — 取请求头

```java
@GetMapping("/info")
public void info(@RequestHeader("Authorization") String token) { ... }
```

#### @CookieValue — 取Cookie值

```java
@GetMapping("/info")
public void info(@CookieValue("JSESSIONID") String sessionId) { ... }
```

#### 参数注解速查表

| 注解                | 数据来源                            | 典型场景                 |
| ------------------- | ----------------------------------- | ------------------------ |
| `@PathVariable`   | URL路径 `/users/{id}`             | 获取资源ID               |
| `@RequestParam`   | URL查询参数 `?name=xx`            | 分页、搜索条件、简单参数 |
| `@RequestBody`    | 请求体JSON                          | POST/PUT提交复杂对象     |
| `@RequestHeader`  | 请求头                              | Token、认证信息          |
| `@CookieValue`    | Cookie                              | 会话标识                 |
| `@ModelAttribute` | 表单参数/查询参数 → 自动绑定到对象 | 表单提交（老项目多见）   |

---

### 请求体处理注解

#### @RequestBody vs @ResponseBody

| 注解              | 方向                          | 作用                             |
| ----------------- | ----------------------------- | -------------------------------- |
| `@RequestBody`  | **入参** ：请求 → Java | 把请求体JSON反序列化为Java对象   |
| `@ResponseBody` | **出参** ：Java → 响应 | 把Java对象序列化为JSON写入响应体 |

 **老写法** ：方法上单独加 `@ResponseBody`

```java
@Controller
public class UserController {
    @RequestMapping("/user/list")
    @ResponseBody   // 每个方法都要加
    public List<User> list() { ... }
}
```

 **新写法** ：类上加 `@RestController`（内含 `@ResponseBody`），方法上不用再加

```java
@RestController   // 类级别统一处理
public class UserController {
    @GetMapping("/list")
    public List<User> list() { ... }   // 不需要@ResponseBody
}
```

---

### 跨域注解

#### @CrossOrigin

```java
@CrossOrigin                          // 允许所有来源
@CrossOrigin(origins = "http://localhost:8080")  // 只允许指定来源
@RestController
public class UserController { ... }
```

> 企业级项目通常在**全局配置类**中统一配置CORS，不会每个Controller都加 `@CrossOrigin`。

---

### 全局增强注解

#### @ControllerAdvice / @RestControllerAdvice

用于**全局**统一处理异常或预处理数据，作用于所有Controller。

| 注解                      | 作用                                                   | 适用场景                       |
| ------------------------- | ------------------------------------------------------ | ------------------------------ |
| `@ControllerAdvice`     | 全局增强（可配合 `@ResponseBody`返回JSON）           | 老写法                         |
| `@RestControllerAdvice` | =`@ControllerAdvice`+`@ResponseBody`，直接返回JSON | **SpringBoot 3推荐写法** |

```java
@RestControllerAdvice   // SpringBoot 3 推荐
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public Result<?> handleException(Exception e) {
        return Result.error(e.getMessage());
    }
}
```

> **版本差异** ：SpringBoot 2中常见 `@ControllerAdvice` + `@ResponseBody`的写法；SpringBoot 3中推荐直接用 `@RestControllerAdvice`。

---

### 方法级异常处理

#### @ExceptionHandler

```java
@RestController
public class UserController {

    // 只处理当前Controller中抛出的异常
    @ExceptionHandler(IllegalArgumentException.class)
    public Result<?> handleIllegalArg(IllegalArgumentException e) {
        return Result.error("参数错误：" + e.getMessage());
    }
}
```

> `@ExceptionHandler`定义在Controller内部 = 局部生效；定义在 `@RestControllerAdvice`类中 = 全局生效。

---

### SpringBoot 3 新增：@HttpExchange（声明式HTTP客户端）

这是Spring 6（SpringBoot 3）新增的注解， **不是用来接收请求的** ，而是用来**调用外部接口**的，替代OpenFeign。

```java
// 定义接口，声明要调用哪个外部服务
@HttpExchange("http://other-service/api")
public interface UserClient {

    @GetExchange("/users/{id}")
    User getUser(@PathVariable Long id);

    @PostExchange("/users")
    User createUser(@RequestBody User user);
}
```

| 老写法（SpringBoot 2）                      | 新写法（SpringBoot 3）             |
| ------------------------------------------- | ---------------------------------- |
| `@FeignClient`+`@GetMapping`            | `@HttpExchange`+`@GetExchange` |
| 需要引入 `spring-cloud-starter-openfeign` | Spring 6内置，无需额外依赖         |

> **看源码时** ：如果项目是SpringBoot 3，看到 `@HttpExchange`、`@GetExchange`、`@PostExchange`，就知道这是在调用外部HTTP接口，不是本服务的Controller。

---

### 版本差异速查对照表

| 注解/特性  | SpringBoot 2（老项目）                      | SpringBoot 3（新项目）                          |
| ---------- | ------------------------------------------- | ----------------------------------------------- |
| 类注解     | `@Controller`+ 方法加 `@ResponseBody`   | `@RestController`（主流）                     |
| 路径映射   | `@RequestMapping(method=GET)`             | `@GetMapping`（推荐）                         |
| 包名       | `javax.servlet.*`、`javax.validation.*` | `jakarta.servlet.*`、`jakarta.validation.*` |
| 全局异常   | `@ControllerAdvice`+`@ResponseBody`     | `@RestControllerAdvice`                       |
| 参数校验   | `javax.validation.Valid`                  | `jakarta.validation.Valid`                    |
| 接口文档   | Swagger 2（`@Api`、`@ApiOperation`）    | SpringDoc（`@Tag`、`@Operation`）           |
| HTTP客户端 | `@FeignClient`+`@GetMapping`            | `@HttpExchange`+`@GetExchange`              |
| JDK要求    | JDK 8+                                      | JDK 17+                                         |

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
8. **@Resource(name="name",type="type")：** 没有括号内内容的话，默认按名称。与@Autowired干类似的事。
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

### @Autowired 和 @Resource 的区别

> **两者都是注入依赖，作用一样：不用自己 new，Spring 帮你把对象塞进来。区别在于来源和默认注入策略。**

#### 对比表

| 对比项                 | `@Autowired`                           | `@Resource`                            |
| ---------------------- | ---------------------------------------- | ---------------------------------------- |
| 谁提供的               | Spring                                   | JDK                                      |
| 默认怎么找对象         | **按类型找**                       | **按名字找**                       |
| 一个接口只有一个实现类 | 直接注入，不用管                         | 直接注入，不用管                         |
| 一个接口有多个实现类   | 会报错，需要 `@Qualifier("名字")` 指定 | 直接写 `@Resource(name = "名字")` 指定 |
| 常用场景               | 一个实现类，用得最多                     | 多个实现类，指定名字时用                 |

#### 写法对比（4种）

```java
// 1. 一个接口只有一个实现类：直接用
@Autowired
private UserService userService;

// 2. 多个实现类：@Autowired + @Qualifier 指定名字
@Autowired
@Qualifier("userServiceImpl")
private UserService userService;

// 3. 多个实现类：@Resource 直接指定名字
@Resource(name = "userServiceImpl")
private UserService userService;

// 4. 一个接口只有一个实现类：@Resource 也能用
@Resource
private UserService userService;
```

#### 什么叫“按类型找”和“按名字找”？

- **按类型找（byType）**：你说你要 `UserService` 类型，Spring 就去容器里找“谁是 UserService 类型”，找到一个就塞给你。
- **按名字找（byName）**：你说你要 `userService`，Spring 就去容器里找“谁的名字叫 userService”，找到就塞给你。

#### 什么时候会出问题？

一个接口有多个实现类时：

```java
public interface UserService { ... }

@Service("userServiceImplA")
public class UserServiceImplA implements UserService { ... }

@Service("userServiceImplB")
public class UserServiceImplB implements UserService { ... }
```

用 `@Autowired` 会报错，因为 Spring 找到两个“UserService 类型”，不知道给你哪个。

**解决办法就是上面写法 2 和 3。**

#### 最终记忆

- **一个实现类** → `@Autowired` 够用
- **多个实现类** → 用 `@Resource(name = "xxx")` 或 `@Autowired + @Qualifier("xxx")` 指定
- 两者功能一样，企业里 `@Autowired` 更常见
- 不用记 byType / byName 这两个英文词，记“按类型找”和“按名字找”就够了

#### 面试回复

> "`@Autowired` 和 `@Resource` 都是注入依赖用的。`@Autowired` 是 Spring 的，默认按类型找；`@Resource` 是 JDK 的，默认按名字找。一个接口只有一个实现类时，用哪个都行；有多个实现类时，用 `@Resource(name = "xxx")` 或 `@Autowired + @Qualifier("xxx")` 指定具体实现。"

## 详细描述

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

## common层

放一些项目里到处都要用到的"公共工具"，比如统一返回格式、跨域设置、全局异常处理、工具类等。

企业里的 `common`包一般还会放这些东西：

| 类名                            | 用途                                         |
| ------------------------------- | -------------------------------------------- |
| `Result.java`                 | 统一返回格式（就像你截图的code、msg、data）  |
| `CorsConfig.java`             | 跨域配置，解决前端调接口被浏览器拦截的问题   |
| `GlobalExceptionHandler.java` | 全局异常处理，统一捕获报错返回格式           |
| `PageResult.java`             | 分页结果的统一封装                           |
| `BaseEntity.java`             | 实体类的公共字段（如createTime、updateTime） |
| `XXXUtils.java`               | 各种工具类（日期、加密、文件等）             |

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

### DAO层与分层概念

#### 1. PO / Entity

- **一句话**：数据库表长什么样，它就长什么样。
- **理解**：表和实体是一一对应的，表里有什么字段，这个类就有什么字段。它是系统的“内部数据形态”，不应该直接暴露给外部。

#### 2. DAO / Mapper

- **一句话**：专门负责和数据库打交道的人。
- **理解**：它负责执行 SQL、查询数据、更新数据。Service 层要查什么、改什么，就告诉 DAO 去做。

#### 3. DTO

- **一句话**：前端传什么，它就接什么。
- **理解**：前端传过来的参数，往往不是完整的数据库字段，可能只传了其中几个字段，DTO 就是用来接收这些参数的。它只关心“前端需要什么”。

#### 4. VO

- **一句话**：前端想看什么，它就返回什么。
- **理解**：返回给前端的数据，不一定和数据库表结构一致，可能经过组装、转换、隐藏敏感字段后再返回。VO 只关心“前端想看到什么”。

#### 5. 为什么需要分层？

- **一句话**：如果你不想以后改表名时连前端也要改，就提前分层。
- **理解**：分层的目的就是解耦。表结构变了，只改 PO；前端展示需求变了，只改 VO；中间的业务逻辑变了，只改 Service。互不干扰。

#### 6. MyBatis 的 #{} 和 ${}

- **一句话**：`#{}` 是安全的，`${}` 是不安全的。
- **理解**：`#{}` 用的是预编译，用户输入的内容只会被当作“数据”处理，不会被当成“SQL指令”执行，所以能防 SQL 注入。`${}` 是直接拼接，用户输入什么就拼什么，容易被注入攻击。

#### 7. JDBC拼接 vs MyBatis XML

- **一句话**：JDBC 是手工拼 SQL，MyBatis 是把 SQL 写在 XML 里统一管理。
- **理解**：JDBC 拼接像把 SQL 和 Java 代码揉在一起，修改时得翻 Java 文件；MyBatis 把 SQL 单独抽出来放到 XML 里，改 SQL 时不用动 Java 代码，更清晰，也更容易防注入。

#### 8. Service 层

- **一句话**：Service 层是“业务大脑”。
- **理解**：它不管数据怎么存、也不管前端怎么展示，它只负责处理业务逻辑。它告诉 DAO 去查什么数据，然后把数据组装好，返回给 Controller。

#### 9. Controller 层

- **一句话**：Controller 是“前台接待”。
- **理解**：它接收前端来的请求，叫 Service 去处理，然后把处理结果返回给前端。它不关心数据怎么查、也不关心业务逻辑怎么算，只负责收和转。

### 📋 一句话速查表

| 概念                                               | 一句话记住                                  |
| -------------------------------------------------- | ------------------------------------------- |
| **PO / Entity**                              | 数据库表长什么样，它就长什么样              |
| **DAO / Mapper**                             | 专门负责和数据库打交道的人                  |
| **DTO**                                      | 前端传什么，它就接什么                      |
| **VO**                                       | 前端想看什么，它就返回什么                  |
| **为什么分层**                               | 不想改表名时连前端也要改，就提前分层        |
| **#{} vs${}** | `#{}` 是安全的，`${}` 是不安全的 |                                             |
| **JDBC拼接 vs MyBatis XML**                  | JDBC 手工拼 SQL，MyBatis 把 SQL 写在 XML 里 |
| **Service 层**                               | 业务大脑，只负责处理逻辑                    |
| **Controller 层**                            | 前台接待，只负责收和转                      |

这份笔记不涉及任何代码，全是“一句话就能记住”的理解方式。你可以在 Spring Boot 学习笔记里单独开一节“分层概念速记”，以后翻到就能立刻回忆起这些概念之间的关系，不用再重新翻代码。
