const fs = require('fs');
const path = require('path')
const basePath = path.resolve(__dirname, '../src')

/**
 * 构建模板
 * @param {*} options 
 */
const bulidTpl = async (options) => {
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
<script${codeType === 'ts' ? ' lang="ts"' : ''}>
// https://github.com/kaorun343/vue-property-decorator
// https://github.com/vuejs/vue-class-component
import { Vue, Component, Prop, Watch, Emit } from 'vue-property-decorator';
import * as h from './index';

@Component
export class ${tempPascalName} extends Vue {

  // data
  name = '${tempPascalName}';
  msg = '你好';

  @Prop(Number) readonly propA: number | undefined;

  @Watch('propA')
  onChildChanged (val: number, oldVal: number) {
    console.log(\`newValue: \${val}, oldValue: \${oldVal}\`);
  }

  // created
  created () {
    console.log('this is created');
  }
  // mounted
  mounted () {
    console.log('this is mounted');
  }
  
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
  const jsTpl = `import * as apis from '@apis/${fileName}';

function getFn () { return ['${fileName}']; }

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

  let arrFiles = [
    { fileName: 'index.vue', content: viewTpl },
    { fileName: `index.${cssType}`, content: cssTpl },
    { fileName: `index.${codeType}`, content: jsTpl }
  ];

  if (fileApi) {
    arrFiles.push({ fileName: `index.${codeType}`, content: apisTpl });
  }

  const buildResult = await buildFile(folderPath, arrFiles);

  return buildResult
};

/**
 * 构建并生成文件
 * @param {string} folderPath 文件夹路径
 * @param {array[object]} fileInfos 写入文件列表
 * @param {string} fileInfos.fileName 文件名
 * @param {string} fileInfos.content 写入的内容
 */
const buildFile = async (folderPath, fileInfos = []) => {
  if (fileInfos.length < 1) return

  console.log('【信息】检查文件目录。');

  if (!fs.existsSync(folderPath)) {
    console.log('【信息】文件目录不存在，尝试创建文件目录。');
    // 失败则调用 mkdir 创建相关文件夹，使用 recursive 递归模式来创建多级文件夹
    fs.mkdir(folderPath, { recursive: true }, err => {
      console.log('【信息】文件目录创建成功。', err);
      // 如若还失败则调用 reject 返回 错误信息并退出
      if (err) {
        console.log('【错误】文件目录创建失败：', err);
        return;
      }
    });
  }

  console.log('【信息】开始写入文件，请稍后……');

  // 循环需要写入的文件列表
  fileInfos.forEach((item, index) => {
    // 写入文件路径，将文件夹路径和文件名合并，生成完整文件路径
    const writeFilePath = path.join(folderPath, item.fileName);
    // 异步写入文件
    fs.writeFile(writeFilePath, item.content, 'utf8', err => {
      // 如果写入失败，则表示找不到文件夹
      if (err) {
        console.log('【错误】写入文件失败', err);
      } else {
        // 如果创建成功则返回成功信息用于输出控制台。
        console.log(`【信息】文件 ${item.fileName} 写入完成！`);
      }
    });
  });

  // 如何处理异步写入信息，最后返回结果
  return 
}

module.exports = { bulidTpl };
