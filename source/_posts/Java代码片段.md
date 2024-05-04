title: Java代码片段
author: PanYuKang

cover: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1499015010,895265431&fm=26&gp=0.jpg'

tags:

  - Java基础
  - 代码片段
  - 场景应用
categories:
  - 后端技术
date: 2020-04-01 18:31:00

---

随着年龄的递增，慢慢接受了自己的平凡，趁有空整理一下基础知识，以备不时之需，以下是借鉴大佬博客和自己的思考进行整理。。。

---

## JSONObject和JSONArray

### 使用的场景

* 想通过键值对的形式获取数据，使用JSONObject。
* 如果后台查询的是某个bean的list集合向前端页面传递，使用JSONArray。

### **数据结构**

在大多数情况下，以[] 开头的都是 JSONArray 的范围，由 {} 开头的都是 JSONObject。但是，在某些情况下，这两种格式可能会混淆。如果不确定 JSON 片段的类型，可以使用 JSON 解析器来解析它。

#### **JSONArray**

* 由 [] 开始和结束
* 包含一个或多个元素
* 元素可以是任何类型的数据，包括字符串、数字、布尔值、数组和对象
* 元素之间用逗号分隔

#### **JSONObject**

* 由 {} 开始和结束
* 包含一个或多个键值对
* 键必须是字符串
* 值可以是任何类型的数据，包括字符串、数字、布尔值、数组和对象
* 键值对之间用冒号分隔

#### **数据结构示例**

**JSONArray**

> ["Hello", "World"]
> [1, 2, 3]
> [true, false]
> [{}, {}]

**JSONObject**

> {"name": "John Doe", "age": 30}
> {"address": {"street": "123 Main Street", "city": "Anytown", "state": "CA", "zip": 91234}}
> {"products": [{"name": "Product 1", "price": 100}, {"name": "Product 2", "price": 200}]}

#### **混淆的情况**

在某些情况下，[] 和 {} 可以用于表示相同的数据。例如，以下两种 JSON 片段都是有效的：

> ["Hello", "World"]
> {"0": "Hello", "1": "World"}

这两种片段都表示一个包含两个元素的数组：`"Hello"` 和 `"World"`。

在其他情况下，[] 和 {} 可以用于表示不同类型的数据。例如，以下两种 JSON 片段是不同的：

> ["Hello", "World"]
> {"Hello": "World"}

第一个片段表示一个包含两个元素的数组：`"Hello"` 和 `"World"`。第二个片段表示一个包含一个键值对的 JSON 对象：`{"Hello": "World"}`。

### com.alibaba.fastjson

#### **JSONObject和JSONArray的区别**

* JSONObject的数据表示形式

```java
{
  "id": "100",
  "name": "张三",
  "title": "测试",
  "content": null
}
```

* JSONArray的数据表示形式（包含2个或2个以上的JSONObject）

```java
[
  {
    "id": "100",
    "name": "张三",
    "title": "测试",
    "content": null
  },
  {
    "id": "101",
    "name": "李四",
    "title": "备注",
    "content": null
  }
]

```

经过对比，可以看到一个很明显的区别，JSONObject最外面用的是 `{ }` ，JSONArray最外面用的是 `[ ]` 。

#### **如何从字符串String获得JSONObject对象和JSONArray对象?**

```java
数据格式：
{
  "name": [
    "boy",
    "girl"
  ]
}

打印输出：
String test = "{\"name\":[\"boy\",\"girl\"]}";
JSONObject jsonObject = JSON.parseObject(test); //string转为object类型
System.out.println("===============================================================");
System.out.println("jsonObject：" + jsonObject);
JSONArray array = jsonObject.getJSONArray("name"); //输出 ["boy","girl"]
System.out.println("===============================================================");
System.out.println("array：" + array);
String str = JSONObject.toJSONString(array);
System.out.println("===============================================================");
System.out.println("str：" + str);

输出结果：
===============================================================
jsonObject：{"name":["boy","girl"]}
===============================================================
array：["boy","girl"]
===============================================================
str：["boy","girl"]

```

#### **如何从JSONArray中获得JSONObject对象？**

可以把JSONArray当成一般的数组来对待，只是获取的数据内数据的方法不一样。

（使用 getJSONObject(i) 要注意数组越界异常）

```java

例子1：数据格式：
[
  {
    "id": "100",
    "name": "张三",
    "title": "测试",
    "content": null
  },
  {
    "id": "101",
    "name": "李四",
    "title": "标题",
    "content": null
  }
]

打印输出：
String json = "[{\"id\" :\"100\", \"name\" :\"张三\", \"title\" :\"测试\", \"content\" :null },{\"id\" :\"101\", \"name\" :\"李四\", \"title\" :\"标题\", \"content\" :null }]";
JSONArray jsonArray = JSONArray.parseArray(json);
JSONObject jsonObject = jsonArray.getJSONObject(1); // 这里的jsonObject得到的数据就是第二个JSONObject
System.out.println("===============================================================");
System.out.println("jsonObject：" + jsonObject);

输出结果：
===============================================================
jsonObject：{"name":"李四","id":"101","title":"标题"}

===============================================================

例子2数据格式：
{
  "id": "100",
  "name": "张三",
  "content": [
    {
      "age": "20",
      "sex": "男"
    }
  ]
}

打印输出：
String json = "{\"id\":\"100\",\"name\":\"张三\",\"content\":[{\"age\":\"20\",\"sex\":\"男\"}]}";
JSONObject jsonObject = JSONObject.parseObject(json);
JSONArray jsonArray = (JSONArray) jsonObject.get("content");
System.out.println("===============================================================");
System.out.println("jsonArray：" + jsonArray);
for (int i = 0; i < jsonArray.size(); i++) {
    //第一种
    JSONObject jsonObject1 = (JSONObject) jsonArray.get(i);
    String age = String.valueOf(jsonObject1.get("age"));
    System.out.println("===============================================================");
    System.out.println("jsonObject1：" + age);
    //第二种
    JSONObject jsonObject2 = jsonArray.getJSONObject(i);
    String age1 = String.valueOf(jsonObject2.get("age"));
    System.out.println("===============================================================");
    System.out.println("jsonObject2：" + age1);
}

输出结果：
===============================================================
jsonArray：[{"sex":"男","age":"20"}]
===============================================================
jsonObject1：20
===============================================================
jsonObject2：20


```

#### **获取JSONObject内的数据**

```java
数据格式：
{
  "id": "100",
  "name": "张三",
  "title": "测试",
  "content": null
}

打印输出：
 String json = "{\"id\" :\"100\", \"name\" :\"张三\", \"title\" :\"测试\", \"content\" :null }";
 JSONObject jsonObject = JSONObject.parseObject(json);
 int ids = jsonObject.getInteger("id"); // 这里的ids得到的数据就是100.
 String names = jsonObject.getString("name"); // 这里的names得到的数据就是张三.
 System.out.println("===============================================================");
 System.out.println("ids：" + ids);
 System.out.println("names：" + names);

输出结果：
===============================================================
ids：100
names：张三

```

### net.sf.json

#### JSONObject与JSONArray使用方法区别

##### 创建方法不同

* JSONObject创建的方法

```java
// 创建JsonObject第一种方法
JSONObject jsonObject = new JSONObject();
jsonObject.put("name", "张三");
jsonObject.put("title", "测试");
jsonObject.put("content", "内容");
System.out.println("===============================================================");
System.out.println("jsonObject：" + jsonObject);

输出结果：
===============================================================
jsonObject：{"name":"张三","title":"测试","content":"内容"}

// 创建JsonObject第二种方法
Map<String, String> map = new LinkedHashMap<>();
map.put("name", "张三");
map.put("title", "测试");
map.put("content", "内容");
System.out.println("===============================================================");
System.out.println("jsonObject2：" + JSONObject.fromObject(map));
System.out.println("JSONArray解析一个Map、HashMap，则会将整个对象的放进一个数组的值中");
System.out.println("jsonObject3：" + JSONArray.fromObject(map));

注意：如果JSONArray解析一个Map、HashMap，则会将整个对象的放进一个数组的值中
输出结果：
===============================================================
jsonObject2：{"name":"张三","title":"测试","content":"内容"}
JSONArray解析一个Map、HashMap，则会将整个对象的放进一个数组的值中
jsonObject3：[{"name":"张三","title":"测试","content":"内容"}]

```

* JSONArray创建的方法

```java

// 创建一个JsonArray方法1
JSONArray jsonArray = new JSONArray();
jsonArray.add(0, "张三");
jsonArray.add(1, "测试");
jsonArray.add(2, "内容");
System.out.println("===============================================================");
System.out.println("jsonArray：" + jsonArray);

输出结果：
===============================================================
jsonArray：["张三","测试","内容"]

// 创建JsonArray方法2
ArrayList<String> arrayList = new ArrayList<String>();
arrayList.add("张三");
arrayList.add("测试");
arrayList.add("内容");
System.out.println("===============================================================");
System.out.println("jsonArray2：" + JSONArray.fromObject(arrayList));

输出结果：
===============================================================
jsonArray2：["张三","测试","内容"]

// 创建复杂的JSONArray
JSONObject jsonObject2 = new JSONObject();
jsonObject2.put("id", "100");
jsonObject2.put("age", "20");
jsonObject2.put("sex", "男");
jsonObject2.element("Array", arrayList);
System.out.println("===============================================================");
System.out.println("jsonObject2：" + jsonObject2);

输出结果：
===============================================================
jsonObject2：{"id":"100","age":"20","sex":"男","Array":["张三","测试","内容"]}

```

##### 获取方式不同

* 获取JSONObject中值

```java
打印输出：
String names = jsonObject.getString("name");
System.out.println("===============================================================");
System.out.println("names：" + names);

输出结果：
===============================================================
names：张三


```

* 获取JSONArray中的值

```java
打印输出：
String names2 = arrayList.get(0);
System.out.println("===============================================================");
System.out.println("names2：" + names2);

输出结果：
===============================================================
names2：张三

```

##### 解析JSON字符串

```java
数据格式：
{
  "id": "100",
  "age": "20",
  "sex": "男",
  "Array": [
    "张三",
    "测试",
    "内容"
  ]
}

打印输出：
String jsonString = "{\"id\":\"100\",\"age\":\"20\",\"sex\":\"男\",\"Array\":[\"张三\",\"测试\",\"内容\"]}";
//将Json字符串转为java对象
JSONObject obj = JSONObject.fromObject(jsonString);
//获取Object中的id
if (obj.has("id")) {
    System.out.println("id:" + obj.getString("id"));
}
//获取ArrayObject
if (obj.has("Array")) {
    JSONArray array = obj.getJSONArray("Array");
    for (int i = 0; i < array.size(); i++) {
        System.out.println("Array:" + array.getString(i) + " ");
    }
}

输出结果：
id:100
Array:张三 
Array:测试 
Array:内容 

************【例子1】************
JSONObject j1 = new JSONObject();
j1.put("小明", "男");
j1.put("小红", "女");//put方法里放的key和value都是object
System.out.println("j1put：" + j1);//{"小明":"男","小红":"女"}
JSONObject j2 = new JSONObject();
j2.element("小明", "男");
System.out.println("j2element：" + j2);//{"小明":"男"}
j2.accumulate("小明", "女");
System.out.println("j2accumulate：" + j2);//{"小明":["男","女"]}
j2.accumulate("小红", "女");
System.out.println("j2accumulate：" + j2);//{"小明":["男","女"],"小红":"女"}
JSONArray array = j2.getJSONArray("小明");
System.out.println("array：" + array);//["男","女"]
Object o = array.get(0);
System.out.println("o：" + o);//男

************【例子2】************
数据格式：
[
  {
    "user": {
      "name": "张三",
      "age": "20"
    }
  },
  {
    "score": {
      "yuwen": "80",
      "shuxue": "90"
    }
  }
]

打印输出：
String joStr = "{\"name\":\"张三\",\"age\":\"20\"}";
//将json字符串转化为JSONObject
JSONObject jsonObject = JSONObject.fromObject(joStr);
//通过getString("")分别取出里面的信息
String name = jsonObject.getString("name");
String age = jsonObject.getString("age");
//输出  张三 20
System.out.println("===============================================================");
System.out.println(name + " " + age);

String jaStr = "[{\"user\":{\"name\":\"张三\",\"age\":\"20\"}},{\"score\":{\"yuwen\":\"80\",\"shuxue\":\"90\"}}]";
//将jsonArray字符串转化为JSONArray
JSONArray jsonArray = JSONArray.fromObject(jaStr);
//取出数组第一个元素
JSONObject jUser = jsonArray.getJSONObject(0).getJSONObject("user");
//取出第一个元素的信息，并且转化为JSONObject
String name2 = jUser.getString("name");
String age2 = jUser.getString("age");
//输出 张三 20
System.out.println("===============================================================");
System.out.println(name2 + " " + age2);
//取出数组第二个元素，并且转化为JSONObject
JSONObject jScore = jsonArray.getJSONObject(1).getJSONObject("score");
//取出第二个元素的信息
String yuwen = jScore.getString("yuwen");
String shuxue = jScore.getString("shuxue");
//输出  80 90
System.out.println("===============================================================");
System.out.println(yuwen + "  " + shuxue);

输出结果：
===============================================================
张三 20
===============================================================
张三 20
===============================================================
80  90

```

##### put、element、accumulate的使用区别

它们分别都是添加键值对，put方法的key和value都可以是object，另外两个方法的key必须是 string。当遇到key相同时，put方法会把value值替换掉，而accumulate会在当前key下生成一个JSONArray。element方法遇到key相同时，如果value不是空则执行accumulate方法，否则会移除这个key。

* 此外JSONObject.fromObject()方法可以将一个Object对象转化为JsonObject对象，打印出来的是Json格式。j1.getJSONObject()方法可以将一个String字符串转化为JSONObject对象。
* JSONObject对象还有很多别的方法，可以参看API。 在JSONObject的方法里put作为前缀的如果转化失败会出现异常，所以要try catch或者throw出去，而opt前缀的方法不会抛出异常。
* JSONArray可以看成一个数组的形式。它使用add方法来添加元素，支持按索引添加，也可以之间添加一个Collection。取值时使用get方法，参数是index(第一个是0)索引。

### 这两个jar包的GPT总结

共同点：

1. **都支持 JSON 数据的序列化和反序列化：** 无论是 `net.sf.json` 还是 `com.alibaba.fastjson` 都提供了将 Java 对象转换为 JSON 数据和将 JSON 数据转换为 Java 对象的功能。
2. **都提供了简单易用的 API：** 这两个库都提供了简单易用的 API，方便开发人员进行 JSON 数据的操作和转换。

不同之处：

1. **性能差异：** `com.alibaba.fastjson` 通常被认为在性能上优于 `net.sf.json`。根据不同的测试和对比，`com.alibaba.fastjson` 的性能往往更高，尤其是在大规模数据处理时。
2. **功能丰富性：** `com.alibaba.fastjson` 在功能上通常更加丰富，支持更多的特性和扩展功能。例如，它支持更多的注解和特性控制，以及更多的数据格式化选项。
3. **使用场景：** 一般来说，如果对性能要求比较高，或者需要更丰富的功能和扩展性，可以选择 `com.alibaba.fastjson`。而如果对性能要求不是很高，或者只是进行简单的 JSON 数据操作，也可以选择 `net.sf.json`。

总的来说，两个库都有自己的优势和适用场景，选择哪个取决于你的具体需求和偏好。如果你对性能要求比较高，或者需要更丰富的功能和扩展性，可以选择 `com.alibaba.fastjson`。否则，`net.sf.json` 也是一个不错的选择。
