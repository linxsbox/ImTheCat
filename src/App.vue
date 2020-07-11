<template>
  <div id="app">
    <layout data-layout="app-layout"></layout>
  </div>
</template>

<script lang="ts">
// Provide
import { Vue, Component } from 'vue-property-decorator';
import layout from '@/layout/index.vue';
// import test from 'cps/test.vue';

@Component({
  components: {
    layout,
    // test,
  },
})
export default class App extends Vue {
  // data 数据字段
  // isAcitve = true;

  // Provide
  // @Provide() refresh = this.refreshView;

  // constructor 构造函数
  // constructor () {
  //   super();
  // }

  // mounted () { }

  // // methods
  // refreshView () {
  //   // when url changing, but router did not jump to page,
  //   // you can use it inject refresh the page.
  //   this.isAcitve = false;
  //   this.$nextTick(() => {
  //     this.isAcitve = true;
  //   });
  // }
}
</script>

<style lang="scss" src="assets/css/index.scss"></style>
