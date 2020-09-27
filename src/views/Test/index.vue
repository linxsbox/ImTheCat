<template>
  <div class="test-container">
    <p>{{ msg }} {{ name }} {{ txt }}</p>
    <button @click="clickChangeTxt">触发事件</button>
    <div v-for="(item, index) in tempList" :key="index">
      {{ item }}
    </div>
    <div class="video-box">
      <!-- autoplay -->
      <!-- src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/friday.mp4" -->
      <video class="video-view" preload="metadata" controls>
        <source type="video/mp4" src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/friday.mp4" />
        <track label="中文字幕" kind="subtitles" srclang="zh" src="./zimu.vtt" default>
        <track label="英文字幕" kind="subtitles" srclang="en" src="./friday.vtt">
      </video>
      <div class="video-dm">

      </div>
    </div>
    <button type="button" @click="paused">暂停</button>
  </div>
</template>

<script lang="ts">
// 如需使用 Vue 3.0 的能力也需要在组件中引入 composition-api
import { defineComponent, Ref, ref, onMounted, h } from '@vue/composition-api';
// defineComponent 能够对 TypeScript 更好的类型推导

import { dmData, template } from './template';

export default defineComponent({
  name: 'Test',
  // component: {},
  data () {
    return {
      txt: '贼牛逼！',
      tempList: [],
    };
  },
  // setup 中不再有 this，取而代之的是 context
  setup () {
    const msg: Ref<number> = ref(0);
    // 函数定义
    function clickChangeTxt () {
      console.log('触发函数');
      msg.value++;
    }

    const tempDmBox = document.querySelector('.video-dm');
    const pushDm: HTMLDivElement[] = [];

    function ready (parent: Element, text: string, index: number) {
      const tempElem = document.createElement('div');
      tempElem.innerText = text;
      tempElem.className = 'dm-go';
      tempElem.style.display = 'none';
      parent.appendChild(tempElem);
      tempElem.style.top = `${35 * index}px`;
      tempElem.style.left = '100%';
      // console.dir(tempElem);
      return tempElem;
    }

    function play (parent: Element, elem: HTMLDivElement) {
      dmData.forEach((item, index) => {
        if ((item.dmTime * 1) < 1) {
          pushDm.push(ready(tempDmBox, item.dmTxt, index));
        }
      });

      elem.style.display = 'block';
      elem.style.transform =`translateX(-${parent.clientWidth + elem.clientWidth + 10}px) translateY(0px) translateZ(0px)`;
      elem.addEventListener('transitionend', () => {
        const st = setTimeout(() => {
          elem.parentNode.removeChild(elem);
          clearTimeout(st);
        }, 100);
      }, false);
    }

    // function paused () {

    // }

    function initVideo () {
      const videoView: HTMLVideoElement = document.querySelector('.video-view');

      let currentTime = 0;
      let nextTime = 0;
      videoView.addEventListener('timeupdate', function () {
        console.log(Math.floor(videoView.currentTime));
        currentTime = Math.floor(videoView.currentTime);
        nextTime = Math.floor(videoView.currentTime) + 1;
        dmData.forEach((item, index) => {
          if ((item.dmTime * 1) > 1 && (item.dmTime * 1) === nextTime) {
            pushDm.push(ready(tempDmBox, item.dmTxt, index));
          }
        });

        dmData.forEach((item, index) => {
          if ((item.dmTime * 1) === currentTime) {
            play(tempDmBox, pushDm[index]);
          }
        });
      });

      videoView.addEventListener('ended', function () {
        tempDmBox.innerHTML = '';
      });

      // const md = navigator?.mediaDevices;
      // md?.enumerateDevices().then((data: any) => {
      //   console.log(data);
      // });

      // navigator.mediaDevices.getUserMedia({ audio: false, video: true })
      //   .then((stream: MediaStream) => {
      //     let videoTracks = stream.getVideoTracks();
      //     console.log('Using video device: ' + videoTracks[0].label);
      //     stream.addEventListener('ended', function () {
      //       console.log('Stream ended');
      //     });
      //     // window.stream = stream; // make variable available to browser console
      //     videoView.srcObject = stream;
      //   });
    }

    onMounted(() => {
      initVideo();
      // const c = document.createElement('div');
      // c.innerHTML = template;
      // const telem = c.querySelector('.list');
      // // const telem = document.querySelector('.list');
      // // console.dir(telem);
      // let tempDmList: any[] = [];
      // telem.children?.forEach((item) => {
      //   const { 0: dmTime, 7: dmId } = item?.getAttribute('p').split(',');
      //   if (dmTime >= 10 && dmTime < 21) {
      //     tempDmList.push({
      //       dmTxt: item.innerText,
      //       dmTime,
      //       dmId
      //     });
      //   }
      // });

      // const dmList = tempDmList.sort((a, b) => {
      //   return a.dmTime - b.dmTime;
      // });

      // // const dmList = Array.from(new Set(tempDmList));

      // console.log(JSON.stringify((dmList)));

      // debugger
      // console.log(dmData);

      // const a: string[] = [];
      // const b: any[] = [];
      // dmData.map((item) => {
      //   if (a.indexOf(item.dmId) === -1) {
      //     a.push(item.dmId);
      //     b.push(item);
      //   }
      // });
      // console.log(JSON.stringify(b));

      // console.log(dmData);
    });

    return {
      clickChangeTxt,
      msg,
      name: ref('Test'),
    };
  }
});


// https://github.com/kaorun343/vue-property-decorator
// https://github.com/vuejs/vue-class-component
// import { Vue, Component } from 'vue-property-decorator';
// // import * as h from './index';

// @Component
// export default class Test extends Vue {

//   // data
//   name = 'Test';
//   msg = '你好';
//   tempList = [1, 2, 3, 4, 5];
//   txt = '测试文本';

//   // created
//   created () {
//     console.log('this is created');
//   }
//   // mounted
//   mounted () {
//     console.log('this is mounted');
//   }

//   clickChangeTxt () {
//     this.msg = '触发变更文本';
//   }
// }
</script>

<style lang="scss" scoped src="./index.scss">
  /* @import url('index.scss'); */
</style>
<style scoped>

.test-container {
  min-height: 5rem;
  padding: .5rem .2rem
}

video::cue {
  font-size: .3rem;
}

.video-box {
  position: relative;
  max-width: 1025px;
  max-height: 577px;
}
.video-view, .video-dm {
  width: 100%;
  height: 100%;
}
.video-view {
  max-height: 577px;
  z-index: 10;
}
.video-dm {
  position: absolute;
  top: 0;
  z-index: 11;
  overflow: hidden;
  pointer-events: none;
}
.video-dm >>> .dm-go {
  position: absolute;
  color: rgb(255, 255, 255);
  font-size: 25px;
  font-weight: bold;
  white-space: pre;
  opacity: 1;
  text-shadow: rgb(0, 0, 0) 1px 0px 1px, rgb(0, 0, 0) 0px 1px 1px, rgb(0, 0, 0) 0px -1px 1px, rgb(0, 0, 0) -1px 0px 1px;
  transition: transform 8s linear 0s;
  will-change: transform;
  user-select: none;
  pointer-events: none;
  transform: translateX(0px) translateY(0px) translateZ(0px);
}
</style>