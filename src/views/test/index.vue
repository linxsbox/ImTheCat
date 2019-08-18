<template>
  <div>
    测试路由跳转
    <button @click="backit">返回</button>

    <button @click="testComponent">测试组件</button>
  </div>
</template>

<script>
import Vue from 'vue'
import toast from '@/components/toast/index.js'
export default {
  name: 'TextPage',
  data () {
    return {

    }
  },
  beforeCreate() {},
  created () {},
  beforeMount () {},
  mounted () {
    console.log(111)
    Vue.component(toast.name, toast)
    Vue.prototype.$toast = toast

    
    console.log(this.$commitTypes.GET_TEST_COMMIT,
      this.$store.getters[this.$commitTypes.GET_TEST_COMMIT])
    console.log(this.$actionTypes.GET_TEST_DISPATCH,
      this.$store.getters[this.$actionTypes.GET_TEST_DISPATCH])

    console.log(this.$componentTypes.COMMIT.GET_TEST_COMMIT,
      this.$store.getters[this.$componentTypes.COMMIT.GET_TEST_COMMIT])
    console.log(this.$componentTypes.ACTION.GET_TEST_DISPATCH,
      this.$store.getters[this.$componentTypes.ACTION.GET_TEST_DISPATCH])

    console.log(this.$layoutTypes.COMMIT.GET_TEST_COMMIT,
      this.$store.getters[this.$layoutTypes.COMMIT.GET_TEST_COMMIT])
    console.log(this.$layoutTypes.ACTION.GET_TEST_DISPATCH,
      this.$store.getters[this.$layoutTypes.ACTION.GET_TEST_DISPATCH])
  },
  components:{},
  props: {},
  watch: {},
  computed: {},
  methods: {
    backit () {
      this.$router.go(-1)
    },
    testComponent(){
      this.$toast({
        message: 'asdasdasdas',
        duration: 0
      })
    }
  },
  beforeUpdate () {},
  updated () {},
  beforeDestroy () {},
  destroyed () {}
}
</script>
