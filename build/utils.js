const path = require('path');
// CLI 配置信息：问题配置 | 路径别名配置
const { Questions, pathAlias } = require('./config.json');

/**
 * 问题属性及说明 config.json => Questions
 * @param Q 问题文字
 * @param tips 问题提示
 * @param type 可选择输入类型
 * @param typeList 可选类型列表
 * @param defaultValue 默认值
 * @param defaultDisplay 默认值显示的文字
 * @param field 问题字段，用于与输入答案对应
 * @param rulesFn 输入规则函数
 * @param rulesType 规则类型
 * @param disable 是否启用
 * @param diffDisplay 区别显示默认值默认显示值，如果为 false 则以默认值显示
 */

// 路径拼接处理，规则：
// 组件名、用户输入路径、默认路径
// 文件所在路径 = 默认路径 + 用户 + 组件名
const pathSpecifyRules = (cpsName = '', inputPath = '', defaultValue) => {
  const pathSplit = path.join(inputPath).split('\\');
  const deepPath = [];

  deepPath.push(...(pathSplit.length >= 3
    ? pathSplit.slice(0, 3) : pathSplit.slice()));

  let isReplaceAliasPath = false;
  if (pathAlias[deepPath[0]]) {
    deepPath[0] = pathAlias[deepPath[0]];
    isReplaceAliasPath = true;
  }

  // 以官网例子组件名以及组件文件夹均为“大驼峰”式命名。
  const specifyPath = path.join(deepPath.join('/'), pascalName(cpsName));

  return path.join(isReplaceAliasPath ? '' : defaultValue, specifyPath);
};

// 输入规则函数
const inputRulesFn = (item) => {
  if (!item.rulesType) { return (text) => text; }
  if (item.rulesType === 'string') {
    return (text, defaultValue) => /^[a-zA-Z]{1,20}$/g.test(text)
      ? text : defaultValue;
  }
  if (item.rulesType === 'list') {
    return (text, typeList, defaultValue) => typeList.indexOf(text.toLowerCase()) > -1
      ? text : defaultValue;
  }
  if (item.rulesType === 'confirm') {
    return (text, typeList, defaultValue) => {
      text = text.toLowerCase();
      let tempText = text === typeList[0] ? true : false;
      return typeList.indexOf(text) > -1
        ? tempText : defaultValue;
    };
  }
  if (item.rulesType === 'path') {
    return (cpsName, inputPath, defaultValue) => {
      return pathSpecifyRules(cpsName, inputPath, defaultValue);
    };
  }
};

// 构建问题列表
const buildQuestionList = () => {
  const tempQuestionArr = [];
  const len = Questions.length;
  for (let index = 0; index < len; index++) {
    const item = Questions[index];
    // 非禁用则导出
    if (!item.disable) {
      // 添加输入规则函数
      item.rulesFn = inputRulesFn(item);
      tempQuestionArr.push({
        text: item.Q,
        question: `\x1B[32m?\x1B[97m ${item.Q}${item.tips}\x1B[32m${item.type}`
      });
    }
  }
  return tempQuestionArr;
};

// 检查是否符合规则，并处理答案默认选项，questionList 顺序与 config.Questions 一致。
const checkAnswerRules = (step, content, answer) => {
  // 自定义的检查规则与判断
  const tempItem = Questions[step];
  let checkResult = '';
  if (!tempItem.rulesType) {
    checkResult = tempItem.rulesFn(content);
  } else if (tempItem.rulesType === 'string') {
    checkResult = tempItem.rulesFn(content, tempItem.defaultValue);
  } else if (tempItem.rulesType === 'list') {
    checkResult = tempItem.rulesFn(content, tempItem.typeList, tempItem.defaultValue);
  } else if (tempItem.rulesType === 'confirm') {
    checkResult = tempItem.rulesFn(content, tempItem.typeList, tempItem.defaultValue);
  } else if (tempItem.rulesType === 'path') {
    checkResult = tempItem.rulesFn(answer.fileName, content, tempItem.defaultValue);
  }

  answer[tempItem.field] = checkResult;

  // 是否需要区别显示输入值和实际值
  if (tempItem.diffDisplay) {
    return content ? content : tempItem.defaultDisplay;
  }
  return answer[tempItem.field];
};

// 以 TypeScript class 命名规则“大驼峰”式命名类
const pascalName = className => className.replace(className[0], className[0].toUpperCase());

const pascalMinName = className => {
  const splitStr = className.split('');
  const regz = /^[A-Z]+$/;
  return splitStr.map((item, index) => {
    return regz.test(item) ? `${index !== 0 ? '-' : ''}${item.toLowerCase()}` : item;
  }).join('');
};

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
  <div class="${pascalMinName(fileName)}-container">
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

<style ${cssType !== 'css' ? 'lang="' + cssType + '"' : ''} scoped src="./index.${cssType}">
  /* @import url('index.${cssType}'); */
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

  return { viewTpl, cssTpl, jsTpl, apisTpl };
};

module.exports = {
  pathSpecifyRules,
  buildQuestionList,
  checkAnswerRules,
  pascalName,
  tplString
};