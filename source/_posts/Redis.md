title: Redis
author: PanXiaoKang
cover: 'http://img.mukewang.com/5a29ef6000014ee103820247.png'
tags:

  - Redis
  - 缓存数据库
categories:
  - 数据库
date: 2020-05-13 20:56:00

---

## 什么是Redis

定义：是一个开源免费的，使用 C 语言开发的高速缓存数据库。
数据类型：Redis 支持五种数据类型：string（字符串），hash（哈希），list（列表），set（集合）及 zsetsorted set：有序集合)。

## 使用Redis的好处

（1）速度快，因为数据存在内存中

（2）支持丰富数据类型，支持string（字符串）、list（列表）、hash（字典）、set（集合）、zset（有序集合）。

（3）支持事务，操作都是原子性，所谓的原子性就是对数据的更改要么全部执行，要么全部不执行

（4）丰富的特性：可用于缓存，消息，按 key 设置过期时间，过期后将会自动删除

## Redis 的数据结构及使用场景

Redis 提供了 5种数据结构，每一种数据结构有各种的使用场景。

    1. String 字符串
    字符串类型是 Redis 最基础的数据结构，首先键都是字符串类型，而且 其他几种数据结构都是在字符串类型基础上构建的，我们常使用的 set key value 命令就是字符串。常用在缓存、计数、共享Session、限速等。
    2. Hash 哈希
    在Redis中，哈希类型是指键值本身又是一个键值对 结构，形如value={{field1，value1}，…{fieldN，valueN}}，添加命令：hset key field value。哈希可以用来存放用户信息，比如实现购物车
    3. List 列表
    列表（list）类型是用来存储多个有序的字符串。可以做简单的消息队列的功能。另外，可以利用 lrange 命令，做基于 Redis的分页功能，性能极佳，用户体验好。
    4. Set 集合
    集合（set）类型也是用来保存多个的字符串元素，但和列表类型不一 样的是，集合中不允许有重复元素，并且集合中的元素是无序的，不能通过 索引下标获取元素。利用 Set 的交集、并集、差集等操作，可以计算共同喜好，全部的喜好，自己独有的喜好等功能。
    5. Sorted Set 有序集合
    Sorted Set 多了一个权重参数 Score，集合中的元素能够按 Score 进行排列。可以做排行榜应用，取 TOP N 操作。

## Redis是单进程单线程的

Redis 是单进程单线程的，redis 利用队列技术将并发访问变为串行访问，消除了传统数据库串行控制的开销。

## Redis 为什么是单线程的

因为Redis是基于内存的操作，CPU不是Redis的瓶颈，Redis的瓶颈最有可能是机器内存的大小或者网络带宽。既然单线程容易实现，而且CPU不会成为瓶颈，那就顺理成章地采用单线程的方案了（毕竟采用多线程会有很多麻烦！）。Redis利用队列技术将并发访问变为串行访问。而且单线程并不代表就慢，nginx 和 nodejs 也都是高性能单线程的代表。

## 单线程的Redis为什么这么快

Redis 有多快？官方给出的答案是读写速度 10万/秒，这个数字不让人意外，但是 Redis 是单线程的。为什么单线程的 Redis 速度这么快？原因有以下三点：

1. 纯内存操作：Redis 是完全基于内存的，所以读写效率非常的高，当然 Redis 存在持久化操作，在持久化操作是都是 fork 子进程和利用 Linux 系统的页缓存技术来完成，并不会影响 Redis 的性能。
2. 单线程操作：单线程并不是坏事，单线程可以避免了频繁的上下文切换，频繁的上下文切换也会影响性能的。
3. 合理高效的数据结构
4. 采用了非阻塞 I/O 多路复用机制：多路I/O复用模型是利用 select、poll、epoll 可以同时监察多个流的 I/O 事件的能力，在空闲的时候，会把当前线程阻塞掉，当有一个或多个流有 I/O 事件时，就从阻塞态中唤醒，于是程序就会轮询一遍所有的流（epoll 是只轮询那些真正发出了事件的流），并且只依次顺序的处理就绪的流，这种做法就避免了大量的无用操作。

## Redis适合场景

1. 会话缓存：Redis可提供持久化。在购物车信息中可以使用Redis来缓存会话的文档。
2. 全页缓存（FPC）: 回到一致性问题，即使重启了 Redis 实例，因为有磁盘的持久化，用户也不会看到页面加载速度的下降，这是一个极大改进
3. 队列：Reids 在内存存储引擎领域的一大优点是提供 list 和 set 操作，这使得 Redis能作为一个很好的消息队列平台来使用。
4. 发布/订阅：发布/订阅的使用场景确实非常多。人们在社交网络连接中使用，还可作为基于发布/订阅的脚本触发器，甚至用 Redis 的发布/订阅功能来建立聊天系统！

## Redis有哪些功能

1. 数据缓存功能
2. 分布式锁的功能
3. 支持数据持久化
4. 支持事务
5. 支持消息队列

## 保证缓存和数据库数据的一致性

合理设置缓存的过期时间。
新增、更改、删除数据库操作时同步更新 Redis，可以使用事物机制来保证数据的一致性。

## Redis持久化

Redis 的持久化有两种方式，或者说有两种策略：

RDB（Redis Database）：指定的时间间隔能对你的数据进行快照存储。
AOF（Append Only File）：每一个收到的写命令都通过write函数追加到文件中。

## 缓存穿透

缓存穿透： 缓存穿透是指缓存和数据库中都没有的数据，而用户不断发起请求，如发起为id为“-1”的数据或id为特别大不存在的数据。这时的用户很可能是攻击者，攻击会导致数据库压力过大。

解决方案：最简单粗暴的方法如果一个查询返回的数据为空（不管是数据不存在，还是系统故障），我们就把这个空结果进行缓存，但它的过期时间会很短，最长不超过五分钟。

## 缓存雪崩

缓存雪崩：
	缓存雪崩是指缓存中数据大批量到过期时间，而查询数据量巨大，引起数据库压力过大甚至down机。和缓存击穿不同的是，        缓存击穿指并发查同一条数据，缓存雪崩是不同数据都过期了，很多数据都查不到从而查数据库。

解决方案：

1. 缓存数据的过期时间设置随机，防止同一时间大量数据过期现象发生。
2. 如果缓存数据库是分布式部署，将热点数据均匀分布在不同搞得缓存数据库中。
3. 设置热点数据永远不过期。

## 缓存击穿

缓存击穿：
缓存击穿是指缓存中没有但数据库中有的数据（一般是缓存时间到期），这时由于并发用户特别多，同时读缓存没读到数据，又同时去数据库去取数据，引起数据库压力瞬间增大，造成过大压力

解决方案：
设置热点数据永远不过期。
加互斥锁。

## Redis的部署方式

Redis 的部署方式主要包括以下几种：

1. **单机部署** ：

* 单机部署是最简单的方式，直接在一台服务器上部署 Redis。这种部署方式适用于小型应用或者开发环境。
* 在单机部署中，Redis 既可以作为单一实例运行，也可以通过多个数据库分片来提高性能和容量。

1. **主从复制部署** ：

* 主从复制部署包括一个主节点和多个从节点。主节点负责处理写入操作，而从节点则负责复制主节点的数据并处理读取操作。
* 主从复制部署提高了系统的读取性能和可用性，并且提供了数据的备份和容错机制。

1. **Sentinel 高可用部署** ：

* Sentinel 是 Redis 提供的用于实现高可用性的解决方案。它监控 Redis 实例的健康状态，并在主节点故障时自动将从节点升级为主节点。
* Sentinel 部署适用于对可用性要求较高的生产环境，可以保证系统在主节点故障时自动切换到备用节点，减少服务中断时间。

1. **集群部署** ：

* Redis 集群部署是一种分布式部署方式，通过将数据分片存储在多个节点上来提高系统的性能和容量。
* Redis 集群提供了数据自动分片和负载均衡的功能，可以水平扩展系统的性能和容量。

1. **容器化部署** ：

* 使用容器化技术如 Docker，可以将 Redis 容器化部署，使得部署和管理变得更加简单和灵活。
* 容器化部署适用于云原生环境和微服务架构，可以快速部署和扩展 Redis 实例，并且提供了隔离和资源管理的功能。
