<template>
  <div class="barrage-room-container">
    <div></div>
    <div></div>
    <div>
      <button type="button">发送</button>
    </div>
  </div>
</template>

<script lang="ts">
// https://github.com/kaorun343/vue-property-decorator
// https://github.com/vuejs/vue-class-component
import { Vue, Component, Prop, Watch, Emit } from 'vue-property-decorator';
import { WebSocketOnline } from '@/core/websocket';

@Component
export default class BarrageRoom extends Vue {

  // data
  name = 'BarrageRoom';
  msgBody = {};

  ws: any;

  @Prop(Number) readonly propA: number | undefined;

  @Watch('propA')
  onChildChanged (val: number, oldVal: number) {
    console.log(`newValue: ${val}, oldValue: ${oldVal}`);
  }

  // created
  created () {
    console.log('this is created');
    this.ws = WebSocketOnline.getInstance('ws://localhost:8081');
  }
  // mounted
  mounted () {
    console.log('this is mounted');
  }

  // methods
  helloWorld () {
    return 'Hello World';
  }

  sendMsg ( ) {
    // s
    this.ws.send(this.msgBody);
  }

  // computed
  get helloBarrageRoom () {
    return 'BarrageRoom';
  }

  @Emit()
  returnValue () {
    return 'BarrageRoom';
  }
}
</script>

<style lang="scss">
  @import url('index.scss');
</style>
