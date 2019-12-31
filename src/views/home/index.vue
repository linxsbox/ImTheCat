<template>
  <div class="home-container">
    {{ name }}
    <router-link :to="{name: 'learn'}">go to learn</router-link>
  </div>
</template>

<script lang="ts">
// https://github.com/kaorun343/vue-property-decorator
// https://github.com/vuejs/vue-class-component
import { Vue, Component, Prop, Watch, Emit } from 'vue-property-decorator';

@Component
export default class Home extends Vue {
  // data
  name = 'Home';
  msg = '你好';

  @Prop(Number) readonly propA: number | undefined;

  @Watch('propA')
  onChildChanged (val: number, oldVal: number) {
    console.log(`newValue: ${val}, oldValue: ${oldVal}`);
  }

  created () {
    console.log('%cthis is created from Home', 'color:red;font-weight:bolder;');
  }
  // mounted
  mounted () {
    console.log('%cthis is mounted from Home', 'color:red;font-weight:bolder;');
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