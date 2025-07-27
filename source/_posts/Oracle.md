title: Oracle
author: PanYuKang
tags: [Oracle,PLSQL,SQL语句]

categories: [数据库]

date: 2020-06-02 11:14:00

---

## Oracle安装

[下载链接](https://pan.baidu.com/s/1ZP8hm1so44DllaZj3sdndg)
提取码：ac8c

[安装参考](https://blog.csdn.net/Feng_xiaoqi/article/details/88780749)

### 口令管理

数据库创建完毕后，在默认的用户中，SYS和SYSTEM用户没有锁定，安装成功后可以直接使用，SCOTT用户默认是锁定的，需要把SCOTT用户解锁才能正常使用。

## SQL*Plus命令行工具

### 描述

该命令行工具，提供了与数据库交互的能力和维护数据库的能力，包括了Oracle自带的SQL*Plus工具的全部功能，在Oracle管理中经常使用。

* 启动该工具：在命令输入 sqlplus/nolog
* 与Oracle服务器连接：conn 用户名/密码 as 连接身份@服务器连接字符串
  例如：conn scott/scott@localhost:1521/orcl

[详情参考](https://blog.csdn.net/czh500/article/details/90449467)

### Oracle连接身份

1. "sysdba" 即数据库管理员,权限有:打开数据库服务器;关闭数据库服务器;备份数据库;恢复数据库;日志归档;会话限制;管理功能;创建数据库;
2. "sysyoper"即数据库操作员,权限包括:打开数据库服务器;关闭数据库服务器;备份数据库;恢复数据库;日志归档;会话限制;
3. "normal"即普通用户,权限只有查询某些数据表的数据;
4. SYS和SYSTEM 是每个ORACLE 数据库系统缺省安装的两个帐户。

   * SYS 是所有内部数据库表、结构、过程包、等拥有者，此外它还拥有 V$ 和数据字典视图，并创建所有封装的数据库角色(DBA，CONNECT，RESOURCE)。Sys是一个唯一能访问特定内部数据字典的用户。
   * System 也是在安装ORACLE 时创建的用户，用于 DBA 任务的管理。

### 使用出错记录

1. ORA-12560TNS:协议适配器错误
   原因：服务没开处理办法：需启动OracleOraDb11g_home1TNSlistener和启动OracleServiceORCL两个服务。
2. ORA-01017: invalid username/password; logon denied
   原因：密码输入不正确
   用户名:system   密码:manager
   用户名:sys     密码:change_on_install

处理办法：密码口令输入方式 ：密码 as sysdba

## Oracle用户和权限

创建用户语法：create user 用户名 identified by 口令 account lock|unlock;

例如：创建一个用户tom,密码是tompassword(密码不能使用数字开头，因为oracle需要转成大写），默认非锁定。

语句为：create user tom identified by tompassword account unlock;

创建好用户，还需要把权限和角色授予用户，一般情况下，一个普通用户scott，拥有connect和resource两个角色即可进行常规的数据库开发工作。系统权限只能由DBA用户授权，对象授权由拥有该对象的用户授权。

授权语法：grant 角色|权限 to 用户（角色）
例如：给tom用户授权connect和resource
语句：
grant connect to tom;
grant resource to tom;

回收权限语法：revoke 角色|权限 from 用户（角色）

修改用户的密码语法：alter user 用户名 identified by 新密码

修改用户处于锁定（非锁定）状态：alter user 用户名 account lock|unlock;

## 数据操作与查询

### SQL命令组成

1. 数据定义语言（DDL）：包括create（创建）、alter(修改）和drop命令等
2. 数据操纵语言（DML）:包括insert(插入）、updata(更新）、delete（删除）和select... for updata（查询）等。
3. 事务控制语言（TCL）:包括commit（提交）命令、savepoint（保存点）命令、rollback（回滚）命令。
4. 数据查询语言（DQL）:包括基本查询语句、Order By 子句、Group By 子句等。
5. 数据控制语言（DCL），grant（授权）命令、revoke（撤销）命令。

### 数据定义语言（DDL）

数据库操作：

```
-- 日期类型
--DATE 存储日期和时间
--TIMESTAMP 存储日期的年月日，时分秒，以及秒后6 位，同时包含时区。
--sysdate内置函数可以获取当前的系统日期和时间，返回DATE类型
--用systimestamp函数可以返回当前日期、时间和时区。

--查询系统当前日期
SELECT SYSDATE,SYSTIMESTAMP FROM DUAL

--创建表和约束
--Oracle 创建表使用CREATE TABLE 命令。
--创建约束使用命令：ALTER TABLE 表名 ADD CONSTRAINT 约束名 约束内容。

--删除表数据和结构
drop table infos;

--创建infos表和约束
CREATE TABLE INFOS
(
STUID VARCHAR2(7) NOT NULL, --学号 学号=‘S’+班号+2位序号
STUNAME VARCHAR2(10) NOT NULL, --姓名
GENDER VARCHAR2(4) NOT NULL, --性别
AGE NUMBER(2) NOT NULL, --年龄
SEAT NUMBER(2) NOT NULL, --座号
ENROLLDATE DATE, --入学时间
STUADDRESS VARCHAR2(50) DEFAULT '地址不详', --住址
CLASSNO VARCHAR2(4) NOT NULL --班号 班号=学期序号+班级序号
)

--添加主键约束
alter table infos add constraint pk_infos primary key(stuid)

--检查性别是男或女
ALTER TABLE INFOS ADD CONSTRAINT CK_INFOS_GENDER
CHECK(GENDER = '男' OR GENDER = '女')

--检查座号要大于等于0，且小于等于50
ALTER TABLE INFOS ADD CONSTRAINT CK_INFOS_SEAT
CHECK(SEAT >=0 AND SEAT <=50)

--检查年龄在0~100之间
ALTER TABLE INFOS ADD CONSTRAINT CK_INFOS_AGE
CHECK(AGE >=0 AND AGE<=100)

--检查班号在1001~1999或在2001~2999之间
ALTER TABLE INFOS ADD CONSTRAINT CK_INFOS_CLASSNO
CHECK((CLASSNO >='1001' AND CLASSNO<='1999') OR
(CLASSNO >='2001' AND CLASSNO<='2999'))

--为姓名指定唯一约束UNIQUE
ALTER TABLE INFOS ADD CONSTRAINTS UN_STUNAME UNIQUE(STUNAME)

```

### 数据操纵语言（DML）

插入数据的语法为：

INSERT INTO 表名(列名1，列名2……) VALUES (值1，值2……)

查询数据的语法是：

SELECT * |列名|表达式 FROM 表名 WHERE 条件 ORDER BY 列名

更新数据的语法是：

UPDATE 表名 SET 列名1=值，列名2=值…… WHERE 条件

删除数据的语法是：

DELETE FROM 表名 WHERE 条件

删除表中所有数据语法：

TRUNCATE TABLE 表名

truncate 和delete都能把表中的数据全部删除，他们的区别是：

1. truncate是DDL命令,删除的数据不能恢复；DELETE 命令是DML 命令，删除后的数据可以通过日志文件恢复。
2. 如果一个表中数据记录很多，truncate相对delete速度快。

由于truncate命令比较危险，因此在实际开发中，truncate命令慎用。

一般而言，drop > truncate > delete

1. truncate只能对table,delete可以是table和view
2. truncate 和delete只删除数据,drop则删除整个表（结构和数据）。

数据库操作：

```
--插入语句
insert into infos(STUID,STUNAME,GENDER,AGE,SEAT,ENROLLDATE,STUADDRESS,CLASSNO) values('1005','李4','男',12,25,TO_DATE('2009-8-9 06:30:10',' YYYY-MM-DD HH24:MI:SS ') ,default ,'1995')

--简单查询
--ordery by 默认是升序asc,降序为desc
select stuname,gender,age,stuaddress from infos where gender='男' order by age;

--更新数据
update infos set gender='女',age='18' where stuname='李2'
update infos set age='27',STUADDRESS='贵州贵阳',gender='男',CLASSNO='1278' where stuname='李1'

--删除数据
delete from infos where STUNAME='李白'

-- 一次性删除表数据，保留表结构
truncate table infos

-完全删除表数据和结构
drop table infos
```

### 高级查询

```
--消除重复行查询
SELECT DISTINCT DEPTNO FROM EMP;

--NULL值查询
--NULL 值用 IS NULL 作条件，非 NULL 值用IS NOT NULL 做条件
SELECT ENAME,JOB,SAL,COMM FROM EMP WHERE SAL<2000 AND COMM IS NOT NULL;

--IN和OR操作，下面查询结果是一样的
SELECT ENAME,JOB,SAL FROM EMP Where job= 'SALESMAN' or job= 'PRESIDENT' or job= 'ANALYST'

--还可以使用not in 条件
SELECT ENAME,JOB,SAL FROM EMP Where job in ('SALESMAN', 'PRESIDENT', 'ANALYST')

--between..and..
SELECT ENAME,JOB,SAL FROM EMP WHERE SAL BETWEEN 1000 AND 2000;

--LIKE 模糊查询
-- %：表示零个或者多个任意字符。
-- _：代表一个任意字符。

--显示员工名称以J 开头以S 结尾的员工的姓名、工作和工资。
SELECT ENAME,JOB,SAL FROM EMP WHERE ENAME LIKE 'J%S';

--内连接一般写法
SELECT e.ENAME,e.JOB,e.SAL,d.DNAME
FROM EMP e,DEPT d
WHERE e.DEPTNO=d.DEPTNO
AND e.SAL>2000

--内连接inner join on,INNER 可以省略。
SELECT e.ENAME,e.JOB,e.SAL,d.DNAME
FROM EMP e INNER JOIN DEPT d ON e.DEPTNO=d.DEPTNO
WHERE e.SAL>2000

--右外连接right outer join on,OUTER 可以省略
SELECT e.ENAME,e.JOB,e.SAL,d.DNAME
FROM EMP e RIGHT OUTER JOIN DEPT d ON e.DEPTNO=d.DEPTNO

-- 子查询操作
-- 子查询的类型有：
-- 1. 单行子查询：不向外部返回结果，或者只返回一行结果。
-- 2. 多行子查询：向外部返回零行、一行或者多行结果。

-- 查询出销售部（SALES）下面的员工姓名，工作，工资。
SELECT ENAME,JOB,SAL FROM EMP
WHERE DEPTNO=(SELECT DEPTNO FROM DEPT WHERE DNAME='SALES')

-- <any:比子查询结果中任意的值都小，也就是说，比子查询结果中最大值还小，那么同
-- 理>any 表示比子查询结果中最小的还大。

-- 查询出Emp表中比任意一个销售员(“SALESMAN”)工资低的员工姓名、工作、工资。
SELECT ENAME,JOB,SAL FROM EMP
WHERE SAL<ANY (SELECT SAL FROM EMP WHERE JOB='SALESMAN')

-- 查询出比所有销售员的工资都高的员工姓名，工作，工资。
SELECT ENAME,JOB,SAL FROM EMP
WHERE SAL>ALL (SELECT SAL FROM EMP WHERE JOB='SALESMAN')

-- 聚合查询
-- 查询出工资最高、最低、平均工资、总工资、员工人数
SELECT max(sal),min(sal),avg(sal),sum(sal),count(sal) from emp

```

### Oracle中的伪列

伪列就像表中的列一样，但是在表中并不存储。伪列只能查询，不能进行增删改操作。

伪列ROWID和ROWNUM区别：

ROWNUM 与ROWID 不同，ROWID 是插入记录时生成，ROWNUM 是查询数据
时生成。ROWID 标识的是行的物理地址。ROWNUM 标识的是查询结果中的行
的次序。

```
-- Oracle 中的伪列
-- 查询ROWID
SELECT ROWID,ENAME FROM EMP WHERE SAL>2000;

--伪列ROWNUM
SELECT ROWNUM,ENAME,JOB,SAL FROM EMP WHERE ROWNUM<=5;
```

### 序列的创建

**什么是序列**

Sequence（序列）是oracle用来生成连续的整数数据的对象。由于oracle中没有设置自增列的方法，所以在oracle数据库中主要用序列来实现主键自增的功能。

**创建序列的语法**

    CREATE SEQUENCE sequence //创建序列名称
    [INCREMENT BY n] //递增的序列值是 n 如果 n 是正数就递增,如果是负数就递减 默认是 1
    [START WITH n] //开始的值,递增默认是 minvalue 递减是 maxvalue
    [{MAXVALUE n | NOMAXVALUE}] //最大值  
    [{MINVALUE n | NOMINVALUE}] //最小值
    [{CYCLE | NOCYCLE}] //循环/不循环
    [{CACHE n | NOCACHE}];//分配并存入到内存中

数据库操作：

```
--创建序列
-- 创建一个从1 开始，默认最大值，每次增长1 的序列，要求NOCYCLE，缓存中有30 个预先分配好的序列号。

CREATE SEQUENCE MYSEQ
MINVALUE 1
START WITH 1
NOMAXVALUE
INCREMENT BY 1
NOCYCLE
CACHE 30

-- 序列创建之后，通过序列对象的CURRVAL和NEXTVAL两个“伪列”分别访问该序列的当前值和下一个值。

--每运行一次查询下一个值
SELECT MYSEQ.NEXTVAL FROM DUAL;
NEXTVAL

--查询当前值
SELECT MYSEQ.CURRVAL FROM DUAL;
CURRVAL

-- 插入数据时使用序列
insert into infos(STUID,STUNAME,GENDER,AGE,SEAT,CLASSNO) values(MYSEQ.NEXTVAL, '序列','女',23,26,'1001');
insert into infos(STUID,STUNAME,GENDER,AGE,SEAT,CLASSNO) values(MYSEQ.NEXTVAL, '序列2','女',23,26,'1005');
insert into infos(STUID,STUNAME,GENDER,AGE,SEAT,CLASSNO) values(MYSEQ.NEXTVAL, '序列3','女',23,26,'1006');
```

## PL/SQL数据库工作日常笔记

### 创建临时备份表

```sql
--创建一张备份表：只复制结构，不复制数据
CREATE TABLE TP_CIP_INTERFACECOLMAP_BACKUP AS
SELECT * 
FROM TP_CIP_INTERFACECOLMAP 
WHERE 1=0;

--只清空表数据
TRUNCATE TABLE TP_CIP_INTERFACECOLMAP_BACKUP DROP STORAGE;

--插入回闪查询历史备份数据
INSERT INTO TP_CIP_INTERFACECOLMAP_BACKUP
SELECT * 
FROM TP_CIP_INTERFACECOLMAP AS OF TIMESTAMP TO_TIMESTAMP('2025-05-13 11:33:00','yyyy-mm-dd hh24:mi:ss') 
WHERE MSGTYPEID in ('C582401.req','C582401.rsp');

--删除表及其所有数据
DROP TABLE TP_CIP_INTERFACECOLMAP_BACKUP;
```

### 关联表查询

#### 打印表关联查询

```sql

--交易打印信息表
select * from IB_PARA_TRANPRTCFG_INFO T where T.TRANCODE in('020205_2','','');
insert into IB_PARA_TRANPRTCFG_INFO (TRANCODE, VOUNAME, PRTSEQ, PRTWAY, PRTTYPE, PRTCOND, CONTENT, FORMATFILE, ISREPRT, ISSAVE, PROMPT, ISAUTHREPRT, ISENJECT, STATUS, ISLOOP, REMARK1, REMARK2, VOUTYPE, SCENENO, ISPRINTNUM, ISIMPORTANTEMPTY, ISPRINTVOUCHERNUM, NOTE1, NOTE2, NOTE3)
values ('020205_2', '个人定期销户', '0', '0', '2', '"1".equals(dm().isPrint)&&(dm()._NICheckMap_ == null || "0".equals(dm()._NICheckMap_.AgentFlag))&&(!("6".equals(dm().Wher1)||"8".equals(dm().Wher1)||"A".equals(dm().Wher1)))', '本人', '020205_1.aft', '0', '1', '"请用A4凭证纸为客户打印纸质凭证"', '0', '0', '1', '', '', '1', 'A041', '', '', '', '', '', '', '');

insert into IB_PARA_TRANPRTCFG_INFO (TRANCODE, VOUNAME, PRTSEQ, PRTWAY, PRTTYPE, PRTCOND, CONTENT, FORMATFILE, ISREPRT, ISSAVE, PROMPT, ISAUTHREPRT, ISENJECT, STATUS, ISLOOP, REMARK1, REMARK2, VOUTYPE, SCENENO, ISPRINTNUM, ISIMPORTANTEMPTY, ISPRINTVOUCHERNUM, NOTE1, NOTE2, NOTE3)
values ('020205_2', '个人定期销户', '6', '0', '2', '"1".equals(dm().isPrint)&("A".equals(dm().Wher1))', '追加资金销转开(含授权书)', '020205_2_1.aft', '0', '1', '"请用A4凭证纸为客户打印纸质凭证"', '0', '0', '1', '', '', '2', 'A017', '', '', '', '', '', '', '');

--打印信息表
select * from IB_LOG_PRINTVOUCHER_LOG A where A.TRANCODE in ('020205_2') and A.PRTDATE in ('20250721');
insert into IB_LOG_PRINTVOUCHER_LOG (PRTINDEX, APPNUM, COMMSERIALNUM, TRANCODE, TRANNAME, TRANDATE, VOUCHERTYPE, PRTSEQNO, PRTNUM, PRTDATE, PRTBRANCH, PRTUSERNUM, PRTREASON, PRTMSG, PROMPT, TRANAMT, TRANCURRENCY, ACNUM, ACCOUNTNUM, ISIMPORTANTEMPTY, SCENENO, ISIMPSUCCPRINT, PRINTERTYPE, ISFILEPRINT, REMARK1, REMARK2, REMARK3)
values (0, '', 'ABCS02025072100000001395540', '020205_2', '个人定期销户', '20250721', 'A041', '3A689CC1F9314C4BE063030814AC96CF', '0', '20250721', '1531', '00002037', '', '<CLOB>', '请用A4凭证纸为客户打印纸质凭证', 60.00000000, 'CNY', '6217358201056733742', '', '0', '', '', '0', '0', '0', '', '');

insert into IB_LOG_PRINTVOUCHER_LOG (PRTINDEX, APPNUM, COMMSERIALNUM, TRANCODE, TRANNAME, TRANDATE, VOUCHERTYPE, PRTSEQNO, PRTNUM, PRTDATE, PRTBRANCH, PRTUSERNUM, PRTREASON, PRTMSG, PROMPT, TRANAMT, TRANCURRENCY, ACNUM, ACCOUNTNUM, ISIMPORTANTEMPTY, SCENENO, ISIMPSUCCPRINT, PRINTERTYPE, ISFILEPRINT, REMARK1, REMARK2, REMARK3)
values (6, '', 'ABCS02025072100000001395540', '020205_2', '个人定期销户', '20250721', 'A041', '3A689CC1F9324C4BE063030814AC96CF', '0', '20250721', '1531', '00002037', '', '<CLOB>', '请用A4凭证纸为客户打印纸质凭证', 60.00000000, 'CNY', '6217358201056733742', '', '0', '', '', '0', '0', '0', '', '');

--打印表查询关联要素
--查看打印的是哪个aft,根据字段printdex对应prtseq
SELECT 
    p.PRTINDEX,
    p.TRANCODE,
    p.TRANNAME,
    p.VOUCHERTYPE,
    p.PRTDATE,
    p.PRTBRANCH,
    p.PRTUSERNUM,
    p.ACNUM,
    p.TRANAMT,
    c.PRTSEQ,
    c.VOUNAME,
    c.PRTTYPE,
    c.FORMATFILE,
    c.PRTCOND,
    c.VOUTYPE,
    c.SCENENO
FROM 
    IB_LOG_PRINTVOUCHER_LOG p
LEFT JOIN 
    IB_PARA_TRANPRTCFG_INFO c
ON 
    p.TRANCODE = c.TRANCODE 
    AND p.PRTINDEX = c.PRTSEQ
WHERE 
    p.TRANCODE = '020205_2'
    AND p.PRTDATE = '20250721'
ORDER BY 
    p.PRTINDEX;

--关联查询打印表
SELECT p.*, c.* 
FROM IB_LOG_PRINTVOUCHER_LOG p
LEFT JOIN IB_PARA_TRANPRTCFG_INFO c
  ON p.TRANCODE = c.TRANCODE 
 AND p.PRTINDEX = c.PRTSEQ
WHERE p.TRANCODE = '020205_2'
  AND p.PRTDATE = '20250721'
ORDER BY p.PRTINDEX;
```

#### 下拉框关联查询

```sql
--下拉框信息表
select T.*,T.rowid from IB_PARA_COMBOCOL_RLT T where T.TRANCODE in ('020432') and T.ENTRYNAME in ('combo_操作类型_020432');
--下拉框明细表
select T.*,T.rowid from IB_PARA_COMBOITEM_INFO T where T.ENTRYNAME in ('combo_操作类型_020432','');

--关联模糊查询
SELECT 
  c.TRANCODE as 交易码,
  c.ADENAME as 数据字典,
  c.ENTRYNAME as 枚举名称,
  i.ITEMPREFIX as 枚举前缀,
  i.ITEMVALUE as 枚举后缀,
  i.orderid as 排序
FROM 
  (SELECT
     TRANCODE, 
     ADENAME, 
     ENTRYNAME 
   FROM IB_PARA_COMBOCOL_RLT 
   WHERE TRANCODE = '021007' 
     AND ENTRYNAME LIKE 'combo_%') c
JOIN 
  (SELECT
     ENTRYNAME, 
     ITEMPREFIX, 
     ITEMVALUE, 
     orderid
   FROM IB_PARA_COMBOITEM_INFO 
   WHERE ENTRYNAME LIKE 'combo_%') i 
ON c.ENTRYNAME = i.ENTRYNAME
--先按ENTRYNAME分组，再按序号排序
ORDER BY c.ENTRYNAME,i.orderid;

--关联模糊查询
SELECT 
  c.*, 
  i.*,
  c.rowid AS rlt_rowid, 
  i.rowid AS item_rowid
FROM 
  (SELECT * 
   FROM IB_PARA_COMBOCOL_RLT 
   WHERE TRANCODE = '021007' 
     AND ENTRYNAME LIKE 'combo_%'
  ) c
JOIN 
  (SELECT * 
   FROM IB_PARA_COMBOITEM_INFO 
   WHERE ENTRYNAME LIKE 'combo_%'
  ) i 
ON c.ENTRYNAME = i.ENTRYNAME
--先按ENTRYNAME分组，再按序号排序
ORDER BY c.ENTRYNAME, i.orderid;
```

### 查询当前被锁定的对象信息

```sql
--查询表被谁锁住的语句
select * from v$locked_object;
```

### 查询某个时间戳之前的数据

比如刚修改提交了影像补拍信息表中的某些数据，突然想还原修改之前的数据，可以通过以下SQL语句查询24小时内的内容：

```sql
select * from IB_IMAGE_TIPS_INFO as of timestamp to_timestamp('2024-09-18 14:00:00','yyyy-mm-dd hh24:mi:ss')
```

含义如下：

1. **`select * from IB_IMAGE_TIPS_INFO`** ：选择所有来自表 `IB_IMAGE_TIPS_INFO` 的数据。
2. **`as of timestamp`** ：这个子句用于 Oracle 的闪回查询（Flashback Query），它允许查询过去某个时间点的数据。意思是要查询表在某个过去时间点的状态。
3. **`to_timestamp('2024-09-18 14:00:00', 'yyyy-mm-dd hh24:mi:ss')`** ：使用 `to_timestamp` 函数将字符串 `'2024-09-18 14:00:00'` 转换为时间戳类型，格式为 `yyyy-mm-dd hh24:mi:ss`，表示要查询的历史数据的具体时间点为 2024 年 9 月 18 日 14:00:00。

### &&运算符的插入

在插入SQL语句中有&&运算符却插入失效时，插入前先执行以下SQL语句：

1.set define off  //关闭替代变量功能

2.执行要插入的SQL语句。

3.set define on //开启替代变量功能

### decode函数

一 两种语法格式

1 decode(expression,value,result1,result2)

   如果expression=value，则输出result1，否则输出result2

   例子：

```
select decode(1+2,3,'a','b') //（1+2=3，则输出a）

select decode(1+2,4,'a','b') //（1+2≠4，则输出b）
```

2 decode(expression,value1,result1,value2,result2,value3,result3......,default)

   如果expression=value1，则输出result1，expression=value2，输出reslut2，expression=value3，输出result3，

   若expression不等于所列出的所有value，则输出为default

  例子：

```
select decode(score,100,'No.1',90,'No.2',80,'No.3','Other'),name from grade

//（score=100，输出'NO.1'，score='90'，输出‘NO.2’，score='70'，输出‘NO.3’，其他值输出'Other'）
```

### NVL函数

#### 含义

nvl是用于判断某字段值是否为空然后作以相关处理的函数,类似于简易版的[三元表达式](https://so.csdn.net/so/search?q=%E4%B8%89%E5%85%83%E8%A1%A8%E8%BE%BE%E5%BC%8F&spm=1001.2101.3001.7020)。

#### 分类

> 1. 两个参数的nvl函数：nvl(str1,str2)
>    a. 含义：如果第一个参数不为空的话，则该表达式返回第一个参数的值，若第一个参数为空时，则返回第二个参数的值。
>    b. 应用场景：
>    * 可以设置字段如果为空的默认值。例如如果一个人在注册游戏时不填写用户名称时默认取你注册用的微信名称一样。
>    * 也可以用于外关联(join等)时两个表中有重复字段但是值不一样时，可以设置该字段取值的优先级别。例如两个事件表，一个是紧急事件表，另一个是基本事件表，两个表中都有一个字段名为事件紧急程度，这里我们就可以先将两个表进行关联，在设置事件紧急程度时首先取紧急事件表中该字段的内容，如果为空再取基本事件表中该字段的内容。
> 2. 三个参数的nvl函数：nvl2(str1,str2,str3)
>    a. 含义：如果str1的值为空则返回str3，如果不为空则返回str2
>    b. 应用场景：可以使用与字符串的拼接，如果该字符串为空则直接返回前缀，若字符串不为空，则返回前缀拼接当前字符串之后再返回。

### sign函数

含义：比较大小函数sign

sign(x)或者Sign(x)叫做符号函数，其功能是取某个数的符号(正或负)：

当x>0，sign(x)=1;

当x=0，sign(x)=0;

当x<0， sign(x)=-1；

x可以是函数或计算表达式。

### 应用

#### NVL函数转换

1.多个条件查询时，考虑必输，非必输情况，非必输时考虑可能不输传空的转换。

解释：

* %s：表示输入条件的参数值，跟？占位符一样
* NVL('%s','')：表示第一个参数%s不为空的话，则返回第一个参数的值，若第一个参数为空时，则返回第二个参数的值，这时候赋空值，避免非必输项不输时也查不到记录的情况。
* decode(NVL('%s',''),'',CONFIG_TYPE,'%s')：表示第一个参数与第二个参数相等都为空值时，输出CONFIG_TYPE，否则输出传入的%s值。

例子：

```
select 	CONFIG_TYPE,CONFIG_NAME,PRAMETER_CODE,PARAMETER_NAME,CREATE_USER,STATUS,CREATE_DATE,CREATE_TIME,REMARK,REMARK1,REMARK2,REMARK3,SEQ_ID FROM ab_trade_config where CONFIG_TYPE=decode(NVL('%s',''),'',CONFIG_TYPE,'%s') and PRAMETER_CODE=decode(NVL('%s',''),'',PRAMETER_CODE,'%s') and
CREATE_USER=decode(NVL('%s',''),'',CREATE_USER,'%s') and STATUS=decode(NVL('%s',''),'',STATUS,'%s') order by PRAMETER_CODE

```

#### 使用sing函数分段

   将成绩表中分数大于90分的分为优秀，80 ~90分为良好，70 ~80 分为中等， 60 ~70分为及格，60分以下为不及格。

```
select name,decode(sign(score-90),1,'优秀',0,'优秀',-1,decode(sign(score-80),1,'良好',0,'良好',-1,decode(sign(score-70),1,'中等',0,'中等',-1,decode(sign(score-60),1,'及格',0,'及格',-1,'不及格')))) from grade
```

解释：sign()函数的作用是，判断参数的值大于0则返回1，等于0则返回0，小于0则返回-1；

    当socre大于或等于90时，socre-90>=0，sign()函数返回1或0，则输出‘优秀’，

    在score-90<0的情况下，再判断socre-80，socre-80>=0，sign()函数返回1或0，则输出‘良好’，

    以此类推，用decode()的嵌套配合sign()函数来实现对分数的分段以及相应的输出，

    最后60分以下的就default为‘不及格’就可以了。

## 更多入门教程

[详情参考](https://blog.csdn.net/qq_42589612/article/details/80943957)
