title: AI全栈开发指南
author: PanYuKang
tags: [AI辅助,开源项目,全栈开发]

categories: [项目手册]

date: 2026-08-08 19:56:55

---

## 全栈技术演进与架构差异对照表

| 维度                 | 传统 SSM / 早期老项目         | 现代化单体 / 渐进式 | 现代微服务 & 云原生  | AI 原生应用架构                |
| :------------------- | :---------------------------- | :------------------ | :------------------- | :----------------------------- |
| **JDK 版本**   | JDK 8 (或 JDK 6/7)            | JDK 17 / JDK 21     | JDK 17 / JDK 21      | JDK 17+                        |
| **核心后端**   | Spring + SpringMVC + MyBatis  | Spring Boot 3.x     | Spring Cloud / Dubbo | Spring AI / LangChain4j        |
| **前端技术**   | JSP / jQuery / Vue2           | Vue3 + Vite + Pinia | Vue3 / React         | Vue3 + SSE (流式打字机)        |
| **文件存储**   | 服务器本地绝对路径 / 共享盘   | Nginx 代理静态目录  | 阿里云 OSS / MinIO   | 向量数据库 + 文件提取解析      |
| **接口文档**   | 手写 Markdown / 对应 API 文件 | Knife4j / Swagger3  | Apifox / Postman     | Function Calling 结构化 Schema |
| **部署与网络** | 内网物理机 / Tomcat 部署      | Docker 容器化       | Kubernetes (K8s)     | 内网私有化模型 / GPU 算力节点  |

---

## 全栈开发地图追踪导航

### 项目代码追踪地图

```markdown
【用户管理：查询列表】

Vue 页面
  ↓
路由 router
  ↓
views/system/user/index.vue
  ↓
调用 API
  ↓
api/system/user.ts
  ↓
HTTP GET
  ↓
/system/user/list
  ↓
UserController.java
  ↓
UserService.java
  ↓
UserMapper.java
  ↓
sys_user
  ↓
Oracle / MySQL
```

### 前端目录地图

```markdown
Geeker-Admin
├─ .husky                  # husky 配置文件
├─ .vscode                 # VSCode 推荐配置
├─ build                   # Vite 配置项
├─ public                  # 静态资源文件（该文件夹不会被打包）
├─ src
│  ├─ api                  # API 接口管理
│  ├─ assets               # 静态资源文件
│  ├─ components           # 全局组件
│  ├─ config               # 全局配置项
│  ├─ directives           # 全局指令文件
│  ├─ enums                # 项目常用枚举
│  ├─ hooks                # 常用 Hooks 封装
│  ├─ languages            # 语言国际化 i18n
│  ├─ layouts              # 框架布局模块
│  ├─ routers              # 路由管理
│  ├─ stores               # pinia store
│  ├─ styles               # 全局样式文件
│  ├─ typings              # 全局 ts 声明
│  ├─ utils                # 常用工具库
│  ├─ views                # 项目所有页面
│  ├─ App.vue              # 项目主组件
│  ├─ main.ts              # 项目入口文件
│  └─ vite-env.d.ts        # 指定 ts 识别 vue
├─ .editorconfig           # 统一不同编辑器的编码风格
├─ .env                    # vite 常用配置
├─ .env.development        # 开发环境配置
├─ .env.production         # 生产环境配置
├─ .env.test               # 测试环境配置
├─ .eslintignore           # 忽略 Eslint 校验
├─ .eslintrc.cjs           # Eslint 校验配置文件
├─ .gitignore              # 忽略 git 提交
├─ .prettierignore         # 忽略 Prettier 格式化
├─ .prettierrc.cjs         # Prettier 格式化配置
├─ .stylelintignore        # 忽略 stylelint 格式化
├─ .stylelintrc.cjs        # stylelint 样式格式化配置
├─ CHANGELOG.md            # 项目更新日志
├─ commitlint.config.cjs   # git 提交规范配置
├─ index.html              # 入口 html
├─ LICENSE                 # 开源协议文件
├─ lint-staged.config.cjs  # lint-staged 配置文件
├─ package-lock.json       # 依赖包包版本锁
├─ package.json            # 依赖包管理
├─ postcss.config.cjs      # postcss 配置
├─ README.md               # README 介绍
├─ tsconfig.json           # typescript 全局配置
└─ vite.config.ts          # vite 全局配置文件
```

### 后端目录地图

```markdown
youlai-boot (Spring Boot 3 企业级标准后端)
├─ .idea                   # IDEA 空间项目配置
├─ .vscode                 # VSCode 项目推荐配置
├─ logs                    # 项目运行日志输出目录
├─ src
│  ├─ main
│  │  ├─ java/com/youlai/boot
│  │  │  ├─ common        # 通用核心模块
│  │  │  │  ├─ annotation # 自定义注解（如日志记录、防重复提交）
│  │  │  │  ├─ base       # 基础抽象类（BaseEntity、BaseController）
│  │  │  │  ├─ constant   # 常量类定义（Redis 键前缀、系统常量）
│  │  │  │  ├─ exception  # 自定义全局业务异常与断言
│  │  │  │  └─ result     # 统一 API 响应包装（Result<T>、PageResult<T>）
│  │  │  ├─ config        # 框架基础配置项
│  │  │  │  ├─ MyBatisConfig.java    # MyBatis-Plus 分页插件配置
│  │  │  │  ├─ RedisConfig.java      # Redis 序列化与缓存配置
│  │  │  │  ├─ SecurityConfig.java   # Spring Security / Sa-Token 鉴权放行配置
│  │  │  │  └─ SwaggerConfig.java    # OpenAPI3 / Knife4j 在线文档生成配置
│  │  │  ├─ controller    # 控制层（接收前端 HTTP 请求，对应前端 api/*.ts）
│  │  │  ├─ service       # 业务逻辑接口层
│  │  │  │  └─ impl       # 业务逻辑实现类层（处理核心事务与业务）
│  │  │  ├─ mapper        # 数据持久层接口（DAO，对 SQL 的 Java 抽象）
│  │  │  ├─ model         # 核心数据模型定义（最关键的数据传输载体）
│  │  │  │  ├─ dto        # Data Transfer Object（前端传给后端的入参，含 Validation 校验注解）
│  │  │  │  ├─ entity     # 数据库实体类（与 MySQL 数据表结构逐一映射）
│  │  │  │  ├─ query      # 分页与复杂条件查询入参对象
│  │  │  │  └─ vo         # View Object（后端返回给前端的出参数据对象）
│  │  │  ├─ security      # 安全认证与权限拦截（JWT 解析、UserDetail 实现类）
│  │  │  ├─ aspect        # AOP 切面处理（如操作日志异步落库切面）
│  │  │  ├─ utils         # 通用工具类（JwtUtils、RedisUtils、ExcelExporter）
│  │  │  └─ YouLaiBootApplication.java # Spring Boot 项目主入口程序
│  │  └─ resources
│  │     ├─ mapper        # MyBatis XML 映射文件（存放自定义复杂 SQL 语句）
│  │     ├─ static        # 静态资源（前端打包后静态文件存储）
│  │     ├─ templates     # 模板文件（邮件模板、代码生成器 Velocity/Freemarker 模板）
│  │     ├─ application.yml             # 全局通用配置文件
│  │     ├─ application-dev.yml         # 开发环境配置（本地数据库/Redis/端口）
│  │     ├─ application-prod.yml        # 生产环境配置（线上数据库/集群配置）
│  │     └─ logback-spring.xml          # Logback 日志策略与路径配置文件
│  └─ test               # 单元测试模块（JUnit5 测试用例目录）
├─ target                 # Maven 编译与打包输出产物目录（.jar 包生成地）
├─ .gitignore             # Git 提交忽略清单（忽略 target, .idea, logs）
├─ Dockerfile             # 容器化镜像构建脚本（用于 Docker/K8s 一键打包部署）
├─ pom.xml                # Maven 依赖管理文件（定义 JDK17、Boot3 版本及各类 Starter）
├─ README.md              # 项目部署说明与启动 SOP
└─ sql                    # 数据库初始化 SQL 脚本文件（包含建表语句与初始数据）
```

## 学习路线导航

### 入门级别项目

B站程序员青戈，从0到1带小白完成第一个前后端分离项目：
图书管理系统。
技术栈：SpringBoot2 + Vue2.0 + ElementUI + Mysql
视频地址：https://www.bilibili.com/video/BV12Y4y1N7Sw/
源码地址：https://github.com/xqnode/library-management

技术栈：SpringBoot3 + Mybatis + Vue3 + Element-Plus + Mysql

[B站视频地址](https://www.bilibili.com/video/BV1Df2cYVEWo?vd_source=f04bd31ed1fe596257583c07f48036d7&spm_id_from=333.788.videopod.episodes)

### 1. 传统老项目与过渡期项目 (内网/银行类基石)

* **项目名称**：BigEvent (大事件后端/前端)
  * **技术栈**：Spring Boot 3 + Vue3 + Element Plus
  * **核心痛点/特征**：未集成 Swagger，需通过前端 `api/*.js` 或 IDEA Endpoints 提取接口；文件采用本地路径/流传输。
  * **源码路径**：`E:\IdeaProjects\BigEvent`
  * **GitHub 仓库**：[你的仓库链接]
  * **复盘笔记**：`./notes/bigevent-analysis.md`

### 2. 现代化企业级脚手架 (高效搬砖与规范标杆)

* **项目名称**：RuoYi-Vue-Plus / 芋道源码 (yudao-cloud)
  * **技术栈**：Spring Boot 3 + Spring Security + Redis + MyBatis Flex/Plus + Vue3
  * **核心功能**：完整权限系统 (RBAC)、动态菜单、代码生成器。
  * **源码路径**：`E:\IdeaProjects\yudao-pro`
  * **复盘笔记**：`./notes/ruoyi-plus-architecture.md`

### 3. AI Agent 与大模型落地实战 (AI 时代进阶)

* **项目名称**：yu-ai-agent / Dify 扩展开发
  * **技术栈**：Spring AI / LangChain4j + PGVector + Vue3 SSE 流式响应
  * **核心场景**：企业私有知识库 RAG、Function Calling 自动化工具调用。
  * **源码路径**：`E:\IdeaProjects\ai-agent-demo`
  * **复盘笔记**：`./notes/ai-rag-function-calling.md`

---

## 三、 企业级快速断点与接手新项目 SOP

当拿到一个全新的公司项目时，按以下步骤 10 分钟快速吃透架构：

1. **确定 JDK 与依赖**：检查 `pom.xml` 中的 Java 版本与核心依赖（Spring Boot 版本、是否有 Swagger/Knife4j/Spring AI）。
2. **摸清接口暴露**：
   * 打开 IDEA `Endpoints` 窗口或安装 `RestfulTool` 插件，一键拉出所有后端 API。
   * 检查前端 `src/api/` 目录，搞清前端是如何封装 Axios 和请求拦截器 (Request Interceptor) 的。
3. **定位数据与文件存储**：
   * 检查文件上传 Controller，确认文件是走 `OSS SDK` 还是 `file.transferTo()` 保存至磁盘相对/绝对路径。
4. **梳理网络与环境限制**：
   * 确认是公网项目（Nginx + HTTPS + 云服务）还是内网隔离项目（内网 IP + 局域网共享盘 + 私有化大模型节点）。
