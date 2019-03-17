<template>
  <div>
    测试路由跳转
    <button @click="backit">返回</button>
  </div>
</template>

<script>
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
  methods: {
    backit () {
      this.$router.go(-1)
    }
  },
  computed: {},
  beforeUpdate () {},
  updated () {},
  beforeDestroy () {},
  destroyed () {}
}
</script>
