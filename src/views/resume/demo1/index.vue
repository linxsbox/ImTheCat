<template>
  <div class="demo1-container">
    这是 Demo1 页面
  </div>
</template>
<script lang="ts">
// https://github.com/kaorun343/vue-property-decorator
// https://github.com/vuejs/vue-class-component
import { Vue, Component, Prop, Watch, Emit } from 'vue-property-decorator';

@Component
export default class TaskList extends Vue {

  // data
  name = 'Demo1';
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

  @Emit()
  returnValue () {
    return 'demo1';
  }
}
</script>
<style>
</style>
