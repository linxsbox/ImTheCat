<template>
  <div class="kc-avatar">
    <img
      v-if="src"
      v-bind="$attrs"
      v-on="$listeners"
      class="kc-avatar--image"
      :style="computedStyle"
      :src="src"
    >
    <div
      v-else
      class="kc-avatar--text"
      v-bind="$attrs"
      v-on="$listeners"
      :style="computedStyle"
    >{{ text }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from '@vue/composition-api';
interface SizeMap {
  [key: string]: string
}

export default defineComponent({
  name: 'KcAvatar',
  props: {
    shape: {
      type: String,
      default: 'square',
    },
    size: {
      type: [String, Number],
      default: 'middle',
    },
    src: {
      type: String,
    },
    text: {
      type: String,
    },
  },
  inheritAttrs: false,
  setup (props, context) {
    const computedStyle = computed(() => {
      const { size, shape } = props;
      const sizeMap:SizeMap = {
        mini: '30px',
        small: '50px',
        middle: '70px',
        large: '90px',
      };
      const length = typeof size === 'string'? sizeMap[size]: size + 'px';
      return {
        borderRadius: shape === 'square'? '5px': '50%',
        width: length,
        height: length,
        lineHeight: length
      };
    });
    return {
      computedStyle
    };
  },
});
</script>

<style lang="scss" scoped src="./index.scss">
/* @import url('index.scss'); */
</style>
