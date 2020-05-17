const readline = require('readline'); // 控制台命令行
const initBuilder = require('./buildTpl.js'); // 构建模板
const {
  buildQuestionList,
  checkAnswerRules
} = require('./utils.js');

// 问题步长记录，每次符合确认内容时则 + 1
let stepQuestion = 0;
// 问题列表
const questionList = buildQuestionList();
// 问题的总数
const lenQuestion = questionList.length - 1;
// 记录问题的回答内容
const answer = {
  fileName: '',
  filePath: '',
  codeType: '',
  cssType: '',
  fileApi: false,
};

// 实现小型 CLI | x1B/033
// 如需使用 npm 命令的话则需要在 package.json scripts 中加入你的命令名称和脚本位置。
// 脚本位置的话不能直接使用 ./filePath 或 /filePath 这样会无法识别。
// 需要使用 node filePath/name.xxx，这样 node 就会将脚本位置定位至当前项目开始。
// 然后可以通过对输入流的监听来实现一个简单的问答式 CLI。
// http://nodejs.cn/api/readline.html#readline_example_tiny_cli

const instanceCLI = () => {
  // readline.createInterface
  // 它会创建一个接口的实例，用于处理流信息，例：输入、输出、提示字符串、自动补全、历史记录等。
  const rli = readline.createInterface({
    // 要监听的可读流。此选项是必需的。
    input: process.stdin,
    // 将逐行读取数据写入的可写流。
    output: process.stdout
    // prompt // 要使用的提示字符串。默认值: '> '。
    // historySize  //保留的最大历史记录行数。 要禁用历史记录，请将此值设置为 0。
    // completer // 用于 Tab 自动补全的可选函数。
  });

  readline.cursorTo(process.stdout, 0, 0);
  readline.clearScreenDown(process.stdout);

  // 初始化第一个问题。
  console.log(questionList[stepQuestion].question);
  // 设定输入内容样式
  console.log('\x1B[36m');

  // on 函数是为需要监听的指令
  // line 是能接受到当前命令行中的输入流信息，通过函数回调的方式返回处理过的字符串。
  rli.on('line', line => {
    const line2str = line.trim();

    // 将检查处理后的答案信息存储用于后续命令行内容输出
    let tempAnswer = checkAnswerRules(stepQuestion, line2str, answer);

    // 将光标移入上一次步骤的位置，可以造成用户已经选择完成的效果。
    readline.cursorTo(process.stdout, 0, stepQuestion);
    // 清理之前的输入内容。
    readline.clearScreenDown(process.stdout);
    // 选择完成后输出选择后的结果信息。
    console.log(`\x1B[32m?\x1B[97m ${questionList[stepQuestion].text}\x1B[36m%s`, tempAnswer);

    // 重置控制台样式。
    console.log('\x1B[0m');

    // 如果当问题的步骤小于问题的长度时，则问题步长 + 1。
    if (stepQuestion < lenQuestion) {
      stepQuestion++;
      // 输出下一个问题内容
      console.log(questionList[stepQuestion].question);
      console.log('\x1B[36m');
    } else {
      // process.exit(0);
      // return
      initBuilder(answer).then(() => {
        // 否则可以认为已经选择完成
        // console.log('再见! %o', answer);
        console.log('再见!');
        console.log('\x1B[0m');
        process.exit(0);
      }).catch(err => {
        console.log(`\x1B[31m${err.message}`);
        console.log(`\x1B[31m${err.error}`);
        console.log('\x1B[0m');
        process.exit(0);
      });
    }
  }).on('close', () => {
    console.log('\x1B[0m');
    console.log('【信息】您已中断模板创建任务，感谢您的使用再见!');
    process.exit(0);
  });
};

module.exports = instanceCLI;
