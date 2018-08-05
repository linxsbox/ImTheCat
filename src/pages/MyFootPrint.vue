<template>
  <div class="home-box">
  </div>
</template>

<script>
import * as h from '@/vbo/home'

export default {
  name: 'Home',
  data () {
    return {
    }
  },
  created () {},
  mounted () {
    
    console.log(h.datas)
    console.log(h.fnEnum)
    console.log(h.fnDispatch)
  
  },
  methods: {
   
  },
  computed: {

  }
}
</script>

<style>

</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
