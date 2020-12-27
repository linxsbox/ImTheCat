<template>
  <div class="hsyClock-container">
    {{ date }}<br>
    <span class="test-timer">{{ time }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import { dateFormat } from '@/utils/hsyTime.ts';

export default defineComponent({
  name: 'HsyClock',
  setup (props, context) {
    const date = ref('');
    const time = ref('');
    function timeLoop (){
      const now = +new Date();
      date.value = dateFormat(now, 'MM月DD日');
      time.value = dateFormat(now, 'hh mm');
      setTimeout(timeLoop, 500);
    }
    setTimeout(timeLoop, 0);
    return {
      date,
      time
    };
  }
});

</script>

<style lang="scss" scoped src="./index.scss">
</style>