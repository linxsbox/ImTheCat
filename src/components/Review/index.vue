<template>
  <div class="kc-review">
    <main class="kc-review__main">
      <header class="kc-review__head">
        <kc-avatar
          class="kc-review__avatar"
          shape="circle"
          size="small"
          :src="avatarUrl"
          :text="name"
        ></kc-avatar>
        <div class="kc-review__head--info">
          <span class="kc-review__name">{{ name }}</span><br>
          <span class="kc-review__msg">{{ msg }}</span>
        </div>
      </header>
      <article class="kc-review__review">{{ review }}</article>
      <div class="kc-review__extra">
        <slot name="extra"></slot>
      </div>
      <footer class="kc-review__footer">
        <div class="kc-review__btnGroup">
          <input type="button" value="点赞" class="kc-review__btn">
          <input type="button" value="评论" class="kc-review__btn" @click="reviewFn">
          <input type="button" value="转发" class="kc-review__btn">
        </div>
        <input type="button" value="更多" class="kc-review__btn kc-review__btn--right">
      </footer>
    </main>
    <footer v-show="expandFooter" class="kc-review__expand">
      <slot name="expand"></slot>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from '@vue/composition-api';
import { weekFormat, dateFormat, passTime } from '@/utils/hsyTime.ts';
import KcAvatar from 'cps/Avatar/index.vue';
export default defineComponent({
  name: 'KcReview',
  props: {
    name: {
      type: String,
      default: '-'
    },
    review: {
      type: String,
      default: ''
    },
    avatarUrl: {
      type: String,
      default: ''
    },
  },
  components: {
    KcAvatar
  },
  setup (props, context) {
    const now = +new Date();
    const msg = ref('');
    const lastTime = '2020/12/2 15:12:00';
    const expandFooter = ref(false);
    const reviewFn = () => {
      expandFooter.value = !expandFooter.value;
    };
    msg.value = passTime(lastTime, +new Date());
    setInterval(() => {
      msg.value = passTime(lastTime, +new Date());
    }, 1000);
    return {
      msg,
      expandFooter,
      reviewFn
    };
  },
});
</script>

<style lang="scss" scoped src="./index.scss">
/* @import url('index.scss'); */
</style>
