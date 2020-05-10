<template>
  <div class="resume-container">
    <!-- <keep-alive> -->
      <component :is="componentId" v-if="componentId"></component>
      <div v-else>
        测试这个简历列表页
        <div>
          <router-link :to="{name: 'childResume', params: {id: 'demo1'}}">demo1</router-link>
          &nbsp;
          <router-link :to="{name: 'childResume', params: {id: 'demo2'}}">demo2</router-link>
          &nbsp;
          <router-link :to="{name: 'resume'}">resume</router-link>
          &nbsp;
          <router-link :to="{name: 'index'}">index</router-link>
        </div>
      </div>

      <div>
        {{componentId ? `我加载了 ${componentId} 组件页面` : '我是父页面'}}
      </div>
    <!-- </keep-alive> -->
  </div>
</template>

<script lang="ts">
// https://github.com/kaorun343/vue-property-decorator
// https://github.com/vuejs/vue-class-component
import { Vue, Component, Prop, Watch, Emit } from 'vue-property-decorator';
import * as h from './index';

@Component({
  components: h.componentList || {},
})
export default class Resume extends Vue {

  // data
  name = 'Resume';
  msg = '你好';
  componentId = '';

  @Prop(Number) readonly propA: number | undefined;

  @Watch('$route.params')
  watchRouteChange (val: {[key: string]: any}, oldVal: {}) {
    this.componentId = h.getComponentInfo(val.id);
  }

  // created
  created () {
    console.log('this is created');
    this.componentId = h.getComponentInfo(this.$route.params.id);
  }
  
  // mounted
  mounted () {
    console.log('this is mounted');
  }

  // methods
  helloWorld () {
    return 'Hello World';
  }

  // computed
  get helloResume () {
    return this.msg + 'resume';
  }

  @Emit()
  returnValue () {
    return 'resume';
  }
}
</script>

<style>
  @import url('index.css');
</style>
