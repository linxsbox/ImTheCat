<template>
  <div class="main view-layout" :data-timestamp="0" :key="1">
    <layout-header></layout-header>
    <transition name='fade' mode="out-in">
      <router-view class="cat-view-container" :class="viewClass" v-if="isAcitve"></router-view>
    </transition>
    <layout-footer></layout-footer>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Provide } from 'vue-property-decorator';
import layoutHeader from './header/index.vue';
import layoutFooter from './footer/index.vue';

@Component({
  components: {
    layoutHeader,
    layoutFooter,
  },
})
export default class Layout extends Vue {
  name = 'layout';
  isAcitve = true;
  viewClass = 'view-default';

  // Provide
  @Provide() refresh = this.refreshView;

  // beforeRouteUpdate (to, from, next) {
  //   const toDepth = to.path.split('/').length;
  //   const fromDepth = from.path.split('/').length;
  //   this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
  //   next();
  // }

  mounted () {
    console.log('layout');
  }

  // methods
  refreshView () {
    // when url changing, but router did not jump to page,
    // you can use it inject refresh the page.
    this.isAcitve = false;
    this.$nextTick(() => {
      this.isAcitve = true;
    });
  }

  beforeUpdate () {
    this.updateViewClass();
  }

  updateViewClass () {
    const tempViewName = this.$route.name;
    if (!tempViewName || tempViewName === '/') {
      this.viewClass = 'view-default';
      return;
    }
    this.viewClass = `view-${tempViewName}`;
  }
}
</script>

<style scoped src="./index.css"></style>
