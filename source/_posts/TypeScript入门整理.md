ixtitle: TypeScript入门整理
author: PanXiaoKang
tags:

  - TypeScript
  - 前端技术
  - 笔记整理

categories:

  - 前端技术

date: 2024-04-20 12:16:08

---

以下内容参考了大量互联网博主、GPT人工智能以及本人平时工作实践后的整理记录，分享给对知识充满渴望的有缘人！

参考与推荐：

[TS/JS从书系列](https://youjia.sx.cn/you-dont-know-ts/)  [网道/TypeScript 教程](https://wangdoc.com/typescript/)  [通俗易懂的TS教程](https://juejin.cn/post/7068081327857205261 "「1.9W字总结」")

---

## Typescript介绍

TypeScript 是一种由微软开发的自由和开源的编程语言。它是 JavaScript 的一个超集，而且本质上向这个语言添加了可选的静态类型和基于类的面向对象编程。

## typescript与javascript 区别

| TypeScript                                     | JavaScript                                 |
| ---------------------------------------------- | ------------------------------------------ |
| JavaScript 的超集用于解决大型项目的代码复杂性  | 一种脚本语言，用于创建动态网页             |
| 可以在编译期间发现并纠正错误                   | 作为一种解释型语言，只能在运行时发现错误   |
| 强类型，支持静态和动态类型                     | 弱类型，没有静态类型选项                   |
| 最终被编译成 JavaScript 代码，使浏览器可以理解 | 可以直接在浏览器中使用                     |
| 支持模块、泛型和接口                           | 不支持模块，泛型或接口                     |
| 社区的支持仍在增长，而且还不是很大             | 大量的社区支持以及大量文档和解决问题的支持 |

## 代码片段示例

此处记录一些日常生活或工作中常见的TypeScript的使用代码例子，仅供参考与思路整理：

### 封装一个简单的查询工具类方法

很多时候查询同一个后端提供的服务都是仅仅用于回显展示，涉及到多个交易会用到，封装一个工具类方法可以减少代码的冗余，也不用担心每个开发人员的写法不同，导致维护起来比较麻烦。

* 声明一个类 CibhsdmbDBUtil，并定义一个静态方法 getHSCKLBopts：

```typescript
/**
 * @desoription 操作核算代码表的工具类
 **/
import { ResultInfo } from "../../../base";
declare class CibhsdmbDBUtil {
	/**
 	 * @desoription 查询数据库返回存款类别列表
	 * @param trade 当前交易 Vue 实例对象
	 * @param params 参数对象，字段如下：
	 * hscdbz 存贷标志
	 * hskhlb 客户类别
	 * hscklb 存款类别
	 * tradeCode 交易代码
	 * @returns ResultInfo 对象 data 对象字段如下：
	 * 返回对象数组，例：[{label:hscklb-hscklbmc value:hscklb},{label:hscklb-hscklbmc value:hscklb},...]
 	 **/
	static getHSCKLBopts(trade:Vue,Params:{
		hscdbz: string;
		hskhlb: string;
		tradeCode: string;
	}): Promise<ResultInfo>;
}
export { CibhsdmbDBUtil };

```

* 在CibhsdmbDBUtil类的方法里面编写代码逻辑：

```typescript
/**
 * @desoription 操作核算代码表的工具类
 **/
import { request} from "@/utils/request/request"
import { ResultInfo} from "@/base"
import { CibTools} from "@/utils/libs"
import { logger} from "@/agree/ab-logger"
class CibhsdmbDBUtil {
	/**
 	 * @desoription 查询数据库返回存款类别列表
	 * @param trade 当前交易 Vue 实例对象
	 * @param params 参数对象，字段如下：
	 * hscdbz 存贷标志
	 * hskhlb 客户类别
	 * hscklb 存款类别
	 * tradeCode 交易代码
	 * @returns ResultInfo 对象 data 对象字段如下：
	 * 返回对象数组，例：[{label:hscklb-hscklbmc value:hscklb},{label:hscklb-hscklbmc value:hscklb},...]
 	 **/
	static async getHSCKLBopts(trade:Vue,Params:{
		hscdbz: string;
		hskhlb: string;
		tradeCode: string;
	}): Promise<ResultInfo>{
		const tradeCode = trade.TRADE?.tradeInfo?.tranCode
		logger.info(`[CibhsdmbDBUtil][getHSCKLBopts][${tradeCode}]查询数据库返回存款类别列表开始`)
		const params = { ...param, ccff: 'getHscklb'}
		const hscklbRes = await request(trade, {url: '/process/cpsCibHsdmb/select',data: {body: params }})
		if (!hscklbRes.isSuccess){
			return hscklbRes
		}
		logger.info(`[CibhsdmbDBUtil][getHSCKLBopts][${tradeCode}]查询数据库返回存款类别列表结束`)
		return ResultInfo.successResult(CibTools.arrayFormatOptions(hscklbRes.data.body.list,'hscklb','hscklbmc'))
	}
}
```

* 引用平台同事已经封装好导出的接口工具类CibTools的方法:

```typescript
	/**
 	 * @desoription 将源数组转换为 options 格式数组
	 * @param srcList 源数组，示例：[{ 1: '通过'},{ 2: '不通过'}]
	 * @param prefix 源数组对象中的key
	 * @param suffix 源数组对象中的value
	 * @returns 目标数组，示例：[{label: '1-通过', value:'1'},{label: '2-不通过', value:'2'}]
	 */
	static arrayFormatOptions(srcList:{
		[key: string]: string;
	}[],prefix: string, suffix: string): {
		label: string;
		value: string;
	}[];
```

* 工具类cib-tools.ts文件具体示例代码：

```typescript
	/**
 	 * @desoription 将源数组转换为 options 格式数组
	 * @param srcList 源数组，示例：[{ 1: '通过'},{ 2: '不通过'}]
	 * @param prefix 源数组对象中的key
	 * @param suffix 源数组对象中的value
	 * @returns 目标数组，示例：[{label: '1-通过', value:'1'},{label: '2-不通过', value:'2'}]
	 */
	static arrayFormatOptions(srcList:{[key: string]: string;}[],prefix: string, suffix: string): {
		const destList = 
		  srcList?.map((item) => ({
			label: item[prefix]?.trim() + '-' + item[suffix]?.trim(),
			value: item[prefix]?.trim(),
		  })) || []
		return destList
	}
```

* 在交易中导入调用该工具类中写好的方法：

```javascript
methods:{
	// 初始化加载
	async tradeInit(){
		// 查询核算代码表，获取存款类别
		const reqParams = {
			hscdbz: '1',
			hskhlb: '1',
			tradeCode: '2600',
		}
		// 调用查询数据库返回存款类别列表公函方法
		const SCKLBopts = await CibhsdmbDBUtil.getHSCKLBopts(this, reqParams)
		if (SCKLBopts.isSuccess){
			this.cklb_options = SCKLBopts.data
		}
	}
}
```

## 私有属性

从 TypeScript 3.8 开始，引入了 `#` 前缀来支持私有字段和私有方法。这是一种新的语法糖，可以更轻松地定义和使用私有成员。

使用 `#` 语法定义的私有方法在客户端控制台中看不到具体代码的原因是 **被隐藏了** ，并非是版本不兼容。

**原因分析**

1. **私有性保护:** `#` 语法糖的目的是为了实现私有性保护，防止外部代码意外访问或修改私有成员。如果私有方法的代码可以直接在控制台中查看，则会破坏这种保护机制。
2. **编译器处理:** TypeScript 编译器会将 `#` 语法糖转换为相应的 JavaScript 代码。在转换过程中，私有方法的名称会被混淆，例如添加前缀或后缀。混淆后的名称在未经反混淆的情况下无法识别，因此在控制台中也无法查看。
3. **浏览器引擎限制:** 浏览器引擎在执行 JavaScript 代码时，并不会保留原始的代码结构和命名。因此，即使您尝试反混淆私有方法的名称，也可能无法获得原始的代码。

**替代方案**

如果您需要在开发过程中调试私有方法的代码，可以使用以下替代方案：

1. **使用断点:** 在私有方法内部设置断点，当代码执行到断点时，可以在控制台中查看变量值、调用堆栈等信息。
2. **创建辅助方法:** 创建一个公有方法，该方法会调用私有方法并返回结果。然后，您可以在控制台中调用公有方法来间接调试私有方法的代码。
3. **使用源映射:** 如果您使用的是支持源映射的调试工具，则可以将混淆后的代码映射回原始的 TypeScript 代码。这可能会使您更容易理解私有方法的代码。

**总结**

`#` 语法糖是一种有效的私有性保护机制，但同时也导致了私有方法在控制台中无法查看的问题。如果您需要调试私有方法的代码，可以使用上述替代方案，但需要注意权衡利弊。

### 场景案例

交易提交的时候一般会先走公共模版中一些提交前的处理逻辑，进入公共处理逻辑代码中，发现会有些逻辑处理是使用了# 语法糖的函数，记录一下简单的代码逻辑：

```typescript
/**
 * @desoription 通讯提交前检查
 **/
async beforsubmit(trade,TelrInfo){
	...
	const { txnLvlGrp, txnSctrGrp } = retVal // 从后端服务查询返回的配置信息
	const telrLvl = TelrInfo.telrLvl
	const telrGrp = TelrInfo.deptGroup
	logger.info(`柜员级别：${telrLvl},柜员所属部门：${telrGrp},交易级别组:${txnLvGrp},交易部门组:${txnSctrGrp}`)
	isPass = TradeUtils.#intersect(txnLvlGrp,telrLvl,1)
	if(!isPass){
		await InfoUtils.pushInfo(trade,'柜员级别不在交易级别组中！')
		return ResultInfo.failResult(-1,'柜员级别不在交易级别组中！')
	}
	isPass = TradeUtils.#intersect(txnLvlGrp,telrLvl,2)
	if(!isPass){
		await InfoUtils.pushInfo(trade,'交易柜员所属部门无权做此交易！')
		return ResultInfo.failResult(-1,'交易柜员所属部门无权做此交易！')
	}
	return ResultInfo.successResult()
	...
}

/**
 * @desoription 判断两个字符串是否有交集，按照splitLength定义的长度分割字符串
 * @param arg1 字符串1
 * @param arg2 字符串2
 * @param splitLength 应该 <=arg.length
 * @returns 如果有交集返回true，否则返回false
 */
static #intersect(arg1: string, arg2: string, splitLength: number) {
	for (let i = splitLength; i <= arg1.length; i += splitLength) {
		const tmp = arg1.substring(i - splitLength, i)
		for(let k = splitLength; k <= arg2.length; k += splitLength) {
			const tmp1 = arg2.substring(k- splitLength, k)
			if (tmp1 === tmp) {
			  return true 
			}
		}
	}
	return false
}

```

## 基础类型

### `any类型`

1. **通用类型**：`any` 类型表示任意类型。赋值为 `any` 类型的变量可以持有任何类型的值。
2. **灵活但不安全**：使用 `any` 类型会跳过类型检查，使得代码在编译时不会出现类型错误。虽然这提供了很大的灵活性，但也降低了类型安全性，可能导致运行时错误。
3. **用法示例**：
   ```typescript
   let value: any;
   value = 123; // 可以是数字
   value = "hello"; // 可以是字符串
   value = true; // 也可以是布尔值
   ```

### `unknown类型`

1. **未知类型**：`unknown` 类型也表示任意类型，但比 `any` 更严格。它是一个安全的替代品，用于表示未知类型的值。
2. **需要类型检查**：在将 `unknown` 类型的值赋值给其他类型之前，必须进行类型检查。这有助于在编译时发现潜在的错误，增强类型安全性。
3. **用法示例**：
   ```typescript
   let value: unknown;
   value = 123; // 可以是数字
   value = "hello"; // 可以是字符串
   value = true; // 也可以是布尔值

   if (typeof value === "string") {
       // 只有经过类型检查后，才能将 unknown 类型的值赋值给其他类型
       let stringValue: string = value;
   }
   ```

#### 主要区别

- **类型安全**：`any` 跳过了所有类型检查，而 `unknown` 强制要求进行类型检查，提供更高的类型安全性。
- **使用场景**：`any` 适用于需要最大灵活性的情况，而 `unknown` 适用于需要灵活性但又希望保持一定类型安全性的情况。

总的来说，尽量使用 `unknown` 而不是 `any`，以便在编写代码时保持类型安全性，并减少潜在的运行时错误。

### Tuple 类型

数组一般由同种类型的值组成，但有时我们需要在单个变量中存储不同类型的值，这时候我们就可以使用元组。在 JavaScript 中是没有元组的，元组是 TypeScript 中特有的类型，其工作方式类似于数组。

元组可用于定义具有有限数量的未命名属性的类型。每个属性都有一个关联的类型。使用元组时，必须提供每个属性的值。为了更直观地理解元组的概念，我们来看一个具体的例子：

```typescript
let tupleType: [string, boolean];
tupleType = ["semlinker", true];
```

在上面代码中，我们定义了一个名为 tupleType 的变量，它的类型是一个类型数组 [string, boolean]，然后我们按照正确的类型依次初始化 tupleType 变量。与数组一样，我们可以通过下标来访问元组中的元素：

```
console.log(tupleType[0]); // semlinker
console.log(tupleType[1]); // true
```

注意：在元组初始化的时候，如果出现类型或属性数量不匹配的话，编译器会提示报错信息。

## 索引签名

    索引签名（Index Signatures）是TypeScript中的一种特性，允许你定义对象的属性类型，但不需要事先声明每个具体的属性名。通过索引签名，你可以确保对象中所有属性都遵循某种特定的类型规则。

    索引签名的典型应用场景是当你不知道对象中会有哪些具体的属性名，但你可以确定属性值的类型。

基本语法：

```typescript
interface MyObject {
  [key: string]: string;
}

```

在这个例子中，`MyObject`接口表示一个对象，该对象的所有属性名必须是字符串类型，且对应的属性值也必须是字符串类型。

示例：

```typescript
interface User {
  [propName: string]: number;
}

let userAges: User = {
  "Alice": 25,
  "Bob": 30
};

```

在这个例子中，`User`接口要求所有属性名为字符串，属性值为数字。因此，`userAges`对象中的属性名和属性值都满足该接口定义。

**注意事项：**

1. **类型限制** ：索引签名限制了对象中的所有属性的类型，因此，如果你想在对象中添加某些属性，且这些属性的类型与索引签名定义的类型不同，则会引发编译错误。
2. **组合类型** ：索引签名可以与其他属性类型定义一起使用，以允许特定的属性有不同的类型。

```typescript
interface User {
  name: string;
  age: number;
  [propName: string]: string | number;
}

```

在这个例子中，`User`接口允许 `name`和 `age`属性具有特定的类型，而其他属性可以是字符串或数字。索引签名非常有用，尤其是在处理动态键名的对象时，可以确保对象的类型安全性。

## 联合类型和交叉类型

### 联合类型 (Union Types)

联合类型表示一个值可以是几种类型中的一种。使用 `|` 符号来定义联合类型。例如：

```
let value: string | number;
value = "hello"; // 合法
value = 42;      // 合法
value = true;    // 非法，类型错误

```

在上面的例子中，`value` 可以是 `string` 或 `number` 类型，但不能是其他类型。

**应用场景：**

* 当一个变量或参数可以是多种类型之一时。
* 比如处理不同类型的输入，或者根据条件返回不同类型的值。

### 交叉类型 (Intersection Types)

交叉类型表示一个值将同时具备多个类型的所有特性。使用 `&` 符号来定义交叉类型。例如：

```
interface Person {
  name: string;
}

interface Employee {
  employeeId: number;
}

type EmployeePerson = Person & Employee;

let employee: EmployeePerson = {
  name: "John",
  employeeId: 1234
};

```

在上面的例子中，`EmployeePerson` 是 `Person` 和 `Employee` 的交叉类型，所以 `employee` 对象需要同时满足 `Person` 和 `Employee` 接口的所有属性。

**应用场景：**

* 当你希望一个对象同时具有多个类型的属性或行为时。
* 在构建复杂对象类型时，合并多个接口或类型。

### 总结

* **联合类型** 适用于一个变量可能是多种类型中的一种的情况，解决了类型不确定性的问题。
* **交叉类型** 适用于需要同时具备多个类型的特性或行为的情况，常用于合并对象的类型。
* 联合类型 `|` 是指可以取几种类型中的任意一种，而交叉类型 `&` 是指把几种类型合并起来。

## typescript 数组

### 数组解构

```typescript
let x: number;
let y: number;
let z: number;
let five_array = [0, 1, 2, 3, 4];
[x, y, z] = five_array;
```

这段代码的作用是：

声明三个变量 `x`,`y`,`z` 用来存储数字，由于 `five_array` 有五个元素，而我们只解构了前三个，所以 `x` 会被赋值为 0，`y` 会被赋值为 1，`z` 会被赋值为 2。剩余的元素会被忽略。

### 数组展开运算符

```typescript
let twoArray = [1,2];
let fiveArray = [...twoArray,3,4,5]
```

### 数组遍历

```typescript
let colors:fiveArry[]=["red","blue","yellow","black"];
for (let i of colors){
   console.log(i)
}
```

## typescript 对象

### 对象解构

```typescript
let person = {
  name: "Semlinker",
  gender: "Male",
};

let { name, gender } = person;
```

### 对象展开运算符

```typescript
let person = {
  name: "Semlinker",
  gender: "Male",
  address: "Xiamen",
};

// 组装对象
let personWithAge = { ...person, age: 33 };

// 获取除了某些项外的其它项
let { name, ...rest } = person;
```

## 函数类型

TS 定义函数类型需要定义输入参数类型和输出类型。输出类型也可以忽略，因为 TS 能够根据返回语句自动推断出返回值类型。

```typescript
function add(x:number, y:number):number {
    return x + y
}
add(1,2)

```

### 函数表达式

```typescript
let add2 = (x: number, y: number): number => {
    return x + y
}

```

### 可选参数

参数后加个问号，代表这个参数是可选的，但注意可选参数要放在函数入参的最后面，不然会导致编译错误。

```typescript
function add(x:number, y:number, z?:number):number {
    return x + y
}

add(1,2,3)
add(1,2)

```

### 默认参数

```typescript
function add(x:number, y:number = 100):number {
    return x + y
}

add(100)  // 200

```

和可选参数不同的是，默认参数可以不放在函数入参的最后面。

```typescript
function add(x:number = 100, y:number):number {
    return x + y
}

add(100) 

```

看上面的代码，add 函数只传了一个参数，如果理所当然地觉得 x 有默认值，只传一个就传的是 y 的话，就会报错。

编译器会判定你只传了 x，没传 y。

如果带默认值的参数不是最后一个参数，用户必须明确的传入 `undefined`值来获得默认值。

```typescript
add(undefined,100) // 200
```

### 函数赋值

TS由于定义了类型，函数就不能随便赋值。可以用下面这种方式定义一个函数 add3，把 add2 赋值给 add3。

```typescript
let add2 = (x: number, y: number): number => {
    return x + y
}

// 赋值方式一
const add3:(x: number, y: number) => number = add2
// 赋值方式二
const add3 = add2 //不用定义 add3 类型直接赋值也可以，TS 会在变量赋值的过程中，自动推断类型

```

### 函数重载

函数重载是指两个函数名称相同，但是参数个数或参数类型不同，他的好处显而易见，不需要把相似功能的函数拆分成多个函数名称不同的函数。

#### 不同参数类型

比如我们实现一个 add 函数，如果传入参数都是数字，就返回数字相加，如果传入参数都是字符串，就返回字符串拼接。

```typescript
function add(x: number[]): number
function add(x: string[]): string
function add(x: any[]): any {
  if (typeof x[0] === 'string') {
    return x.join()
  }
  if (typeof x[0] === 'number') {
      return x.reduce((acc, cur) => acc + cur)
  }
}

```

#### 不同参数个数

假设这个 add 函数接受更多的参数个数，比如还可以传入一个参数 y，如果传了y，就把 y 也加上或拼接上，就可以这么写。

```typescript
function add(x: number[]): number
function add(x: string[]): string
function add(x: number[], y: number[]): number
function add(x: string[], y: string[]): string
function add(x: any[], y?: any[]): any {
  if (Array.isArray(y) && typeof y[0] === 'number') {
      return x.reduce((acc, cur) => acc + cur) + y.reduce((acc, cur) => acc + cur)
  }
  if (Array.isArray(y) && typeof y[0] === 'string') {
      return x.join() + ',' + y.join()
  }
  if (typeof x[0] === 'string') {
    return x.join()
  }
  if (typeof x[0] === 'number') {
      return x.reduce((acc, cur) => acc + cur)
  }
}


console.log(add([1,2,3]))      // 6
console.log(add(['lin', '18']))  // 'lin,18'
console.log(add([1,2,3], [1,2,3])) // 12
console.log(add(['lin', '18'], ['man', 'handsome'])) // 'lin,18,man,handsome'

```

其实写起来挺麻烦的，后面了解泛型之后写起来会简洁一些，不必太纠结函数重载，知道有这个概念即可，平时一般用泛型来解决类似问题。

## interface接口

TypeScript 接口（interface）是一种用来定义对象结构的类型。它规定了对象所具有的属性和方法，以及这些属性和方法的类型。接口就像是一个合同，规定了对象必须遵守的规则。

### 对象的形状

```typescript
interface Person {
  name: string;
  age: number;
}

let semlinker: Person = {
  name: "semlinker",
  age: 33,
};

```

### 可选 | 只读属性

```typescript
interface Person {
  readonly name: string;
  age?: number;
}

```

只读属性用于限制只能在对象刚刚创建的时候修改其值。此外 TypeScript 还提供了 ReadonlyArray `<T>` 类型，它与 Array `<T>` 相似，只是把所有可变方法去掉了，因此可以确保数组创建后再也不能被修改。

```typescript
let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;
ro[0] = 12; // error!
ro.push(5); // error!
ro.length = 100; // error!
a = ro; // error!

```

### 任意属性

有时候我们希望一个接口中除了包含必选和可选属性之外，还允许有其他的任意属性，这时我们可以使用 索引签名 的形式来满足上述要求。

```typescript
interface Person {
  name: string;
  age: number;
  [propName: string]: any; // 任意属性
}

let person: Person = {
  name: 'Alice',
  age: 30,
  address: 'Beijing', // 动态添加属性
  favoriteColor: 'blue', // 动态添加属性
};

```

**解释： `[propName: string]: any;`** 这种写法表示：一个对象可以有任意数量的属性，这些属性的名称是字符串类型，而属性的值可以是任意类型。

### 接口与类型别名

在 TypeScript 中，接口（interface）和类型别名（type alias）都是用来定义类型的工具，但它们在概念和应用场景上有一些细微的差别。

#### 接口（interface）

* **定义对象结构:** 接口主要用于定义对象的结构，即对象应该具有哪些属性和方法。
* **实现和继承:** 类可以实现接口，保证类的实例符合接口定义。接口之间也可以继承。
* **声明合并:** 多个相同名称的接口会自动合并成一个接口。
* **主要用于:** 定义对象的形状，描述类的契约。

#### 类型别名（type alias）

* **给类型起别名:** 类型别名是对现有类型的引用，给一个类型起一个新的名字。
* **任何类型:** 类型别名可以作用于任何类型，包括原始类型、联合类型、元组、函数类型等。
* **不能实现和继承:** 类型别名不能实现接口，也不能被其他类型继承。
* **主要用于:** 简化复杂类型、为类型起一个更具描述性的名字。

#### 总结表格

| 特征     | 接口                 | 类型别名         |
| -------- | -------------------- | ---------------- |
| 定义     | 对象结构             | 任何类型         |
| 实现     | 类可以实现           | 不能实现         |
| 继承     | 接口可以继承其他接口 | 不能继承         |
| 声明合并 | 支持                 | 不支持           |
| 主要用途 | 定义对象的形状       | 简化类型、起别名 |

示例代码：

```typescript
// 接口
interface Person {
  name: string;
  age: number;
}

// 类型别名
type MyString = string;
type Name = string;
type Age = number;
type PersonAlias = {
  name: Name;
  age: Age;
};
```

#### Other Types

与接口类型不一样，类型别名可以用于一些其他类型，比如原始类型、联合类型和元组：

```typescript
// primitive
type Name = string;

// object
type PartialPointX = { x: number };
type PartialPointY = { y: number };

// union
type PartialPoint = PartialPointX | PartialPointY;

// tuple
type Data = [number, string];

```

## typescript类

TypeScript 中的类是一种面向对象编程的重要概念，它提供了一种创建自定义对象的方式。类定义了对象的属性和方法，这些属性和方法将被类的所有实例共享。

在 TypeScript 中，我们可以通过 class 关键字来定义一个类：

```typescript
class Person {
    name: string
    constructor(name: string) {
        this.name = name
    }
    speak() {
        console.log(`${this.name} is speaking`)
    }
}
// 新建实例
const p1 = new Person('lin')

// 访问属性和方法
p1.name
p1.speak()


```

### 继承

用 extends 关键字实现继承，定义一个 Student 类继承自 Person 类。继承之后，Student 类上的实例可以访问 Person 类上的属性和方法。

```typescript
class Student extends Person {
    study() {
        console.log(`${this.name} needs study`)
    }
}

const s1 = new Student('lin')

s1.study()

```

#### super关键字

注意，上例中 Student 类没有定义自己的属性，可以不写 super ，但是如果 Student 类有自己的属性，就要用到 super 关键字来把父类的属性继承过来。

比如，Student 类新增一个 grade(成绩) 属性，就要这么写：

```typescript
class Student extends Person {
    grade: number
    constructor(name: string,grade:number) {
        super(name)
        this.grade = grade
    }
}

const s1 = new Student('lin', 100)

```

### 多态

子类对父类的方法进行了重写，子类和父类调同一个方法时会不一样。

```typescript
class Student extends Person {
    speak() {
        return `Student ${super.speak()}`
    }
}

```

### static

`static` 是静态属性，可以理解为是类上的一些常量，实例不能访问。比如一个 Circle 类，圆周率是 3.14，可以直接定义一个静态属性。

```typescript
class Circle {
    static pi = 3.14
    public radius: number
    public constructor(radius: number) {
        this.radius = radius
    }
    public calcLength() {
        return Circle.pi * this.radius * 2  // 计算周长，直接访问 Circle.pi
    }
}

```

### 抽象类

所谓抽象类，是指 **只能被继承，但不能被实例化的类** ，就这么简单。

抽象类的用法是用来定义一个基类，声明共有属性和方法，拿去被继承。

抽象类的好处是可以抽离出事物的共性，有利于代码的复用。

抽象类有两个特点：

* 抽象类不允许被实例化
* 抽象类中的抽象方法必须被子类实现

抽象类用一个 `abstract` 关键字来定义，我们通过以下例子来感受一下抽象类的两个特点。

```typescript
abstract class Animal {
    constructor(name:string) {
        this.name = name
    }
    public name: string
    public abstract sayHi():void
}

class Dog extends Animal {
    constructor(name:string) {
        super(name)
    }
    public sayHi() {
        console.log('wang')
    }
}

```

### 抽象方法和多态

多态指的是，父类定义一个抽象方法，在 **多个子类中有不同的实现** ，运行的时候不同的子类就对应不同的操作，比如：

```typescript
abstract class Animal {
    constructor(name:string) {
        this.name = name
    }
    public name: string
    public abstract sayHi():void
}

class Dog extends Animal {
    constructor(name:string) {
        super(name)
    }
    public sayHi() {
        console.log('wang')
    }
}

class Cat extends Animal {
    constructor(name:string) {
        super(name)
    }
    public sayHi() {
        console.log('miao')
    }
}

```

Dog 类和 Cat 类都继承自 Animal 类，Dog 类和 Cat 类都不同的实现了 sayHi 这个方法。

### this类型

类的成员方法可以直接返回一个 `this`，这样就可以很方便地实现链式调用。

```typescript
class StudyStep {
  step1() {
    console.log('listen')
    return this
  }
  step2() {
    console.log('write')
    return this
  }
}

const s = new StudyStep()

s.step1().step2()    // 链式调用

```

#### 灵活调用子类父类方法

在继承的时候，this 可以表示父类型，也可以表示子类型，保持了父类和子类之间接口调用的连贯性。

```typescript
class StudyStep {
  step1() {
    console.log('listen')
    return this
  }
  step2() {
    console.log('write')
    return this
  }
}

class MyStudyStep extends StudyStep {
  next() {
    console.log('before done, study next!')
    return this   
  }
}

const m = new MyStudyStep()

m.step1().next().step2().next()  // 父类型和子类型上的方法都可随意调用

```

## 枚举（Enum）

枚举是一种自定义数据类型，它将一组命名常量定义在一起。这些命名常量通常表示一组相关的值。

TS 中我们使用 `const` 来声明常量，但是有些取值是在一定范围内的一系列常量，比如一周有七天，比如方向分为上下左右四个方向。这时就可以使用枚举来定义。

```
enum Direction {
    Up,
    Down,
    Left,
    Right
}

```

这样就定义了一个 **数字枚举** ，他有两个特点：

* 数字递增
* 反向映射

枚举成员会被赋值为从 `0` 开始递增的数字。

```typescript
console.log(Direction.Up)        // 0
console.log(Direction.Down)      // 1
console.log(Direction.Left)      // 2
console.log(Direction.Right)     // 3

```

枚举会对枚举值到枚举名进行反向映射：

```typescript
console.log(Direction[0])      // Up
console.log(Direction[1])      // Down
console.log(Direction[2])      // Left
console.log(Direction[3])      // Right
```

如果枚举第一个元素赋有初始值，就会从初始值开始递增:

```typescript
enum Direction {
    Up = 6,
    Down,
    Left,
    Right
}

console.log(Direction.Up)        // 6
console.log(Direction.Down)      // 7
console.log(Direction.Left)      // 8
console.log(Direction.Right)     // 9

```

### 手动赋值

定义一个枚举来管理外卖状态，分别有已下单，配送中，已接收三个状态。

```typescript
enum ItemStatus {
    Buy = 1,
    Send,
    Receive
}

console.log(ItemStatus['Buy'])      // 1
console.log(ItemStatus['Send'])     // 2
console.log(ItemStatus['Receive'])  // 3

```

但有时候后端返回的数据状态是乱的，就需要我们手动赋值。比如后端说 Buy 是 100，Send 是 20，Receive 是 1，就可以这么写：

```
enum ItemStatus {
    Buy = 100,
    Send = 20,
    Receive = 1
}

console.log(ItemStatus['Buy'])      // 100
console.log(ItemStatus['Send'])     // 20
console.log(ItemStatus['Receive'])  // 1

```

### 计算成员

枚举中的成员可以被计算，比如经典的使用位运算合并权限，可以这么写：

```typescript
enum FileAccess {
    Read    = 1 << 1,
    Write   = 1 << 2,
    ReadWrite  = Read | Write,//对这两个值执行按位或运算
}

console.log(FileAccess.Read)       // 2   -> 010
console.log(FileAccess.Write)      // 4   -> 100
console.log(FileAccess.ReadWrite)  // 6   -> 110

```

Vue3 源码中的 patchFlags，用于标识节点更新的属性:

```typescript
// packages/shared/src/patchFlags.ts
export const enum PatchFlags {
  TEXT = 1,                    // 动态文本节点
  CLASS = 1 << 1,              // 动态 class
  STYLE = 1 << 2,              // 动态 style
  PROPS = 1 << 3,              // 动态属性
  FULL_PROPS = 1 << 4,         // 具有动态 key 属性，当 key 改变时，需要进行完整的 diff 比较
  HYDRATE_EVENTS = 1 << 5,     // 具有监听事件的节点
  STABLE_FRAGMENT = 1 << 6,    // 子节点顺序不会被改变的 fragment
  KEYED_FRAGMENT = 1 << 7,     // 带有 key 属或部分子节点有 key 的 fragment
  UNKEYED_FRAGMENT = 1 << 8,   // 子节点没有 key 的 fragment
  NEED_PATCH = 1 << 9,         // 非 props 的比较，比如 ref 或指令
  DYNAMIC_SLOTS = 1 << 10,     // 动态插槽
  DEV_ROOT_FRAGMENT = 1 << 11, // 仅供开发时使用，表示将注释放在模板根级别的片段
  HOISTED = -1,                // 静态节点
  BAIL = -2                    // diff 算法要退出优化模式
}

```

### 字符串枚举

字符串枚举的意义在于，提供有具体语义的字符串，可以更容易地理解代码和调试。

```typescript
enum Direction {
    Up = "UP",
    Down = "DOWN",
    Left = "LEFT",
    Right = "RIGHT",
}

const value = 'UP'
if (value === Direction.Up) {
    // do something
}

```

### 常量枚举

上文的例子，使用 const 来定义一个常量枚举：

```typescript
const enum Direction {
    Up = "UP",
    Down = "DOWN",
    Left = "LEFT",
    Right = "RIGHT",
}

const value = 'UP'
if (value === Direction.Up) {
    // do something
}

```

编译出来的 JS 代码会简洁很多，提高了性能。

```typescript
const value = 'UP';
if (value === 'UP' /* Up */) {
    // do something
}

```

不写 const 编译出来是这样的，

```typescript
var Direction;
(function (Direction) {
    Direction["Up"] = "UP";
    Direction["Down"] = "DOWN";
    Direction["Left"] = "LEFT";
    Direction["Right"] = "RIGHT";
})(Direction || (Direction = {}));
const value = 'UP';
if (value === Direction.Up) {
    // do something
}

```

这一堆定义枚举的逻辑会在编译阶段会被删除，常量枚举成员在使用的地方被内联进去。当然常量枚举不允许包含计算成员。

**小结**

枚举的意义在于，可以定义一些带名字的常量集合，清晰地表达意图和语义，更容易地理解代码和调试。

常用于和后端联调时，区分后端返回的一些代表状态语义的数字或字符串，降低阅读代码时的心智负担。

## 类型推论

TypeScript里，在有些没有明确指出类型的地方，类型推论会 **帮助提供类型** 。

这种推断发生在初始化变量和成员，设置默认参数值和决定函数返回值时。

### 定义时不赋值

```typescript
let a

a = 18
a = 'lin'

```

定义时不赋值，就会被 TS 自动推导成 any 类型，之后随便怎么赋值都不会报错。

### 最佳通用类型

当需要从几个表达式中推断类型时候，会使用这些表达式的类型来推断出一个最合适的通用类型。比如:

```typescript
let arr = [0, 1, null, 'lin'];
let pets = [new Dog(), new Cat()]
```

虽然 TS 可以推导出最合适的类型，但最好还是在写的时候就定义好类型，上文的例子，我们可以这么写：

```typescript
type arrItem = number | string | null
let arr: arrItem[] = [0, 1, null, 'lin'];

let pets: Pets[] = [new Dog(), new Cat()]

```

**小结：**

类型推论虽然能为我们提供帮助，但既然写了 TS，除非是函数默认返回类型为 void 这种，其他的最好每个地方都定义好类型。

## typescript泛型

TypeScript中的泛型（Generics）是一种允许你在定义函数、接口或类时，预留一个或多个类型参数，而不是具体指定类型的方式。泛型使得代码能够更加通用和可复用，同时仍然保持类型安全。

### 为什么使用泛型？

在有些情况下，函数、接口或类的逻辑并不依赖于特定的类型，而是可以适用于多种类型。泛型可以让我们编写一次逻辑，然后在使用时根据具体情况传入不同的类型，从而实现类型参数化。

### 泛型的语法

泛型的常见用法是在函数、接口或类的定义中引入一个或多个类型参数，用 `<>` 包裹。最常用的类型参数符号是 `T`（代表Type），但你可以使用任何符号或名称来表示类型参数。

### 泛型的基本使用

#### 处理函数参数

```
function print<T>(arg:T):T {
    console.log(arg)
    return arg
}
```

这样可以做到输入和输出的类型统一，且可以输入输出任何类型。泛型中的 T 就像一个占位符、或者说一个变量，在使用的时候可以把定义的类型 **像参数一样传入** ，它可以 **原封不动地输出** 。

#### 默认参数

给泛型加默认参数：

```
interface Iprint<T = number> {
    (arg: T): T
}

function print<T>(arg:T) {
    console.log(arg)
    return arg
}

const myPrint: Iprint = print

```

这样默认就是 number 类型了.

#### 处理多个函数参数

现在有这么一个函数，传入一个只有两项的元组，交换元组的第 0 项和第 1 项，返回这个元组。

```ts
function swap(tuple) {
    return [tuple[1], tuple[0]]
}

```

这么写，我们就丧失了类型，用泛型来改造一下。我们用 T 代表第 0 项的类型，用 U 代表第 1 项的类型。

```typescript
function swap<T, U>(tuple: [T, U]): [U, T]{
    return [tuple[1], tuple[0]]
}

```

这样就可以实现了元组第 0 项和第 1 项类型的控制。

### 约束泛型

在TypeScript中，泛型约束可以通过 `extends`关键字来指定，可以和 interface 结合，来约束类型。

```ts
interface ILength {
    length: number
}

function printLength<T extends ILength>(arg: T): T {
    console.log(arg.length)
    return arg
}

```

这样我们定义的变量一定要有 length 属性，比如下面的 str、arr 和 obj，才可以通过 TS 编译，否则就会报错。

```ts
const str = printLength('lin')// 编译通过
const arr = printLength([1,2,3])// 编译通过
const obj = printLength({ length: 10 })// 编译通过
const num = printLength(10) //直接编译报错
```

#### 泛型约束接口

使用泛型，也可以对 interface 进行改造，让 interface 更灵活：

```ts
interface IKeyValue<T, U> {
    key: T
    value: U
}

const k1:IKeyValue<number, string> = { key: 18, value: 'lin'}
const k2:IKeyValue<string, number> = { key: 'lin', value: 18}

```

#### 泛型定义数组

定义一个数组，我们之前是这么写的：

```ts
const arr: number[] = [1,2,3]
```

现在这么写也可以：

```ts
const arr: Array<number>[] = [1,2,3]
```

当数组项写错类型，就会直接报错。

```ts
const arr:Array<number>[] = [1,2,'lin'] //编译报错
```

### 小结

泛型（Generics）是指在定义函数、接口或类的时候，不预先指定具体类型，而是在使用的时候再指定类型。

泛型中的 `T` 就像一个占位符、或者说一个变量，在使用的时候可以把定义的类型 **像参数一样传入** ，它可以 **原封不动地输出** 。

泛型 **在成员之间提供有意义的约束** ，这些成员可以是：函数参数、函数返回值、类的实例成员、类的方法等。

#### 泛型的好处

* 函数和类可以轻松的支持多种类型，增强程序的拓展性。
* 不必写冗余的联合类型，增强代码的可读性。
* 灵活控制类型之间的约束。

## 索引类型

从对象中抽取一些属性的值,然后拼接成数组，可以这么写：

```ts
const userInfo = {
  name: 'lin',
  age: '18',
}

function getValues(userInfo: any, keys: string[]) {
  return keys.map(key => userInfo[key])
}

// 抽取指定属性的值
console.log(getValues(userInfo, ['name','age']))  // ['lin', '18']
// 抽取obj中没有的属性:
console.log(getValues(userInfo, ['sex','outlook']))  // [undefined, undefined]
```

虽然 obj 中并不包含 `sex` 和 `outlook` 属性,但 TS 编译器并未报错,此时使用 TS 索引类型,对这种情况做类型约束，实现动态属性的检查。

理解索引类型，需先理解 `keyof（索引查询）`、`T[K]（索引访问）` 和 `extends (泛型约束)`。

### keyof 索引查询

`keyof` 操作符可以用于获取某种类型的所有键，其返回类型是联合类型：

```ts
interface IPerson {
  name: string;
  age: number;
}

type Test = keyof IPerson; // 'name' | 'age'

```

### T[K]索引访问

`T[K]`，表示接口 T 的属性 K 所代表的类型：

```ts
interface IPerson {
  name: string;
  age: number;
}

let type1:  IPerson['name'] // string
let type2:  IPerson['age']  // number

```

### extends 泛型约束

`T extends U`，表示泛型变量可以通过继承某个类型，获得某些属性：

```ts
interface ILength {
    length: number
}

function printLength<T extends ILength>(arg: T): T {
    console.log(arg.length)
    return arg
}

```

这样入参就一定要有 length 属性，比如 str、arr、obj 都可以， num 就不行:

```ts
const str = printLength('lin')
const arr = printLength([1,2,3])
const obj = printLength({ length: 10 })

const num = printLength(10) // 报错，Argument of type 'number' is not assignable to parameter of type 'ILength'

```

### 检查动态属性

对索引类型的几个概念了解后,对 getValue 函数进行改造，实现对象上动态属性的检查，改造前为：

```ts
const userInfo = {
  name: 'lin',
  age: '18',
}

function getValues(userInfo: any, keys: string[]) {
  return keys.map(key => userInfo[key])
}

```

* 定义泛型 T、K，用于约束 userInfo 和 keys
* 为 K 增加一个泛型约束,使 K 继承 userInfo 的所有属性的联合类型, 即 `K extends keyof T`

改造后：

```ts
function getValues<T, K extends keyof T>(userInfo: T, keys: K[]): T[K][] {
    return keys.map(key => userInfo[key])
}

```

这样当我们指定不在对象里的属性时，就会报错:

```ts
getValues(userInfo,'sex','like') // 编译报错
```

## 映射类型

映射类型是一种通过将现有类型的属性进行转换来生成新类型的方式。映射类型使我们能够对对象类型的属性进行批量操作，例如将所有属性变为可选、只读，或者改变属性的类型。

### 基本语法

映射类型的基本语法如下：

```ts
type MappedType<OldType> = {
  [Key in keyof OldType]: NewType
}

```

* `keyof OldType`：获取 `OldType` 类型的所有属性名，这会返回一个联合类型。
* `Key in keyof OldType`：遍历 `OldType` 的每个属性。
* `NewType`：可以根据需要改变属性的类型。

### 应用场景

#### 将所有属性变为可选

```ts
type Person = {
  name: string;
  age: number;
}

type PartialPerson = {
  [Key in keyof Person]?: Person[Key];
}

// PartialPerson 等价于
// {
//   name?: string;
//   age?: number;
// }

```

#### 将所有属性变为必需

```ts
interface IPerson {
  name: string;
  age?: number;
  address?: string;
}

type IRequiredPerson = Required<IPerson>;

// 等价于
type IRequiredPerson = {
  name: string;
  age: number;      // 现在是必需的
  address: string;  // 现在是必需的
}

```

#### 将所有属性变为只读

```ts
type ReadonlyPerson = {
  [Key in keyof Person]: Readonly<Person[Key]>;
}

// ReadonlyPerson 等价于
// {
//   readonly name: string;
//   readonly age: number;
// }

```

#### 抽取对象子集

`Pick<T, K>` 是另一个工具类型，用于从类型 `T` 中选择部分属性 `K`，并构造一个新类型。`K` 是属性名的联合类型。

```ts
interface IPerson {
  name: string;
  age: number;
  address: string;
  phone: string;
}
// 只想选取 name 和 age 属性构成一个新类型
type INameAndAge = Pick<IPerson, 'name' | 'age'>;

// 组成一个新的类型
type INameAndAge = {
  name: string;
  age: number;
}

```

#### 改变属性类型

```ts
type Person = {
  name: string;
  age: number;
}

type StringifiedPerson = {
  [Key in keyof Person]: string;
}

// StringifiedPerson 等价于
// {
//   name: string;
//   age: string;
// }

```

## 条件类型

```
T extends U ? X : Y 
//若类型 T 可被赋值给类型 U,那么结果类型就是 X 类型,否则就是 Y 类型

```

Exclude 和 Extract 的实现就用到了条件类型。

### Exclude(不包含)

`Exclude<T, U>` 是一个工具类型， `Exclude<T, U>` 会返回 `联合类型 T` 中不包含 `联合类型 U` 的部分。

```ts
type T = "a" | "b" | "c";
type U = "a" | "c";

type Excluded = Exclude<T, U>; // "b"

```

#### **用法场景**

**类型过滤 ：当你有一个联合类型，想要移除其中的一些成员时，`Exclude` 非常有用。**

### Extract(提取)

`Extract<T, U>` 是 `Exclude` 的相反操作。它从类型 `T` 中提取所有可以赋值给类型 `U` 的子类型。换句话说，它只保留 `T` 中属于 `U` 的类型成员。

```ts
type T = "a" | "b" | "c";
type U = "a" | "c";

type Extracted = Extract<T, U>; // "a" | "c"

```

## 工具类型（Utility Types）

工具类型是一组预定义的类型操作函数，它们可以帮助你更方便地处理各种类型，提高代码的可读性和可维护性。TypeScript 内置了一些常用的工具类型，需要的时候去查就行。

### Omit(省略)

`Omit<T, U>`从类型 `T` 中剔除 `U` 中的所有属性。

```ts
interface User {
  id: number;
  name: string;
  age: number;
  email: string;
}

type UserWithoutEmail = Omit<User, 'email'>;
const user: UserWithoutEmail = { id: 1, name: "John", age: 25 };

```

### NonNullable(不可为空)

`NonNullable<T>` 用来过滤类型T中的 null 及 undefined 类型。

```ts
type T0 = NonNullable<string | number | undefined>; // string | number
type T1 = NonNullable<string[] | null | undefined>; // string[]

```

#### Parameters `<Type>`

提取函数类型 `Type` 的参数类型，并以元组的形式返回。

```ts
function exampleFunction(id: number, name: string, isActive: boolean) {
  return `${id} - ${name} is ${isActive ? "active" : "inactive"}`;
}

type ExampleFunctionParams = Parameters<typeof exampleFunction>;

// ExampleFunctionParams 的结果为 [number, string, boolean]

```

#### ReturnType(返回类型)

获取函数类型 `Type` 的返回值类型。

```ts
function getUser() {
  return { id: 1, name: "John" };
}

type User = ReturnType<typeof getUser>; // 结果为 { id: number; name: string; }

type T0 = ReturnType<() => string>  // string

type T1 = ReturnType<(s: string) => void>  // void

```

## 类型体操

简单来说，就是利用 TypeScript 的类型系统，通过巧妙的类型定义和组合，来实现一些看起来不可思议的类型操作。“类型体操”这个术语通常用于描述在 TypeScript 中通过复杂的类型操作来实现高度灵活和动态的类型定义。这种“体操”主要是利用 TypeScript 的高级类型系统，包括条件类型、映射类型、工具类型等，来构建出满足特定需求的类型。这些操作可以变得非常复杂和抽象，因此被形象地称为“体操”。

### 类型体操的应用场景

* **增强代码的类型安全性** : 通过复杂的类型约束，确保代码在编译时就能捕捉到潜在的错误。
* **自动化类型转换** : 根据输入类型自动推导出新的类型，减少手动维护类型定义的成本。
* **构建高复用性库** : 尤其是在设计泛型库时，类型体操可以帮助创建更通用、更灵活的 API。

#### 示例代码一：

```ts
// 判断一个类型是否为数组
type IsArray<T> = T extends (infer Element)[] ? true : false;

// 示例
let arr: IsArray<number[]> = true; // arr 的类型为 true
let str: IsArray<string> = false; // str 的类型为 false
```

#### 示例代码二：

```ts
// 使用条件类型和映射类型来提取对象中的函数键
type FunctionKeys<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any ? K : never
}[keyof T];

interface Example {
  id: number;
  name: string;
  greet: () => void;
  update: (value: number) => void;
}

type ExampleFunctionKeys = FunctionKeys<Example>;  // "greet" | "update"

```

## TS声明文件

### declare

`declare` 关键字用于告诉编译器某个变量、函数、类、模块、命名空间等的存在，而不实际实现它们。这通常用于为 JavaScript 代码或其他外部资源（如第三方库）提供类型定义。`declare` 关键字通常出现在 `.d.ts` 声明文件中，但也可以在普通的 TypeScript 文件中使用。

#### **声明全局变量**

如果你在项目中使用了一个没有 TypeScript 类型定义的全局变量，可以用 `declare` 来告诉 TypeScript 这个变量的存在以及它的类型。

```ts
// 假设这个变量是在某个外部脚本中定义的
declare var jQuery: (selector: string) => any;

jQuery("#id").doSomething();

```

#### **声明全局函数**

类似于全局变量，你可以声明全局函数，使其在项目中可用。

```ts
declare function greet(name: string): void;

greet("Alice");

```

#### 声明类型

使用 `declare` 来声明接口、类型别名或枚举类型。

```ts
declare interface User {
  id: number;
  name: string;
  age: number;
}

declare type Point = {
  x: number;
  y: number;
};

declare enum Color {
  Red,
  Green,
  Blue
}

```

#### 声明模块

当你使用没有 TypeScript 类型定义的第三方库时，可以用 `declare module` 来声明该模块的类型。

```ts
declare module "myLibrary" {
  export function myFunction(): void;
}

```

这样，就可以在 TypeScript 中导入并使用该模块：

```ts
import { myFunction } from "myLibrary";

myFunction();

```

#### 声明命名空间

`declare namespace` 用于声明一个命名空间，它可以包含其他类型声明或函数声明。

```ts
declare namespace MyNamespace {
  function doSomething(): void;
}

MyNamespace.doSomething();

```

#### 声明类

可以使用 `declare` 来声明类，提供类的结构和方法，而无需实际实现。

```ts
declare class Person {
  name: string;
  constructor(name: string);
  greet(): void;
}

```

### `.d.ts` 文件

`.d.ts` 文件是 TypeScript 的声明文件，通常用来为 JavaScript 代码或第三方库编写类型声明。这些文件仅包含类型信息，不包含任何实际实现。`declare` 关键字在这些文件中扮演着关键角色，它确保 TypeScript 编译器理解外部资源的类型结构。

```ts
// src/Vue.d.ts

interface VueOption {
    el: string,
    data: any
}

declare class Vue {
    options: VueOption
    constructor(options: VueOption)
}

```

```ts
// src/index.ts

const app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  }
})

```

一般来说，ts 会解析项目中所有的 `*.ts` 文件，当然也包含以 `.d.ts` 结尾的文件。所以当我们将 `Vue.d.ts` 放到项目中时，其他所有 `*.ts` 文件就都可以获得 `Vue` 的类型定义了。

```css
/path/to/project
├── src
|  ├── index.ts
|  └── Vue.d.ts
└── tsconfig.json

```

### 使用三方库

那么当我们使用三方库的时候，是不是所有的三方库都要写一大堆 decare 的文件呢？

答案是不一定，要看社区里有没有这个三方库的 TS 类型包（一般都有）。

社区使用 `@types` 统一管理第三方库的声明文件，是由 [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped/) 这个组织统一管理的

比如安装 lodash 的类型包：

```bash
npm install @types/lodash -D
```

只需要安装了，就可以在 TS 里正常使用 lodash 了，别的啥也不用做。如果一个库本来就是 TS 写的，就不用担心类型文件的问题，比如 `Vue3`。

### 自己写声明文件

比如在原有的js中写了请求小模块 `myFetch`，代码如下：

```js
function myFetch(url, method, data) {
    return fetch(url, {
        body: data ? JSON.stringify(data) : '',
        method
    }).then(res => res.json())
}

myFetch.get = (url) => {
    return myFetch(url, 'GET')
}

myFetch.post = (url, data) => {
    return myFetch(url, 'POST', data)
}

export default myFetch

```

现在新项目用了 TS 了，要在新项目中继续用这个 myFetch，有两种选择：

* 用 TS 重写 myFetch，新项目引重写的 myFetch
* 直接引 myFetch ，给它写声明文件

如果选择第二种方案，就可以这么做：

```ts
type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

declare function myFetch<T = any>(url: string, method: HTTPMethod, data?: any): Promise<T>

declare namespace myFetch { // 使用 namespace 来声明对象下的属性和方法
    const get: <T = any>(url: string) => Promise<T> 
    const post: <T = any>(url: string, data: any) => Promise<T>
}

```

比较麻烦的是需要配置才行，有两种选择：

1. 创建一个 `node_modules/@types/myFetch/index.d.ts` 文件，存放 `myFetch` 模块的声明文件。这种方式不需要额外的配置，但是 `node_modules` 目录不稳定，代码也没有被保存到仓库中，无法回溯版本，有不小心被删除的风险，故不太建议用这种方案，一般只用作临时测试。
2. 创建一个 `types` 目录，专门用来管理自己写的声明文件，将 `myFetch` 的声明文件放到 `types/myFetch/index.d.ts` 中。这种方式需要配置下 `tsconfig.json` 中的 `paths` 和 `baseUrl` 字段。

```json
// tsconfig.json
{
    "compilerOptions": {
        "module": "commonjs",
        "baseUrl": "./",
        "paths": {
            "*": ["types/*"]
        }
    }
}

```
