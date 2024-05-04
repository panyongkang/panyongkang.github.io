title: Mybatis

cover: https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1281671216,487733849&fm=26&gp=0.jpg

tags:

  - Mybatis
categories:
  - MyBatis
author: PanXiaoKang
date: 2020-04-28 22:36:00
---
### JDBC

  1. Java.sql.DriverManager类：表示数据库驱动包的管理对象
  2. Java.sql.Connection接口：表示数据库的连接对象
  3. Java.sql.Statement接口：表示发送sql给数据库执行的对象
  4. Java.sql.PreparedStatment接口：java.sql.Statement的子接口，表示sql预编译对象
  5. Java.sql.ResultSet接口：表示从数据库查询返回的结果数据

#### Connection接口方法

1. createStatement();创建一个对象将SQL语句发送到数据库
2. preparStatement(String sql)方法：创建一个对象来将参数化的sql语句发送到数据库

#### Statement接口方法

1. execute(String sql):执行指定的SQL语句，该语句可能返回多个结果
2. executeUpdate(String sql):执行给定的sql语句，该语句可能是insert、delete、update语句，或者不返回任何语句（如SQL DDL语句）
3. executeQuery(String sql):执行给定的SQL语句，该语句返回单个ResultSet对象

#### PreparedStatement接口

1.	setObject(int parameterIndex,Object x):使用给定对象设置指定参数值
2.	executeQuery():执行SQL查询，并返回查询生成的ResultSet对象

#### ResultSet接口

1. next():将光标从当前位置向前移一行

#### 传统的JDBC开发步骤

1.	加载数据库驱动
2.	创建并获取数据库连接
3.	创建statement对象
4.	拼写sql语句
5.	设置sql语句中占位符的值
6.	执行sql语句并获取结果
7.	对sql执行结果进行解析处理
8.	释放资源

### MyBatis、Ibatis和Hibernate的关系

MyBatis是ibatis的升级版，最主要的是MyBatis简化了编码过程，不需要去写dao实现类，直接写一个dao接口，再写一个xml文件，就可以配置好连接数据库了。而ibatis则必须写dao实现类。  

mybatis与hibernate的对比：  

1.相同点：Hibernate与MyBatis都可以是通过SessionFactoryBuider由XML配置文件生成SessionFactory，然后由SessionFactory 生成Session，最后由Session来开启执行事务和SQL语句。  

2.不同点：  

2.1 MyBatis是半自动的，Hibernate是全自动的
2.2 hibernate数据库移植性远大于mybatis
2.3 hibernate拥有完整的日志系统，mybatis则欠缺一些
2.4 mybatis相比hibernate需要关心很多细节
2.5 sql直接优化上，mybatis要比hibernate方便很多
2.6 缓存机制上，hibernate要比mybatis更好一些

[详情传送门](https://blog.csdn.net/eff666/article/details/71332386)


一、因为JDBC实在不好用，于是出现了ORM（对象关系映射Object relational Mapping）对Jdbc进行封装。MyBatis是一个持久层ORM框架，底层是对JDBC的封装。

二、MyBatis对JDBC操作数据库做了一系列的优化：  

（1） mybatis使用已有的连接池管理，避免浪费资源，提高程序可靠性。  
（2） mybatis提供插件自动生成DAO层代码，提高编码效率和准确性。  
（3） mybatis 提供了一级和二级缓存，提高了程序性能。  
（4） mybatis使用动态SQL语句，提高了SQL维护。（此优势是基于XML配置）  
（5） mybatis对数据库操作结果进行自动映射。  

### 什么是MyBatis

[官网传送门](https://mybatis.org/mybatis-3/zh/index.html)

1. 定义：MyBatis 是一款优秀的持久层框架，它支持定制化 SQL、存储过程以及高级映射。MyBatis 避免了几乎所有的 JDBC 代码和手动设置参数以及获取结果集。MyBatis 可以使用简单的 XML 或注解来配置和映射原生类型、接口和 Java 的 POJO（Plain Old Java Objects，普通老式 Java 对象）为数据库中的记录。

2. 由于MyBatis是直接基于JDBC做了简单的映射包装，所以从性能来看： 

JDBC>Mybatis>Hibernate

3. #{ }和${ }两者占位符的区别：

#{ }：被解析为一个JDBC预编译语句（prepared statement）的参数占位符。使用它可以防止sql注入。
${ }：被解析为sql拼接符号，无法防止sql注入。

解释：所谓SQL注入式攻击，就是攻击者把SQL命令插入到Web表单的输入域或页面请求的查询字符串，欺骗服务器执行恶意的SQL命令。

### MyBatis框架结构图
![](hexo_post_1.png)

### Dao的开发

一、Mybatis有两种方法开发dao，即原生dao开发和Mapper接口开发。
1. 原生dao开发：是指程序员需要编写dao接口和dao实现类。
2. Mapper接口开发：Mapper接口开发方法指需要程序员编写Mapper接口（相当于Dao接口），由Mybatis框架根据Mapper接口定义创建接口的动态代理对象（相当于dao实现类），由代理对象执行数据库操作。

二、Mapper接口开发需要遵循以下规范

1. Mapper.xml文件中的namespace与mapper接口的类路径相同。
2. Mapper接口方法名和Mapper.xml中定义的每个mapper statement的id相同 
3. Mapper接口方法的输入参数类型和mapper.xml中定义的每个sql 的parameterType的类型相同
4. Mapper接口方法的输出参数类型和mapper.xml中定义的每个sql的resultType的类型相同

三、使用Mapper动态代理的好处

使用之前的session,selectOne(“test.findUserById”,1)，通过字符串调用标签定义的SQL，一是容易出错，而是XML中的id修改以后那么用了这个id的程序就都得改，这样比较麻烦
为了防止这些现象的出现，采用了Mapper方法。

### MyBatis配置详解

#### 配置内容和顺序（不能更改）

SqlMapConfig.xml是Mybatis的全局配置文件，其配置的内容和顺序如下：

1.	properties(属性)
2.	settings（全局配置参数）
3.	typeAliases(类型别名)
4.	typeHandlers(类型处理器)
5.	objectFactory(对象工厂)
6.	plugins(插件)
7.	environments(环境集合属性对象)
8.	  environment（环境子属性对象）
9.	    transactionManager(事务管理)
10.	    dataSource(数据源)
11.	mappers(映射器)

#### 配置详情简介

1. properties(属性)：可以加载数据库配置信息，通过外部配置来方便动态替换。
2. settings(全局配置): settings是mybatis的全局配置参数，它是 MyBatis 中极为重要的调整设置，它们会改变 MyBatis 的运行时行为。
参数详情参考：[传送门](https://blog.csdn.net/weixin_39805338/article/details/80893558)

3. typeAliases(类型别名): 类型别名是为 Java 类型设置一个短的名字。它只和 XML 配置有关，存在的意义仅在于用来减少类完全限定名的冗余。
	针对POJO类型需要自定义别名：
	1. 单个定义别名
	< typeAlias alias=”userInfoModel”type=”cn.itlaobing.mybatis.model.UserInfoModel” />
	2. 批量定义别名，扫描整个包下的类，别名为类名（首字母大小写都可以）
	< package name=”cn.itlaobing.mybatis.model” />

4. typeHandlers(类型处理器)：无论是 MyBatis 在预处理语句（PreparedStatement）中设置一个参数时，还是从结果集中取出一个值时， 都会用类型处理器将获取的值以合适的方式转换成 Java 类型。Mybatis提供的typeHandlers已经满足大部分开发需求，通常开发人员不需要自定义typeHandlers。

5. objectFactory（对象工厂）：MyBatis 每次创建结果对象的新实例时，它都会使用一个对象工厂（ObjectFactory）实例来完成。

6. plugins（插件）：MyBatis 允许你在已映射语句执行过程中的某一点进行拦截调用。

7. environments（配置环境）：MyBatis 可以配置成适应多种环境，这种机制有助于将 SQL 映射应用于多种数据库之中， 现实情况下有多种理由需要这么做。  
    例如，开发、测试和生产环境需要有不同的配置；或者共享相同 Schema 的多个生产数据库,想使用相同的 SQL 映射。  
    **MyBatis 可以配置成适应多种环境**，例如，开发、测试和生产环境需要有不同的配置；尽管可以配置多个环境，每个 SqlSessionFactory 实例只能选择其一。  
    虽然，这种方式也可以做到很方便的分离多个环境，但是**实际使用场景下，我们更多的是选择使用spring来管理数据源，来做到环境的分离。**

	详情链接 ：[传送门](https://blog.csdn.net/hellozpc/article/details/80878563)

8. transactionManager（事务管理器）：在 MyBatis 中有两种类型的事务管理器（也就是 type=”[JDBC|MANAGED]”）

9. dataSource（数据源）：dataSource 元素使用标准的 JDBC 数据源接口来配置 JDBC 连接对象的资源。

10. mappers（映射器）：mappers用于加载映射文件到全局配置文件中，Mybatis有四种加载配置文件的方法。分别是resource、url、class、package。其中resource方法一次加载一个映射文件，package方法可以实现批量加载，推荐使用。

### 输入映射parameterType

Myabtis输入映射就是将java对象映射为SQL语句中列的值。
输入映射形式包括：简单类型、POJO类型、VO类型、HashMap类型。

1.	简单类型：比如需求：根据id查询指定的用户
2.	POJO类型：比如需求：添加用户
3.	VO类型：它的作用是把某个指定页面的所有数据封装起来，一个VO对象中可以对应数据库中的多张表。PO是持久对象，PO类与表对应，PO类中的属性与表的列对应。比如需求：多条件查询用户。
4.	HashMap类型：比如需求：根据用户名和性别查询用户

### 输出映射resultType

注意：POJO（Plain Ordinary Java Object）即普通Java类，具有一部分getter/setter方法的那种类就可以称作POJO。
Mybatis的输出映射就是将查询的结果映射为java对象。resultType可以把查询结果封装到pojo类型中，但必须pojo类的属性名和查询到的数据库表的字段名一致。
1.	简单类型输出映射：需求：查询userInfo表的记录数量
2.	POJO对象输出映射：需求：根据id查询指定用户
3.	POJO集合输出映射：需求：查询所有用户
4.	HashMap类型输出映射：需求：查询所有用户
### 输出映射resultMap

如果出现字段和属性不一致，则需要手动配置映射方式，这时使用resultMap。比如列名是“user_id”,而属性名是“userId”。
注意：resultMap和resultType不能同时存在。另外还有resultMap 元素，它是 MyBatis 中最重要最强大的元素，它能提供级联查询，缓存等功能。  
标签和属性分析：
1. resultMap的id属性是它的唯一标识，是映射的POJO类
2. < id>标签映射主键，< result>标签映射非主键
3. property设置POJO的属性名称，column映射查询结果的列名称

### 动态SQL

定义：是指通过Mybatis提供的各种标签实现动态拼接SQL语句。
	1. where if:需求：多条件查询
	2. foreach:批量删除用户
	3. Sql片段：是指将重复的Sql提取出来，进行单独定义的节点。使用时用include引用Sql片段即可，最终达到Sql片段重用的目的。

### 关联查询与缓存

1. 表与表之间存在三种关系：分别是一对一、一对多、多对多。
2. 关联查询：指在查询某张表数据的同时也查询与该表关联表中的数据。
3. 缓存：指将已经查询出的对象缓存在内存中，再次查询该对象时从内存中直接获取，不再从数据库获取，从而提高程序的运行效率。
4. 一对一关联查询：给出需求：查询所有订单分别是哪些顾客订购的。
5. 有两种方法创建用于视图的VO类，一种是使用扩展列的VO类，另一种是使用扩展实体的POJO类。
6. 一对多关联查询：需求：查询订单及其订单明细和订单用户  
测试结果表明：一对多查询先于一对一查询执行打印出来。  
问题：为什么orderdetailModel不能改为orderdetailModels?其他却可以改？  
自己测试总结：private List<OrderdetailModel> orderdetailModel=null;代码中OrderdetailModel不能加s,否则编译错误，orderdetailModel也不行，否则找不到getting方法。
  
7. 多对多关联查询：需求：查询用户和用户购买的商品

8. 补充：级联的优点是获取关联数据十分方便，但是级联过多会增加数据库系统的复杂度，同时降低系统的性能。如果表 A 中有一个外键引用了表 B 的主键，A 表就是子表，B 表就是父表。当查询表 A 的数据时，通过表 A 的外键将表 B 的相关记录返回，这就是级联查询。例如，当查询一个人的信息时，同时根据外键（身份证号）将他的身份证信息返回。

### 关联查询总结

1.	resultType:  
作用：将查询结果按照sql列名和pojo属性名一致性映射到pojo中。  
场合：常见一些明细记录的展示，比如用户购买商品明细，将关联查询信息全部展示在页面时，此时可直接使用resultType将每一条记录映射到pojo中，在前端页面遍历list（list中是pojo）即可。  
2.	resultMap:  
    联合查询必须用resultMap，它可以使用association（联合）和 collection（集合）完成一对一和一对多高级映射。  
    2.1 association：  
    2.1.1作用：  
        实现一对一关联查询。将关联查询信息映射到一个pojo对象中。  
    2.1.2场合：  
        为了方便查询关联信息可以使用association将关联订单信息映射为用户对象的pojo属性中，比如：查询订单及关联用户信息。  
        使用resultType无法将查询结果映射到pojo对象的pojo属性中，根据对结果集查询遍历的需要选择使用resultType还是resultMap。

    2.2collection：

    2.2.1作用：
       实现一对多或多对多关联查询。将关联查询信息映射到一个list集合中。
    2.2.2场合：
       为了方便查询遍历关联信息可以使用collection将关联信息映射到list集合中。
    	比如：查询用户权限范围模块及模块下的菜单，可使用collection将模块映射到模块list中，将菜单列表映射到模块对象的菜单list属性中，这样的作的目的也是方便对查询结果集进行遍历查询。如果使用resultType无法将查询结果映射到list集合中。

3. 总结两者：
	resultMap可以实现延迟加载，resultType无法实现延迟加载。
	resultMap使用association和collection分别完成一对一和一对多高级映射（对结果有特殊的映射要求）。

### jdbc问题总结

1、数据库连接创建、释放频繁造成系统资源浪费，从而影响系统性能。如果使用数据库连接池可解决此问题。
2、Sql语句在代码中硬编码，造成代码不易维护，实际应用中sql变化的可能较大，sql变动需要改变java代码。
3、使用preparedStatement向占有位符号传参数存在硬编码，因为sql语句的where条件不一定，可能多也可能少，修改sql还要修改代码，系统不易维护。
4、对结果集解析存在硬编码（查询列名），sql变化导致解析代码变化，系统不易维护，如果能将数据库记录封装成pojo对象解析比较方便。

### Mybatis解决jdbc编程问题
1、数据库连接创建、释放频繁造成系统资源浪费从而影响系统性能，如果使用数据库连接池可解决此问题。
解决：在SqlMapConfig.xml中配置数据连接池，使用连接池管理数据库链接。
2、Sql语句写在代码中造成代码不易维护，实际应用sql变化的可能较大，sql变动需要改变java代码。
解决：将Sql语句配置在XXXXmapper.xml文件中与java代码分离。
3、向sql语句传参数麻烦，因为sql语句的where条件不一定，可能多也可能少，占位符需要和参数一一对应。
解决：Mybatis自动将java对象映射至sql语句，通过statement中的parameterType定义输入参数的类型。
4、对结果集解析麻烦，sql变化导致解析代码变化，且解析前需要遍历，如果能将数据库记录封装成pojo对象解析比较方便。
解决：Mybatis自动将sql执行结果映射至java对象，通过statement中的resultType定义输出结果的类型。  

### 懒加载

1.	懒加载定义：MyBatis中的延迟加载，也称为懒加载，是指在进行表的关联查询时，使用Mybatis的懒加载特性可有效的减少数据库的压力。例如在进行一对多查询的时候，只查询出一方，当程序中需要多方的数据时，mybatis再发出sql语句进行查询，这样子延迟加载就可以的减少数据库压力。
	Mybatis一对一关联的association和一对多的collection可以实现懒加载。懒加载时要使用resultMap，不能使用resultType。

2.	启动懒加载：
Mybatis默认没有打开懒加载配置，需要在SqlMapperConfig.xml中通过settings配置lazyLoadingEnabled、aggressiveLazyLoading来开启懒加载。

3.	懒加载总结：

    1. 作用：
    	1. 当需要查询关联信息时再去数据库查询，默认不去关联查询，提高数据库性能。
    	2. 只有使用resultMap支持懒加载设置。
    2. 使用场合：
    	1. 当只有部分记录需要关联查询其它表的记录时，此时可按需延迟加载，需要关联查询时再向数据库发出sql，以提高数据库性能。
    	2. 当全部需要关联查询信息时，此时不用懒加载，直接将关联查询信息全部返回即可，可使用resultType或resultMap完成映射。
      
    3. 配置方法:
    	1. Collection和association都需要配置select和column属性。
    	2. 两者配置方法相同。


### 缓存

#### 为什么使用缓存

1.作用：为了减去数据库的压力，提高数据库的性能。缓存是使用Map集合缓存数据的。

2.MyBatis 的缓存分为一级缓存和二级缓存。
1.	一级缓存是 SqlSession 级别的缓存
2.	二级缓存是 mapper 级别的缓存，多个 SqlSession 共享
3.	一级缓存的作用域是同一个SQLSession
4.	二级缓存的作用域是Mapper的同一个namespace
5.	Mybtais默认开启一级缓存，二级缓存需要在settings全局参数中配置开启。

#### 一级缓存

一级缓存是 SqlSession 级别的缓存，是基于 HashMap 的本地缓存。当同一个 SqlSession 执行两次相同的 sql 语句时，第一次执行完后会将数据库中查询的数据写到缓存，第二次查询时直接从缓存获取不用去数据库查询。不同的 SqlSession 之间的缓存数据区域互不影响。  
Mybatis内部存储缓存使用一个HashMap缓存数据，key为hashCode+sqlId+Sql语句。Value为从查询出来映射生成的java对象。  
当 SqlSession 执行 insert、update、delete 操作并commit提交到数据库后会清空缓存区域，保证缓存中的信息是最新的。防止后续查询发生脏读（脏读：查询到过期的数据）。

#### 二级缓存

二级缓存是 mapper 级别的缓存，同样是基于 HashMap 进行存储，多个 SqlSession 可以共用二级缓存，其作用域是 mapper 的同一个 namespace。不同的 SqlSession 两次执行相同的 namespace 下的 sql 语句，会执行相同的 sql，第二次查询只会查询第一次查询时读取数据库后写到缓存的数据，不会再去数据库查询。  
	Mybatis内部存储缓存使用一个HashMap缓存数据，key为hashCode+sqlId+Sql语句。Value为从查询出来映射生成的java对象。  
	当 SqlSession 执行 insert、update、delete 操作并commit提交到数据库后会清空缓存区域，保证缓存中的信息是最新的。防止后续查询发生脏读（脏读：查询到过期的数据）。

配置二级缓存：
第一步：在SqlMapperConfig.xml中启用二级缓存：
< setting name="cacheEnabled" value="true"/>
第二步：POJO序列化，将所有POJO类实现序列化接口。
第三步：在配置映射文件中添加<cache/>,表示此mapper开启二级缓存

#### 禁用二级缓存
useCache="false":表示禁用二级缓存，每次查询都会发出sql去查询，默认情况是true.
#### 刷新缓存（清空缓存）
在mapper的同一个namespace中，如果有其它insert、update、delete操作数据后需要刷新缓存，设置fulshCache=”true”属性即可刷新缓存，默认是true.

#### 缓存总结

对于访问多的查询请求且用户对查询结果实时性不高时采用二级缓存技术降低数据库访问量，提高访问速度。例如耗时较高的统计分析sql。通过设置flushnternal（时间间隔），让其每隔一段时间自动清空缓存，比如设置为60分钟，24小时等。
对于实时性要求较高的查询不能使用缓存，例如股票行情。


### 逆向工程

1. 定义：逆向工程是指根据数据库生成java代码，正向工程是指根据java代码生成数据库。
2. MyBatis一个主要的特点就是需要程序员自己编写SQL，那么如果表太多的话，难免会很麻烦，所以MyBatis官方提供了一个逆向工程，可以针对单表自动生成MyBatis执行所需要的代码（包括po类，mapper.xml映射文件和Mapper接口等）。一般在实际开发中，常用的逆向工程方式是通过数据库的表生成代码。