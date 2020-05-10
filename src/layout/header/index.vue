<template>
  <header class="layout-header">
    
  </header>
</template>

<script lang="ts">
import { Vue, Component, Provide } from 'vue-property-decorator';

@Component({
  components: {
    // layoutHeader,
    // layoutFooter,
  },
})
export default class Header extends Vue {
  name = 'layout';
  isAcitve = true;
  viewClass = 'view-default';

  // Provide
  @Provide() refresh = this.refreshView;

  mounted () {
    console.log('layout');
  }

  beforeUpdate () {
    this.updateViewClass();
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

