// import * as apis from '@apis/resume';
// function getFn () { return ['resume']; }
// export default getFn;

// 子组件列表
import demo1 from './demo1/index.vue';
import demo2 from './demo2/index.vue';

export let componentList = {
  demo1,
  demo2,
};

export function getComponentInfo (key: string = '') {
  return Object.keys(componentList).indexOf(key) !== -1 ? key : '';
}
