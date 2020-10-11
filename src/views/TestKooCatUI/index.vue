<template>
  <div class="testKooCatUI-container">
    <kc-button class="kc-button-xl" :class="{'active': setActive}" @click="btnClick">
      按钮
    </kc-button>

    <div class="t mag-tb20 fs024">xxx</div>
  </div>
</template>

<script lang="ts">
// https://github.com/kaorun343/vue-property-decorator
// https://github.com/vuejs/vue-class-component
import { defineComponent, computed, ref, Ref, toRefs } from '@vue/composition-api';
// import * as h from './index';
// import KcButton from '@/KooCatUI/packages/button/index';

export default defineComponent({
  name: 'TestKooCatUI',
  components: {
    // KcButton,
  },
  setup () {

    let setActive: Ref<boolean> = ref(false);
    const btnClick = () => {
      setActive.value = !setActive.value;
    };

    return {
      setActive,
      btnClick,
    };
  }
});
</script>

<style lang="scss" scoped src="./index.scss"></style>
