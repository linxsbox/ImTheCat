<template>
  <div class="resume-container">
    <!-- <keep-alive> -->
    <!-- <component :is="componentId" v-if="componentId"></component>
    <div v-else>
      测试这个简历列表页
      <div>
        <router-link :to="{ name: 'childResume', params: { id: 'demo1' } }"
          >demo1</router-link
        >
        &nbsp;
        <router-link :to="{ name: 'childResume', params: { id: 'demo2' } }"
          >demo2</router-link
        >
        &nbsp;
        <router-link :to="{ name: 'resume' }">resume</router-link>
        &nbsp;
        <router-link :to="{ name: 'index' }">index</router-link>
      </div>
    </div>

    <div>
      {{ componentId ? `我加载了 ${componentId} 组件页面` : '我是父页面' }}
    </div> -->
    <kc-review
      name="王冰冰"
      avatarUrl="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2420744160,4087949052&fm=26&gp=0.jpg"
      review="pikaqiuuuuuuuuuu"
    >
      <template #extra>
        <img
          src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2420744160,4087949052&fm=26&gp=0.jpg"
          width="250px"
        />
      </template>
      <template #expand>
        <kc-reviewer></kc-reviewer>
      </template>
    </kc-review>
    <kc-review
      name="王冰冰"
      avatarUrl="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2420744160,4087949052&fm=26&gp=0.jpg"
      review="今天天气真好"
    >
    </kc-review>
    <kc-review
      name="王冰冰"
      avatarUrl="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2420744160,4087949052&fm=26&gp=0.jpg"
      review="奶茶真好喝"
    >
    </kc-review>
    <kc-avatar
      shape="circle"
      size="large"
      src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2420744160,4087949052&fm=26&gp=0.jpg"
    ></kc-avatar>
    <kc-avatar
      shape="circle"
      size="middle"
      src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2420744160,4087949052&fm=26&gp=0.jpg"
    ></kc-avatar>
    <kc-avatar
      shape="circle"
      size="small"
      src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2420744160,4087949052&fm=26&gp=0.jpg"
    ></kc-avatar>
    <kc-avatar
      shape="circle"
      size="mini"
      src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2420744160,4087949052&fm=26&gp=0.jpg"
    ></kc-avatar>
    <kc-avatar
      size="large"
      src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2420744160,4087949052&fm=26&gp=0.jpg"
    ></kc-avatar>
    <kc-avatar
      size="middle"
      src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2420744160,4087949052&fm=26&gp=0.jpg"
    ></kc-avatar>
    <kc-avatar
      size="small"
      src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2420744160,4087949052&fm=26&gp=0.jpg"
    ></kc-avatar>
    <kc-avatar
      size="mini"
      src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2420744160,4087949052&fm=26&gp=0.jpg"
    ></kc-avatar>
    <kc-avatar size="large" text="pikaqiu"></kc-avatar>
    <kc-avatar size="middle" text="pikaqiu"></kc-avatar>
    <kc-avatar size="small" text="pikaqiu"></kc-avatar>
    <kc-avatar size="mini" text="pikaqiu"></kc-avatar>
    <KcGoTop/>
    <!-- </keep-alive> -->
  </div>
</template>

<script lang="ts">
// https://github.com/kaorun343/vue-property-decorator
// https://github.com/vuejs/vue-class-component
import { defineComponent } from '@vue/composition-api';
import KcReview from '@/components/Review/index.vue';
import KcAvatar from 'cps/Avatar/index.vue';
import KcReviewer from 'cps/Reviewer/index.vue';
import KcGoTop from 'cps/GoTop/index.vue';

export default defineComponent({
  components: {
    KcReview,
    KcAvatar,
    KcReviewer,
    KcGoTop
  }
});
</script>


<style lang="scss" scoped src="./index.scss">
</style>
