<template>
  <div class="articles-container">
    <div>{{ msg }} {{ name }}</div>
    <article class="articles cat-flex cat-flex-wrap">
      <article-card class="cat-flex" v-for="(item, index) in 15" :key="index"
        @click="gotoArticleDetails(index)">
        article {{ item }}
      </article-card>
    </article>
  </div>
</template>

<script lang="ts">
// https://github.com/kaorun343/vue-property-decorator
// https://github.com/vuejs/vue-class-component
import { Vue, Component, Mixins, Prop, Watch, Emit } from 'vue-property-decorator';
import articleCard from 'cps/ArticleCard/index.vue';
import {MixinsArticles} from '@/mixins/articles'; // Mixins

// import * as h from './index';

@Component({
  components: { articleCard },
})
export default class Articles extends Mixins(MixinsArticles) {

  // data
  name = 'Articles 文章列表';
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
}
</script>

<style>
  @import url('index.css');
</style>
