<template>
  <div class="home-page">
    <div class="container">
      <div class="banner"> </div>
      <div class="nav-bar">
        <div class="avatar-box">
          <img class="avatar-img" src="">
        </div>
        <nav class="nav-list font32">
          <a href="" class="item">导航1</a>
          <a href="" class="item">导航2</a>
          <span class="item space"> </span>
          <a href="" class="item">导航3</a>
          <router-link :to="{name:'test'}" class="item">导航4</router-link>
        </nav>
      </div>
      <div class="contents"> </div>
    </div>
    <!-- <div class="maps my-footprint"></div> -->
    <input type="text" v-model="key" @change="searchCity">
  </div>
</template>

<script>
// import * as h from '@/apis/home/handle'
// import maps from '@/core/maps'

export default {
  name: 'Home',
  data () {
    return {
      key: ''
    }
  },
  // inject: ['refresh'],
  created () {},
  mounted () {
    // maps.drawMap('.maps')
    // console.log(this.$local)
    // // localStorage.setItem(0)
    // console.log(this.$session.get(1))
    // document.cookie = 'a=1'
    // document.cookie = 'a1=1'
    // document.cookie = 'a2=1'
    // document.cookie = 'a3=1'
    // let s = new Date()
    // s.setDate(s.getDate()+1)
    // document.cookie = ('a4=1;expires='+s.toGMTString())
    // document.cookie = 'a5=1'
    // console.log(document.cookie)
  },
  methods: {
   searchCity () {
     console.log(this.key)
    //  maps.searchCity(this.key)
   },
   ttt(){
     this.reload()
   }
  },
  computed: {

  }
}
</script>

<style>

</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="./index.css">
.my-footprint{
  width: 800px;
  height: 600px;
}
</style>

