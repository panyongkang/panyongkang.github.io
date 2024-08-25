title: TypeScript入门整理
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

[TS/JS从书系列](https://youjia.sx.cn/you-dont-know-ts/)

[网道/TypeScript 教程](https://wangdoc.com/typescript/)

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

## typescript接口

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

### 接口与类型别名区别

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

### Other Types

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

在 TypeScript 中，我们可以通过 Class 关键字来定义一个类：

```typescript
class Greeter {
  // 静态属性
  static cname: string = "Greeter";
  // 成员属性
  greeting: string;

  // 构造函数 - 执行初始化操作
  constructor(message: string) {
    this.greeting = message;
  }

  // 静态方法
  static getClassName() {
    return "Class name is Greeter";
  }

  // 成员方法
  greet() {
    return "Hello, " + this.greeting;
  }
}

let greeter = new Greeter("world");

```

## typescript泛型

TypeScript中的泛型（Generics）是一种允许你在定义函数、接口或类时，预留一个或多个类型参数，而不是具体指定类型的方式。泛型使得代码能够更加通用和可复用，同时仍然保持类型安全。

### 为什么使用泛型？

在有些情况下，函数、接口或类的逻辑并不依赖于特定的类型，而是可以适用于多种类型。泛型可以让我们编写一次逻辑，然后在使用时根据具体情况传入不同的类型，从而实现类型参数化。

### 泛型的语法

泛型的常见用法是在函数、接口或类的定义中引入一个或多个类型参数，用 `<>` 包裹。最常用的类型参数符号是 `T`（代表Type），但你可以使用任何符号或名称来表示类型参数。
