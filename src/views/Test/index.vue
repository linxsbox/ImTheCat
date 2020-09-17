<template>
  <div class="test-container">
    <p>{{ msg }} {{ name }} {{ txt }}</p>
    <button @click="clickChangeTxt">触发事件</button>
    <div v-for="(item, index) in tempList" :key="index">
      {{ item }}
    </div>
  </div>
</template>

<script lang="ts">
// 如需使用 Vue 3.0 的能力也需要在组件中引入 composition-api
import { defineComponent, Ref, ref } from '@vue/composition-api';
// defineComponent 能够对 TypeScript 更好的类型推导
export default defineComponent({
  // component: {},
  data () {
    return {
      txt: '贼牛逼！'
    };
  },
  // setup 中不再有 this，取而代之的是 context
  setup () {
    const msg: Ref<number> = ref(0);
    // 函数定义
    function clickChangeTxt () {
      console.log('触发函数');
      msg.value++;
    }

    return {
      clickChangeTxt,
      msg,
      name: ref('Test')
    };
  }
});


// https://github.com/kaorun343/vue-property-decorator
// https://github.com/vuejs/vue-class-component
// import { Vue, Component } from 'vue-property-decorator';
// // import * as h from './index';

// @Component
// export default class Test extends Vue {

//   // data
//   name = 'Test';
//   msg = '你好';
//   tempList = [1, 2, 3, 4, 5];
//   txt = '测试文本';

//   // created
//   created () {
//     console.log('this is created');
//   }
//   // mounted
//   mounted () {
//     console.log('this is mounted');
//   }

//   clickChangeTxt () {
//     this.msg = '触发变更文本';
//   }
// }
</script>

<style lang="scss" scoped src="./index.scss">
  /* @import url('index.scss'); */
</style>
<style scoped>

.test-container {
  height: 5rem;
  padding: .5rem .2rem
}
</style>