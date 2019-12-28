<template>
  <div class="taskList-container">

  </div>
</template>
<script lang="ts">
// https://github.com/kaorun343/vue-property-decorator
// https://github.com/vuejs/vue-class-component
import { Vue, Component, Prop, Watch, Emit } from 'vue-property-decorator';
// import * as h from './index';

@Component
export class TaskList extends Vue {

  // data
  name = 'TaskList';
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
  
  // computed
  get helloTaskList () {
    return this.msg + 'taskList';
  }

  // methods
  helloWorld () {
    return 'Hello World';
  }

  @Emit()
  returnValue () {
    return 'taskList';
  }
}
</script>
<style>
  @import url('index.css');
</style>
