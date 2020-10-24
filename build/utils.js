const path = require('path');
// CLI 配置信息：问题配置 | 路径别名配置
const { Questions, pathAlias } = require('./config.json');

const template = require('./template/index.js');

// 以 TypeScript class 命名规则“大驼峰”式命名类
const toPascalName = className => className.replace(className[0], className[0].toUpperCase());

const pascalMinName = className => {
  const splitStr = className.split('');
  const regz = /^[A-Z]+$/;
  return splitStr.map((item, index) => {
    return regz.test(item) ? `${index !== 0 ? '-' : ''}${item.toLowerCase()}` : item;
  }).join('');
};

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
  const specifyPath = path.join(deepPath.join('/'), toPascalName(cpsName));

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


/**
 * 代码写入模板
 * @param {string} pascalName 以驼峰形式作为模块名
 * @param {string} fileName 文件夹名，即模块名
 * @param {string} codeType 代码类型 ECMAScript | TypeScript
 * @param {string} cssType 样式表类型 css/less/sass/scss
 * @param {string} fileApi Api 文件
 */
const getTemplate = (pascalName, fileName, codeType, cssType, fileApi) => {
  return {
    viewTpl: template.build(pascalName, fileName, codeType, cssType),
    cssTpl: template.tplCSS(fileName),
    jsTpl: template.tplHandle(fileName),
    apisTpl:template.tplAPI(fileApi, pascalName, fileName)
  };
};

module.exports = {
  pathSpecifyRules,
  buildQuestionList,
  checkAnswerRules,
  toPascalName,
  getTemplate
};