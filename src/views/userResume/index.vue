<template>
  <div class="my-resume-box">
    <header class="my-info">
      <div>
        <span class="my-name">{{data.name}}</span>
        <span class="my-jobs">{{data.job}}</span>
      </div>
      <p class="my-edu">
        {{data.gender}}&nbsp;&nbsp;|
        {{data.university}}&nbsp;&nbsp;|
        {{data.education}}
      </p>
      <div class="my-lxfs-box">
        <dl class="lxfs-item">
          <dt class="label-lxfs">手机:</dt>
          <dd class="value-lxfs">{{data.phoneNum}}</dd>
        </dl>
        <dl class="lxfs-item">
          <dt class="label-lxfs">邮箱:</dt>
          <dd class="value-lxfs">{{data.mailAddress}}</dd>
        </dl>
        <dl class="lxfs-item">
          <dt class="label-lxfs">Github:</dt>
          <dd class="value-lxfs">{{data.gitAccount}}</dd>
        </dl>
      </div>
      <div>
        <ul class="description">
          <li class="desc-item" v-for="(item, index) in data.ability" :key="index">
            {{item}}
          </li>
        </ul>
      </div>
    </header>
    <hr>
    <!--  -->
    <div class="exp-title">工作经验</div>
    <div class="jobs-box">
      <div class="jobs-item" v-for="(item, index) in data.jobExp" :key="index">
        <header class="item-header">
          <span class="company-name">{{item.company}}</span>
           - 
          <span class="job-info">{{item.jobInfo}}</span>
          
          <span class="period">{{item.startDate}} - {{item.endDate || '至今'}}</span>
        </header>
        <div class="jobs-detail" v-html="item.description"></div>
      </div>
    </div>
    <hr>
    <!--  -->
    <div class="exp-title">项目经验</div>
    <div class="project-box">
      <div class="project-item" v-for="item in data.project" :key="item.projectName">
        <header class="item-header">
          <span class="project-name">{{item.projectName}}</span>
           - 
          <span class="company-name">{{item.company}}</span>
        </header>
        <div class="project-detail"
          v-html="item.description">
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// https://github.com/kaorun343/vue-property-decorator
// https://github.com/vuejs/vue-class-component
import { Vue } from 'vue-property-decorator';
import config from './config.json';

// import * as h from './index';

// TypeScript 混合模式
// Vue 组件生命周期理解学习
export default Vue.extend({
  name: 'userResume', // 组件名
  data () {
    // 数据对象
    return {
      data: config,
    };
  },
  components: {}, // components 组件引用
  props: {}, // props 暴露对象
  watch: {}, // watch 监听对象
  methods: {}, // methods 方法对象
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

<style src="./index.css" scoped>
</style>
