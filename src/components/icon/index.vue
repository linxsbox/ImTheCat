<template>
  <div>
    <span class="cat-icon- cat-icon-home" ></span>
  </div>
</template>

<script lang="ts">
// https://github.com/kaorun343/vue-property-decorator
// https://github.com/vuejs/vue-class-component\
import { defineComponent, Ref, ref, onMounted, h } from '@vue/composition-api';
import { Getters } from 'cat-vuex-decorator';
// import * as h from './index';
import { computed } from '@vue/composition-api';
const prefix = 'cat-icon';

export default defineComponent({


  // data
  name:'icon',


  setup () {
    computed(()=>{
      return prefix;
    });
    return {
      name: ref('icon')
    };
  }

});

</script>

<style lang="scss" socpe src="./index.scss"></style>
