<template>
  <div>
    <label>
      <input type="text" placeholder="userName" v-model="userName" />
    </label>
    <label>
      <input type="password" placeholder="password" v-model="password" />
    </label>
    <input type="button" value="编辑界面" @click="editPage" />
    <br />
    <input type="button" value="我的博客" />
    <br />
    <input type="button" value="我的简历" />
    <br />
    <input type="button" value="我的照骗" />
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator';
export default Vue.extend({
  name: 'Profile', // 组件名
  data () {
    // 数据对象
    return {
      userName: '',
      password: '',
    };
  },
  components: {}, // components 组件引用
  props: {}, // props 暴露对象
  watch: {}, // watch 监听对象
  methods: {
    editPage () {
      const name = this.userName.trim();
      const psw = this.password.trim();
      if (name !== '' && psw !== ''){
        this.$router.push({
        name: 'edit',
        params: { userName: name, password: psw },
      });
      }else{
        console.log('用户名或密码为空');
      }
    },
  }, // methods 方法对象
  computed: {}, // computed 计算对象

  // 组件路由生命周期
  beforeRouteEnter (to, from, next) {
    console.log('learn - 执行 beforeRouteEnter');
    next();
  }, // 路由进入之前
  beforeRouteLeave (to, from, next) {
    console.log('learn - 执行 beforeRouteLeave');
    next();
  }, // 路由离开之前
  beforeRouteUpdate (to, from, next) {
    console.log('learn - 执行 beforeRouteUpdate');
    next();
  }, // 路由更新之前

  // 生命周期
  beforeCreate () {
    console.log('learn - 执行 beforeCreate');
  }, // 创建前执行
  created () {
    console.log('learn - 执行 created');
  }, // 创建时执行
  beforeMount () {
    console.log('learn - 执行 beforeMount');
  }, // 加载前执行
  mounted () {
    console.log('learn - 执行 mounted');
  }, // 加载时执行
  beforeUpdate () {
    console.log('learn - 执行 beforeUpdate');
  }, // 更新之前执行
  updated () {
    console.log('learn - 执行 updated');
  }, // 更新时执行
  beforeDestroy () {
    console.log('learn - 执行 beforeDestroy');
  }, // 销毁前执行
  destroyed () {
    console.log('learn - 执行 destroyed');
    console.log('------------------------------');
  }, // 销毁时执行
});
</script>

<style scoped>
</style>