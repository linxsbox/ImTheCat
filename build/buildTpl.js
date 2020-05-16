const fs = require('fs');
const path = require('path');
const { template } = require('./config.json');
const { tplString, pascalName } = require('./utils.js');

// 检查任务列表代理
const checkTasksListProxy = (targetArray, tasksNum = -1, resolve) => {
  return new Proxy(targetArray, {
    set(target, key, value, proxy) {
      if (target.length === tasksNum) {
        resolve(true);
        return true;
      }
      return Reflect.set(target, key, value, proxy);
    }
  });
};

/**
 * 构建组件模板基础信息
 * @param {object} options CLI 问题答案对象 | 配置文件对象
 * @param {string} options.fileName 文件名，即组件名，遵循命名规则“大驼峰”式命名
 * @param {string} options.filePath 文件路径，即组件最终生成的路径
 * @param {string} options.codeType 代码类型，即 js 或 ts
 * @param {string} options.cssType 样式表的类型 CSS/less/sass/scss 决定 style lang 类型
 * @param {boolean} options.fileApi 是否生成 API 文件，生成内容规则尚未完善，目前仅生成文件
 */
const buildTplBase = options => {
  let { fileName, filePath, codeType, cssType, fileApi } = options;
  // 将文件目录完整路径合并，默认在 src 下
  const folderPath = path.join(path.resolve(__dirname, '../src'), filePath);
  // 获取组件模板内容
  let { viewTpl, cssTpl, jsTpl, apisTpl } = tplString(pascalName(fileName), fileName, codeType, cssType, fileApi);
  // 生成组件文件列表：vue文件 | 样式文件 | 代码文件
  let fileList = [
    { fileName: `${template.vueTplName}.vue`, content: viewTpl },
    { fileName: `${template.cssTplName}.${cssType}`, content: cssTpl },
    { fileName: `${template.codeTplName}.${codeType}`, content: jsTpl }
  ];
  // 如果选择 “生成 API 文件” 则将 “API 文件” 也加入构建列表中
  if (fileApi) {
    fileList.push({ fileName: `index.${codeType}`, content: apisTpl });
  }
  return { folderPath, fileName: pascalName(fileName), fileList };
};

/**
 * 检查组件目录是否存在
 * @param {object} cpsBase 组件信息
 * @param {string} cpsBase.folderPath 组件文件路径
 * @param {string} cpsBase.fileName 组件名/名
 * @param {Array} cpsBase.fileList 组件文件列表
 * @param {boolean} isBatch 是否批量
 */
const checkFolder = (cpsBase, isBatch = false) => {
  return new Promise((resolve, reject) => {
    console.log('【信息】开始检查组件目录...');
    // mkdir 创建相关目录，使用 recursive 递归模式来创建多级目录
    const mkDir = (folderPath, tasksAsyncList = []) => {
      fs.mkdir(folderPath, { recursive: true }, err => {
        // 失败则调用 reject 返回错误信息
        if (err) {
          console.log('【错误】组件目录创建失败！', err);
          reject(false);
        } else {
          console.log('【信息】组件目录创建成功！', folderPath);
          if (isBatch) { tasksAsyncList.push(folderPath); }
          else { resolve(true) }
        }
      });
    };

    // 均判断是否为批量生成组件
    if (isBatch && Array.isArray(cpsBase)) {
      const tsnAsyncList = checkTasksListProxy([], cpsBase.length, resolve);
      cpsBase.forEach(item => {
        if (!fs.existsSync(item.folderPath)) { // 检查组件目录是否存在
          console.log('【信息】组件目录不存在，尝试创建组件目录 %s。', item.fileName);
          mkDir(item.folderPath, tsnAsyncList);
        } else { tsnAsyncList.push(item); }
      })
    } else if (!isBatch) {// 非批量生成组件
      if (!fs.existsSync(cpsBase.folderPath)) { // 检查组件目录是否存在
        console.log('【信息】组件目录不存在，尝试创建组件目录 %s。', cpsBase.fileName);
        mkDir(cpsBase.folderPath);
      } else { mkDir(cpsBase.folderPath); }
    } else { reject(false); }
  });
};

/**
 * 生成组件文件
 * @param {object} cpsBase 组件信息
 * @param {string} cpsBase.folderPath 组件文件路径
 * @param {string} cpsBase.fileName 组件名/文件名
 * @param {Array} cpsBase.fileList 组件文件列表
 * @param {boolean} isBatch 是否批量
 */
const buildCpsFiles = (cpsBase, isBatch = false) => {
  return new Promise((resolve, reject) => {
    console.log('【信息】开始生成组件文件，请稍后……');
    // 批量写入组件文件
    const batchWriteCpsFile = (cpsBase, tasksAsyncList = []) => {
    cpsBase.fileList.forEach((item, index) => {
        // 写入文件路径，将组件目录路径和文件名合并，生成完整文件路径
        const writeFilePath = path.join(cpsBase.folderPath, item.fileName);
        // 异步写入文件
        fs.writeFile(writeFilePath, item.content, 'utf8', err => {
          if (err) { // 如果写入失败，则表示找不到文件目录
            console.log(`【错误】${cpsBase.fileName}\\${item.fileName} 写入失败！`, err);
            reject(false);
          } else { // 如果创建成功则返回成功信息用于输出控制台。
            console.log(`【信息】${cpsBase.fileName}\\${item.fileName} 写入完成！`);
            tasksAsyncList.push(item.fileName);
            // if (isBatch) {  }
            // else { resolve(true) }
          }
        });
      });
    };

    // 均判断是否为批量生成组件
    if (isBatch && Array.isArray(cpsBase)) {
      let cpsCount = 0;
      cpsBase.forEach(item => { cpsCount += item.fileList.length; });
      const tsnAsyncList = checkTasksListProxy([], cpsCount, resolve);
      cpsBase.forEach(item => {
        batchWriteCpsFile(item, tsnAsyncList);
      })
    } else if (!isBatch) {// 非批量生成组件
      const tsnAsyncList = checkTasksListProxy([], cpsBase.fileList.length, resolve);
      batchWriteCpsFile(cpsBase, tsnAsyncList);
    } else { reject(false); }
  });
};

const initBuilder = async (options, isBatch = false) => {
  if (isBatch && Array.isArray(options)) {
    const cpsBaseList = [];
    options.forEach(item => {
      cpsBaseList.push(buildTplBase(item));
    })
    // 批量检查组件文件目录
    await checkFolder(cpsBaseList, isBatch);
    return await buildCpsFiles(cpsBaseList, isBatch);
  }
  const tplBase = buildTplBase(options);
  await checkFolder(tplBase);
  return await buildCpsFiles(tplBase);
}

module.exports = initBuilder;
