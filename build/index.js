// 控制台命令行
const readline = require('readline');
const path = require('path')
const tpl = require('./template.js');

// 实现小型 Cli | x1B/033
// 如需使用 npm 命令的话则需要在 package.json scripts 中加入你的命令名称和脚本位置。
// 脚本位置的话不能直接使用 ./filePath 或 /filePath 这样会无法识别。
// 需要使用 node filePath/name.xxx，这样 node 就会将脚本位置定位至当前项目开始。
// 然后可以通过对输入流的监听来实现一个简单的问答式 Cli
// http://nodejs.cn/api/readline.html#readline_example_tiny_cli

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

// 问题步长记录，每次符合确认内容时则 + 1
let stepQuestion = 0;

// 构建问题列表
const buildQuestion = () => {
  // 问题文字内容、提示、类型
  const questionText = [
    {question: '组件名称？', tips: '', type: '[template]'},
    {question: '指定文件夹路径？', tips: '(最大深度：4)', type: '[./views/]'},
    {question: '代码文件类型？', tips: '', type: '[JS/ts]'},
    {question: '样式表类型？', tips: '', type: '[CSS/less/sass/scss]'},
    // {question: '是否创建单独的Api文件？', tips: '', type: '[y/N]'} // 暂时未想好该如何处理 API 文件的构建和写入
  ];

  return questionText.map(item => {
    return { text: item.question, question: `\x1B[32m?\x1B[97m ${item.question}${item.tips}\x1B[32m${item.type}` }
  });
}

// 问题列表
let questionList = buildQuestion();

// 问题的总数
const lenQuestion = questionList.length - 1

// 无有效输入时使用的默认内容
const defAnswer = {
  fileName: 'template',
  filePath: './views/',
  codeType: 'js',
  cssType: 'css',
  fileApi: false,
};

// 记录问题的回答内容
const answer = {
  fileName: '',
  filePath: '',
  codeType: '',
  cssType: '',
  fileApi: false,
};

// 拼接路径
let findChatIndex = (str, chat, num) => {
  if (str.match(/\\|\//g).length <= num) return str;

  let chatIndex = str.indexOf(chat);
  for (let index = 0; index < num; index++) {
    let tempIndex = str.indexOf(chat, chatIndex + 1);
    if (tempIndex !== -1) {
      chatIndex = tempIndex
    }
  }
  return str.substr(0, chatIndex);
};

// 检查是否符合规则，并处理答案默认选项
const checkAnswer = (step, content) => {
  // if (step > 1) { content = content.toLowerCase() }
  switch (step) {
    case 0:
      return answer.fileName = /^[a-zA-Z]{1,20}$/g.test(content)
        ? content : defAnswer.fileName;
    case 1:
      return answer.filePath = path.join(
        findChatIndex(
          path.join(defAnswer.filePath, content), '\\|\/', 3),
        answer.fileName);
    case 2:
      content = content.toLowerCase()
      return answer.codeType = /^js|ts$/ig.test(content)
        ? content : 'js';
    case 3:
      content = content.toLowerCase()
      return answer.cssType = /^css|less|sass|scss$/ig.test(content)
        ? content : 'css';
    case 4:
      if (/^y|Y|n|N$/ig.test(content)) {
        const tempYN = content.toLowerCase()
        answer.fileApi = tempYN === 'y' ? true : false
        return content
      } else {
        answer.fileApi = false
        return 'N'
      }
  };
};

readline.cursorTo(process.stdout, 0, 0);
readline.clearScreenDown(process.stdout);

// 初始化第一个问题。
console.log(questionList[stepQuestion].question);
// 设定输入内容样式
console.log('\x1B[36m');

// on 函数是为需要监听的指令
// line 是能接受到当前命令行中的输入流信息，通过函数回调的方式返回处理过的字符串。
rli.on('line', line => {
  const line2str = line.trim()

  // 将检查处理后的答案信息存储用于后续命令行内容输出
  let tempAnswer = checkAnswer(stepQuestion, line2str);

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
  } else {
    tpl.bulidTpl(answer)
    .then(() => {
      // 否则可以认为已经选择完成
      // console.log('再见! %o', answer);
      console.log('再见!');
      console.log('\x1B[0m');
      process.exit(0);
    })
    .catch(err => {
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
