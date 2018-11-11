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
  created () {},
  mounted () {},
  methods: {
    backit () {
      this.$router.go(-1)
    }
  }
}
</script>
