<template>
  <header class="header">
    <div class="tc-banner"></div>
    <div class="tc-container">
      <nav class="tc-nav-bar">
        <div>
          <div class="pad20">&nbsp;</div>
          <h1>林小帅的博客</h1>
          <div class="pad20">&nbsp;</div>
        </div>
        <ul class="tc-nav-box unstyle mag-20-lr">
          <li class="tc-nav-item inline-block">
            <router-link class="tc-nav-link" :to="{name: 'home'}">home</router-link>
          </li>
          <li class="tc-nav-item inline-block">
            <router-link class="tc-nav-link" :to="{name: 'test'}">test</router-link>
          </li>
          <li class="tc-nav-item inline-block" v-for="(item, index) in 3" :key="index">
            <router-link class="tc-nav-link" to="">nav item {{ item }}</router-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'layoutHeader',
  // data() {
  //   return {
  //   }
  // },
  // provide() {
  //   return {
  //   }
  // },
  // components: {
  // },
  // methods: {
  // }
};
</script>
<style scoped src="./index.css"></style>

