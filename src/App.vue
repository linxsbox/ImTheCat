<template>
  <div id="app">
    <router-view v-if="isReFresh"></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  data () {
    return{
      isReFresh: true
    }
  },
  provide () {
    return {
      refresh: this.refresh
    }
  },
  components: {},
  methods: {
    refresh () {
      // when url changing, but router did not jump to page,
      // you can use it inject refresh the page.
      this.isReFresh = false
      this.$nextTick(() => {
        this.isReFresh = true
      })
    }
  }
}
</script>

<style>
@import url('./assets/css/index.css');
</style>
