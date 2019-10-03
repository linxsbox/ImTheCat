<template>
  <div id="app">
    <!-- <layout data-layout="app-layout"></layout> -->
  </div>
</template>

<script lang="ts">
import { Vue, Component, Provide } from 'vue-property-decorator';
// import layout from '@/layout';
import test from 'cps/test.vue';

@Component({
  // components: {layout},
  components: {
    test,
  },
})
export default class App extends Vue {
  // data 数据字段
  isReFresh = true;

  // Provide
  @Provide() rfes = this.refresh;

  // constructor 构造函数
  constructor () {
    super();
  }

  // methods
  refresh () {
    // when url changing, but router did not jump to page,
    // you can use it inject refresh the page.
    this.isReFresh = false;
    this.$nextTick(() => {
      this.isReFresh = true;
    });
  }
}
</script>
<style>
@import url('~/css/index.css');
</style>
