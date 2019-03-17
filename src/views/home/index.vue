<template>
  <div class="home-page">
    <div class="container tc-container">
      <div class="contents">
        <article class="articles cat-flex cat-flex-wrap mag-20-lr">
          <section class="cat-flex tc-article-card tc-card"
            v-for="(item, index) in 15" :key="index">
            <div class="tc-card-media">
              <!-- <img :src="`../../assets/imgs/image-${item}.jpg`" alt=""> -->
              <img class="tc-media-img" src="../../assets/imgs/image-1.jpg" alt="">
              <!-- src\assets\imgs -->
            </div>
            <div class="tc-card-body">123456</div>
          </section>
        </article>
      </div>
    </div>
    <!-- <div class="maps my-footprint"></div>
    <input type="text" v-model="key" @change="searchCity"> -->
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
  
    // console.log(this.$commitTypes.SET_TEST_COMMIT)
    this.$store.commit(this.$commitTypes.SET_TEST_COMMIT, 'this is commit.')
    // console.log(this.$actionTypes.SET_TEST_DISPATCH)
    this.$store.dispatch(this.$actionTypes.SET_TEST_DISPATCH, 'this is dispatch.')

    // console.log(this.$componentTypes)
    this.$store.commit(this.$componentTypes.COMMIT.SET_TEST_COMMIT, 'this is component commit.')
    this.$store.dispatch(this.$componentTypes.ACTION.SET_TEST_DISPATCH, 'this is component dispatch.')

    // console.log(this.$layoutTypes)
    this.$store.commit(this.$layoutTypes.COMMIT.SET_TEST_COMMIT, 'this is layout commit.')
    this.$store.dispatch(this.$layoutTypes.ACTION.SET_TEST_DISPATCH, 'this is layout dispatch.')
  },
  methods: {
  //  searchCity () {
  //    console.log(this.key)
  //    maps.qeuryCity(this.key)
  //  },
   ttt(){
     this.reload()
   }
  },
  computed: {}
}
</script>

<style>

</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="./index.css"></style>
