<template>
  <div class="home-container">
    <div class="container pad-t40">
      <article class="articles cat-flex cat-flex-wrap">
        <article-card class="cat-flex pointer" v-for="(item, index) in articleList" :key="index"
          @click="gotoArticleDetails(index)">
          <h3 class="article-card-title">{{ item['title'] }}</h3>
          <p class="article-card-summary-info">{{ item['summaryInfo'] }}</p>
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
import h from './index';

@Component({
  components: { articleCard, Asidebar },
})
export default class Home extends Mixins(MixinsArticles) {
  // data
  name = 'Home';
  msg = '你好';
  articleList: any = [];

  beforeCreate () { console.log('this is Home beforeCreate'); } // 创建前执行
  created () {
    console.log('this is Home created');
    this.articleList = h;
  }
  // mounted
  beforeMount () { console.log('this is Home beforeMount'); } // 加载前执行
  mounted () {
    console.log('this is Home mounted');
  }
  beforeUpdate () { console.log('this is Home beforeUpdate'); } // 更新之前执行
  updated () { console.log('this is Home updated'); } // 更新时执行
  beforeDestroy () { console.log('this is Home beforeDestroy'); } // 销毁前执行
  destroyed () { console.log('this is Home destroyed'); } // 销毁时执行
}
</script>

<style lang="scss" scope src="./index.scss"></style>
