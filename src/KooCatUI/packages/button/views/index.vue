<template>
  <button class="kc-button"
    @click="handleClick"
    :disabled="buttonDisabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
    >
    <span v-if="$slots.default"><slot></slot></span>
  </button>
</template>

<script>
import { Vue } from 'vue-property-decorator';
export default Vue.extend({
  name: 'KCButton',
  data () {
    return {
    };
  },
  props: {
    type: {
      type: String,
      default: 'default'
    },
    size: String,
    icon: {
      type: String,
      default: ''
    },
    nativeType: {
      type: String,
      default: 'button'
    },
    loading: Boolean,
    disabled: Boolean,
    plain: Boolean,
    autofocus: Boolean,
    round: Boolean,
    circle: Boolean
  },
  computed:{
    buttonDisabled () {
      return false;
    }
  },
  methods: {
    handleClick () {
      this.$emit('click', event);
    },
  }
});
</script>
<style lang="scss" scoped src="../../theme/button.scss">
  /* @import url('index.scss'); */
</style>