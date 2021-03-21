<template>
  <div class="kc-goTop" @click="handleClick">
    <slot>
      <div class="kc-goTop-btn">goTop</div>
    </slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from '@vue/composition-api';
export default defineComponent({
  setup (props, content) {
    const handleClick = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    };
    return {
      handleClick
    };
  }
});
</script>

<style lang="scss" scoped src="./index.scss">
  /* @import url('index.scss'); */
</style>
