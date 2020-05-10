<template>
  <div class="main view-layout" :data-timestamp="0">
    <!-- <layout-header></layout-header> -->
    <router-view class="cat-view-container" :class="viewClass" v-if="isAcitve"></router-view>
    <!-- <layout-footer></layout-footer> -->
  </div>
</template>

<script lang="ts">
import { Vue, Component, Provide } from 'vue-property-decorator';
// import layoutHeader from './header'
// import layoutFooter from './footer'

@Component({
  components: {
    // layoutHeader,
    // layoutFooter,
  },
})
export default class Layout extends Vue {
  name = 'layout';
  isAcitve = true;
  viewClass = 'view-default';

  // Provide
  @Provide() refresh = this.refreshView;

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
