<template>
  <div class="kc-input">
    <textarea
      class="kc-input__textarea"
      v-if="isTextarea"
      v-bind="$attrs"
      :value="value"
      @input="onInput"
      :class="[stateName]"
    >
    </textarea>
    <input
      type="text"
      v-else
      v-bind="$attrs"
      :value="value"
      @input="onInput"
      :class="[stateName]"
    >
  </div>
</template>

<script lang="ts">
// https://github.com/kaorun343/vue-property-decorator
// https://github.com/vuejs/vue-class-component
import { defineComponent, computed, ref } from '@vue/composition-api';

export default defineComponent({
  name: 'KcInput',
  inheritAttrs: false,
  props: {
    type: {
      type: String,
      default: 'text'
    },
    value: {
      type: String,
      defalut: ''
    }
  },
  // emits: {
  //   input: null
  // },
  setup (props, context) {
    let isTextarea = props.type === 'textarea';
    // hook-validator-start
    const validator = (value: string, rule: string): boolean => {
      // 对各种情况进行检验，并返回布尔值
      switch (rule) {
        case 'number':
          return !isNaN( + value);
        default:
          console.log('default', value);
          return false;
      }
    };
    // 输入字符串时进行单项检验，输入字符串数组时进行多项检验
    const useValidator = (value: string, rules: string | string[]): boolean => {
      if(Array.isArray(rules)){
        return rules.every(rule => validator(value, rule));
      } else {
        return validator(value, rules);
      }
    };
    // hook-validator-end
    const StateName = {
      Primary: 'input-primary',
      Warning: 'input-warning',
      Waiting: 'input-waiting',
      Disabled: 'input-disabled',
      Info: 'input-info',
      Required: 'input-required',
    };
    // enum StateName {
    //   Primary,
    //   Warning,
    //   Waiting,
    //   Disabled,
    //   Info,
    //   Required,
    // }
    const stateName = ref(StateName.Primary);
    const onInput = (e: any) => {
      const value = e.target.value;
      if (!useValidator(value, 'number')) {
        console.log('未通过检查');
        stateName.value = StateName.Warning;
      } else {
        stateName.value = StateName.Primary;
      }
      context.emit('input', value);
    };
    return {
      isTextarea,
      onInput,
      stateName,
    };
  }
});

</script>

<style lang="scss" src="./index.scss"></style>
