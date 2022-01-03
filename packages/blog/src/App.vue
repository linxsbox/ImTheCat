<template>
  <div>
    <LayoutHeader></LayoutHeader>
    <Layout data-layout="app-layout"></Layout>
    <!-- <layout-footer></layout-footer> -->
  </div>
</template>


<script lang="ts">
import { defineComponent } from "vue";
import Layout from "@/layout/index.vue";
import LayoutHeader from "@/layout/header/index.vue";

export default defineComponent({
  name: "App",
  components: {
    Layout,
    LayoutHeader,
    // layoutFooter,
  },
});
</script>

<style lang="scss" src="assets/css/index.scss"></style>
