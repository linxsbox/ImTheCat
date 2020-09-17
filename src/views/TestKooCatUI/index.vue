<template>
  <div class="testKooCatUI-container">
    <kc-button class="kc-button-xl" :class="{'active': setActive}" @click="btnClick">
      <span>按钮</span>
    </kc-button>

    <div class="t mag-tb20 fs024">xxx</div>
  </div>
</template>

<script lang="ts">
// https://github.com/kaorun343/vue-property-decorator
// https://github.com/vuejs/vue-class-component
import { Vue } from 'vue-property-decorator';
// import * as h from './index';
import KcButton from '@/KooCatUI/packages/button/views/index.vue';

export default Vue.extend({
  name: 'TestKooCatUI',
  data () {
    return {
      setActive: false,
    };
  },
  components: {
    KcButton,
  },
  methods: {
    btnClick () {
      this.setActive = !this.setActive;
    }
  }
});
</script>

<style lang="scss" scoped src="./index.scss">
  /* @import url('index.scss'); */
</style>
