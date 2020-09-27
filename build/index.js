const fs = require('fs');
const path = require('path');
const instanceCLI = require('./QA2CLI.js'); // CLI 实例
const initBuilder = require('./buildTpl.js'); // 构建模板
const { pathSpecifyRules } = require('./utils.js');

// process.argv package 脚本命令参数集列表
// process.npm_config_argv 命令行输入参数，即 npm 后出现的参数字符
const prcArgv = process.argv;
const prcCfgArgv = process.env.npm_config_argv
  ? JSON.parse(process.env.npm_config_argv)['original'] : [];
// 寻找是否有 -c 命令参数符
const prcArgvIndex = prcArgv.indexOf('-c');
const prcCfgArgvIndex = prcCfgArgv.indexOf('-c');
// 命令参数符后的配置文件路径
let cfgPath = '';

// console.log(prcArgv);
// console.log(prcCfgArgv);

// 参数判定：如果没有指定命令参数符则可以直接调用 问答式的 CLI 进行代码模板的构建
if (prcArgvIndex > -1 && prcArgvIndex + 1) {
  cfgPath = prcArgv[prcArgvIndex + 1];
} else if (prcCfgArgvIndex > -1 && prcCfgArgvIndex + 1) {
  cfgPath = prcCfgArgv[prcCfgArgvIndex + 1];
} else {
  // 如果没有 -c 命令参数符则启动问答式的CLI
  instanceCLI();
  return;
}

function resolve (dir) {
  return path.join(__dirname, dir);
}

// 文件读取
fs.readFile(resolve(cfgPath), 'utf-8', (err, data) => {
  if (err) {
    return console.error(err);
  }

  // 设置默认值
  const setDefaultValue = (item) => {
    item['filePath'] = pathSpecifyRules(item['fileName'], item['filePath'], './views');
    item['codeType'] = item['codeType'] || 'js';
    item['cssType'] = item['cssType'] || 'css';
    item['fileApi'] = item['fileApi'] || false;
    return item;
  };

  // 将读取文件的字符串转为 JSON
  const cfgFileJson = JSON.parse(data);
  // 如果配置文件里是多个组件配置信息
  if (Array.isArray(cfgFileJson)) {
    const errArr = [];
    const cpsArr = [];
    cfgFileJson.forEach((item, index) => {
      if (item['fileName']) {
        cpsArr.push(setDefaultValue(item));
      } else { errArr.push(index); }
    });

    initBuilder(cpsArr, true).then(() => {
      console.log('再见!');
    }).catch(err => {
      console.log(`\x1B[31m${err.message}`);
      console.log(`\x1B[31m${err.error}`);
      console.log('\x1B[0m');
    });

    // console.log(`组件 ${errArr.toString()} 创建失败！`);
  }
  if (Object.keys(cfgFileJson).indexOf('fileName') !== -1) {
    initBuilder(setDefaultValue(cfgFileJson)).then(() => {
      console.log('组件 %s 创建成功！', cfgFileJson['fileName']);
      console.log('再见!');
    }).catch(err => {
      console.log(`\x1B[31m${err.message}`);
      console.log(`\x1B[31m${err.error}`);
      console.log('\x1B[0m');
    });
  }
});
