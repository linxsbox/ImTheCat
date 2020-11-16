<template>
  <div class="clock-container">
    {{ date }}<br>
    <span class="test-timer">{{ time }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from '@vue/composition-api';
import Input from '@/components/Input/index.vue';

export default defineComponent({
  name: 'Test',
  components: {
    Input
  },
  setup (props, context) {
    // 时钟 start
    const mon = ref(1);
    const day = ref(1);
    const hour = ref('0');
    const min = ref('0');
    function addZero (num: number):string {
      return (num < 10? '0': '') + num;
    }
    function loopClock (){
      const time = new Date();
      mon.value = time.getMonth() + 1;
      day.value = time.getDate();
      hour.value = addZero(time.getHours());
      min.value = addZero(time.getMinutes());
      setTimeout(loopClock, 500);
    }
    setTimeout(loopClock, 0);
    const date = computed(function (){
      return `${mon.value} 月${day.value}日`;
    });
    const time = computed(function (){
      return `${hour.value} ${min.value}`;
    });
    // 时钟 end
    // const inputStr = ref(1);
    return {
      // inputStr,
      date,
      time
    };
  }
});

</script>

<style lang="scss" scoped src="./index.scss">
</style>