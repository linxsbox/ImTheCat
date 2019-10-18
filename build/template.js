const fs = require('fs');
const path = require('path')
const basePath = path.resolve(__dirname, '../src')

/**
 * 
 * @param {*} options 
 */
const bulidTpl = (options) => {
  let { fileName,
    filePath,
    codeType,
    cssType,
    fileApi } = options;

  // 将文件夹完整路径合并，默认在 src 下
  const folderPath = path.join(basePath, filePath)

  // 以驼峰命名类
  const tempPascalName = fileName.replace(fileName[0], fileName[0].toUpperCase());

  // 视图模板
  const viewTpl = `<template>
  <div class="${fileName}-container">

  </div>
</template>
<script lang="ts">
// https://github.com/kaorun343/vue-property-decorator
// https://github.com/vuejs/vue-class-component
import { Vue, Component, Prop, Watch, Emit } from 'vue-property-decorator';
import * as h from './index.${codeType}';

@Component
export class ${tempPascalName} extends Vue {

  // data
  name = '${tempPascalName}';
  msg = '你好';

  @Prop(Number) readonly propA: number | undefined;

  @Watch('propA')
  onChildChanged (val: number, oldVal: number) {}

  // created
  created () { }
  // mounted
  mounted () { }
  
  // computed
  get hello${tempPascalName} () {
    return this.msg + '${fileName}';
  }

  // methods
  helloWorld () {
    return 'Hello World';
  }

  @Emit()
  returnValue() {
    return '${fileName}';
  }
}
</script>
<style${cssType !== 'css' ? ' lang="' + cssType + '"' : ''}>
  @import url('index./${cssType}');
</style>
`;

  // css 模板
  const cssTpl = `.${fileName}-container{ }`;

  // js 模板
  const jsTpl = `import * as apis from '@apis/${fileName}.${codeType}';

function getFn () { return [${fileName}]; }

export default getFn;
`;

  // API 模板
  const apisTpl = fileApi ? `// ${fileName} api 集合
function get${tempPascalName} (params) {
  return http('url', {
    data: params
  })
}
function submit${tempPascalName} (params) {
  return http('url', {
    data: params
  })
}` : '';

  // const bfArr = [
    buildFile(folderPath, 'index.vue', viewTpl);
    buildFile(folderPath, `index.${cssType}`, cssTpl);
    buildFile(folderPath, `index.${codeType}`, jsTpl);
  // ]

  if (fileApi) {
    // bfArr.push(buildFile(folderPath, cssType, apisTpl))
  }

  // return Promise.all(bfArr)
  //   .then(data => {
  //     return data;
  //   })
  //   .catch()
};

/**
 * 
 * @param {string} folderPath 文件夹路径
 * @param {string} fileName 文件名
 * @param {string} content 写入的内容
 */
const buildFile = (folderPath, fileName, content) => {
  // 写入文件路径，将文件夹路径和文件名合并，生成完整文件路径
  const writeFilePath = path.join(folderPath, fileName);

  // return new Promise((resolve, reject) => {
    // 写入文件
    fs.writeFile(writeFilePath, content, 'utf8', err => {
      // 如果写入失败，则表示找不到文件夹
      if (err) {
        console.log('writeFile', err);
        // 失败则调用 mkdir 创建相关文件夹，使用 recursive 递归模式来创建多级文件夹
        fs.mkdir(folderPath, { recursive: true }, err => {
          // 如若还失败则调用 reject 返回 错误信息并退出
          if (err) {
            // reject(err);
            console.log(err);
            
            return;
          }
          buildFile(folderPath, fileName, content);
        });
      } else {
        // 如果创建成功则返回成功信息用于输出控制台。
        // resolve({
        //   message: `【信息】已成功创建${fileName}`,
        //   filePath: writeFilePath
        // })
      }
    });
  // });
}

module.exports = { bulidTpl };
