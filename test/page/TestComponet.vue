<template>
  <div>
    <div class="cat-slide">
       <cat-slide>
        <P>1</P>
        <P>2</P>
        <P>3</P>
        <P>4</P>
        <P>5</P>
        <P>6</P>
        <P>7</P>
        <P>8</P>
        <P>9</P>
        <P>10</P>
       </cat-slide>
    </div>
   
    <cat-calendar :cat-show="true" class="cat-slide"></cat-calendar>
    <!-- <div class="cat-slide">
       <cat-slide :cat-y="false">
        <P>1</P>
        <P>2</P>
        <P>3</P>
        <P>4</P>
        <P>5</P>
        <P>6</P>
        <P>7</P>
        <P>8</P>
        <P>9</P>
        <P>10</P>
       </cat-slide>
    </div> -->
  </div>
</template>

<script>
import CatSlide from "@/components/CatSlide"
import CatCalendar from "@/components/CatCalendar"

export default {
  name: "test",
  data() {
    return {};
  },
  components: {
    CatSlide,
    CatCalendar
  },
  created() {},
  mounted() {},
  methods: {},
  computed: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .cat-slide {
    height: 200px;
    border: 1px solid;
  }
  .cat-slide p {
    margin: 0;
  }
</style>
