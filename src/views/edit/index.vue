<template>
  <div>
    <input type="button" value="返回首页" @click="goHome" />
    <br />
    <div>
      <p>编辑界面</p>
      <p>你的用户名{{userName}}</p>
      <p>你的密码{{password}}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator';
export default Vue.extend({
  name: 'edit', // 组件名
  data () { // 数据对象
    return {};
  },
  methods: { // methods 方法对象
    goHome () {
      this.$router.push({ name: 'home' });
    },
  },
  props: { // props 暴露对象
    userName: String,
    password: String,
  },
  components: {}, // components 组件引用
  watch: {}, // watch 监听对象
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

<style scoped>
</style>