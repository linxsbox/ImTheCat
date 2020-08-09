<template>
  <div class="learn-container">
    <div>Vue 学习</div>
    {{ msg }} {{ name }}
    <div>my name is {{name}}</div>
    <div></div>
    <div>
      <router-link to="/">go to index</router-link>
      <br>
    </div>
  </div>
</template>

<script lang="ts">
// https://github.com/kaorun343/vue-property-decorator
// https://github.com/vuejs/vue-class-component
import { Vue } from 'vue-property-decorator';
// import * as h from './index';

// TypeScript 混合模式
// Vue 组件生命周期理解学习
export default Vue.extend({
  name: 'Learn', // 组件名
  data () { // 数据对象
    return {
      name: 'LinShuai',
      msg: '你好',
    };
  },
  components: {}, // components 组件引用
  props: {}, // props 暴露对象
  watch: {}, // watch 监听对象
  methods: {}, // methods 方法对象
  computed: {}, // computed 计算对象

  // 组件路由生命周期
  beforeRouteEnter (to, from, next) { console.log('learn - 执行 beforeRouteEnter'); next(); }, // 路由进入之前
  beforeRouteLeave (to, from, next) { console.log('learn - 执行 beforeRouteLeave'); next(); }, // 路由离开之前
  beforeRouteUpdate (to, from, next) { console.log('learn - 执行 beforeRouteUpdate'); next(); }, // 路由更新之前

  // 生命周期
  beforeCreate () { console.log('learn - 执行 beforeCreate'); }, // 创建前执行
  created () { console.log('learn - 执行 created'); }, // 创建时执行
  beforeMount () { console.log('learn - 执行 beforeMount'); }, // 加载前执行
  mounted () { console.log('learn - 执行 mounted'); }, // 加载时执行
  beforeUpdate () { console.log('learn - 执行 beforeUpdate'); }, // 更新之前执行
  updated () { console.log('learn - 执行 updated'); }, // 更新时执行
  beforeDestroy () { console.log('learn - 执行 beforeDestroy'); }, // 销毁前执行
  destroyed () {
    console.log('learn - 执行 destroyed');
    console.log('------------------------------');
  }, // 销毁时执行
});
</script>

<style>
  @import url('index.css');
</style>
