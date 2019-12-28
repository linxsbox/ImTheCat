<template>
  <div class="home-container">
    {{ name }}
    asdasd
  </div>
</template>

<script lang="ts">
// https://github.com/kaorun343/vue-property-decorator
// https://github.com/vuejs/vue-class-component
import { Vue, Component, Prop, Watch, Emit } from 'vue-property-decorator';

@Component
export default class B extends Vue {
  // data
  name = 'Home';
  msg = '你好';

  @Prop(Number) readonly propA: number | undefined;

  @Watch('propA')
  onChildChanged (val: number, oldVal: number) {
    console.log(`newValue: ${val}, oldValue: ${oldVal}`);
  }

  created () {
    console.log('this is created');
  }
  // mounted
  mounted () {
    console.log('this is mounted');
  }

  // computed
  get helloHome () {
    return this.msg + 'home';
  }

  // methods
  helloWorld () {
    return 'Hello World';
  }

  @Emit()
  returnValue () {
    return 'home';
  }
}
</script>
<style>
  @import url('index.css');
</style>