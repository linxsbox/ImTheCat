<template>
  <div class="home-container">
    <div>
      <router-link to="/404"> 跳转学习页面 </router-link>
    </div>
    <input type="button" value="查看用户信息" @click= "viewProfile">
    <div class="container">
      <article class="articles cat-flex cat-flex-wrap">
        <article-card class="cat-flex" v-for="(item, index) in 15" :key="index"
          @click="gotoDetail">
          article {{ item }}
        </article-card>
      </article>
    </div>
  </div>
</template>

<script lang="ts">
// https://github.com/kaorun343/vue-property-decorator
// https://github.com/vuejs/vue-class-component
import { Vue, Component, Prop, Watch, Emit } from 'vue-property-decorator';
import articleCard from 'cps/articleCard/index.vue';

// 防提醒
console.log(Prop, Watch);

@Component({
  components: { articleCard },
})
export default class Home extends Vue {
  // data
  name = 'Home';
  
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

  viewProfile (): void {
    this.$router.push({name: 'profile'});
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