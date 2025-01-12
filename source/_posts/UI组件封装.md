title: UI组件封装
author: PanXiaoKang
tags:

  - 组件化
  - 组件封装
  - 学习记录
categories:
  - 前端技术
date: 2024-07-30 22:21:20

---

记录一下UI组件封装的学习思路和笔记整理，方便后续的开发和参考，欢迎各位大佬乐于分享自己的经验总结，让小白少踩坑。

---

## 组件之间通信方式

在学习UI组件二次封装之前，理解组件间的通信方式是非常重要的。掌握这些通信方式可以帮助你更有效地设计和实现封装组件，确保它们在不同的使用场景中能够正确地交互和协作。

### 常见的通信方式及其适用场景

#### **父组件向子组件传递数据 (Props)**

* **适用场景** ：当一个子组件需要使用父组件的数据时。例如：在商品详情页面中，父组件可能会向子组件传递商品的信息（如标题、价格、图片等）。
* **如何使用** ：通过父组件的模板中的属性绑定 (`v-bind`) 将数据传递给子组件。

##### 代码示例

```
<!-- 父组件 Parent.vue -->
<template>
  <div>
    <Child :message="parentMessage" />
  </div>
</template>

<script>
import Child from './Child.vue';

export default {
  components: {
    Child,
  },
  data() {
    return {
      parentMessage: 'Hello from parent!',
    };
  },
};
</script>

<!-- 子组件 Child.vue -->
<template>
  <div>
    {{ message }}
  </div>
</template>

<script>
export default {
  props: {
    message: String,
  },
};
</script>
```

##### **代码解释**

* **父组件** :`Parent.vue`: 定义了一个名为 `parentMessage` 的数据属性，并将其通过 `props` 传递给子组件。
* **子组件** :`Child.vue`: 接收父组件传递过来的 `message` 属性，并在模板中显示它。

##### props的功能特点

###### **单向数据流**

* **特点** ：数据从父组件流向子组件，单向绑定。
* **优势** ：这种单向数据流的模式有助于维护数据的单一来源，减少调试的复杂性。

###### **类型验证**

* **特点** ：可以为 `props` 定义类型验证，确保传递的数据符合预期。
* **优势** ：有助于捕捉类型错误，提高组件的可靠性和可维护性。

```javascript
props: {
  myProp: {
    type: String,
    required: true,
  }
}

```

###### **默认值**

* **特点** ：可以为 `props` 设置默认值，在父组件未传递该 `prop` 时使用。
* **优势** ：确保组件有合理的默认行为，避免未定义的 `prop` 导致的错误。

```javascript
props: {
  myProp: {
    type: String,
    default: 'default value',
  }
}

```

###### **必填验证**

* **特点** ：可以通过 `required` 属性指定 `prop` 是否必填。
* **优势** ：确保重要的 `prop` 被传递，避免组件在缺少必要数据时出错。

```javascript
props: {
  myProp: {
    type: String,
    required: true,
  }
}

```

###### **自定义验证**

* **特点** ：可以定义自定义验证函数，对 `prop` 进行复杂的验证逻辑。
* **优势** ：灵活地检查 `prop` 的有效性，满足更复杂的业务需求。

```javascript
props: {
  myProp: {
    type: Number,
    validator: function (value) {
      return value >= 0;
    }
  }
}

```

###### **与父组件同步**

* **特点** ：虽然 `props` 是单向数据流，但可以通过事件机制让子组件与父组件同步数据。
* **优势** ：实现组件间的交互和数据同步，保持父组件的数据源是权威数据源。

```javascript
<!-- 子组件 -->
<template>
  <input :value="value" @input="$emit('input', $event.target.value)">
</template>

<script>
export default {
  props: ['value']
}
</script>

```

```javascript
<!-- 父组件 -->
<template>
  <ChildComponent v-model="parentValue" />
</template>

<script>
import ChildComponent from './ChildComponent.vue';

export default {
  data() {
    return {
      parentValue: ''
    };
  },
  components: {
    ChildComponent
  }
}
</script>

```

###### **不可变性**

* **特点** ：在子组件内部，`props` 是不可变的，子组件不应直接修改 `props` 的值。
* **优势** ：保持数据流的单向性，有助于预测数据流动，增强代码的可维护性和可调试性。

###### **支持对象、数组、函数等复杂数据类型**

* **特点** ：`props` 可以传递复杂数据类型，如对象、数组、函数等。
* **优势** ：提高了组件的灵活性，可以传递多种类型的数据结构。

```javascript
props: {
  myObject: {
    type: Object,
    default: () => ({ key: 'value' })
  }
}

```

#### **子组件向父组件传递数据 (Custom Events)**

* **适用场景** ：当一个子组件需要触发父组件中的某个动作或更新父组件的数据时。例如：当用户在商品列表中点击“加入购物车”按钮时，子组件（商品卡片）会触发一个事件通知父组件（商品列表），父组件可以记录用户的操作或更新购物车的数量。
* **如何使用** ：子组件通过 `$emit` 方法触发事件，父组件通过监听子组件上的事件来响应。

##### 代码示例

```
<!-- 子组件 Child.vue -->
<template>
  <button @click="sendMessageToParent">Send to Parent</button>
</template>

<script>
export default {
  methods: {
    sendMessageToParent() {
      this.$emit('child-message', 'Hello from child!');
    },
  },
};
</script>

<!-- 父组件 Parent.vue -->
<template>
  <div>
    <Child @child-message="handleChildMessage" />
    <p>Message from child: {{ childMessage }}</p>
  </div>
</template>

<script>
import Child from './Child.vue';

export default {
  components: {
    Child,
  },
  data() {
    return {
      childMessage: '',
    };
  },
  methods: {
    handleChildMessage(message) {
      this.childMessage = message;
    },
  },
};
</script>
```

##### 代码解释

* **子组件** :`Child.vue`: 定义了一个按钮，点击时触发 `sendMessageToParent` 方法，并通过 `this.$emit` 触发自定义事件 `child-message`。
* **父组件** :`Parent.vue`: 监听子组件触发的 `child-message` 事件，并通过 `handleChildMessage` 方法处理接收到的消息。

##### $emit的特点

$emit 绑定一个自定义事件，当这个事件被执行的时候就会将参数传递给父组件，而父组件通过v-on监听并接收参数。

#### **兄弟组件间通信 (通过共同父组件)**

* **适用场景** ：当两个没有直接父子关系的组件需要通信时。例如：在视频播放页面中，如果存在多个按钮（如播放/暂停、音量控制等），这些按钮可能是兄弟组件，它们需要共享播放状态（如是否正在播放、音量大小等）。
* **如何使用** ：通常通过将数据放在它们的最近共同父组件上，并使用 Props 和 Custom Events 的组合来实现。

##### **示例代码**

```
<!-- 父组件 Parent.vue -->
<template>
  <div>
    <ChildA :data="sharedData" @update-data="updateData" />
    <ChildB :data="sharedData" @update-data="updateData" />
  </div>
</template>

<script>
import ChildA from './ChildA.vue';
import ChildB from './ChildB.vue';

export default {
  components: {
    ChildA,
    ChildB,
  },
  data() {
    return {
      sharedData: 'Shared Data',
    };
  },
  methods: {
    updateData(newData) {
      this.sharedData = newData;
    },
  },
};
</script>

<!-- 子组件 ChildA.vue -->
<template>
  <div>
    <p>Data: {{ data }}</p>
    <button @click="updateData">Update Data</button>
  </div>
</template>

<script>
export default {
  props: {
    data: String,
  },
  methods: {
    updateData() {
      this.$emit('update-data', 'New Shared Data');
    },
  },
};
</script>
```

##### **代码解释**

* **父组件** :`Parent.vue`: 定义了一个名为 `sharedData` 的数据属性，并将其通过 `props` 分别传递给子组件 `ChildA` 和 `ChildB`。同时还监听这两个子组件触发的 `update-data` 事件，并通过 `updateData` 方法更新 `sharedData`。
* **子组件** :`ChildA.vue`: 接收父组件传递过来的 `data` 属性，并在模板中显示它。定义了一个按钮，点击时触发 `updateData` 方法并通过 `this.$emit` 触发 `update-data` 事件。

#### **全局状态管理 (Vuex)**

* **适用场景** ：当多个组件需要共享状态或者状态变化需要影响多个组件时。例如：当用户在搜索结果页面中筛选条件时，这些筛选条件可能会保存在 Vuex store 中，以便在不同页面之间保持一致。
* **如何使用** ：使用 Vuex 库来集中管理应用的核心状态。

##### 代码示例

```javascript
// store.js
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 0,
  },
  mutations: {
    increment(state) {
      state.count++;
    },
  },
  actions: {
    increment({ commit }) {
      commit('increment');
    },
  },
});

```

```html
<!-- 组件中使用 Vuex -->
<template>
  <button @click="increment">Increment</button>
  <p>Count: {{ count }}</p>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState(['count']),
  },
  methods: {
    ...mapActions(['increment']),
  },
};
</script>
```

##### **代码解释**

* **Vuex Store** :`store.js`: 定义了一个简单的 Vuex store，包含一个状态 `count` 和一个 mutation `increment`。
* **组件** :
  * 使用 `mapState` 和 `mapActions` 辅助函数来简化状态和动作的使用。
  * 定义了一个按钮，点击时触发 `increment` 方法，进而更新状态 `count`。

#### **事件总线 (Event Bus)**

* **适用场景** ：当多个组件需要相互通知状态改变，但不想显式地定义父-子关系时。例如：当用户在播放器中点击“喜欢”按钮时，可以使用事件总线来通知其他页面更新喜欢的歌曲列表。
* **如何使用** ：创建一个全局的 Vue 实例作为事件总线，并使用 `$on` 和 `$emit` 方法来触发和监听事件。

##### 示例代码

```javascript
// eventBus.js
import Vue from 'vue';
export const EventBus = new Vue();
```

```html
<!-- 发布者组件 Publisher.vue -->
<template>
  <button @click="publishMessage">Publish Message</button>
</template>

<script>
import { EventBus } from './eventBus.js';

export default {
  methods: {
    publishMessage() {
      EventBus.$emit('message-published', 'Hello from Publisher!');
    },
  },
};
</script>
```

```html
<!-- 订阅者组件 Subscriber.vue -->
<template>
  <div>{{ lastMessage }}</div>
</template>

<script>
import { EventBus } from './eventBus.js';

export default {
  data() {
    return {
      lastMessage: '',
    };
  },
  mounted() {
    EventBus.$on('message-published', this.updateMessage);
  },
  beforeDestroy() {
    EventBus.$off('message-published', this.updateMessage);
  },
  methods: {
    updateMessage(message) {
      this.lastMessage = message;
    },
  },
};
</script>
```

##### **代码解释**

* **事件总线** :
  * `eventBus.js`: 创建了一个新的 Vue 实例作为事件总线。
* **发布者组件** :
  * `Publisher.vue`: 定义了一个按钮，点击时触发 `publishMessage` 方法并通过 `EventBus` 触发 `message-published` 事件。
* **订阅者组件** :
  * `Subscriber.vue`: 在 `mounted` 生命周期钩子中监听 `message-published` 事件，并在接收到消息时更新 `lastMessage` 数据属性。

#### **使用 Refs**

* **适用场景** ：当需要直接访问子组件实例时。例如：在文件列表页面中，父组件可以直接调用子组件（例如文件预览组件）的方法来打开文件预览。
* **如何使用** ：父组件可以通过 `ref` 属性为子组件命名，并通过 `$refs` 访问子组件实例。

##### 代码示例

```html
<!-- 父组件 Parent.vue -->
<template>
  <div>
    <Child ref="childRef" />
    <button @click="callChildMethod">Call Child Method</button>
  </div>
</template>

<script>
import Child from './Child.vue';

export default {
  components: {
    Child,
  },
  methods: {
    callChildMethod() {
      this.$refs.childRef.childMethod();
    },
  },
};
</script>
```

```html
<!-- 子组件 Child.vue -->
<template>
  <div>Child Component</div>
</template>

<script>
export default {
  methods: {
    childMethod() {
      console.log('Called from parent');
    },
  },
};
</script>
```

##### **代码解释**

* **父组件** :
  * `Parent.vue`: 定义了一个按钮，点击时触发 `callChildMethod` 方法，并通过 `$refs` 访问子组件实例，调用其 `childMethod` 方法。
* **子组件** :
  * `Child.vue`: 定义了一个 `childMethod` 方法，当被父组件调用时输出一条日志。

##### `ref` 和 `$refs`的特点

使用 `ref` 和 `$refs`，父组件可以直接访问和操作子组件的数据和方法。这在某些需要直接控制子组件行为的情况下非常有用，例如重置表单、启动动画等。

###### 注意事项

* **解耦性** ：直接使用 `$refs` 来调用子组件的方法或访问数据，会导致父子组件间的耦合度增加，降低组件的解耦性和可复用性。
* **数据驱动** ：Vue 提倡数据驱动的方式来管理组件状态和交互，过多使用 `$refs` 可能违背这一原则。
* **生命周期钩子** ：确保在子组件完全加载和挂载之后再使用 `$refs`，通常在 `mounted` 钩子中进行操作。

###### 结论

`ref` 和 `$refs` 在父子组件通信中提供了直接访问和操作子组件的能力，这在某些特定场景下非常有用。然而，出于解耦性和可维护性的考虑，应该谨慎使用。通常情况下，推荐使用 `props` 和事件机制来实现父子组件间的数据传递和通信，以保持组件的独立性和可复用性。

#### **提供/注入 (Provide/Inject)**

* **适用场景** ：当需要让一个祖先组件向其所有子孙组件注入一个值时，无论组件层次有多深。例如：在文档编辑器中，可能会有多个子组件需要访问同一个服务或配置，比如文档的权限设置，这时可以使用 Provide/Inject 来传递这些信息。
* **如何使用** ：通过 `provide` 选项在祖先组件中提供一个值，并在子孙组件中通过 `inject` 选项注入这个值。

##### 示例代码

```html
<!-- 祖先组件 Ancestor.vue -->
<template>
  <div>
    <Descendant />
  </div>
</template>

<script>
import Descendant from './Descendant.vue';

export default {
  provide() {
    return {
      message: 'Passed through ancestor',
    };
  },
  components: {
    Descendant,
  },
};
</script>
```

```html
<!-- 子孙组件 Descendant.vue -->
<template>
  <div>{{ message }}</div>
</template>

<script>
export default {
  inject: ['message'],
};
</script>
```

##### **代码解释**

* **祖先组件** :
  * `Ancestor.vue`: 通过 `provide` 选项提供一个名为 `message` 的值。
* **子孙组件** :
  * `Descendant.vue`: 通过 `inject` 选项注入 `message` 值，并在模板中显示它。

#### **动态组件 (Dynamic Components)**

* **适用场景** ：当需要根据条件切换显示不同组件时。例如：在视频流中，根据用户的互动情况动态显示不同的组件，比如点赞组件、评论组件等。
* **如何使用** ：使用 `<component :is="currentComponent">` 标签结合数据绑定来动态渲染组件。

##### 示例代码

```html
<!-- 父组件 Parent.vue -->
<template>
  <div>
    <component :is="currentComponent"></component>
    <button @click="switchComponent">Switch Component</button>
  </div>
</template>

<script>
import ComponentA from './ComponentA.vue';
import ComponentB from './ComponentB.vue';

export default {
  data() {
    return {
      currentComponent: ComponentA,
    };
  },
  methods: {
    switchComponent() {
      this.currentComponent = this.currentComponent === ComponentA ? ComponentB : ComponentA;
    },
  },
};
</script>
```

##### **代码解释**

* **父组件** :
  * `Parent.vue`: 定义了一个按钮，点击时触发 `switchComponent` 方法来切换渲染的组件。
  * 使用 `<component :is="currentComponent"></component>` 来动态渲染组件。

#### **组件实例的 attrs和**a**tt**rs**和listeners**

* **适用场景** ：当需要自动传递未被识别的属性和事件监听器到子组件时。例如：在商品详情页面中，可能会有一些自定义属性或事件需要传递给第三方组件，比如评论组件中的点击事件。
* **如何使用** ：利用组件实例上的 `$attrs` 和 `$listeners` 对象可以方便地将未声明的属性和事件转发给子组件。

##### 示例代码

```html
<!-- 父组件 Parent.vue -->
<template>
  <div>
    <Child :class="{ active: true }" @click="handleClick" />
  </div>
</template>

<script>
import Child from './Child.vue';

export default {
  components: {
    Child,
  },
  methods: {
    handleClick(event) {
      console.log('Clicked in parent');
    },
  },
};
</script>
```

```html
<!-- 子组件 Child.vue -->
<template>
  <div :class="$attrs.class" @click="$listeners.click">
    {{ $attrs.class }}
  </div>
</template>

<script>
export default {};
</script>
```

##### **代码解释**

* **父组件** :
  * `Parent.vue`: 传递了一个 `class` 属性和一个 `click` 事件给子组件。
* **子组件** :
  * `Child.vue`: 使用 `$attrs` 和 `$listeners` 来获取并使用从父组件传递过来的属性和事件。

## 为何二次封装

在日常工作中，会使用第三方UI组件库，比如：element-ui、vant-ui、iview、ant-design等等。不管是为了业务考虑还是单纯的为了提高效率，我们会把一些经常用到的组件抽离、封装成公共组件，这样方便我们在不同的地方使用这个组件，减少重复代码的编写。

二次封装的核心思想可以总结为以下几点：

1. **数据传递与职责分离** ：通过父组件传递数据给子组件，子组件保持固定的展示样式和结构，具体的业务逻辑由父组件处理，实现数据和逻辑的分离。
2. **保持原有功能** ：尽量保留和复用 element-ui 组件的原有方法和属性，通过 `v-bind="$attrs"` 和 `v-on="$listeners"` 来传递未显式声明的属性和事件，以确保组件的兼容性和可扩展性。
3. **一致性与可维护性** ：如果需要修改或扩展组件的方法，尽量保持方法名和行为的一致性，确保与原组件的相似方法名称保持不变，便于理解和维护。

## `$attrs` 和 `$listeners`

我们多级组件嵌套需要传递数据时，通常使用的方法是通过vuex。如果仅仅是传递数据，而不做中间处理，使用 vuex 处理，这就有点大材小用了。所以就有了 `$attrs / $listeners` ，通常配合 inheritAttrs 一起使用。

简单的说就是 inheritAttrs：true 继承除props之外的所有属性；inheritAttrs：false 只继承class属性。

* `$attrs`: 包含了父作用域中不被认为 (且不预期为) props 的特性绑定 (class 和 style 除外)，并且可以通过 `v-bind="$attrs"` 传入内部组件。当一个组件没有声明任何 props 时，它包含所有父作用域的绑定 (class 和 style 除外)。
* `$listeners`: 包含了父作用域中的 (不含 .native 修饰符) v-on 事件监听器。它可以通过 `v-on="$listeners"` 传入内部组件。它是一个对象，里面包含了作用在这个组件上的所有事件监听器，相当于子组件继承了父组件的事件。

attrs和listeners 在做组件二次封装时非常有用。

### 总结

在二次封装 UI 组件时，`props` 和事件仍然是最常用和推荐的通信方式，特别是当组件之间的数据流是单向的，并且层级较浅时。如果应用变得复杂，跨组件或跨页面的状态管理需求增加，可以考虑使用 Vuex 或其他状态管理库。对于深层次组件嵌套的场景，可以使用 `provide/inject`。直接访问组件实例的方式 (`$refs` 和 `$parent/$children`) 应该谨慎使用，仅在特定场景下使用，以避免增加组件间的耦合度。

## 封装案例参考

目前公司前端项目组件基本都是使用Vue2+Element UI 进行开发的，所以基本围绕Vue2框架进行案例延伸，仅供参考学习。

### Dialog封装复用

在PC 端项目中，经常使用到弹窗内容展示，而且该弹窗在多个页面都有用到，因此需要将dialog进行封装以便复用，在Element-UI 的基础上，对dialog 进行封装，最重要的是一个属性值的控制 即 visible，对于dialog 中要显示哪些内容，按照一般组件传过来就可以了。

#### 代码示例

Demo父组件：

```javascript
<template>
    <div class="dialogDemoContainer">  
      <el-button type="primary" @click="dialogShowChange(true)">show dialog</el-button>
      <div v-if="dialogShow" class="dialogBox">
      <myDialog :dialogShow="dialogShow" @dialogShowChange="dialogShowChange"></myDialog>
      </div>
    </div>
</template>
<script>
import myDialog from './MyDialog.vue'
export default {
  data() {
    return {
      dialogShow: false
    }
  },
  components: {
    myDialog
  },
  methods: {
    dialogShowChange(val) {
      this.dialogShow = val
    }
  }
}
</script>
<style lang="scss" scoped>
.dialogDemoContainer {
  text-align: center;
  padding: 20px;
  .dialogBox {
    text-align: left;
  }
}
</style>
```

Dialog子组件：

```javascript
<template>
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible" @close="closeDialog">
  <el-form :model="form">
    <el-form-item label="活动名称" :label-width="formLabelWidth">
      <el-input v-model="form.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="活动区域" :label-width="formLabelWidth">
      <el-select v-model="form.region" placeholder="请选择活动区域">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="closeDialog">取 消</el-button>
    <el-button type="primary" @click="closeDialog">确 定</el-button>
  </div>
</el-dialog>
</template>
<script>
export default {
  props: {
    dialogShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialogFormVisible: this.dialogShow,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px'
    }
  },
  watch: {
    dialogShow(val) {
      this.dialogFormVisible = val
    }
  },
  methods: {
    closeDialog() {
      this.$emit('dialogShowChange', false)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
```

#### 核心解决思路

* 父组件传给dialog 子组件的 属性值 不直接使用在visible 属性值上，取另外的值与其同步。

* 在dialog 子组件中 通过watch 监听父组件中传值的变化，进行同步。

* 子组件中需要关闭dialog 时，同样要触发父组件中的时间，修改父组件中定义的控制dialog 显示的值。
