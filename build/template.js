const fs = require('fs');
const path = require('path')
const basePath = path.resolve(__dirname, '../src')

/**
 * 构建模板
 * @param {*} options 
 */
const bulidTpl = async (options) => {
  let { fileName, filePath, codeType, cssType, fileApi } = options;

  // 将文件夹完整路径合并，默认在 src 下
  const folderPath = path.join(basePath, filePath)

  // 以驼峰命名类
  const pascalName = fileName.replace(fileName[0], fileName[0].toUpperCase());

  // 构建模板
  let { viewTpl, cssTpl, jsTpl, apisTpl } = tplString(pascalName, fileName, codeType, cssType, fileApi);

  // 构建列表
  let arrFiles = [
    { fileName: 'index.vue', content: viewTpl },
    { fileName: `index.${cssType}`, content: cssTpl },
    { fileName: `index.${codeType}`, content: jsTpl }
  ];
  // 如果有选择 “构建 API 文件” 则将 API 也加入构建列表中
  if (fileApi) {
    arrFiles.push({ fileName: `index.${codeType}`, content: apisTpl });
  }

  // 构建结果
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
const buildFile = (folderPath, fileInfos = []) => {
  if (fileInfos.length < 1) return

  console.log('【信息】检查文件目录。');
  if (!fs.existsSync(folderPath)) {
    console.log('【信息】文件目录不存在，尝试创建文件目录。');
    // 失败则调用 mkdir 创建相关文件夹，使用 recursive 递归模式来创建多级文件夹
    fs.mkdir(folderPath, { recursive: true }, err => {
      console.log('【信息】文件目录创建成功。');
      // 如若还失败则调用 reject 返回 错误信息并退出
      if (err) {
        console.log('【错误】文件目录创建失败：', err);
        return;
      }
    });
  }

  console.log('【信息】开始写入文件，请稍后……');

  let tmpAsyncList = [];

  // 循环需要写入的文件列表
  fileInfos.forEach((item, index) => {
    // 写入文件路径，将文件夹路径和文件名合并，生成完整文件路径
    const writeFilePath = path.join(folderPath, item.fileName);
    tmpAsyncList.push(
      new Promise((resolve, reject) => {
        // 异步写入文件
        fs.writeFile(writeFilePath, item.content, 'utf8', err => {
          // 如果写入失败，则表示找不到文件夹
          if (err) {
            reject({
              state: 'error',
              error: err,
              message: `【错误】文件 ${item.fileName} 写入失败！`
            });
          } else {
            // 如果创建成功则返回成功信息用于输出控制台。
            resolve({
              state: 'success',
              message: `【信息】文件 ${item.fileName} 写入完成！`
            });
          }
        });
      })
    );
  });

  // 如何处理异步写入信息，最后返回结果
  return Promise.all(tmpAsyncList)
    .then(data => {
      data.forEach(item => {console.log(item.message) });
      return data;
    })
}

/**
 * 代码写入模板
 * @param {string} pascalName 以驼峰形式作为模块名
 * @param {string} fileName 文件夹名，即模块名
 * @param {string} codeType 代码类型 ECMAScript | TypeScript
 * @param {string} cssType 样式表类型 css/less/sass/scss
 * @param {string} fileApi Api 文件
 */
const tplString = (pascalName, fileName, codeType, cssType, fileApi) => {
  const tplTypeScript = `@Component
export default class ${pascalName} extends Vue {

  // data
  name = '${pascalName}';
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

  // methods
  helloWorld () {
    return 'Hello World';
  }

  // computed
  get hello${pascalName} () {
    return this.msg + '${fileName}';
  }

  @Emit()
  returnValue () {
    return '${fileName}';
  }
}`;

  const tplECMAScript = `export default Vue.extend({
  name: '${pascalName}',
  data () {
    return {
      name: '${pascalName}',
      msg: '你好'
    };
  },
  components: {}, // components 组件引用
  props: {}, // props 暴露对象
  watch: {}, // watch 监听对象
  methods: {}, // methods 方法对象
  computed: {}, // computed 计算对象

  // 组件路由生命周期
  beforeRouteEnter (to, from, next) { next(); }, // 路由进入之前
  beforeRouteLeave (to, from, next) { next(); }, // 路由离开之前
  beforeRouteUpdate (to, from, next) { next(); }, // 路由更新之前

  // 生命周期
  beforeCreate () { }, // 创建前执行
  created () { }, // 创建时执行

  beforeMount () { }, // 加载前执行
  mounted () { }, // 加载时执行

  beforeUpdate () { }, // 更新之前执行
  updated () { }, // 更新时执行

  beforeDestroy () { }, // 销毁前执行
  destroyed () { }, // 销毁时执行
});
`;
  // 视图模板
  const viewTpl = `<template>
  <div class="${fileName}-container">
    {{ msg }} {{ name }}
  </div>
</template>

<script lang="ts">
// https://github.com/kaorun343/vue-property-decorator
// https://github.com/vuejs/vue-class-component
import { Vue${codeType === 'ts' ? ', Component, Prop, Watch, Emit' : ''} } from 'vue-property-decorator';
import * as h from './index';

${codeType === 'ts' ? tplTypeScript : tplECMAScript}
</script>

<style${cssType !== 'css' ? ' lang="' + cssType + '"' : ''}>
  @import url('index.${cssType}');
</style>
`;

  // css 模板
  const cssTpl = `.${fileName}-container{ }`;

  // js 模板
  const jsTpl = `import * as apis from '@/apis/${fileName}';

function getFn () { return ['${fileName}']; }

export default getFn;
`;

  // API 模板
  const apisTpl = fileApi ? `// ${fileName} api 集合
function get${pascalName} (params) {
  return http('url', {
    data: params
  })
}
function submit${pascalName} (params) {
  return http('url', {
    data: params
  })
}` : '';

  return { viewTpl, cssTpl, jsTpl, apisTpl }
}

module.exports = { bulidTpl };
