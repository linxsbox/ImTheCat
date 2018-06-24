<template>
  <div class="hello">

    <p v-for="(item, i) in arr"
      :key="i"
      :class="{del: delItem[i], add: addItem[i]}"
      @click="remove(i)"
      v-if="item !== null">
      {{item}}
    </p>

    <div @click="add"> add </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      arr: [1,2,3,4,5],
      addClass: [],
      removeClass: []
    }
  },
  created () {},
  mounted () {
    for (const key in this.arr) {
      this.addClass[key] = false
      this.removeClass[key] = false
    }
  },
  methods: {
    add () {
      this.arr.push(1)
      this.addClass.splice(this.arr.length, 1, true)

      console.log('add', this.addClass)
    },
    remove (i) {
      this.removeClass.splice(i ,1 , this.removeClass[i] = !this.removeClass[i])

        console.log('arr: ', this.arr)
        console.log('remove: ', this.removeClass)

      let stm = setTimeout(()=>{

        this.arr.splice(i ,1 ,null)
        this.removeClass.splice(i ,1 ,false)

        console.log('timeout arr: ', this.arr)
        console.log('timeout remove: ', this.removeClass)

console.log(this.arr === null)
        if (this.arr.length <= 0) {
          console.log('clean all')
          this.arr = []
          this.addClass = []
          this.removeClass = []
        }
        clearTimeout(stm)
      }, 1000)
    }
  },
  computed: {
    addItem () {
      return this.addClass
    },
    delItem () {
      return this.removeClass
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
p {
  border: 1px solid #000;
}
.add {
  background-color: aquamarine;
}
.del {
  background-color: red;
}
</style>
