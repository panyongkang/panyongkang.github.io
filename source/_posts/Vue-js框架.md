title: Vue.js框架
author: PanXiaoKang
cover: https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2580821279,2387343998&fm=26&gp=0.jpg
tags: [Vue]
categories: [前端框架]
date: 2020-05-11 17:21:00

---

## Vue.js 是什么

   vue是一套构建用户界面的渐进式框架，它是以数据驱动和组件化的思想构建的，采用自底向上增量开发的设计。vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。

渐进式表现：声明式渲染—组件系统—客户端路由—大数据状态管理—构建工具。

**Vue.js的特性如下：**

1. 轻量级的框架
2. 双向数据绑定
3. 指令
4. 插件化

**应用场景**

* 针对具有复杂交互逻辑的前端应用；
* 它可以提供基础的架构抽象；
* 可以通过AJAX数据持久化，保证前端用户体验

**好处**

当前端和数据做一些操作的时候，可以通过AJAX请求对后端做数据持久化，不需要刷新整个页面，只需要改动DOM里需要改动的那部分数据。

## MVX框架模式了解

MVX框架模式：MVC+MVP+MVVM

1. MVC：Model(模型)+View(视图)+controller(控制器)，主要是基于分层的目的，让彼此的职责分开。
   View通过Controller来和Model联系，Controller是View和Model的协调者，View和Model不直接联系，基本联系都是单向的。
   用户User通过控制器Controller来操作模板Model从而达到视图View的变化。
2. MVP：是从MVC模式演变而来的，都是通过Controller/Presenter负责逻辑的处理+Model提供数据+View负责显示。
   在MVP中，Presenter完全把View和Model进行了分离，主要的程序逻辑在Presenter里实现。
   并且，Presenter和View是没有直接关联的，是通过定义好的接口进行交互，从而使得在变更View的时候可以保持Presenter不变。
3. MVVM：MVVM是把MVC里的Controller和MVP里的Presenter改成ViewModel。Model+View+ViewModel。View的变化会自动更新到ViewModel,ViewModel的变化也会自动同步到View上显示。这种自动同步是因为ViewModel中的属性实现了Observer，当属性变更时都能触发对应的操作。

## MVVM

MVVM 是 Model-View-ViewModel 的缩写，它是一种基于前端开发的架构模式，其核心是提供对 View 和 ViewModel 的双向数据绑定，这使得 ViewModel 的状态改变可以自动传递给 View，即所谓的数据双向绑定。
M：Model（数据层，也就是指数据（前端是js））
V：View ( 也就是指DOM层 或用户界面 )
VM : ViewModel (处理数据和界面的中间层，也就是指Vue)

![图片](http://liangxinghua.com/uploads/image/20180709/1531106991.png)

### mvvm和mvc区别

mvc和mvvm其实区别并不大。都是一种设计思想。主要就是mvc中Controller演变成mvvm中的viewModel。mvvm主要解决了mvc中大量的DOM 操作使页面渲染性能降低，加载速度变慢，影响用户体验。

区别：vue数据驱动，通过数据来显示视图层而不是节点操作。
场景：数据操作比较多的场景，更加便捷

## MVC和MVVM的关系图

[![mvvm.png](https://s1.ax1x.com/2020/10/16/0bbszQ.png)](https://imgchr.com/i/0bbszQ)

## 声明式渲染

Vue.js 的核心是一个允许采用简洁的模板语法来声明式地将数据渲染进 DOM 的系统。
**额外补充：**
渲染分为：命令式渲染和声明式渲染
命令式渲染：命令我们的程序去做什么，程序就会跟着你的命令去一步一步执行
声明式渲染 ：只需要告诉程序想要什么效果，其他的交给程序来做
具体区别看如下代码，执行结果一样，实现方式不同。

```
<script type="text/javascript">
    var arr = [1, 2, 3, 4, 5];

    // 命令式渲染：关心每步，关心流程，用命令去实现
    var newArr = [];
    for(var i = 0, len = arr.length; i < len; i++) {
        newArr.push(arr[i] * 2);
    }
    console.log(newArr);

    // 声明式渲染：不关心中间流程，只需要关心结果和实现条件
    var arr1 = arr.map(function(item) {
        return item*2;
    });
    console.log(arr1);
</script>
```

## 入门代码示例

```
<!--第一步：创建文件夹及html文件-->
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Vue入门之小明你好</title>
<!--第二步：引入Vue库-->
<script src="https://how2j.cn/study/vue.min.js"></script>
</head>
<body>
<!--第三步:创建一个Div-->
<div id="app">
<!--Vue的模板的绑定数据的方法，用两对花括号进行绑定Vue中的数据对象的属性 -->
  {{gareen.name}} 
  {{message}}
</div>
 <!--第四步：创建Vue的对象，并把数据绑定到上面创建好的div上去。-->
<script type="text/javascript">
//准备数据
var gareen = {"name":"小明","hp":616};
var app=new Vue({// 创建Vue对象。Vue的核心对象。
  el: '#app',// el属性：把当前Vue对象挂载到 div标签上，#app是id选择器
  data: {// data: 是Vue对象中绑定的数据
    message: gareen,// message 自定义的数据
    message:'你好!'
  }
})
</script>
</body>
</html>
```

输出结果：

```
小明 你好!
```

## 内部指令

### 条件语句

这几个条件指令用于显示与隐藏各类元素，使用方式如下：
**（1）v-if**

```javascript
<div v-if="isLogin">你好</div>
```

**（2）v-else**

```javascript
<div v-else>请登录后操作</div>
```

**（3）v-show**

```javascript
<div v-show="isLogin">你好</div>
```

**（4）v-else-if**

```javascript
<div v-if="type === 'A'">A</div>
<div v-else-if="type === 'B'">B</div>
<div v-else-if="type === 'C'">C</div>
<div v-else>Not A/B/C</div>
```

**（5）v-if与v-show的区别**

- v-if： 在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建，开销较高，在运行时条件很少改变时使用。
- v-show：调整css dispaly属性，开销较小，在常频繁地切换时使用。

### v-for 循环语句

```
<script src="https://how2j.cn/study/vue.min.js"></script>
   
<style>
table tr td{
    border:1px solid gray;
}
table{
    border-collapse:collapse;
    width:300px;
}
tr.firstLine{
    background-color: lightGray;
}
</style>
 
<div id="div1">
   
    <table align="center" >
        <tr class="firstLine">
            <td>name</td>
            <td>hp</td>
        </tr>
   
        <tr v-for="hero in heros">
            <td>{{hero.name}}</td>
            <td>{{hero.hp}}</td>
        </tr>
   
    </table>
 
</div>
  
<script>
  
var data = [
          {name:"盖伦",hp:341},
          {name:"提莫",hp:225},
          {name:"安妮",hp:427},
          {name:"死歌",hp:893}
    ];
new Vue({
      el: '#div1',
      data: {
          heros:data
      }
    })
  
</script>
```

### v-text 、v-html

（1）v-text
{{xxx}}取值有个弊端，当网速很慢或javascript出错时，会在页面显示{ { xxx } }，Vue提供的v-text可以解决这个问题

```
<div>{{ message }}</div>
<!-- 和下面的一样 -->
<div v-text="message"></div>
```

（2）v-html
用于输出html代码

```
<span v-html="msgHtml"></span>
```

### v-on 监听事件

(1) 常规用法

```
// html
<div>本场比赛得分：{{count}}</div>
<button v-on:click="add">加分</button>

// JS
data:{
    count: 1
},
methods: {
    add() {
        this.count++;
    }
}
```

(2)v-on可以缩写为@

```
<button @click="add">加分</button>
```

### v-bind 属性绑定

用于处理html标签的动态属性，即动态赋值。
（1）常规用法

```
// html
<img v-bind:src="imgSrc"  width="200px">
// js
data: {  
    imgSrc:'http://xxxxxxx'
}
```

（2）v-bind可以缩写为 :

```
<img :src="imgSrc"  width="200px">
```

### v-model 双向绑定

前面的例子，都是把 Vue对象上的数据显示在视图上，要把视图上的数据放到Vue对象上去就需要用到v-model进行双向绑定

```
<script src="https://how2j.cn/study/vue.min.js"></script>
  
<div id="div1">

	hero name: <input v-model="name" >
	<button @click="doClick" >提交数据</button>

</div>
   
<script>
 
new Vue({
      el: '#div1',
      data:{
		name:"teemo"
      },
      methods:{
    	  doClick:function(){
    		  alert(this.name);
    	  }
      }
    })
   
</script>
```

## 生命周期

1. 生命周期图示：

   ![vue生命周期.png](https://s1.ax1x.com/2020/10/13/0fh2HP.png)
2. 生命周期表格

| 周期          | 说明                                                                                                                                                                                                                    |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| beforeCreate  | 在实例初始化之后，数据观测和事件配置之前被调用                                                                                                                                                                          |
| created       | 在实例创建完成后被立即调用，完成数据观测，属性和方法的运算，初始化事件，$el属性未见                                                                                                                                     |
| beforeMount   | 在挂载开始之前被调用：相关的 render 函数首次被调用，只在虚拟DOM生成HTML                                                                                                                                                 |
| mounted       | 在el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用。实例已完成以下的配置：用上面编译好的html内容替换el属性指向的DOM对象。完成模板中的html渲染到html页面中。此过程中进行ajax交互                                      |
| beforeUpdate  | 在数据更新之前调用，发生在虚拟DOM重新渲染和打补丁之前。可以在该钩子中进一步地更改状态，不会触发附加的重渲染过程                                                                                                         |
| updated       | 在由于数据更改导致的虚拟DOM重新渲染和打补丁之后调用。调用时，组件DOM已经更新，所以可以执行依赖于DOM的操作。然而在大多数情况下，应该避免在此期间更改状态，因为这可能会导致更新无限循环。该钩子在服务器端渲染期间不被调用 |
| activated     | keep-alive 组件激活时调用                                                                                                                                                                                               |
| deactivated   | keep-alive 组件停用时调用                                                                                                                                                                                               |
| beforeDestroy | 在实例销毁之前调用。实例仍然完全可用                                                                                                                                                                                    |
| destroyed     | 在实例销毁之后调用。调用后，所有的事件监听器会被移除，所有的子实例也会被销毁。该钩子在服务器端渲染期间不被调用                                                                                                          |

3. 代码详情

   ```
   <!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <title>Vue入门之Helloworld</title>
       <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
   </head>
   <body>
       <div id="app">
           {{message}}
       </div>

   <script type="text/javascript">
   var app=new Vue({
       el:'#app',
       data:{
           message:'hello Vue!'
       },
       beforeCreate: function () {
           console.group('beforeCreate 创建前状态===============》');
           console.log("%c%s", "color:red" , "el      : " + this.$el); //undefined
           console.log("%c%s", "color:red","data    : " + this.$data); //undefined 
           console.log("%c%s", "color:red","message: " + this.message)  
       },
       created: function () {
           console.group('created 创建完毕状态===============》');
           console.log("%c%s", "color:red","el      : " + this.$el); //undefined
           console.log("%c%s", "color:red","data    : " + this.$data); //已被初始化 
           console.log("%c%s", "color:red","message: " + this.message); //已被初始化
       },
       beforeMount: function () {
           console.group('beforeMount 挂载前状态===============》');
           console.log("%c%s", "color:red","el      : " + (this.$el)); //已被初始化
           console.log(this.$el);
           console.log("%c%s", "color:red","data    : " + this.$data); //已被初始化  
           console.log("%c%s", "color:red","message: " + this.message); //已被初始化  
       },
       mounted: function () {
           console.group('mounted 挂载结束状态===============》');
           console.log("%c%s", "color:red","el      : " + this.$el); //已被初始化
           console.log(this.$el);   
           console.log("%c%s", "color:red","data    : " + this.$data); //已被初始化
           console.log("%c%s", "color:red","message: " + this.message); //已被初始化 
       },
       beforeUpdate: function () {
           console.group('beforeUpdate 更新前状态===============》');
           console.log("%c%s", "color:red","el      : " + this.$el);
           console.log(this.$el);  
           console.log("%c%s", "color:red","data    : " + this.$data); 
           console.log("%c%s", "color:red","message: " + this.message); 
       },
       updated: function () {
           console.group('updated 更新完成状态===============》');
           console.log("%c%s", "color:red","el      : " + this.$el);
           console.log(this.$el); 
           console.log("%c%s", "color:red","data    : " + this.$data); 
           console.log("%c%s", "color:red","message: " + this.message); 
       },
       beforeDestroy: function () {
           console.group('beforeDestroy 销毁前状态===============》');
           console.log("%c%s", "color:red","el      : " + this.$el);
           console.log(this.$el);   
           console.log("%c%s", "color:red","data    : " + this.$data); 
           console.log("%c%s", "color:red","message: " + this.message); 
       },
       destroyed: function () {
           console.group('destroyed 销毁完成状态===============》');
           console.log("%c%s", "color:red","el      : " + this.$el);
           console.log(this.$el);  
           console.log("%c%s", "color:red","data    : " + this.$data); 
           console.log("%c%s", "color:red","message: " + this.message)
       }
   })
   </script>
   </body>
   </html>
   ```

## 常用选项

### 1、computed

计算属性：主要是对原数据进行改造输出。改造输出：包括格式化数据（价格，日期），大小写转换，排序，添加符号

```javascript
computed: {
    newPrice () {
        return '￥' + this.price + '元';
    }
}
```

### 2、methods

方法属性：用于绑定html中的事件对应的方法

```javascript
methods:{
    add (num) {
        this.count += num;
    }
}
```

### 3、watch

数据变化监听器：主要用于监测data中的数据变化，迪v-model生效

```javascript
watch: {
    question(val, oldVal) {
        console.log('new: %s, old: %s', val, oldVal);
    }
}
```

### 4、filters

过滤器：通常格式化字符，使用传值

```javascript
filters: {
    filterA(value) {
        return value.toUpperCase();
    }
}
```

### 5、mixins

混入：用于减少代码污染、减少代码量、实现代码重用

```javascript
// 额外临时加入时，用于显示日志
var addLog={
    updated:function(){
        console.log("数据放生变化,变化成"+this.count+".");
    }
}

// 实例化vue
var app = new Vue({
    // 挂载实例
    el:'#app',
    // 页面数据初始化，字符，对象、数组
    data:{
        count: 100
    },
    // 混入
    mixins: [addLog]
})
```

### 6、extends

扩展：对构造器进行扩展

```javascript
// 扩展
var extendObj ={
    created: function(){
        console.log("我是被扩展出来的");
    }
}

// 实例化vue
var app = new Vue({
    // 挂载实例
    el:'#app',
    // 页面数据初始化，字符，对象、数组
    data:{
    },
    // 扩展
    extends: extendObj
})
```

## 实例事件

### 1、$on（监听事件）

**用法**：

监听当前实例上的自定义事件。事件可以由 `vm.$emit` 触发。回调函数会接收所有传入事件触发函数的额外参数。

```javascript
app.$on('reduce',function(){
    console.log('执行了reduce()');
    this.count--;
});
```

### 2、$once（执行一次的事件）

**用法**：

监听一个自定义事件，但是只触发一次。一旦触发之后，监听器就会被移除。

```javascript
app.$once('reduceOnce',function(){
    console.log('只执行一次的方法');
    this.count--;
});
```

### 3、$off（关闭事件）

**用法**：

移除自定义事件监听器。

```javascript
function off(){
    console.log('关闭事件');
    app.$off('reduce');
}
```

### 4、$emit（触发事件）

**用法**：

触发当前实例上的事件。附加参数都会传给监听器回调。

```javascript
function reduce() {
    // 事件调用
    console.log('emit事件调用');
    app.$emit('reduce');
}
```

### 完整示例代码

可以复制以下代码到 http://jsrun.net/new 网站查看运行结果。

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Vue入门之实例事件</title>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
</head>
<body>
    <div id="app">
        <div>数字：{{count}}</div>
        <button onclick="reduce()">on调用</button>
        <button onclick="reduceOnce()">once调用</button>
        <button onclick="off()">off调用</button>
    </div>

<script type="text/javascript">
var app = new Vue({
    el:'#app',
    data:{
        count: 1
    }
})
// $on 在构造器外部添加事件
app.$on('reduce',function(){
    console.log('执行了reduce()');
    this.count--;
});
// 调用
function reduce() {
    // 事件调用
    console.log('emit事件调用');
    app.$emit('reduce');
}

// $once执行一次的事件
app.$once('reduceOnce',function(){
    console.log('只执行一次的方法');
    this.count--;
});
// 调用
function reduceOnce() {
    app.$emit('reduceOnce');
}

// 关闭事件
function off(){
    console.log('关闭事件');
    app.$off('reduce');
}
</script>
</body>
</html>
```

## 自定义指令

除了核心功能默认内置的指令 (`v-model` 和 `v-show`)，Vue 也允许注册自定义指令。自定义指令通过Vue.directive来实现，主要完成内置指令不能完成的一些事情。

有的情况下，你仍然需要对普通 DOM 元素进行底层操作，这时候就会用到自定义指令。举个聚焦输入框的例子，只要你在打开这个页面后还没点击过任何内容，这个输入框就应当还是处于聚焦状态。可以注册全局或局部的自定义指令来实现这个功能：

```
<div id="app">
    <p>页面载入时，input 元素自动获取焦点：</p>
    <input v-focus>
</div>

// 1.注册一个全局自定义指令 v-focus
<script>
Vue.directive('focus', {
  // 当绑定元素插入到 DOM 中。
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})
// 创建根实例
new Vue({
  el: '#app'
})
</script>

//2.注册局部指令,这样指令只能在这个实例中使用
<script>
// 创建根实例
new Vue({
  el: '#app',
  directives: {
    // 注册一个局部的自定义指令 v-focus
    focus: {
      // 指令的定义
      inserted: function (el) {
        // 聚焦元素
        el.focus()
      }
    }
  }
})
</script>
```

### 钩子函数

指令定义函数提供了几个钩子函数（可选）：

- `bind`: 只调用一次，指令第一次绑定到元素时调用，用这个钩子函数可以定义一个在绑定时执行一次的初始化动作。
- `inserted`: 被绑定元素插入父节点时调用（父节点存在即可调用，不必存在于 document 中）。
- `update`: 被绑定元素所在的模板更新时调用，而不论绑定值是否变化。通过比较更新前后的绑定值，可以忽略不必要的模板更新。
- `componentUpdated`: 被绑定元素所在模板完成一次更新周期时调用。
- `unbind`: 只调用一次， 指令与元素解绑时调用。

### 钩子函数参数

- el：指令所绑定的元素，可以用来直接操作DOM
- binding： 一个对象，包含指令的很多信息
- vnode:：Vue编译生成的虚拟节点

## Vue组件

组件可以扩展 HTML 元素，封装可重用的代码。例如，你可能会有页头、侧边栏、内容区等组件，每个组件又包含了其它的像导航链接、博文之类的组件。

为了能在模板中使用，这些组件必须先注册以便 Vue 能够识别。有两种组件的注册类型：**全局注册**和**局部注册**。

**全局组件：**

```
<div id="app">
    <runoob></runoob>
</div>
 
<script>
// 全局注册
Vue.component('runoob', {
  template: '<h1>自定义组件!</h1>'
})
// 创建根实例
new Vue({
  el: '#app'
})
</script>
```

**局部组件：**

```
<div id="app">
    <runoob></runoob>
</div>
 
<script>
var Child = {
  template: '<h1>自定义组件!</h1>'
}
 
// 创建根实例
new Vue({
  el: '#app',
  components: {
    // <runoob> 将只在父模板可用
    'runoob': Child
  }
})
</script>
```

**Prop属性：**

prop 是子组件用来接受父组件传递过来的数据的一个自定义属性。

父组件的数据需要通过 props 把数据传给子组件，子组件需要显式地用 props 选项声明 "prop"。

**属性取值：**

```
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Vue入门 - Prop属性传值</title>
<script src="https://cdn.staticfile.org/vue/2.2.2/vue.min.js"></script>
</head>
<body>
<div id="app">
<button-props here="hello！" from-here="world！"></button-props>
</div>

<script>
new Vue({
        el: '#app',
        components:{
            "button-props":{
                template:`<div style="color:red;">参数1： {{ here }}:---参数2： {{fromHere}}</div>`,
                props:['here', 'fromHere']
            }
        }
    });
</script>
</body>
</html>
```

**动态Prop：**

```
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Vue入门 - 动态Prop</title>
<script src="https://cdn.staticfile.org/vue/2.2.2/vue.min.js"></script>
</head>
<body>
<div id="app">
	<div>
	  <input v-model="parentMsg">
	  <br>
	  <child v-bind:message="parentMsg"></child>
	</div>
</div>

<script>
// 注册
Vue.component('child', {
  // 声明 props
  props: ['message'],
  // 同样也可以在 vm 实例中像 “this.message” 这样使用
  template: '<span>{{ message }}</span>'
})
// 创建根实例
new Vue({
  el: '#app',
  data: {
	parentMsg: '父组件内容'
  }
})
</script>
</body>
</html>
```

## 完整示例代码

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Vue入门之组件</title>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
</head>
<body>
<div id="app">
    <!-- 全局组件 -->
    <div><button-counter></button-counter></div>
    <!-- 局部组件 -->
    <div><button-inner></button-inner></div>
    <!-- 常规属性传值 -->
    <div><button-props here="hello" from-here="world"></button-props></div>
    <!-- v-bind传值 -->
    <div><button-props v-bind:here="message" :from-here="message"></button-props></div>
    <!-- 父子组件调用 -->
    <div><parent></parent></div>

</div>

<script type="text/javascript">
    // 定义全局组件
    Vue.component('button-counter', {
        data: function () {
            return {
                count: 0
            }
        },
        template: '<button v-on:click="count++">全局组件显示： {{ count }}</button>'
    });

    // 子组件
    var city = {
        template:`<div>Sichuan of China</div>`
    }
    // 父组件
    var parent = {
        template:
            `<div>
                <p> Panda from China!</p>
                <city></city>
            </div>`,
        components:{
            "city": city
        }
    }

    // 实例化
    new Vue({
        el: '#app',
        data: {
            message: 'hello'
        },
        // 定义局部组件
        components:{
            "button-inner":{
                data: function() {
                    return {
                        inner: 0
                    }
                },
                template: '<button v-on:click="inner++">局部组件显示： {{ inner }}</button>'
            },
            // 取值
            "button-props":{
                template:`<div style="color:red;">参数1： {{ here }}:---参数2： {{fromHere}}</div>`,
                props:['here', 'fromHere']
            },
            // 组件注册
            "parent": parent
        }
    });
</script>
</body>
</html>
```
