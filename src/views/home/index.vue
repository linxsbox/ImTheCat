<template>
  <div class="home-container">
    <div>
      <router-link :to="{name: 'resume'}"> 跳转简历父模板页面 </router-link>
    </div>
    <input type="button" value="查看简历" @click= "goToResume">

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
  msg = '你好';
  rname = '';

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
    return 'home';
  }

  // methods
  gotoDetail (e: Event) {
    this.$router.push({name: 'article'});
  }

  goToResume (): void {
    this.$router.push({name: 'userResume'});
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