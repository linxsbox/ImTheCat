<template>
  <aside class="asidebar">
    {{ msg }} {{ name }}
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

  @Getters('getViewLayout') readonly getViewLayout: Element | undefined;

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
    this.initAddBody();
  }

  initAddBody () {
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

<style>
  @import url('index.css');
</style>
