<template>
  <div class="home-box">
    <div class="maps my-footprint">

    </div>
  </div>
</template>

<script>
import * as h from '@/vbo/home'
import maps from '@/vbo/maps'

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
    maps('.maps')
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
.my-footprint{
  width: 800px;
  height: 600px;
}
</style>
