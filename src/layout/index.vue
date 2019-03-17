<template>
  <div class="main view-layout" :data-timestamp="0">
    <layout-header></layout-header>
    <router-view class="cat-view-container"
      :class="viewClass"
      v-if="isReFresh">
    </router-view>
    <layout-footer></layout-footer>
  </div>
</template>

<script>
import layoutHeader from './header'
import layoutFooter from './footer'

export default {
  name: 'layout',
  data () {
    return{
      isReFresh: true,
      viewClass: 'view-default'
    }
  },
  provide () {
    return {
      refresh: this.refresh
    }
  },
  components: {
    layoutHeader,
    layoutFooter
  },
  mounted () {},
  methods: {
    refresh () {
      // when url changing, but router did not jump to page,
      // you can use it inject refresh the page.
      this.isReFresh = false
      this.$nextTick(() => {
        this.isReFresh = true
      })
    },
    updateViewClass () {
      let tempViewName = this.$route.name
      if (!tempViewName || tempViewName === '/') {
        this.viewClass = 'view-default'
        return
      }
      this.viewClass = `view-${tempViewName}`
    }
  },
  beforeUpdate () {
    
    this.updateViewClass()
  },
  computed: {},
}
</script>

<style scoped src="./index.css"></style>
