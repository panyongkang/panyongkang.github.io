title: BootStrap框架
author: PanXiaoKang
tags: [BootStrap,前端框架]
categories: [前端框架]
cover: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3148263595,2673588162&fm=26&gp=0.jpg'
date: 2020-04-17 14:59:00

---

## Bootstrap笔记

### Bootstrap表格

表格< table >类：

| 类               | 描述                         |
| ---------------- | ---------------------------- |
| .table           | 添加基本样式，只有横向分隔线 |
| .table-striped   | 添加斑马条纹                 |
| .table-bordered  | 为所有单元格添加边框         |
| .table-hover     | 启用鼠标悬停状态             |
| .table-condensed | 让表格更加紧凑               |

上下文< tr > , < th > 和 < td > 类：

下表中的类可用于表格的行或单元格：

| 类       | 描述                           |
| -------- | ------------------------------ |
| .active  | 将悬停的颜色应用在行或单元格上 |
| .success | 表示成功的操作                 |
| .info    | 表示信息变化的操作             |
| .warning | 表示警告操作                   |
| .danger  | 表示危险操作                   |

使用上下文类可以为表格的行或列添加背景颜色：

![图片](hexo_post_1.png)

### Bootstrap表单

#### 表单布局有下列三种

1. 垂直表单（默认）
2. 内联表单
3. 水平表单

#### 垂直或基本表单

    基本的表单结构是 Bootstrap 自带的，个别的表单控件自动接收一些全局样式。

1. 向父 < form> 元素添加 role="form"。
2. form-group类，用于获取最佳间距的。
3. 向所有的文本元素 < input>、< textarea> 和 < select> 添加 class ="form-control"用于统一格式化 。

#### 内联表单

    所有内联表单中的元素都是左对齐的。内联表单需要在 < form> 元素上添加 .form-inline类。

注意：在屏幕宽度小于 576px 时为垂直堆叠，如果屏幕宽度大于等于576px时表单元素才会显示在同一个水平线上。

    class="sr-only":隐藏内联表单的标签

#### 水平表单

    水平表单与其他表单不仅标记的数量上不同，而且表单的呈现形式也不同。如需创建一个水平布局的表单，请按下面的几个步骤进行：

1. 向父 < form> 元素添加 class .form-horizontal。
2. 把标签和控件放在一个带有 class .form-group 的 < div> 中。
3. 向标签添加 class .control-label，用于向右边输入框右对齐。

#### BootStrap表单控件

Bootstrap 支持最常见的表单控件，主要是 input、textarea、checkbox、radio 和 select。

Textarea：当您需要进行多行输入的时，可以使用。rows 属性可以改变行数

Select: 使用 multiple="multiple" 允许用户选择多个选项。

静态控件：当您需要在一个水平表单内的表单标签后放置纯文本时，请在 < p> 上使用 class .form-control-static。

验证状态:

Bootstrap 包含了错误、警告和成功消息的验证样式。只需要对父元素简单地添加适当的 class（.has-warning、 .has-error 或 .has-success）即可使用验证状态。

### Bootstrap信息提示框

提示框可以使用.alert类，后面加上：

.alert-success, .alert-info, .alert-warning, .alert-danger, .alert-primary, .alert-secondary, .alert-light 或 .alert-dark 类来实现:

方法：

    .alert:方法让所有的警告框都带有关闭功能

    .close:关闭警告框的样式

    .alert('close'):js中使用它可以关闭所有警告框

### Bootstrap按钮

按钮标签：

您可以在 < a>、< button> 或 < input> 元素上使用按钮 class。但是建议您在 < button> 元素上使用按钮 class，避免跨浏览器的不一致性问题。

按钮组

在 div 中直接使用 .btn-group 可以创建按钮组

自适应大小的按钮组

可以通过 .btn-group-justified 类来设置自适应大小的按钮组。

data-toggle="dropdown"：按钮组内嵌的按钮可以设置下拉菜单

### Bootsrap辅助类

aria-hidden="true" 主要是帮助残障人士（如失明）使用识读设备（自动读取内容并自动播放出来），播放到带此属性的内容时会自动跳过，以免残障人士混淆！

### BootStrap字体图标

在新增按钮中：class="glyphicon glyphicon-plus"：glyphicon使之变粗大，glyphicon-plus：字体图标“+”

### BootStrap分页

.pagination:添加该类来在页面上显示分页

.disabled:不可点击链接

.active:指示当前页面

.pagination-lg:分页放大

.pagination-sm：分页缩小

Html的转义字符：

    &laquo:代表“<<”符号

    &raquo:代表”>>”符号

    人民币/日元：&yen;

    版权： & copy;

### Bootstrap 模态框（Modal）

模态框（Modal）是覆盖在父窗体上的子窗体。通常，目的是显示来自一个单独的源的内容，可以在不离开父窗体的情况下有一些互动。子窗体可提供信息、交互等。
