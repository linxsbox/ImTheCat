<template>
  <div class="home-container">
    <div class="container">
      <div>
        <router-link :to="{name: 'test'}"> test </router-link>
      </div>
      <div>
        <router-link :to="{name: 'articles'}"> 所有 </router-link>
        <router-link :to="{name: 'articles', params: { type: '1'}}"> 分类一 </router-link>
        <router-link :to="{name: 'articles', params: { type: '2'}}"> 分类二 </router-link>
        <router-link :to="{name: 'imgPreview', params: { type: '2'}}"> 图片预览 </router-link>
      </div>
      <article class="articles cat-flex cat-flex-wrap">
        <article-card class="cat-flex" v-for="(item, index) in 7" :key="index"
          @click="gotoArticleDetails(index)">
          article {{ item }}
        </article-card>
      </article>

      <asidebar v-if="false"></asidebar>
    </div>
  </div>
</template>

<script lang="ts">
// https://github.com/kaorun343/vue-property-decorator
// https://github.com/vuejs/vue-class-component
import { Component, Mixins } from 'vue-property-decorator';
import articleCard from 'cps/ArticleCard/index.vue';
import Asidebar from 'cps/Asidebar/index.vue';
import { MixinsArticles } from '@/mixins/articles';

@Component({
  components: { articleCard, Asidebar },
})
export default class Home extends Mixins(MixinsArticles) {
  // data
  name = 'Home';
  msg = '你好';

  ws: any;

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