<template>
  <button class="kc-button"
    @click="handleClick"
    :disabled="buttonDisabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
    :class="[{
      'is-disabled': buttonDisabled,
      'is-loading': loading,
      'is-plain': plain,
      'is-round': round,
      'is-circle': circle,
    }]"
  >
    <i class="kc-icon-loading" v-if="loading"></i>
    <i :class="icon" v-if="icon && !loading"></i>
    <span v-if="$slots.default"><slot></slot></span>
  </button>
</template>

<script lang="ts">
import { defineComponent, computed, ref, Ref, toRefs, getCurrentInstance } from '@vue/composition-api';
import { useButtonSize, useButtonDisabled } from './handle';

export default defineComponent({
  name: 'KcButton',
  props: {
    type: { type: String, default: 'default' },
    size: { type: String, default: '' },
    icon: { type: String, default: '' },
    nativeType: { type: String, default: 'button' },
    loading: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    autofocus: { type: Boolean, default: false },
    plain: { type: Boolean, default: false },
    round: { type: Boolean, default: false },
    circle: { type: Boolean, default: false }
  },
  // emits: ['click'],
  setup (props, context) {
    const { disabled, size } = toRefs(props);

    const buttonSize = useButtonSize(size, getCurrentInstance);
    const buttonDisabled = useButtonDisabled(disabled);

    const handleClick = (event: Event) => {
      context.emit('click', event);
    };

    return {
      handleClick,
      buttonDisabled
    };
  }
});
</script>

<style lang="scss" scoped src="../theme/button.scss"></style>