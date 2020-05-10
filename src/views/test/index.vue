<template>
  <div class="test-container">
    {{ msg }} {{ name }}
  </div>
</template>

<script lang="ts">
// https://github.com/kaorun343/vue-property-decorator
// https://github.com/vuejs/vue-class-component
import { Vue, Component, Prop, Watch, Emit } from 'vue-property-decorator';
import { Getters, Commits, Actions } from 'cat-vuex-decorator';
import * as h from './index';

@Component
export default class Test extends Vue {
  @Getters('getTest') g: any ;

  // data
  name = 'Test';
  msg = '你好';

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
  }

  // methods
  helloWorld () {
    return 'Hello World';
  }

  // computed
  get helloTest () {
    return this.msg + 'test';
  }

  @Emit()
  returnValue () {
    return 'test';
  }
}
</script>

<style>
  @import url('index.css');
</style>
