<template>
  <div class="imgPreview-container">
    <!-- {{ msg }} {{ name }} -->
    <input type="file" name="readFile" id="" webkitdirectory @change="changeInputFile">
    <div class="img-preview-box">
      <div class="img-preview-item" v-for="(item, index) in imgFileList" :key="index">
        <img class="img-file" :src="item['src']" alt="" srcset="">
        <p class="img-file-name">{{ item['name'] }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// https://github.com/kaorun343/vue-property-decorator
// https://github.com/vuejs/vue-class-component
import { Vue, Component, Prop, Watch, Emit } from 'vue-property-decorator';
// import * as h from './index';

@Component
export default class ImgPreview extends Vue {

  // data
  name = 'ImgPreview';
  msg = '你好';
  imgFileList = [];

  @Prop(Number) readonly propA: number | undefined;

  @Watch('propA')
  onChildChanged (val: number, oldVal: number) {
    console.log(`newValue: ${val}, oldValue: ${oldVal}`);
  }

  // created
  created () {
    console.log('this is created');
  }
  // mounted
  mounted () {
    console.log('this is mounted');
  }

  changeInputFile (val: Event) {
    // console.log(val);
    // FileList 类型是一个类数组对象
    // 只读的长度 length
    // 获取 File 实例：item(index) 方法，[index] 下标选择符
    const fileList = (val.target as HTMLInputElement).files || [];
    if (fileList.length < 1) { return; }

    interface TParame {[key: string]: string | any}
    const tempList: TParame[] = [];

    // 类数组没有 iterator, 所以无法使用 Array 的方法进行遍历
    for (let index = 0; index < fileList.length; index++) {
      const item = fileList[index];
      const tempAddList = new Promise((resolve: (value: string | ArrayBuffer | null) => void) => {
        const reader = new FileReader();
        reader.onload = (event: ProgressEvent<FileReader>) => { resolve(event?.target?.result || ''); };
        reader.readAsDataURL(item);
      });
      tempAddList.then((data: string | ArrayBuffer | null) => {
        tempList.push({ src: data, name: item.name });
        if (tempList.length === fileList.length) {
          this.$set(this, 'imgFileList', tempList);
          (val.target as HTMLInputElement).value = '';
        }
      });
    }
  }

  // computed
  get helloImgPreview () {
    return this.msg + 'imgPreview';
  }

  @Emit()
  returnValue () {
    return 'imgPreview';
  }
}
</script>

<style>
  @import url('index.css');

  .img-preview-box {
    position: relative;
  }
  .img-preview-box .img-preview-item {
    display: inline-block;
    width: 312px;
    padding: 6px;
  }
  .img-preview-box .img-preview-item .img-file {
    display: inline-block;
    width: 300px;
    /* height: 300px; */
    border: 0;
  }
  .img-preview-box .img-preview-item .img-file-name {
    text-align: center;
    word-break: break-word;
  }
</style>
