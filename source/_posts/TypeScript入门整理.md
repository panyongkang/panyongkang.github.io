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

## any和unknown的区别

### `any`

1. **通用类型**：`any` 类型表示任意类型。赋值为 `any` 类型的变量可以持有任何类型的值。
2. **灵活但不安全**：使用 `any` 类型会跳过类型检查，使得代码在编译时不会出现类型错误。虽然这提供了很大的灵活性，但也降低了类型安全性，可能导致运行时错误。
3. **用法示例**：
   ```typescript
   let value: any;
   value = 123; // 可以是数字
   value = "hello"; // 可以是字符串
   value = true; // 也可以是布尔值
   ```

### `unknown`

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

### 主要区别

- **类型安全**：`any` 跳过了所有类型检查，而 `unknown` 强制要求进行类型检查，提供更高的类型安全性。
- **使用场景**：`any` 适用于需要最大灵活性的情况，而 `unknown` 适用于需要灵活性但又希望保持一定类型安全性的情况。

总的来说，尽量使用 `unknown` 而不是 `any`，以便在编写代码时保持类型安全性，并减少潜在的运行时错误。
