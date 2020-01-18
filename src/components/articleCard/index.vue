<template>
  <section class="article-card"

    v-on:click="eventClick">
    <div class="article-card-media" ref="media-box">
      <img class="article-media-img"
        :src="loadImgSrc ? loadImgSrc : ''"
        :style="imgStyle"/>
      <div class="article-media-mask"></div>
    </div>
    <div class="article-card-body">
      <slot> {{ text }} </slot>
    </div>
  </section>
</template>

<script lang="ts">
// https://github.com/kaorun343/vue-property-decorator
// https://github.com/vuejs/vue-class-component
import { Vue, Component, Prop, Watch, Model, Emit } from 'vue-property-decorator';
// import * as h from './index';

// 防报错
console.log(Watch, Model);


@Component
export default class ArticleCard extends Vue {

  // data
  name = 'ArticleCard';
  loadImgSrc = '';
  imgStyle = {
    width: 'auto',
    height: 'auto',
  };

  // props
  @Prop({type: String, default: '' }) readonly text: string | undefined;
  @Prop({type: String, default: '' }) readonly imgSrc!: string;

  // created
  created () {
    console.log('this is created');
  }

  // mounted
  mounted () {
    this.loadImage();
  }

  // load Image src evenet
  loadImage () {
    // 新建图像对象
    const tempImg = new Image();
    // 将需要载入的图像地址传入
    tempImg.src = this.imgSrc;
    // 图像载入函数
    tempImg.onload = eImg => {
      // 获取父级媒体盒子的元素
      const tempMediaBox: Element = this.$refs['media-box'] as Element;
      // 将父级盒子大小赋值给图像元素，改变图像元素的大小
      this.imgStyle.width = tempMediaBox.clientWidth + 'px';
      this.imgStyle.height = tempMediaBox.clientHeight + 'px';
      // 变更图像元素的数据源信息
      this.loadImgSrc = this.imgSrc;
    };
  }

  // emit
  @Emit('click')
  eventClick (e: Event) {
    return e;
  }
}
</script>

<style>
  @import url('index.css');
</style>
