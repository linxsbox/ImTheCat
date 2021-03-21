<template>
  <div id="app">
    <layout-header></layout-header>
    <layout data-layout="app-layout"></layout>
    <!-- <layout-footer></layout-footer> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, Ref, toRefs } from '@vue/composition-api';
import layout from '@/layout/index.vue';
import layoutHeader from '@/layout/header/index.vue';
// import layoutFooter from '@/layout/footer/index.vue';

export default defineComponent({
  components: {
    layout,
    layoutHeader,
    // layoutFooter,
  }
});
</script>

<style lang="scss" src="assets/css/index.scss"></style>
