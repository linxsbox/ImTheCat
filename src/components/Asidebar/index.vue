<template>
  <aside class="asidebar">
    {{ msg }} {{ name }}、
    <nav class="nav-dock">
      <ul class="nav-list">
        <li></li>
      </ul>
    </nav>
    <nav></nav>
    <div></div>
    <div></div>
  </aside>
</template>

<script lang="ts">
// https://github.com/kaorun343/vue-property-decorator
// https://github.com/vuejs/vue-class-component\
import { Vue, Component, Prop, Watch, Emit } from 'vue-property-decorator';
import { Getters } from 'cat-vuex-decorator';
// import * as h from './index';

@Component
export default class Asidebar extends Vue {

  // data
  name = 'Asidebar';
  msg = '你好';

  @Getters('getViewLayout') readonly getViewLayout!: Element;

  @Prop(Number) readonly propA: number | undefined;

  @Watch('propA')
  onChildChanged (val: number, oldVal: number) {
    console.log(`newValue: ${val}, oldValue: ${oldVal}`);
  }

  // created
  created () {
    console.log('this is created');
  }
  // mounted
  mounted () {
    console.log('this is mounted');
    this.initAddLayout();
  }

  // 初始化后将自己加入 View-Layout 元素中
  initAddLayout () {
    const tempBox = this.getViewLayout;
    if (!tempBox) { return; }
    tempBox.appendChild(this.$el);
  }

  // methods
  helloWorld () {
    return 'Hello World';
  }

  // computed
  get helloAsidebar () {
    return this.msg + 'asidebar';
  }

  @Emit()
  returnValue () {
    return 'asidebar';
  }
}
</script>

<style lang="scss" socpe src="./index.scss"></style>
