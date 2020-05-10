<template>
  <div class="home-container">
    <div>
      <router-link :to="{name: 'resume'}"> 跳转简历父模板页面 </router-link>
    </div>
    <input type="button" value="查看简历" @click= "goToResume">

    <div class="container">
      <div>
        <router-link :to="{name: 'test'}"> test </router-link>
      </div>
      <div>
        <router-link :to="{name: 'articles'}"> 所有 </router-link>
        <router-link :to="{name: 'articles', params: { type: '1'}}"> 分类一 </router-link>
        <router-link :to="{name: 'articles', params: { type: '2'}}"> 分类二 </router-link>
      </div>
      <article class="articles cat-flex cat-flex-wrap">
        <article-card class="cat-flex" v-for="(item, index) in 15" :key="index"
          @click="gotoArticleDetails(index)">
          article {{ item }}
        </article-card>
      </article>
    </div>
  </div>
</template>

<script lang="ts">
// https://github.com/kaorun343/vue-property-decorator
// https://github.com/vuejs/vue-class-component
import { Vue, Component, Mixins } from 'vue-property-decorator';
import articleCard from 'cps/ArticleCard/index.vue';
import { MixinsArticles } from '@/mixins/articles';

@Component({
  components: { articleCard },
})
export default class Home extends Mixins(MixinsArticles) {
  // data
  name = 'Home';
  msg = '你好';

  created () {
    console.log('%cthis is created from Home', 'color:red;font-weight:bolder;');
  }
  // mounted
  mounted () {
    console.log('%cthis is mounted from Home', 'color:red;font-weight:bolder;');
  }

  // computed
  get helloHome () {
    return 'home';
  }

  // methods
  gotoDetail (e: Event) {
    this.$router.push({name: 'article'});
  }

  goToResume (): void {
    this.$router.push({name: 'userResume'});
  }
}
</script>

<style>
  @import url('index.css');
</style>