<template>
  <div class="home-container">
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

@Component({
  components: { articleCard },
})
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
    console.log('this is created');
  }
  // mounted
  mounted () {
    console.log('this is mounted');
  }

  // computed
  get helloHome () {
    return this.msg + 'home';
  }

  // methods
  gotoDetail (e: Event) {
    this.$router.push({name: 'article'});
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