title: Vuejs入门教程笔记
author: PanXiaoKang
tags:

  - Vue
  - 前端框架
  - 学习记录

categories:

  - 前端框架

date: 2022-02-08 22:48:00

---

## Vuejs的认识和特点介绍

* **Vue是一个渐进式的框架，什么是渐进式的呢？**

  * 渐进式意味着你可以将Vue作为你应用的一部分嵌入其中，带来更丰富的交互体验。
  * 或者如果你希望将更多的业务逻辑使用Vue实现，那么Vue的核心库以及其生态系统。
  * 比如Core+Vue-router+Vuex,也可以满足你各种各样的需求。
* **Vue的特点和Web开发中常见的高级功能**

  * 解耦视图和数据
  * 可复用的组件
  * 前端路由技术
  * 状态管理
  * 虚拟DOM
* **学习Vuejs的前提？**

  * 从零学习Vue开发，并不需要你具备其他类似于Angular、React，甚至是jQuery的经验。
  * 但是你需要具备一定的HTML、CSS、JavaScript基础。
  * 需要掌握的JavaScript基础知识有：ES6语法规范、ES6模块化、包管理器、原型、原型链、数组常用方法、axios、promise等。

## 尚硅谷教程笔记

* 学习地址：https://www.bilibili.com/video/BV1Zy4y1K7SH

### 模板语法

Vue模板语法有两大类：

* 插值语法：
  * 功能：用于解析标签体内容。
  * 写法：{{xxx}},xxx是js表达式，且可以直接读取到data中的所有属性。
* 指令语法：
  * 功能：用于解析标签（包括：标签属性、标签体内容、绑定事件。。。）。
  * 举例：v-bind:href="xxx" 或 简写为 ：href="xxx",xxx同样要写js表达式，且可以直接读取到data中的所有属性。
  * 备注：Vue中有很多的指令，且形式都是：v-???,此处我们只是拿v-bind举个例子。

### 数据绑定

Vue中有两种数据绑定的方式：

* 单向绑定（v-bind）:数据只能从data流向页面。
* 双向绑定（V-model）:数据不仅能从data流向页面，还可以从页面流向data.
  * 备注：
    * 双向绑定一般都应用在表单类元素上（如：input、select等）
    * v-model:value可以简写为v-model,因为v-model默认收集的就是vlaue值。

### el和data的写法

data和el有两种写法：

* el有两种写法：

  * new Vue的时候配置el属性。el:"#root"
  * 先创建Vue实例，随后再通过vm.$mount('#root')制定el的值。
* data有两种写法

  * 对象式
  * 函数式

  如何选择：目前哪种写法都可以，以后学习到组件时，data必须使用函数式，否则会报错。
* 一个重要的原则：

  * 由Vue管理的函数，一定不要写箭头函数，一旦写了箭头函数，this就不再是Vue实例了（这时指向的而是Window）。

### 理解MVVM

MVVM模型：

1. M:模型（Model）:data中的数据
2. V:视图（View）:模板代码
3. VM:视图模型（ViewModel）:Vue实例
   观察发现：
4. data中所有的属性，最后都出现在了VM身上。
5. VM身上所有的属性机Vue原型上所有属性，在Vue模板中都可以直接使用。

### 数据代理（Object.defineProperty）

```
Object.defineProperty(person,'age'.{
	vlaue:18,
	enumerable:true,//控制属性是否可以枚举（循环遍历），默认是false
	writable:true,//控制属性是否可以被修改，默认false
	configurable:true,//控制属性是否可以被删除，默认false
	...
})
```

1.Vue中的数据代理定义：通过一个对象代理对另一个对象中属性的操作（读/写）

2.Vue中数据代理的好处：

更加方便的操作data中的数据。
2.基本原理：

通过Object.defineProperty()把data对象中所有属性添加到vm上。

为每一个添加到vm上的属性，都指定一个getter/setter。

在getter/setter内部去操作（读/写）data中对应的属性。

### 事件处理

事件的基本使用：

* 使用v-on:xxx或@xxx绑定事件，其中xxx是事件名；
* 事件的回调需要配置在methods对象中，最终会在vm上；
* methods中配置的函数，不要用箭头函数，否则this就不是vm了；
* methods中配置的函数，都是被Vue所管理的函数，this的指向是vm或组件实例对象；
* @click="demo"和@click="demo($event)"效果一致，但后者可以传参；

### 事件修饰符

Vue中的事件修饰符：

* prevent：阻止默认事件（常用）；
* stop：阻止事件冒泡（常用）；
* once:事件只触发一次（常用）；
* capture：使用事件的捕获模式；
* self：只有event,target是当前操作的元素时才触发事件；
* passive：事件的默认行为立即执行，无需等待事件回调执行完毕；

### 键盘事件

1.Vue中常用的按键别名：

回车=>enter

删除=>delete(捕获“删除”和“退格”键)

退出=>esc

空格=>space

换行=>tab(特殊，必须配合keydown去使用)

上=>up

下=>down

左=>left

右=>right
2.Vue未提供别名的按键，可以使用按键原始的key值去绑定，但注意要转为caps-lock(短横线命名)

3.系统修饰键（用法特殊）：ctrl、alt、shift、meta(win键)

* 配合keyup使用：按下修饰键的同时，再按下其他键，随后释放其他键，事件才被触发。
* 配合keydown使用：正常按下即触发事件。

4.也可以使用keyCode去指定具体的按键（不推荐，因为慢慢被弃用）

5.Vue.config.keyCodes.自定义键名=键码，可以去定制按键别名

### 计算属性

1.定义：要使用的属性不存在，需要通过已有的属性计算得来。

2.原理：底层借助了Object.defineproperty方法提供的getter和setter。

3.get函数什么时候执行？

* 初次读取时会执行一次。
* 当依赖的数据发生变化时会被再次调用。

4.优势：与methods实现相比，内部有缓存机制（复用），效率更高，调试方便。

5.备注：

* 计算属性最终会出现在vm上，直接读取使用即可。
* 如果计算属性要被修改，那必须写set函数去响应修改，且set中要引起计算时依赖的数据发生改变。

### 监视属性

监视属性watch:

* 当被监视的属性变化时，回调函数自动调用，进行相关操作
* 监视的属性必须存在，才能进行监视！！
* 监视的两种写法：
  * new Vue时传入watch配置（从一开始就很明确监视谁，可以用这种写法）
  * 通过vm.$watch监视（一开始不知道，后续通过用户的行为，需要进行监视则用这种写法）

### 深度监视

* Vue中的watch默认不监测对象内部值的改变（一层）。
* 配置deep:true可以监测对象内部值的改变（多层）。

**备注：**

* Vue自身可以监测对象内部值的改变，但Vue提供的watch默认不可以！
* 使用watch时根据数据的具体结构，决定是否采用深度监视。

### watch对比computed

**computed和watch之间的区别：**

* computed能完成的功能，watch都可以完成。
* watch能完成的功能，computed不一定能完成，例如：watch可以进行异步操作。

**两个重要的小原则：**

* 所有被Vue管理的函数，最好写成普通函数，这样this的指向才是vm或组件实例对象。
* 所有不被Vue所管理的函数（定时器的回调函数、ajax的回调函数、Promise的回调函数等），最好写成箭头函数，这样this的指向才是vm或组件实例对象。

### 绑定class样式

* 字符串写法：适用于样式的类名不确定，需动态指定
* 数组写法：适用于要绑定的样式个数不确定，名字也不确定
* 对象写法：适用于要绑定的样式个数确定、名字也确定，但要动态决定用不用

### 绑定style样式

* :style="{fontSize:xxx}"，其中xxx是动态值。
* :style="[a,b]",其中a、b是样式对象。样式对象里面的key、value值不能随便写，key得是style有的样式英文。

### 条件渲染

* v-if
  * 写法：
    * v-if="表达式"
    * v-else-if="表达式"
    * v-else="表达式"
  * 适用于：切换频率较低的场景。
  * 特点：不展示的DOM元素直接被移除。
  * 注意：v-if可以和：v-else-if、v-else一起使用，但要求结构不能被“打断”。
* v-show
  * 写法：v-show="表达式"
  * 适用于：切换频率较高的场景。
  * 特点：不展示的DOM元素未被移除，仅仅是使用样式隐藏掉。
* 备注：使用v-if的时候，元素可能无法获取到，而使用v-show一定可以获取到。

### 列表渲染

v-for指令

* 用于展示列表数据
* 语法：v-for"(item,index) in xxx"  :key="yyy"
* 可遍历：数组、对象、字符串（用的很少）、指定次数（用的很少）

### key作用于原理

**面试题：react、vue中的key有什么作用？（key的内部原理）**

* 虚拟DOM中key的作用：
  * key是虚拟DOM对象的标识，当数据发生变化时，Vue会根据【新数据】生成【新的虚拟DOM】，随后Vue进行【新的虚拟DOM】与【旧的虚拟DOM】的差异比较，比较规则如下：
* 对比规则：
  * 旧虚拟DOM中找到了与新虚拟DOM相同的key：
    * 若虚拟DOM中内容没变，直接使用之前的真实DOM！
    * 若虚拟DOM中的内容变了，则生成新的真实DOM，随后替换掉页面中之前的真实DOM。
  * 旧虚拟DOM中未找到与新虚拟DOM相同的key，则创建新的真实动漫，随后渲染到页面。
* 用index作为key可能会引发的问题：
  * 若对数据进行：逆序添加、逆序删除等破坏顺序的操作：
    * 会产生没有必要的真实DOM更新==>界面效果没问题，但效率低。
  * 如果结构中还包含输入类的DOM:
    * 会产生错误的DOM更新==>界面展示有问题。
* 开发中如何选择key?
  * 最好使用每条数据的唯一标识作为key，比如id、手机号、身份证号、学号等唯一值。
  * 如果不存在对数据的逆序添加、逆序删除等破坏顺序的操作，仅用于渲染列表用于展示，使用index作为key是没有问题的。

### 列表过滤

知识点记录：将注释内容折叠起来，需要在开始和结束的位置加上//#region和//#endregion即可。

两种实现方式：

* 用watch实现
* 用computed实现

注意：当computed都watch都能实现的时候，优先使用computed，因为computed实现比较精简一些。

**用watch实现代码：**

![image-20220417215409458](C:\Users\pyk\AppData\Roaming\Typora\typora-user-images\image-20220417215409458.png)

**用computed实现代码：**

![image-20220417215533090](C:\Users\pyk\AppData\Roaming\Typora\typora-user-images\image-20220417215533090.png)

两种实现的列表过滤查询效果如下：

![image-20220417214840971](C:\Users\pyk\AppData\Roaming\Typora\typora-user-images\image-20220417214840971.png)

![image-20220417215024480](C:\Users\pyk\AppData\Roaming\Typora\typora-user-images\image-20220417215024480.png)

### 列表排序

代码如下：

![image-20220419235938254](C:\Users\pyk\AppData\Roaming\Typora\typora-user-images\image-20220419235938254.png)

效果如图：

![image-20220420000207540](C:\Users\pyk\AppData\Roaming\Typora\typora-user-images\image-20220420000207540.png)

### 总结Vue监视数据

**Vue监测数据的原理：**

* Vue会监视data中所有层次的数据。
* 如何监测对象中的数据？通过setter实现监视，且要在new Vue时就传入要监测的数据。
  * 对象中后追加的属性，Vue默认不做响应式处理。
  * 如需给后添加的属性做响应式，请使用如下API:
    * Vue.set(target, propertyName/index,value)
    * vm.$set(target,propertyName/index,value)
* 如何监测数组中的数据？
  * 通过包裹数组更新元素的方法实现，本质就是做了两件事：
    * 调用原生对应的方法对数组进行更新。
    * 重新解析模板，进而更新页面。
* 在Vue修改数组中的某个元素一定要用如下方法：
  * 使用这些API:
    * push()：往数组的最后新增元素
    * pop()：删除最后一个元素
    * shift()：删除第一个元素
    * unshift()：往数组第一位添加元素
    * splice()：在数组指定位置插入、删除或替换某个元素
    * sort()：对数组进行排序
    * reverse()：对数组进行反转
  * Vue.set()或vm.$set(),但在Vue实例中vm.$set()一般写为this.$set()

**特别注意：**Vue.set()和vm.$set()不能给vm或vm的根数据（即vm._data）对象添加属性！！！

**数据劫持的含义：**在Vue中其实就是通过Object.defineProperty来劫持对象属性的setter和getter操作，并“种下”一个监听器，当数据发生变化的时候发出通知。

### 收集表单数据

若：< input type="text" />,则v-model收集的是value值，用户输入的就是value值。

若： < input type="radio" />,则v-model收集的是value值，且要给标签配置value值。

若：< input type="checkbox" />

* 没有配置input的value属性，那么收集的就是checked(都选 or 未勾选，是布尔值)
* 配置input的value属性：
  * v-model的初始值是非数组，那么收集的就是checked（勾选 or 未勾选），是布尔值
  * v-mode的初始值是数组，那么收集的就是value组成的数组

备注：v-model的三个修饰符：

* lazy：失去焦点再收集数据
  * number：输入字符串转为有效的数字
  * trim：输入首尾空格过滤

### 过滤器

定义：对要显示的数据进行特定格式化后再显示（适用于一些简单逻辑的处理）。

语法：

> 1.注册过滤器：全局注册为Vue.filter(name,callback)或局部注册为new Vue{filters:{}}
>
> 2.使用过滤器：`{xxx|过滤器名}`或v-bind:属性="xxx |过滤器名"

备注：

* 过滤器也可以接受额外参数、多个过滤器也可以串联
* 并没有改变原本的数据，是产生新的对应的数据

### 常用的指令

V-bind:单向绑定解析表达式，可简写为 :xxx

v-mode:双向数据绑定

v-for:遍历数组/对象/字符串

v-on:绑定事件监听，可简写为@

v-if:条件渲染（动态控制节点是否存在）

v-else:条件渲染（动态控制节点是否不存在）

v-show：条件渲染(动态控制节点是否展示)

v-text指令：

* 作用：向其所在的节点中渲染文本内容。
* 与插值语法的区别：v-text会替换掉节点中的内容，{{xx}}则不会。

### v-html指令

**作用：**向指定节点中渲染包含html结构的内容。

**与插值语法的区别：**

* v-html会替换掉节点中所有内容，{{XXX}}则不会。
* v-html可以识别html结构。

**严重注意：v-html有安全性问题！！！！**

* 在网站上动态渲染任何HTML是非常危险的，容易导致XSS攻击。
* 一定要在可信的内容上使用v-html,永远不要用在用户提交的内容上！

### v-cloak指令

v-cloak指令（没有值）：

* 本质是一个特殊属性，Vue实例创建完毕并接管容器后，会删掉v-cloak属性。
* 使用css配合v-cloak可以解决网速慢时页面展示出{{xxx}}的问题。

### v-once指令

* v-once所在节点在初次动态渲染后，就视为静态内容了。
* 以后数据的改变不会引起v-conce所在结构的更新，可以用于优化性能。

### v-pre指令

* 跳过其所在节点的编译过程。
* 可利用它跳过：没有使用指令语法、没有使用插值语法的节点，会加快编译。

### 指定义指令

Vue模板语法有2大类：

* 插值语法：
  * 功能：用于解析标签体内容。
  * 写法：{{xxx}},xxx是js表达式，且可以直接读取到data中的所有属性。
* 指令语法：
  * 功能：用于解析标签（包括：标签属性、标签体内容、绑定事件……）。
  * 举例：v-bind:href="xxx" 或简写为 :href="xxx",xxx同样要写js表达式，且可以直接读取到data中的所有属性。
  * 备注：Vue中有很多的指令，且形式都是：v-???，此处我们只是拿v-bind举个例子。

### 自定义指令_总结

* 语义语法：

  * 局部指令：

    * new Vue({

      directives:{指令名，配置对象或回调函数}

    })
  * 全局指令：

    * Vue.directive(指令名，配置对象或回调函数 )
* 配置对象中常用的3个问题：

  * bind:指令与元素成功绑定时调用。
  * inserted:指令所在元素被插入页面时调用。
  * update:指令所在模板结构被重新解析时调用。
* 备注：

  * 指令定义时不加v-,但使用时要加v-。
  * 指令名如果是多个单词，要使用kebab-case（用-分开）命名方式，不要用camelCase（驼峰）命名。

### 引出生命周期

**生命周期：**

* 又名：生命周期回调函数、生命周期函数、生命周期钩子。
* 是什么：Vue在关键时刻帮我们调用的一些特殊名称的函数。
* 生命周期函数的名字不可更改，但函数的具体内容是程序员根据需求编写的。
* 生命周期函数中的this指向是vm或组件实例对象。

### 生命周期_总结

**常用的生命周期钩子：**

* mounted（挂载完毕）：发送ajax请求、启动定时器、绑定自定义事件、订阅消息等【初始化操作】。
* beforeDestroy（销毁前）:清除定时器、解绑自定义事件、取消订阅消息等【收尾工作】。

**关于销毁Vue实例：**

* 销毁后借助Vue开发者工具看不到任何信息。
* 销毁后自定义事件会失效，但原生DOM事件依然有效。
* 一般不会在beforeDestroy操作数据，因为即便操作数据，也不会再触发更新流程了。

### 对组件的理解

组件的定义：实现应用中局部功能代码和资源的集合。

传统方式编写应用存在的问题：

* 依赖关系混乱，不好维护。
* 代码复用率不高。

#### 模块与组件、模块化与组件化

**模块**

* 理解：向外提供特定功能的js程序，一般就是一个js文件
* 为什么用：js文件可能会很多很复杂
* 作用：复用js，简化js的编写，提供js运行效率

**组件**

* 理解：用来实现局部（特定）功能效果的代码集合（html/css/js/image......）
* 为什么用：一个界面的功能可能会很复杂
* 作用：复用编码，简化项目编码，提供运行效率

**模块化**

当应用中的js都以模块来编写的，那这个应用就是一个模块化的应用。

**组件化**

当应用中的功能都是多组件的方式来编写的，那这个应用就是一个组件化的应用。

### 非单文件组件

组件有两种编写形式：非单文件组件和单文件组件。

#### Vue中使用组件的三大步骤

* 定义组件（创建组件）
* 注册组件
* 使用组件（写组件标签）

#### 如何定义一个组件

使用Vue.extend(options)创建，其中option和new Vue(option)时传入的那个option几乎一样，但也有点区别，如下：

* el不要写，为什么？——最终所有的组件都要经过一个vm的管理，由vm中的el决定服务哪个容器。
* data必须写成函数，为什么？——避免组件被复用时，数据存在引用关系。

备注：使用template可以配置组件结构。

#### 如何注册组件

* 局部注册：靠new Vue的时候传入component选项
* 全局注册：靠Vue.component('组件名',组件)

#### 编写组件标签

例如：< school>< /school>

通过标签的形式去使用组件。

### 组件的几个注意点

* 关于组件名：
  * 一个单词组成：
    * 第一种写法（首字母小写）：school
    * 第二种写法（首字母大学）：School
  * 多个单词组成：
    * 第一种写法（kebab-case命名）：my-shcool
    * 第二种写法（CamelCase命名）：MySchool(需要Vue脚手架支持)
  * 备注：
    * 组件名尽可能回避HTML中已有的元素名称，例如：h2、H2都不行
    * 可以使用name配置项指定组件在开发者工具中呈现的名字。
* 关于组件标签：
  * 第一种写法：< school>< /shchool>
  * 第二种写法： < school/>
  * 备注：不用Vue脚手架时,< school/>会导致后续相同组件不能渲染，只渲染一次。
* 一个简写方式：
  * const school = Vue.extend(options)可简写为：const school = options

### 组件的嵌套

### VueComponent构造函数

**关于VueComponent:**

* school组件本质是一个名为VueComponent的构造函数，且不是程序员定义的，是Vue.extend生成的。
* 我们只需要写< school/>或< school>< /school>，Vue解析时会帮我们创建school组件的实例对象，即Vue帮我们执行的：new VueComponent(options)。
* 特别注意：每次调用Vue.extend,返回的都是一个全新的VueComponent！！！
* 关于this指向：
  * 组件配置中：
    * data函数、methods中的函数、watch中的函数、computed中的函数，它们的this均是【VueComponent实例对象】。
  * new Vue(options)配置中：
    * data函数、methods中的函数、watch中的函数、computed中的函数，它们的this均是【Vue实例对象】。
* VueComponent的实例对象，以后简称vc(也可称之为：组件实例对象)。
* Vue的实例对象，以后简称vm。

### Vue实例与组件实例

Vue的实例对象vm与组件的实例对象vc几乎99%是一样的，但是仅有几点是不同的：

* vm的实例对象可以写el元素，可以指定去为哪个容器服务。但是vc的实例对象不能写el，只能跟着父组件嵌套使用。
* vm里的data可以是data:{}或data():{}两种写法，但是vc的data必须是data():{}的函数式，确保每次调用都返回最新的数据。

### 一个重要的内置关系

* 一个重要的内置关系：VueComponent .prototype.__ proto __ === Vue.prototype
* 为什么要有这个关系：让组件实例对象（vc）可以访问到Vue原型上的属性、方法。

### 单文件组件

### 创建Vue脚手架

### 分析脚手架结构

![image-20220525000856768](C:\Users\pyk\AppData\Roaming\Typora\typora-user-images\image-20220525000856768.png)

### render函数

关于不同版本的Vue:

* vue.js与vue.runtime.xxx.js的区别：
  * vue.js是完整版的Vue,包含：核心功能+模板解析器。
  * vue.runtime.xxx.js是运行版的Vue,只包含：核心功能，没有模板解析器。
* 因为vue.runtime.xxx.js没有模板解析器，所以不能使用template配置项，需要使用render函数接收到的createElement函数去指定具体内容。

### 修改默认配置

**Vue.config.js配置文件：**

* 使用"vue inspect > output.js" 命令可以查看到Vue脚手架的默认配置。
* 使用vue.config.js可以对脚手架进行个性化定制，详情见： https://cli.vuejs.org/zh

### ref属性

* ref被用来给元素或子组件注册引用信息（id的替代者）。引用信息将会注册在父组件的 `$`refs对象上。如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素；如果用在子组件上，引用就指向该子组件实例。通俗的讲，ref特性就是为元素或子组件赋予一个ID引用,通过this.$refs.refName来访问元素或子组件的实例。
* 应用在html标签上获取的是真实DOM元素，应用在组件标签上是组件实例对象（vc）
* 使用方式：
  * 打标识： < h1 ref="xxx" > .......< /h1> 或 < School ref ="xxx" >< /School>
  * 获取：this.$refs.xxx

### this.$refs介绍

this.$refs是一个对象，持有当前组件中注册过 ref特性的所有 DOM 元素和子组件实例

> **注意：** $refs只有在组件渲染完成后才填充，在初始渲染的时候不能访问它们，并且它是非响应式的，因此不能用它在模板中做数据绑定；当ref和v-for一起使用时，获取到的引用将会是一个数组，包含循环数组源

### props配置

**配置项props**

功能：让组件接受外部传过来的数据

* 传递数据：< Demo name="xxx" />
* 接收数据：

  * 第一种方式（只接收）：props:['name']
  * 第二种方式（限制类型）：props:{name:String}
  * 第三种方式（限制类型、限制必要性、指定默认值）：

    props:{

    name:{

    type:String,//类型

    required:true,//必要性

    default:'老王'//默认值

    }

    }

**备注：**props是只读的，Vue底层会监测你对props的修改，如果进行了修改，就会发出警告，若业务需求确定需要修改，那么请复制props的内容到data中一份，然后去修改data中的数据。

### mixin混入

功能：可以把多个组件共用的配置提取成一个混入对象

使用方式：

* 第一步定义混合，例如：

  {

  data(){......},

  methods:{......}

  ......

  }
* 第二步使用混入，例如：

  * 全局混入：Vue.mixin(xxx)
  * 局部混入：mixins:['xxx']

### 插件

* 功能：用于增强Vue
* 本质：包含install方法的一个对象，install的第一个参数是Vue,第二个以后的参数是插件使用者传递的数据。
* 定义插件：

  对象.install = function（Vue,options）{

  //1.添加全局过滤器

  Vue.filter(......)

  //2.添加全局指令

  Vue.directive(......)

  //3.配置全局混入

  Vue.mixin(......)

  //4.添加实例方法

  Vue.prototype.$myMethod = function(){...}

  Vue.prototype.$myProperty = xxxx

  }
* 使用插件：Vue.use(插件对象)

### scoped样式

作用：让样式在局部生效，防止同名时引起冲突。

写法：< style scoped>

### TodoList案例_总结

* 组件化编程流程：
  * 拆分静态组件：组件要按照功能点拆分，命名不要与html元素冲突。
  * 实现动态组件：考虑好数据的存放位置，数据是一个组件在用，还是一些组件在用：
    * 一个组件在用：放在组件自身即可。
    * 一些组件在用：放在他们共同的父组件上（状态提升）。
  * 实现交互：从绑定事件开始。
* props适用于：
  * 父组件==>子组件 通信
  * 子组件==> 父组件通信（要求父先给子一个函数）
* 使用v-model时要切记：v-model绑定的值不能是props传过来的值，因为props是不可修改的!
* props传过来的若是对象类型的值，修改对象中的属性时Vue不会报错，但不推荐这样做。

### 浏览器的本地存储

**WebStorage**

* 存储内容大小一般支持5MB左右（不同浏览器可能还不一样）
* 浏览器端通过Window.sessionStorage和Window.localStorage属性来实现本地存储机制。
* 相关API:
  * xxxxStorage.setItem('key','value')：该方法接受一个键和值作为参数，会把键值对添加到存储中，如果键名存在，则更新其对应的值。
  * xxxxStorage.getItem('person')：该方法接受一个键名作为参数，返回键名对应的值。
  * xxxxStorage.removeItem('key')：该方法接受一个键名作为参数，并把该键名从存储中删除。
  * xxxxStorage.clear()：该方法会清空存储中的所有数据。
* 备注：
  * SessionStorage存储的内容会随着浏览器窗口关闭而消失。
  * LocalStorage存储的内容，需要手动清除才会消失。
  * xxxxStorage.getItem(xxx)如果xxx对应的value值获取不到，那么getItem的返回值是null
  * JSON.parse(null)的结果依然是null。

### TodoList_本地存储

![image-20220614224746306](C:\Users\pyk\AppData\Roaming\Typora\typora-user-images\image-20220614224746306.png)

deep:true：开启深度监视。

### 组件的自定义事件_绑定

![image-20220614231127119](C:\Users\pyk\AppData\Roaming\Typora\typora-user-images\image-20220614231127119.png)

![image-20220614231312780](C:\Users\pyk\AppData\Roaming\Typora\typora-user-images\image-20220614231312780.png)

备注："...params"写法是ES6里的方式，如果存在参数比较多的时候这样写是为了封装成数组的形式传过去，再通过params取即可。

### 组件自定义事件_解绑

![image-20220614233034154](C:\Users\pyk\AppData\Roaming\Typora\typora-user-images\image-20220614233034154.png)

![image-20220614232921520](C:\Users\pyk\AppData\Roaming\Typora\typora-user-images\image-20220614232921520.png)

### 组件自定义事件_总结

* 一种组件间通信的方式，适用于：子组件===>父组件
* 使用场景：A是父组件，B是子组件，B想给A传数据，那么就要在A中给B绑定自定义事件（事件的回调在A中）
* 绑定自定义事件：

  * 第一种方式，在父组件中：< Demo @atguigu="test"/ >或< Demo v-on:atguigu="test"/ >
  * 第二种方式，在父组件中：

    > < Demo ref="demo" />
    >
    > ……
    >
    > mounted(){
    >
    > this.$refs.xxx.$on('atguigu',this.test)
    >
    > }
    >
  * 若想让自定义事件只能触发一次，可以使用once修饰符，或$once方法
* 触发自定义事件：this.$emit('atguigu',数据)
* 解绑自定义事件：this.$off('atguigu')
* 组件上也可以绑定原生DOM事件，需要使用native修饰符，例如@click.native,此时组件就知道click是原生DOM事件。
* 注意：通过this.$refs.xxx.$on('atguigu',回调)绑定自定义事件时，回调要么配置在methods中，要么使用箭头函数，否则this指向会出问题！

### 全局事件总线(GlobalEventBus)

1.一种组件间通信的方式，适用于任意组件间通信。

2.安装全局事件总线：

```
new Vue({
	......
	beforeCreate(){
		Vue.prototype.$bus = this //安装全局事件总线，$bus就是当前应用的vm
	},
	......
})
```

3.使用事件总线：

1. 接收数据：A组件想接收数据，则在A组件中给$bus绑定自定义事件，事件的 `回调留在A组件自身`。

```
methods(){
	demo(data){......}
}
......
mounted(){
	this.$bus.$emit('xxxx',this.demo)
}
```

2. 提供数据：this.$bus.$emit('xxxx',数据)

4.最好在beforeDestroy钩子中，用$off去 `解绑当前组件所用到的`事件。

### 消息订阅与发布（pubsub）

1.一种组件间通信的方式，适用于 `任意组件间通信。`

2.使用步骤：

* 安装pubsub: npm i pubsub-js
* 引入：import pubsub from 'pubsub-js'
* 接收数据：A组件想接收数据，则在A组件中订阅消息，订阅的 `回调留在A组件自身。`

```
methods(){
	demo(data){......}
}
.......
mounted(){
	this.pid = pubsub.subscribe('xxx',this.demo)//订阅消息
}
```

* 提供数据：pubsub.publish('xxx',数据)//发布消息
* 最好在beforeDestroy钩子中，用PubSub.unsubscribe(pid)去 `取消订阅`。

### TodoList案例_编辑

### $nextTick

1.语法：this.$nextTick(回调函数)

2.作用：在 `下一次`DOM更新结束后指向其指定的回调

3.什么时候用：当改变数据后，要基于更新后的新DOM进行某些操作时，要在nextTick所指定的回调函数中执行。

### 总结过度与动画

作用：在插入、更新或移除DOM元素时，在合适的时候给元素添加样式类名。

**1.准备好样式：**

* 元素进入的样式：
  * v-enter:进入的起点
  * v-enter-active:进入过程中
  * v-enter-to:进入的终点
* 元素离开的样式：
  * v-leave:离开的起点
  * v-leave-active:离开过程中
  * v-leave-to:离开的终点

**2.使用< transition>包裹要过度的元素，并配置name属性：**

```
< transition name="hello">
	<h1 v-show="isShow">你好啊！</h1>
< /transition>
```

**3.备注：若有多个元素需要过度，则需要使用：< transition-group>,并且每个元素都要指定key值。**

### Vue脚手架配置代理

#### 方法一

在vue.config.js中添加如下配置：

```
devServer:{
	proxy:"http://localhost:5000"
}
```

说明：

* 优点：配置简单，请求资源时直接发给前端（8080）即可。
* 缺点：不能配置多个代理，不能灵活的控制请求是否走代理。
* 工作方式：若按照上述配置代理，当请求了前端不存在的资源时，那么该请求才会转发给服务器（优先匹配前端资源）

#### 方法二

编写vue.config.js配置具体代理规则：

```
module.exports = {
	devServer:{
		proxy:{
			'/api1':{//匹配所有以'/api1'开头的请求路径
				target:'http://localhost:5000',//代理目标的基础路径
				changeOrigin:true,
				pathRewrite:{'^/api1',''}//路径重定向，发给服务器时去掉api1的路径
			},
			'/api2':{//匹配所有以'/api2'开头的请求路径
				target:'http://localhost:5001',//代理目标的基础路径
				changeOrigin:true,
				pathRewrite:{'^/api2',''}
			}
		}
	}
}
/*
	changeOrigin设置为true时，服务器收到的请求头中的host为：localhost：5000
	changeOrigin设置为false时，服务器收到的请求头中的host为：localhost：8080
	changeOrigin不写时默认值为true
*/
```

说明：

* 优点：可以配置多个代理，且可以灵活的控制请求是否走代理。
* 缺点：配置略微繁琐，请求资源时必须加前缀。

### 静态组件

### vue-resource

发送ajax请求的库有：

1.xhr

2.jQuery

3.axios（通用的Ajax请求库，官方推荐，使用广泛）

4.fetch

5.vue-resource（Vue1.0版本时使用广泛，官方已不再维护）

### 插槽

* 作用：让父组件可以向子组件指定位置插入html结构，也是一种组件间通信的方式，适用于 `父组件===>子组件`。
* 分类：默认插槽、具名插槽、作用域插槽
* 使用方式

  * 默认插槽：

    ```
    父组件中：
    		<Category>
    			<div>html结构1</div>
    		</Category>
    子组件中：
    		<template>
    			<div>
    				<!--定义插槽-->
    				<slot>插槽默认内容。。。</slot>
    			</div>
    		</template>
    ```
  * 具名插槽：

    ```
    父组件中：
    		<Category>
    				<!--slot和v-slot效果一样，只是v-slot是更新版本后的写法，v-slot可以简写为# -->
    			<template slot="center">
    				<div>html结构1</div>
    			</template>

    			<template v-slot="footer">
    				<div>html结构2</div>
    			</template>
    		</Category>
    子组件中：
    		<template>
    			<div>
    				<!--定义插槽-->
    				<slot name="center">插槽默认内容。。。</slot>
    				<slot name="footer">插槽默认内容。。。</slot>
    			</div>
    		</template>
    ```
  * 作用域插槽：

    * 理解：`数据在组件的自身，但根据数据生成的结构需要组件的使用者来决定。`（games数据在Category组件中，但使用数据所遍历出来的结构由App组件决定）
    * 具体编码：

    ```
    父组件中：
    		<Category>
    			<!--scope和slot-scope效果一样-->
    			<template scope="scopeDate">
    				<!--生成的是ul列表-->
    				<ul>
    					<li v-for="g in scopeData.games" :key="g">{{g}}</li>
    				</ul>
    			</template>

    			<template slot-scope="scopeDate">
    				<!--生成的是h4标题-->
    				<ul>
    					<h4 v-for="g in scopeData.games" :key="g">{{g}}</h4>
    				</ul>
    			</template>
    		</Category>
    子组件中：
    		<template>
    			<div>
    				<slot :games="games"></slot>
    			</div>
    		</template>

    		<script>
    			export default{
    				name:'Category',
    				props:['title'],
    				//数据在子组件自身
    				data(){
    					return{
    						games:['红色警戒'，'使命召唤'，'QQ飞车'，'超级玛丽'，]
    					}
    				},
    			}
    		</script>
    ```

### Vuex简介

#### vuex是什么

1.概念：

Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式和库，它可以帮助我们管理应用程序中的共享状态，并提供了一些工具和规则来保证状态的一致性。Vuex 可以理解为是一个全局的数据仓库，存放应用级别的数据，让组件共享数据。Vuex 的主要用途是解决组件之间共享状态的问题，可以让我们更方便地管理和维护应用程序的状态。也是一种组件间通信的方式，且适用于任意组件间通信。

2.官网地址：[https://vuex.vuejs.org/zh/](https://vuex.vuejs.org/zh/)

#### 什么时候使用Vuex

* 多个组件依赖于同一状态
* 来自不同组件的行为需要变更同一状态

### 搭建Vuex环境

1.创建文件：`src/store/index.js`

```
//引入Vue核心库
import Vue from 'vue'
//引入Vuex
import Vuex from 'vuex'
//使用Vuex插件
Vue.use(Vuex)

//准备actions对象--响应组件中用户的动作
const actions = {}
//准备mutations对象--修改state中的数据
const mutations = {}
//准备state对象--保存具体的数据
const state = {}

//创建并暴露store
export default new Vuex.Store({
	actions,
	mutations,
	state
})
```

2.在 `mainjs`中创建vm时传入 `store`配置项

```
......
//引入store
import store from './store'
......

//创建vm
new Vue({
	el:'#app',
	render: h=>(App),
	store
})
```

### Vuex开发者工具的使用

1.初始化数据、配置actions、配置mutations，操作文件store.js

2.组件中读取vuex中的数据：$store.state.sum

3.组件中修改vuex中的数据：$store.dispatch('action中的方法',数据)或$store.commit('mutations中的方法名',数据)

`备注：若没有网络请求或其他业务逻辑，组件中也可以越过actions，即不写dispatch，直接编写commit.`

### getters配置项

1.概念：当state中的数据需要经过加工后再使用时，可以使用getters加工。

2.在 `store.js`中追加 `getters`配置

```
......
const getters={
	bigSum(state){
		return state.sum*10
	}
}
```

3.组件中读取数据：``$store.getters.bigSum``

### 四个map方法的使用

**1.mapState方法：用于帮助我们映射 `state`中的数据为计算属性**

```
computed:{
	//借助mapState生成计算属性：sum、school、subject（对象写法）
	...mapState({sum:'sum',school:'school',subject:'subject}'),

	//借助mapState生成计算属性：sum、school、subject（数组写法）
	...mapState(['sum','school','shuject'])
}
```

**2.mapGetters方法：用于帮助我们映射 `getters`中的数据为计算属性**

```
computed:{
	//借助mapGetters生成计算属性：bigSum（对象写法）
	...mapState({bigSum:'bigSum'),

	//借助mapGetters生成计算属性：bigSum（数组写法）
	...mapState(['bigSum'])
}
```

3.mapActions方法：用于帮助我们生成与 actions对话方法，即：包含 `$store.dispatch(xxx)的函数)`

```
methods:{
	//靠mapActions生成，incrementOdd、incrementWait(对象形式)
	...mapActions({incrementOdd:'jiaOdd',incrementWait:'jiaWait'}))
}
	//靠mapActions生成，incrementOdd、incrementWait(数组形式)
	...mapActions(['jiaOdd','jiaWait']))
}
```

4mapMutations方法：用于帮助我们生成与 mutations对话方法，即：包含 `$store.commit(xxx)的函数)`

```
methods:{
	//靠mapActions生成，increment、increment(对象形式)
	...mapActions({incrementOdd:'JIA',incrementWait:'JIAN'}))
}
	//靠mapMutations生成，JIA、JIAN(对象形式)
	...mapActions(['JIA','JIAN']))
}
```

`备注`:mapAcitons与mapMutations使用时，若需要传递参数需要：在模板中绑定事件时传递好参数，否则参数是事件对象。

### 多组件共享数据

### Vuex模块化

**模块化+命名空间（namespaced）**

1.目的：让代码更好维护，让多种数据分类更加明确。

2.修改store.js

```
const countAbout={
	namespaced:true,//开启命名空间
	state:{x:1},
	mutations:{...},
	actions:{...},
	getters:{
	  bigSum(state){
		return state.sum*10
		}
	}
}

const personAbout={
	namespaced:true,//开启命名空间
	state:{...},
	mutations:{...},
	actions:{...}
}

const store=new Vuex.Store({
	modules:{
	  countAbout,
	  personAbout
	}

})
```

3.开启命名空间后，组件中读取state数据：

```
//方式一：自己直接读取
this.$store.state.personAbout.list
//方式二：借助mapState读取
...mapState('countAbout',['sum','school','subject']),
```

4.开启命名空间后，组件中读取getters数据：

```
//方式一：自己直接读取
this.$store.getters['personAbout/firstPersonName']
//方式二：借助mapGetters读取
...mapGetter('countAbout',['bigSum'])
```

5.开启命名空间后，组件中调用dispatch

```
//方式一：自己直接dispatch
this.$store.dispatch('personAbout/addPersonWang',person)
//方式二：借助mapActions
...mapActions('countAbout',{incrementOdd:'jiaOdd',incrementWait:'jiaWait'})
```

6.开启命名空间后，组件中调用commit

```
//方式一：自己直接commit
this.$store.commit('personAbout/ADD_PERSON',person)
//方式二：借助mapMutations
...mapMutations('countAbout',{increment:'JIA',decrement:'JIAN'})
```

### 路由的简介

#### vue-router的理解

vue的一个插件库，专门用来实现SPA应用。

#### 对SPA应用的理解

* 单页Web应用（single page web application,SPA）
* 整个应用只有一个完整的页面。
* 点击页面中的导航链接不会刷新页面，只会做页面的局部更新。
* 数据需要通过ajax请求获取。

#### 路由的理解

**1、什么是路由？**

1、一个路由就是一组映射关系（key-value）

2、key为路径，value可能是function或component
**2、路由分类**

1、后端路由：

* 理解：value是function，用于处理客户端提交的请求。
* 工作过程：服务器接收到一个请求时，工具请求路径找到匹配的函数来处理请求，返回响应数据。

2、前端路径：

* 理解：value是component，用于展示页面内容。
* 工作过程：当浏览器的路径改变时，对应的组件就会显示。

### 路由的基本使用

#### 路由

1、理解：一个路由（route）就是一组映射关系（key-value），多个路由需要路由器（router）进行管理。

2、前端路由：key是路径，value是组件。

#### 基本使用

1、安装vue-router,命令:``npm i vue-router``

2.应用插件：Vue.use(VueRouter)

3、编写router配置项：

```
//引入VueRouter
import VueRouter from 'vue-router'
//引入路由组件
import About from '../components/About'
import Home from '../components/Home'

//创建router实例对象，去管理一组一组的路由规则
const router = new VueRouter({
	routers:[
		{
			path:'/about',
			component:About
		},
		{
			path:'/home',
			component:Home
		},
	]
})
```

4、实现切换（active-class可配置高亮样式）

```
<router-link active-class="active" to="about">About< /router-link>
```

5、指定展示位置

```
<router-view>< /router-view>
```

### 路由的几个注意点

* 路由组件通常存放在pages文件夹，一般组件通常存放在components文件夹。
* 通过切换，隐藏了的路由组件，默认是被销毁的，需要的时候再去挂载。
* 每个组件都有自己的 `$route`属性，里面存储着自己的路由信息。
* 整个应用只有一个router，可以通过组件的 `$router`属性获取到。

### 嵌套（多级）路由

1、配置路由规则，使用children配置项：

```
routes:[
	{
		path:'/about',
		component:About,
	},
	{
		path:'/home',
		component:Home,
		children:[
			{
				path:'news',//此处一定不要写：/news
				component:News
			},
			{
				path:'message',//此处一定不要写：/message
				component:Message
			},


		]
	},
]
```

2、跳转（要写完整路径）：

```
< router-link to="/home/news">News< /router-link>
```

### 路由的query参数

1、传递参数

```
<!--跳转并携带query参数，to的字符串写法 -->
<router-link :to="/home/message/detail?id=666&title=你好">跳转< router-link>

<!--跳转并携带query参数，to的对象写法（推荐这种） -->
<router-link 
:to="{
	path:'/home/message/detail',
	query:{
		id:666,
		title:'你好'
	}
}"
>跳转< router-link>
```

2、接受参数

```
$route.query.id
$route.query.title
```

### 命名路由

1、作用：可以简化路由的跳转

2、如何使用

1.1 给路由命名：

```
{
	path:'demo',
	component:Demo,
	children:[
		{
			name:'hello',//给路由命名
			path:'welcome',
			component:Hello,
		}
	]
}
```

1.2 简化跳转：

```
<!--简化前，需要写完整的路径 -->
<route-link to="/demo/test/welcome">跳转< /router-linke>

<!--简化后，直接通过名字跳转 -->
<route-link :to="{name:'hello'}">跳转< /router-linke>

<!--简化后配合传递参数 -->
<route-link 
	:to="{
		name:'hello'
		query:{
			id:666,
			title:'你好'
		}
	}"
>跳转< /router-linke>
```

### 路由的Params参数

1、配置路由，声明接受params参数

```
{
	path:'/home',
	component:Home,
	children:[
		{
			path:'news',
			component:News
		},
		{
			component:Message,
			children:[
					{
						name:'xiangqing',
						path:'detail/:id/:title',//使用占位符声明接受params参数
						component:Detail
					}
				]
		}
	]
}
```

2、传递参数

```
<!--跳转并携带parmas参数，to的字符串写法 -->
<router-link :to="/home/message/detail/666/你好">跳转< router-link>

<!--跳转并携带parmas参数，to的对象写法 -->
<router-link 
:to="{
	name:'xiangqing',
	query:{
		id:666,
		title:'你好'
	}
}"
>跳转< router-link>
```

`特别注意：路由携带params参数时，若使用to的对象写法，则不能使用path配置项，必须使用name配置！`

3、接受参数

```
$route.params.id
$route.params.title
```

### 路由的props配置

作用：让路由组件更方便的收到参数

```
{
	name:'xiangqing',
	path:'detail/:id',
	component:Detail,

	//第一种写法，props值为对象，该对象中所有的key-value的组合最终都会通过props传给Detail组件
	//props:{a:900}

	//第二种写法，props值为布尔值，则把路由收到的所有params参数通过props传给Detail组件
	//props:true

	//第三种写法(推荐)，props值为函数，该函数返回的对象中每一组key-value都会通过props传给Detail组件
	//props(route):{
		return {
			id:route.query.id,
			title:route.query.title
		}
	}
}
```

### router-linke的replace属性

1.作用：控制路由跳转时操作浏览器历史记录的模式

2.浏览器的历史记录有两种写入方式：分别为push和replace,push是追加历史记录，replace是替换当前记录，路由跳转时候默认为push

3.如何开启replace模式：

```
< router-link replace ......>News< /router-link>
```

### 编程式路由导航

1.作用：不借助< router-link>实现路由跳转，让路由跳转更加灵活。因为< router-link>默认转换的html结构是< a>标签，有时候使用的是按钮就不能再使用它。

2.具体编码：

```
//$router的两个API,push和replace
this.$router.push({
	name:'xiangqing',
	params:{
		id:xxx,
		title:xxx
	}
})

this.$router.replace({
	name:'xiangqing',
	params:{
		id:xxx,
		title:xxx
	}
})
this.$router.forward()//前进
this.$router.back()//后退
this.$router.go(x)//可前进可后退,x为正数表示前进x次，x为负数表示后退x次
```

### 缓存路由组件

1、作用：让不展示的路由组件保持挂载，不被销毁。

2、具体编码：

```
//include表示需缓存的组件名，不写默认全部缓存
< keep-alive include="News">
	< router-view></ router-view>
```

### 两个新的生命周期钩子

1、作用：路由组件所独有的两个钩子，用于捕获路由组件的激活状态。

2、具体名字：

* `activated`路由组件被激活时触发。
* `deactivated`路由组件失活时触发。

### 路由守卫

1、作用：对路由进行权限控制

2、分类：全局守卫、独享守卫、组件内守卫

3、全局守卫：

```
//全局前置守卫：初始化是执行、每次路由切换前执行
router.beforeEach((to,from,next)=>{
	console.log('beforeEach',to,from)
	if(to.meta.isAuth){//判断当前路由是否需要进行权限控制
if(localStorage.getItem('school')==='atguigu'){//权限控制的具体规则
	next()//放行
}else{
	alert('暂无权限查看')
	//next({name:'guanyu'})
}

	}else{
	next()//放行
}

})

//全局后置守卫：初始化是执行、每次路由切换后执行
router.afterEach((to,from)=>{
	console.log('afterEach',to,from)
	if(to.meta.title){
		document.title = to.meta.title//修改网页的title
}else{
	document.title = 'vue_test'
}
})
```

4、独享守卫

```
beforEnter((to,from,next)=>{
	console.log('beforeEnter',to,from)
	if(to.meta.isAuth){//判断当前路由是否需要进行权限控制
		if(localStorage.getItem('school')==='atguigu'){//权限控制的具体规则
	next()//放行
}else{
	alert('暂无权限查看')
	//next({name:'guanyu'})
}

	}else{
	next()//放行
}

}
})
```

5、组件内守卫

```
//进入守卫，通过路由规则，进入该组件时被调用
beforeRouterEnter(to,from,next){
},
//离开守卫，通过路由规则，离开该组件时被调用
beforeRouterLeave(to,from,next){
}
```

### history模式与hash模式

#### 路由器的两种工作模式

1、对于一个url来说，什么是hash值？—— #及其后面的内容就是hash值。

2、hash值不会包含在HTTP请求中，即：hash值不会带给服务器。

3、hash模式：

* 地址中永远带着#号，不美观。
* 若以后将地址通过第三方手机app分享，如果app校验严格，则地址会被标记为不合法。
* 兼容性好。

4、history模式：

* 地址干净，美观。
* 兼容性和hash模式相比略差。
* 应用部署上线时需要后端人员支持，解决刷新页面服务端404的问题。

### Vue UI组件库

#### 移动端常用UI组件库

1、[Vant](Vanthttps://vant-ui.github.io/vant/#/zh-CN)

2、[Cube UI](https://didi.github.io/cube-ui/#/zh-CN)

3、[Mint UI](http://mint-ui.github.io/#!/zh-cn)

#### PC端常用UI组件库

1、[Element UI](https://element.eleme.cn/#/zh-CN)

2、[IView UI](https://www.iviewui.com/)

### Vue3简介

### 初识setup

1、理解：Vue3.0中一个新的配置项，值为一个函数。

2、setup是所有Composition API(组合API)"表演的舞台"。

3、组件中所用到的：数据、方法等等，均要配置在setup中。

4、setup函数的两种返回值：

* 若返回一个对象，则对象中的属性、方法、在模板中均可以直接使用。（重点关注！）
* 若返回一个渲染函数：则可以自定义渲染内容。（了解）

5、注意点：

* 尽量不要与Vue2.0配置混用
  * Vue2.x配置（data、methods、computed...)中可以访问到setup中的属性、方法。
  * 但在setup中不能访问到Vue2.x配置（data、methods、computed...)
  * 如果有重名，setup优先。
* setup不能是一个async函数，因为返回值不再是return的对象，而是promise,模板看不到return对象中的属性。（后期也可以返回一个Promise实例，但需要Suspense和异步组件的配合）

### ref函数

* 作用：定义一个响应式的数据
* 语法：const xxx = ref(initValue)
  * 创建一个包含响应式数据的 `引用对象（reference对象，简称ref对象）`。
  * JS中操作数据：xxx.value
  * 模板中读取数据：不需要.value,直接：` <div > {{xxx}} </ div>` `
* 备注：
  * 接收的数据可以是：基本类型、也可以是对象类型。
  * 基本类型的数据：响应式依然是靠Object.defineProperty()的get与set完成的。
  * 对象类型的数据：内部“求助”了Vue3.0中的一个新函数--reactive函数。

### reactive函数

* 作用：定义一个对象类型的响应式数据（基本类型不要用它，要用ref函数）
* 语法：const 代理对象 = reactive (源对象) ；//接收一个对象（或数组），返回一个代理对象（Proxy的实例对象，简称proxy对象）
* reactive定义的响应式数据是“深层次的”。
* 内部基于ES6的Proxy实现，通过代理对象操作源对象内部数据进行操作。

### reactive对比ref

* 从定义数据角度对比：
  * ref用来定义：基本类型数据。
  * reactive用来定义：对象（或数组）类型数据。
  * 备注：ref也可以用来定义对象（或数组）类型数据，它内部会自动通过reactive转为代理对象。
* 从原理角度对比：
  * ref通过Object.defineProperty()的get与set来实现响应式（数据劫持）。
  * reactive通过使用Proxy来实现响应式（数据劫持），并通过Reflect操作源对象内部的数据。
* 从使用角度对比：
  * ref定义的数据：操作数据需要.value,读取数据时模板中直接读取不需要.value。
  * reactive定义的数据：操作数据与读取数据：均不需要.value。

### 总结如下：

| 特点     | ref()       | reactive() |
| -------- | ----------- | ---------- |
| 返回值   | ref 对象    | 代理对象   |
| 访问值   | 需要 .value | 直接访问   |
| 适用类型 | 基本类型    | 对象、数组 |
| 响应性   | 单个值      | 深度响应   |

### 响应式原理

#### Vue2.x的响应式

* 实现原理：
  * 对象类型：通过Object.defineProperty()对属性的读取、修改进行拦截（数据劫持）。
  * 数组类型：通过重写更新数组的一系列方法来实现拦截。（对数组的变更方法进行了包裹）。
* 存在问题：
  * 新增属性、删除属性，界面不会更新。
  * 直接通过下标修改数组，界面不会更新。

#### Vue3.0的响应式

* 实现原理：
  * 通过Proxy(代理)：拦截对象中任意属性的变化，包括：属性值的读写、属性的添加、属性的删除等。
  * 通过Reflect(反射)：对源对象的属性进行操作。
  * MDN文档中描述的Proxy与Reflect：
    * Proxy: https://developer.mozllla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy
    * Reflect: https://developer.mozllla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect

```
new Proxy(data,{
	//拦截读取属性值
	get (target,prop){
		return Reflect.get(target,prop)
	},
	//拦截设置属性值或添加新属性
	set (target,prop,value){
		return Reflect.set(target,prop,value)
	},
	//拦截删除属性值
	deleteProperty(target,prop){
		return Reflect.deleteProperty(target,prop)
	},
})

proxy.name = 'tom'
```

### setup的两个注意点

* setup执行的时机
  * 在beforeCreate之前执行一次，this是undefined。
* setup的参数
  * props：值为对象，包含：组件外部传递过来，且组件内部声明接收了的属性。
  * context：上下文对象
    * attrs:值为对象，包含：组件外部传递过来，但没有在props配置中声明的属性，相当于this.$attrs。
    * slots:收到的插槽内容，相当于this.$slots。
    * emit:分发自定义事件的函数，相当于this.$emit。

### computed计算属性

**computed函数**

* 与Vue2.x中computed配置功能一致
* 写法

```
import {computed} from 'vue'

setup(){
	...
	//计算属性-简写
	let fullName = computed(()=>{
		return person.firstName+'-'+person.lastName
	})
	//计算属性-完整
	let fullName = computed({
		get(){
			return person.firstName+'-'+person.lastName
		},
		set(value){
			const nameArr = value.split('-')
			person.firstName = nameArr[0]
			person.lastName = nameArr[1]
		}
	})

}
```

### watch函数

* 与Vue2.x中watch配置功能一致
* 两个小坑
  * 监视reactive定义的响应式数据时：oldValue无法正确获取、强制开启了深度监视（deep配置实现）。
  * 监视reactive定义的响应式数据中某个属性（前提是对象类型）时：deep配置有效。

### watchEffect函数

* watch的套路是：既要指明监视的属性，也要指明监视的回调。
* watchEffect的套路是：不用指明监视哪个属性，监视的回调中用到哪些属性，那就监视哪些属性。
* watchEffect有点像computed：
  * 但computed注重的计算出来的值（回调函数的返回值），所以必须要写return返回值。
  * 而watchEffect更注重的是过程（回调函数的函数体），所以不用写返回值。

### Vue3生命周期

* Vue3.0中可以继续使用Vue2.x中的生命周期钩子，但有两个被更名：
  * beforeDestroy改为beforeUnmount
  * destroyed改为unmounted
* Vue3.0也提供了Composition API形式的生命周期钩子，与Vue2.x中钩子对应关系如下：
  * beforeCreate ——> setup()
  * created ——> setup()
  * beforeMount——> onBeforeMount()
  * mounted——> onMounted()
  * beforeUpdate——> onBeforeUpdate()
  * updated——> onUpdated()
  * beforeUnmount——> onBeforeUnmount()
  * unmounted——> onUnmounted()

**注意：**原来Vue2.x中的钩子函数和setup()中的钩子函数同时执行时，setup()里的优先级比配置项钩子函数要高。比如onBeforeMount()要比beforeMount()函数优先执行，但一般不会这么写。

### 自定义hook函数

* 什么是hook?——本质是一个函数，把setup函数中使用的Composition API进行了封装。
* 类似于vue2.x中的mixin。
* 自定义hook的优势：复用代码，让setup中的逻辑更清楚易懂。

### toRef

* 作用：创建一个ref对象，器value值指向另一个对象中的某个属性。
* 语法：const name = toRef(person,'name')
* 应用：要将响应式对象中的某个属性单独提供给外部使用。
* 扩展：toRefs与toRef功能一致，但可以批量创建多个ref对象，语法：toRefs(person)

### 其它Composition API

#### shallowReactive与shallowRef

* shallowReactive：只处理对象最外层属性的响应式（浅响应式）。
* shallowRef：只处理基本数据类型的响应式，不进行对象的响应式处理。
* 什么时候使用？
  * 如果有一个对象数据，结构比较深，但变化时只是外层属性变化，建议使用shallowReactive。
  * 如果有一个对象数据，后续功能不会修改该对象中的属性，而是生成新对象来替换，建议使用shallowRef。

#### readonly与shallowReadonly

* readonly：让一个响应式数据变为只读的（深只读）。
* shallowReadonly：让一个响应式数据变为只读的（浅只读）。
* 应用场景：不希望数据被修改时。

#### toRaw与markRaw

* toRaw:
  * 作用：将一个有reactive生成的响应式对象转为普通对象。
  * 使用场景：用于读取响应式对象对应的普通对象，对这个普通对象的所有操作，不会引起页面更新。
* markRaw:
  * 作用：标记一个对象，使其永远不会再成为响应式对象。
  * 应用场景：
    * 有些值不应被设置为响应式的，例如复杂的第三方类库等。
    * 当渲染具有不可变数据源的大列表时，跳过响应式转换可以提高性能。

#### customRef

* 作用：创建一个自定义的ref,并对其依懒项跟踪和更新触发进行显式控制。

#### provide与inject

* 作用：实现祖与后代组件间通信。
* 套路：父组件有一个provide选项来提供数据，后代组件有一个inject选项来开始使用这些数据。
* 具体写法：

  1.祖组件中：

```
setup(){
	......
	let car = reactive({name:'奔驰',price:'40万'})
	provide('car',car)
	......
}
```

2.后代组件中：

```
setup(props,context){
	......
	let car = inject('car')
	return {car}
	......
}
```

#### 响应式数据的判断

* isRef：检查一个值是否为一个ref对象
* isReactive：检查一个对象是否是由reactive创建的响应式代理。
* isReadonly：检查一个对象是否是由readonly创建的只读代理。
* isProxy：检查一个对象是否是由reactive或者readonly方法创建的代理。

### Composition API的优势

* 使用传统OptionsAPI：新增或修改一个需求，就需要分别在data、methods、computed里修改。
* 使用Composition API：可以更加优雅的组织我们的代码，函数、让相关功能的代码更加有序的组织在一起。

### 新的组件

#### Fragment

* 在Vue2中：组件必须有一个根标签
* 在Vue3中：组件可以没有根标签，内部会将多个标签包含在一个Fragment虚拟元素中
* 好处：减少标签层级，减少内存占用

#### Teleport

* 什么是Teleport？——Teleport是一种能够将我们的组件html结构移动到指定位置的技术。

```
<teleport to="移动位置">
	<div v-if="isShow" class="mask">
		<div class="dialog">
			<h3>我是一个弹窗</h3>
			<button @click="isShow=false">关闭弹窗</button>
		</div>
	</div>
</teleport>
```

#### Suspense

* 等待异步组件时渲染一些额外内容，让应用有更好的用户体验。
* 使用步骤：

  1.异步引入组件

```
import {defineAsyncComponent} from 'vue'
const Child = defineAsyncComponent(()=>import('./components/Child.vue))
```

2.使用Cuspense包裹组件，并配置化default与fallback

```
<template>
	<div class='app'>
		<h3>我是App组件</h3>
		<Suspense>
			<template v-shot:default>
				<Child/>
			</template>
			<template v-shot:fallback>
				<h3>加载中......</h3>
			</template>
```

### Vu3中其他的改变

#### 全局API的转移

* Vue2.x有许多全局API和配置。
  * 例如：注册全局组件、注册全局指令等。

```
//注册全局组件
Vue.component('MyButton',{
	data:()=>({
		count:0
	}),
	template:'<button @click="count++"'>Clicked{{count}} times.</button>'
})
```

* Vue3.0中对这些API做出了调整：
  * 将全局的API，即：Vue.xxx调整到应用实例（app）上

| 2.x全局API(Vue)          | 3.x实例API(app)             |
| ------------------------ | --------------------------- |
| Vue.config.xxxx          | app.config.xxxx             |
| Vue.config.productionTip | 移除                        |
| Vue.component            | app.component               |
| Vue.directive            | app.directive               |
| Vue.mixin                | app.mixin                   |
| Vue.use                  | app.use                     |
| Vue.prototype            | app.config.globalProperties |

#### 其他改变

* data选项应始终被声明为一个函数。
* 过度类名的更改：

  1.Vue2.x写法

```
.v-enter,
.v-leave-to{
	opacity:0;
}
.v-leave,
.v-enter-to{
	opacity:1;
}
```

2.Vue3.x写法

```
.v-enter-from,
.v-leave-to{
	opacity:0;
}
.v-leave-from,
.v-enter-to{
	opacity:1;
}
```

* 移除keyCode作为v-on的修饰符，同时也不再支持config.keyCode
* 移除v-on.native修饰符

  1、父组件中绑定事件

```
<my-component
	v-on:close:"handleComponentEvent"
	v-on:click:"handleNativeClickEvent"
/>
```

2、子组件中声明自定义事件

```
<script>
	export default{
		emits:['close']//表示close是自定义事件
	}
</script>
```

* 移除过滤器（filter）
  官网说法：过滤器虽然看起来方便，但它需要一个自定义语法，打破大括号内表达式是‘只是JavaScript'的假设，这不仅有学习成本，而且有实现成本！建议用方法调用或计算属性去替换过滤器。
* 更多变化请参考官网文档......
