<template>
  <div class="articles-container">
    <div>{{ msg }} {{ name }}</div>
    <div>文章标题 {{ $route.params.id | toStr }}</div>
  </div>
</template>

<script lang="ts">
// https://github.com/kaorun343/vue-property-decorator
// https://github.com/vuejs/vue-class-component
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { Commits } from 'cat-vuex-decorator'; // Vuex Decorator
import { toStr } from '@/filters'; // Filters

// import * as h from './index';

@Component({
  components: { },
  filters: { toStr },
})
export default class ArticleDetails extends Vue {
  @Commits('setWebsiteTitle') setWebsiteTitle: any;

  // data
  name = 'ArticleDetails';
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
    this.setWebsiteTitle(this.$route.params.id);
  }

  beforeDestroy () {
    console.log(123);
  }
}
</script>

<style>
  @import url('index.css');
</style>
