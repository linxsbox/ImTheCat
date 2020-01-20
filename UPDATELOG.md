# 更新记录
用于记录开发过程中各种问题的记录。

---

## 2018-10-21 23:44
- **node-sess** 还是无法通过 **npm install** 下载， 但是请求下载的连接和文件可以通过浏览器正常打开和下载。
- 用 **npm-check** 更新了一堆东西，有些都经历了一个大版本号了。
- 更新后 re run 提示 缺少 **webpack-cli** ，查看了一下 package ，webpack 版本号是 4.22 了据之前的了解 **webpack 4.0** 和之前的方式有很大不同。它需要 **webpack** 和 **webpcak-cli** 同时存在于本地项目内。

---

## 2018-10-22 00:38
- check 了一下 Vue 的最新版本，都已经 **3.0.5** 了，短暂的思考了一下，索性就直接整个项目都 **@vue/cli** 更新成 Vue-cli 3.0 了。
- 简单的过了一下官方文档，create project 完成后，发现整个项目的结构 tree 清爽了很多，一些配置的东西不再零散，而是集中起来了，官方的说法 **cli-service** 是基于 **webpack** 和 **webpack-dev-server** 之上的，一些配置的东西集中在了 **package.json**，以及Babel/TypeScript 转译、ESLint 集成、单元测试和 end-to-end 测试等配置集中在 **babel.config.js** 里了。
- 支持了 TypeScript 那么就可以考虑插件部分使用 TypeScript来实现，页面相关的就用 JavaScript。
- plugin 部分还需要去熟悉一下，还有Vue-cli 3.0 提供了一套完全**图形化**的创建和管理 Vue.js 项目的用户界面，以及 **cli-service-global** 快速开始**零配置**原型开发。

---

## 2018-10-23 00:45
- 在看 Vue/cli 3.0 [配置参考](https://cli.vuejs.org/zh/config/)的时候发现使用的是 **module.exports**，然后回想了一下之前写代码都是用的 **export** ，然后就去查了一下资料，之前认为是不同版本的模块化导入导出方式而已，没想到是**完全不同**的两个**模块规范**。
- 通过查资料了解了 **ES 模块规范** 和 **CommonJS 模块规范**。**ES 模块规范** 来自本家 **ECMAScript**，**CommonJS 模块规范**是一种思想/规范，**NodeJS** 是它的实现。

---

## 2018-11-10 18:35
- 由于 VSCode 的插件 eslint 一直对代码报错出现下划线，然后实在忍不住了，就去学习了一波 ESLint。在大概了解了之后，对规则简单看了一下，然后再编码的过程中再慢慢完善自己习惯的规则吧。
[eslint-rules](https://eslint.org/docs/rules/)
- 更新 **npm install eslint -g**
- 引入 eslint 规则 **eslint --init** 之后会给予选择

```bash
// 你想要怎么样配置 ESLint?
? How would you like to configure ESLint? (Use arrow keys)
  Use a popular style guide // 流行的风格
> Answer questions about your style // 回答有关您的风格问题
  Inspect your JavaScript file(s) // 检查你的 JavaScript 文件
```

```bash
? Which version of ECMAScript do you use? ES2018
? Are you using ES6 modules? Yes
? Where will your code run? Browser
? Do you use CommonJS? Yes
? Do you use JSX? No
? What style of indentation do you use? Spaces
? What quotes do you use for strings? Single
? What line endings do you use? Windows
? Do you require semicolons? No
? What format do you want your config file to be in? JavaScript
```
- 配置完成后生成了 **.eslintrc.js** 文件，但是提示我建议使用本地安装的**ESLint** 副本，而不是全局安装的副本。OK，那就暂时这样咯。再 install 一份到本地就好了。

---

## 2018-11-11 20:02
- 在做路由访问规则管理的时候，发现使用路由懒加载模式页面会报错。

**Failed to mount component: template or render function not defined.**

- 尝试了多种方式后发现，如果不使用懒加载模式，预先声明好路由以及组件则可以正常加载访问。去翻了一些资料<del>（baidu）</del>后，发现大多都是 vue2/vuex2/webpack 之类的配置问题，修改路径之类，简直牛头不对马嘴！！！生气！
- 果断去官网走一波，先查了 **Vue-CLI 3** 发现没有相关的说明，然后再去翻 **vue-router** [全局守卫](https://router.vuejs.org/zh/guide/advanced/navigation-guards.html#全局守卫)
> 路由守卫机制：  
> 当一个导航触发时，全局前置守卫按照创建顺序调用。守卫是异步解析执行，此时导航在所有守卫 resolve 完之前一直处于 等待中。  
> 

- 顺便大概了解了路由守卫的机制，但还是没看到相关的说明，不免小小的失落了一通。跳回 **vue-router** 首页-指南 右边导航栏目扫了一眼，发现！！居然在最后一条 [路由懒加载](https://router.vuejs.org/zh/guide/advanced/lazy-loading.html#把组件按组分块)，刚刚我怎么没看见（我是谁，我在哪？这是什么？你大点儿声！我看不见！）一顿捶胸顿足悔不当初啊！！！赶紧认真阅读……

- 在第二句就说明清楚了 **结合 Vue 的异步组件和 Webpack 的代码分割功能，轻松实现路由组件的懒加载。**，没错！<del>凶手</del>（误）就是你了！完美的解决了我的错误，我感觉到了被宽恕被原谅，我感觉到了救赎！！！

> **注意**  
如果您使用的是 Babel，你将需要添加 **syntax-dynamic-import** 插件，才能使 Babel 可以正确地解析语法。

```bash
npm install --save-dev @babel/plugin-syntax-dynamic-import
```

---

## 2018-11-17 18:05
配置文件夹的更新，路由 verifyRules 规则配置

---

## 2018-11-17 16:56
- 了解 indexedDB
- 创建 indexedDB
- 存储文件 storageDB

---

## 2019-03-18 00:25
重新考虑了 **Vuex** 的使用方式和配置，然后**几乎**是重新写了项目中使用的 **store** 配置。

也重新思考了 **Vuex** 的使用场景，以及需要频繁使用或更改的部分是否可以更方便？

1. 如果场景需要拆分模块，那么如何能够确保模块数据的相互的独立性？
2. 如需多模块的情况下如何能够减少手动 **import** 方式引用？
3. **actions, mutations** 的调用能否解决减少因输入导致的“魔法字符串”问题？

> 魔法字符串：指的是，在代码之中多次出现、与代码形成强耦合的某一个具体的字符串或数值。风格良好的代码，应该尽量消除魔法字符串，而由含义清晰的常量或变量代替。

- 在思考完后开始动手重写的时候，经历了各种报错、找不到对象以及 undefined 问题。
- 然后开始考虑通用和抽象化 **store/index.js** ，既我无需每次添加新的 **store/modules** 然后就需要就改一次。
- 我将其逻辑更改为可读配置来获取**已有或新的 store/modules** ，这样就可以无需过多关注 **store/modules** 的变化。
- 将 **store/index.js** 抽象化后，我又通过配置信息以及新增 **store/*/handle.types.js** 文件管理，将其调用的方式注册到全局，以此来解决或减少魔法字符串的问题。

``` javascrpit
// store/index.js
// 构造独立的 modules，将从 store/store.json 配置文件中读取
// 只需要将 store 下 modules 文件夹名称写在 配置文件中。类型为对象
for (const key in store) {
  if (store.hasOwnProperty(key)) {
    store[key]['namespaced'] = true
    store[key]['state'] = require(`./${key}/state`).default
    store[key]['actions'] = require(`./${key}/actions`).default
    store[key]['mutations'] = require(`./${key}/mutations`).default
    store[key]['getters'] = require(`./${key}/getters`).default
  }
}
```

---

## 2019-03-31 05:11
之前因为把服务器借给朋友试验项目，没想到居然把我几个在线的项目玩挂了（可能是因为进行了重启，然后没有启动项目）。

在我对项目进行检查后，准备手动进行重启项目服务的时候，发现我对Linux的命令陌生了许多，难过！

不过还好去重新查了一下 **nohup** 和 **&** 命令后，又把项目挂载在后台了

不过这中间有个小插曲：

我在项目文件根目录使用 **nohup path** 后日志正常。
尝试使用 **curl 访问**，服务错误 502。我还以为是 nginx 没重启的原因然后使用 **nginx -s relaod** 后再次访问还是 **服务错误 502**。

我就去查 nohup 日志发现 找不到 **webtemplate** 的路径。哎呦！这就奇怪了。我以为是 nohup 的命令问题没正常执行程序，然后有又尝试了多次，用 **netstat -anlp | grep 80xx** 一查服务是已经起来了的。果断baidu（不会鄙视我吧？）一波，emmmmm……这些 **Copy & Paste** 的文章……算了。

实在没法，找不到突破口，然后想着看看之前的命令行记录，会不会忽略了什么东西。果断翻命令行日志……发现其中一条 **cd 到项目当前目录** 再结合之前的日志是找不到路径……（不会是要到目录下执行才能正确找到路径？）先尝试一下再说。

> cd path …… curl …… 200 ok

居……居然成功了？（难道我当时写的 webtemplateLoadFolder 是从启动运行路径寻找，而不的是项目路径？）着实自己坑了自己一把！（小本本记下来先！）

好了，服务的事情就告一段落了，现在就要来验证功能是否完全了。

之前写了一个 **[弹幕系统](http://t.eyufax.com/dm)** 来试一试弹幕还Ok不Ok。

劈里啪啦劈里啪啦一顿乱输，发送弹幕！！！

………………

完美！毫无反应！！！

I am fine！！！

打开F12 一看！websocket pending！！！然后返回了 400。

一脸懵逼，然后打开 websocket http 的请求一看，发现请求头出现了 **Provisional headers are shown**，这是什么鬼，我没见过吖。

然后 baidu + google 了一波。发现碰到这个问题的人挺多的，但大多数是后端的代码问题（Java居多）。燃鹅！这些答案没有一个回答到点子上的！！！
我不服！然后我就翻了一下之前写的 golang websocket 代码发现没这个问题吖。

好，确认了不是代码的问题后，就可以考虑其他方面了，话不多说直接就奔着websocket 的官方文档去查。最后发现因为是 **WebSockets规范** 已经更新了，**[RFC 6455](http://datatracker.ietf.org/doc/rfc6455/?include_text=1)** 上一版本的规范对 **WebSocket握手过程** 的请求头信息没做太多的硬性要求，忽略也是安全的。

但是在新版本中，应该要：
> **客户端将发送一个相当标准的HTTP请求，看起来像这样（HTTP版本必须是1.1或更高，方法必须是GET）**

所以这样一来就对服务端的开发者有一定的要求了。好的，既然知道了问题所在，那么解决就简单多了。

因为之前的我服务出口是使用了 nginx 进行反向代理，所以就可以在 nginx 配置的服务反向代理中添加新的配置信息。

````
proxy_http_version 1.1;
proxy_set_header Upgrade $http_upgrade;
proxy_set_header Connection "upgrade";
````

nginx -s reload

F5 走一波，劈里啪啦劈里啪啦一顿乱输，发送弹幕！！！

噔噔噔噔~！！！

我都要感动得流下了眼泪。

参考：
- MDN 编写 WebSocket 服务器: https://developer.mozilla.org/zh-CN/docs/Web/API/WebSockets_API/Writing_WebSocket_servers

- WebSockets规范 RFC 6455：http://datatracker.ietf.org/doc/rfc6455/?include_text=1

---

## 2019-03-31 05:11
今天在和人聊天的时候发现了一些好玩的html5的东西

css 伪类（:）
- :not
- :focus-within

html 属性（attribute）
- accesskey

---

## 2019-04-27 15:02
周五的时候和同事在开发理念上产生了分歧,争论之中我冒出了一个新想法: 路由是不是也可以整个抽象化?

所以重新考虑了路由的实现

1. 首先先将路由需要配置的对象剥离
2. 然后公共部分可以通过读取配置json来构建简单的路由信息 **routeList()**
3. 再提供一个额外的方法可以添加高级路由用法的入口 **routeList().append([{route object}])**
4. 以及提供一个懒加载的路由视图的方法 **routeView( filename )**

这样一来可以减少了大部分需要编写路由的部分。路由部分的工作也能减少大部分维护需求。

---

## 2019-08-18 19:04
在看了 element-ui 部分组件实现的源码后了解了一些之前并没了解很清楚的东西，然后开始试一试。然后发现修改过后页面跳转不正常了，浏览器地址是变更了，但是路由行为并没有触发，也就是说只是改变了url，并没有真正的跳转页面。

在尝试了一下后还是没发现哪里错了，然后就开始重新看之前写的路由规则，最后发现，我原来已经将路由的处理是抽象化的了，具体的路径、页面以及所需的组件引入都剥离成一个配置文件了。

最后是将新的页面路径加入白名单数组就好了，真的要气哭我自己了。

然后还发现个 **vue-cli 3.10.0** 的一个小Bug，就是在尝试修改 webpack 配置信息，然后发现 vue.config.js 中 devServer 配置 port 无效，在 package.json 脚本命令中配置 --port 也无法生效，最后运行结果还是随机端口。

关于尝试组件化的部分：
1. 使用 Vue.extend 来生成 VueConstructor
2. 提供外部调用函数接受 options，然后进行处理，options 最终会 merge 到指定的 *.vue 文件中。
3. VueConstructor 的实例必须调用 $mount()
4. vue-cli 3.10.0 可以通过 vue inspect > output.js 来输出 webpack config，它输出的并不是一个有效的 webpack 配置文件，而是一个用于审查的被序列化的格式。

---

## 2019-09-22 12:28
在短暂的学习了一些 **TypeScript** 的语法之后觉得还是可以尝试一下的。所以就将这个项目加入 **TS** 以便能够使用TS来进行编写。

为了快速熟悉如何将 Vue 与 TypeScript 结合，所以我先使用了 vue-cli 3 的自定义模式，将其选项全部勾选。

``` command
Vue CLI v3.10.0
┌────────────────────────────┐
│  Update available: 3.11.0  │
└────────────────────────────┘
? Please pick a preset: Manually select features
? Check the features needed for your project:
 (*) Babel
 (*) TypeScript
 (*) Progressive Web App (PWA) Support
 (*) Router
 (*) Vuex
 (*) CSS Pre-processors
 (*) Linter / Formatter
 (*) Unit Testing
>(*) E2E Testing
```

然后我的最终选择如下：

``` command
? Please pick a preset: Manually select features
? Check the features needed for your project: Babel, TS, PWA, Router, Vuex, CSS Pre-processors, Linter, Unit, E2E
? Use class-style component syntax? Yes
? Use Babel alongside TypeScript (required for modern mode, auto-detected polyfills, transpiling JSX)? Yes
? Use history mode for router? (Requires proper server setup for index fallback in production) Yes
? Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported by default): Sass/SCSS (with node-sass)
? Pick a linter / formatter config: TSLint
? Pick additional lint features: Lint on save, Lint and fix on commit
? Pick a unit testing solution: Mocha
? Pick a E2E testing solution: Nightwatch
? Where do you prefer placing config for Babel, PostCSS, ESLint, etc.? In dedicated config files
? Save this as a preset for future projects? No
```

然后会需要等待一段时间，如果没有代理问题的话那么就可以使用命令启动项目了。

大致看了一下，主要的不同点
- .vue 文件的新的书写格式，如果使用 **class** 方式的话就需要使用注解/装饰器来实现原来的生命周期钩子函数。如果想要使用原来的方式的话就需要使用 **Vue.extend** 方式。
- **pacakge.json** 中引入了对 **TypeScript** 的支持包，以及半自动化格式工具。
- 在 public 文件夹中加入了缓存文件 **manifest.json** 以及爬虫访问规则文件 **robots.txt**
- 新增了 **TypeScript** 的配置文件 tsconfig.json，大部分配置都帮我们配好了
- **TypeScript** 语法检查规则作为了独立的一个文件 tslint.json。

``` json
// pacakge.json 新增部分
{
  "dependencies": {
    "core-js": "^2.6.5",
    "vue-class-component": "^7.0.2",
    "vue-property-decorator": "^8.1.0",
    "register-service-worker": "^1.6.2" // 这部分可能是我选了 PWA 的原因
  },
  "devDependencies": {
    "typescript": "^3.4.3",
    "@vue/cli-plugin-typescript": "^3.11.0",
    "@vue/cli-plugin-pwa": "^3.11.0", // 我选了 PWA
    
    // 我选了测试工具
    "@vue/cli-plugin-e2e-nightwatch": "^3.11.0",
    "@vue/cli-plugin-unit-mocha": "^3.11.0",
    "@types/chai": "^4.1.0",
    "@types/mocha": "^5.2.4",
    "chai": "^4.1.2",

    "lint-staged": "^8.1.5", // 本地代码检查
    "node-sass": "^4.9.0",
    "sass-loader": "^7.1.0"
  },

  // 提交时检查
  "gitHooks": {
    "pre-commit": "lint-staged"
  },
  // 检查规则
  "lint-staged": {
    "*.ts": [ // 针对 *.ts 文件
      "vue-cli-service lint",
      "git add"
    ],
    "*.vue": [ // 针对 *.vue 文件
      "vue-cli-service lint",
      "git add"
    ]
  }
}
```

``` json
// tsconfig.json
// **target** & **module** 为 **esnext**
// esnext 是指最新的 [ES proposed features](https://github.com/tc39/proposals)）
{
  "compilerOptions": {
    "target": "esnext", // 编译支持版本
    "module": "esnext", // 模块支持版本
    "strict": true,
    "jsx": "preserve",
    "importHelpers": true,
    "moduleResolution": "node", // 模块分析版本
    "experimentalDecorators": true, // 启用装饰器模式
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "sourceMap": true, // 编译后生成源码 map
    "baseUrl": ".",
    "outDir": "./dist/", // 输出目录
    "types": [
      "webpack-env",
      "mocha",
      "chai"
    ],
    "paths": { // 文件路径，即 alias
      "@/*": [
        "src/*"
      ],
      "@cps/": [
        "components/*"
      ],
      "assets": [
        "assets/*"
      ]
    },
    "lib": [ // 语法解析
      "esnext",
      "dom",
      "dom.iterable",
      "scripthost"
    ]
  },
  "include": [ // 包含使用配置的文件
    "src/**/*.ts",
    "src/**/*.tsx",
    "src/**/*.vue",
    "tests/**/*.ts",
    "tests/**/*.tsx"
  ],
  "exclude": [ // 排除使用配置的文件
    "node_modules"
  ]
}
```

阅读了一些优秀的 TSline 规则表和参照了官方的规则说明后改写一些合适自己的规则配置。
（规则修改后需要重新启动才会应用新规则）

```json
{
  // 代码书写格式规则
  "rules": {    
    "indent": [true, "spaces", 2], // 缩进检查，使用2个空格
    "quotemark": [true, "single"], // 引号定义，使用单引号
    "semicolon": [true, "always", "ignore-interfaces"], // 是否必须分号结尾，除非定义接口类型
    "no-trailing-whitespace": false, // 不允许代码结尾空格
    "no-irregular-whitespace": true, // 禁止使用特殊空白符（比如全角空格）
    "space-before-function-paren": ["error", "always"], // function 之后 () 是否需要空格
    // 禁止连续的空行，最多2行
    "no-consecutive-blank-lines": [
      true,
      2
    ],
    // 括号内首尾空格, 0 = 首尾禁止空格
    "space-within-parens": [
      true,
      0
    ],

    "no-inferrable-types": [true, "ignore-properties"], // 已赋值变量无需声明类型
    "curly": true, // 语句要求使用大括号
    "triple-equals": true, // 是否使用全等
    "comment-format": true, // 注释前要求空格
    "no-unused-variable": true, // 禁止未使用的变量
    "no-use-before-declare": true, // 禁止未声明的使用
    "no-unnecessary-initializer": true, // 禁止变量定义时赋值为 undefined
    "prefer-const": true, // 优先使用 const 声明变量
    "no-shadowed-variable": true, // 禁止定义影子变量，即不允许父子作用域变量同名
    "no-empty-interface": true, // 禁止定义空的接口
    "interface-over-type-literal": true, // 接口可以 implement extend 和 merge

    "object-literal-sort-keys": false, // 对象按照 key 排序
    "new-parens": true, // new 后面只必须有一个空格
    "use-isnan": true, // 必须使用 isNaN(foo) 而不是 foo === NaN
    "forin": true, // for in 内部必须有 hasOwnProperty
    "no-for-in-array": true, // 禁止对 array 使用 for in 循环
    "no-construct": true, // 禁止使用 new 来生成 String, Number 或 Boolean
    "no-duplicate-super": true, // 禁止 super 在一个构造函数中出现两次
    "no-sparse-arrays": true, // 禁止在数组中出现连续的逗号，如：let foo = [,,]
    "no-bitwise": false, // 禁止使用位运算

    // 禁止出现重复的变量定义或函数参数名
    "no-duplicate-variable": [
      true,
      "check-parameters"
    ],
    // 禁止出现空代码块，允许 catch 是空代码块
    "no-empty": [
      true,
      "allow-empty-catch"
    ],
    // 必须使用箭头函数，除非是单独的函数声明或是命名函数
    "only-arrow-functions": [
      true,
      "allow-declarations",
      "allow-named-functions"
    ],
    // 箭头函数的参数必须使用括号，除非只有一个参数
    "arrow-parens": [
      true,
      "ban-single-arg-parens"
    ],

    "one-line": true, // if 后的 { 禁止换行
    "number-literal-format": true, // 小数必须以 0. 开头，禁止以 . 开头，并且不能以 0 结尾

    "no-var-keyword": true, // 禁止使用 var
    "no-eval": true, // 禁止使用 eval
    "no-console": false, // 禁止使用 console
    "no-debugger": false, // 禁止使用 debugger
    "no-non-null-assertion": true, // 禁止使用非空断言

    "return-undefined": true, // 使用 return; 而不是 return undefined;
    "no-switch-case-fall-through": true, // switch 的 case 必须 return 或 break
    "no-unsafe-finally": true, // 禁止在 finally 块中写控制流语句

    "no-duplicate-imports": true, // 禁止出现重复的 import
    "import-spacing": true, // import { ModuleName } 确保 ModuleName 两端留有空格
    "ordered-imports": false, // imports 名称排序
    "no-mergeable-namespace": true, // 禁止一个文件中出现多个相同的 namespace
    "member-access": false, // 不强制要求 class 的成员声明，例如：private || public

    // 类型断言必须使用 as Type，禁止使用 <Type>
    // <Type> 容易被理解为 jsx
    "no-angle-bracket-type-assertion": true,
    // "typedef-whitespace": true, //
    "class-name": true, // class 命名必须遵循 PascalCase 规则
    "interface-name": false, // interface 命名必须遵循以大写 I + PascalCase 规则
  }
}
```

在了解完后，我就将这些文件开始针对处理，删除原来的 **node_modules** 然后引入新的，然后将同名文件做不同处分析合并。

处理完配置文件类的数据后就可以考虑处理代码部分了

- main.js -> main.ts 这个改动并不大，改后缀就行。
- App.vue 如果没有引入代码逻辑则不用更改，如需改写则需要添加 **script lang="ts"**，然后就选择你改写的方式就好。
- router 需要进行改写，影响 main.ts
- store 需要进行改写，影响 main.ts

**ES -> TS** 的过程，因为引入了 **TSlint** 以及 **TypeScript** 自身对代码规范就较为严格，所以建议是从 main 开始，import 的文件从上到下依次进行改写处理。在 **ESline** 中我配置的是无分号规则，但是在 **TS & TSline** 中配置了分号是必须的。所以添加分号成为了第一件事同时也是工作量最大的事。

---

## 2019-09-24 20:14
在第一次构建完成尝试自己写的一个 demo 页面的时候，也配置了一下 TSlint 的规则，启动后出现了这样一个错误

``` command
vue.runtime.esm.js?2b0e:4478

Uncaught Error: Decorating class property failed.

Please ensure that proposal-class-properties is enabled and set to use loose mode.

To use proposal-class-properties in spec mode with decorators, wait for the next major version of decorators in stage 2.
```

这是一个运行时的错误，当时在全网查了一下，发现**居！然！没！人！碰！到！过！**

我的天！我是第一人？然后我就各种查各种找哪怕单词沾边一点点的文章我也去看。2个小时过去了真的没有找到解决过这个问题的答案。

隔天我和朋友说起这个事，然后当场复现了一下当时的操作过程，TSlint 的规则就没有配置，直接使用的默认规则。

``` command
npm run serve
```

启动项目后，居然没有报错！！！

然后我思考了一下，没有配置 TSlint 就不会报错。而错误信息里提示的却是装饰器的问题，肯定还是哪里有遗漏。

然后我又新建了一个项目来进行对比，发现：

- TSLint 规则不是导致报错的主要原因，而是**影响了报错的结果输出**。
- 影响此结果输出的规则是 **"member-access": false,**
- 主要影响导致报错的是 script 标签，需要添加语言支持属性 **lang="ts"**。

总而言之，言而总之，是我自己在写的时候疏忽了这一点，最终导致了这个奇葩问题。

---

## 2019-10-03 16:39
vue-cli 3.0 之后 webpack 的配置方式有了一些改变，需要通过 **vue.config.js** 文件 **module.exports** 的方式。
[vue-cli webpack 配置参考](https://cli.vuejs.org/zh/config/)

在经过思考后觉得需要将 **webpack proxy** 配置独立处理，分离出 **webpack.proxy.js** 文件。这里可以将 **devserve**、**proxy** 等配置信息加上简单的逻辑单独处理。

然后在 **vue.config.js** 中引入 **webpack.proxy.js** 使用。

webpack 别名设置问题，配置完成后报错信息为找不到 **module**，但我使用 **vue inspect > output.js** 查看 **webpack config** 的最终的配置信息，其中显示别名已生效。

后来想到可能是 **TypeScript** 的 **import** 文件的问题，然后尝试了一下将所需 **import** 的文件加上后缀名后，就正常运行了。

其主要原因是 **TypeScript** 所支持的文件类型较少，需要用过 **declare** 来增加对文件类型的支持，所以就需要在导入文件时写明后缀已保证可以正常使用该文件类型。

---

## 2019-10-04 22:31
重新考虑实现了路由处理的方式，但是大体思路没变，唯一变更就是 name 属性为必须。

- **initRouterRules** 初始化路由规则，将白名单以及其他路由信息进行合并处理，得出一个可无需验证的路由列表。
- **routeWhiteList** 检查当前路由是否在无需验证路由列表里。
- **handleRoute** 路由导航守卫，与之前的调用方式有差别，之前可以直接通过 **Route** 调用，现需要通过**实例化 Route** 后才能调用，但其函数实现未改变。
- **buildRouteList** 通过配置文件构建路由对象信息，除必要属性外其他属性通过对象合并的方式处理。
- **buildRouteView** 构建路由视图组件，主要还是通过 **import** 的方式导入，由于 **import()** 返回一个 **Promise** 对象，所以在找不到 **name** 或 **filePath** 的情况下进行了 **catch** 处理，将路由跳转到 404 页面。

---

## 2019-10-13 22:01
在看了一下新的 Vue TypeScript 语法后发现写起来有那么一点不方便，不像之前的方式可以通过预置的简写语法块生成。
https://github.com/kaorun343/vue-property-decorator
https://github.com/vuejs/vue-class-component

---

## 2019-10-14 23:47
由于之前在网上看到一篇文章写到过可以自己生成语法模板，但只是有映像而已。所以就去搜索了一下如何用 Node.js 生成模板。

唉，这不搜不要紧，一搜就有意思了。我发现有 **Node.js 命令行交互式应用**，一看发现是通过**命令行QA**的方式来获取信息并生成结果。

看看看着觉得有点眼熟，然后想了想，哎哟，这不就是 **vue-cli create** 项目的方式吗？哪这个就是真的有意思了，赶紧就转换思路去搜索相关的结果。但是大多数结果告诉我是使用 **prompt** 或者 **Inquirer** 库来实现，用库实现确实方便，但是我自己觉得没必要再去引一些库来实现一些额外的功能。

https://github.com/SBoudrias/Inquirer.js
https://github.com/flatiron/prompt

所以我就去查看了他们的源码实现发现都是使用 Node.js 里的 readline。

Node.js API 走起一看 readline -> readline.Interface 示例：微型 CLI。
http://nodejs.cn/api/readline.html#readline_example_tiny_cli

那就什么都别说了，看着 API 撸一个就好。

起初还以为撸一个有点难度，谁知道撸下来并没太难，还顺手优化了一下加了一些输入验证和默认值的判断。

---

## 2019-10-15 20:56
完成了之后每次都要通过命令行进入执行文件所在目录再通过 Node.js 来执行脚本，实在是麻烦，索性又去搜索了一下关于npm脚本路径配置，最后在 package.json 中加入了脚本命令。

```json
"scripts": {
  // 如需使用 npm 命令的话则需要在 package.json scripts 中加入你的命令名称和脚本位置。
  // 脚本位置的话不能直接使用 ./path 或 /path 这样会无法识别。
  // 需要使用 node path/name.xxx，这样 node 就会将脚本位置定位至当前项目开始。
  "tplgo": "node build/index.js"
}
```
执行脚本的命令
```command
npm run tplgo
```

微型的 QA 式 CLI 是完成了，但是关于生成模板这块还没有完成，目前预想的难度是在路径匹配还有文件检查这一块。
模板的内容倒是现用字符串模板的方式写好了，就剩下处理路径和如何写入生成文件了。

---

## 2019-10-17 23:36
下午快下班的时候手里的活干完了，就试试用 Node.js 处理路径和文件吧，翻了一会 API 文档感觉应该是这样子，就动手写了个多级路径 demo run 一下，没想到一次就通过了。

回来的时候在自己电脑上，就一直报错找不到路径，我就奇怪了为什么不行呢？

然后又复制了 API 里的例子尝试，还是报错找不到路径，很是生气。难道是因为命令行权限不够？嗯，有可能，果断用管理员模式打开命令行执行脚本。结果就是然并卵，赶紧百度大法一下，燃鹅也没什么用。

没办法是得好好看看文档到底哪里看漏了，看着看着突然想起来，会不会是版本问题？命令行一查，果然版本是 8.11 比较老了，赶紧去下一个新的安装包好了。在下载的过程中看到了这样一句话：
```
可选的 options 参数可以是指定模式（权限和粘滞位）的整数，也可以是具有 mode 属性和 recursive 属性（指示是否应创建父文件夹）的对象。
```
然后还看到了 **fs.mkdir(path[, options], callback)** 标题下有个历史版本的小字，点了一下
```
v10.12.0
The second argument can now be an options object with recursive and mode properties.
```
我能说个啥？还真被我猜中了是版本问题，看了这个说明才知道原来示例中 **{ recursive: true }** 是 v10.12.0 才新增的可选参数**递归模式**。行吧，不好好看文档白白浪费差不多一个小时，难受！

NodeJs v12.9.0 64-bit 有内存溢出问题慎用！又换了个 v11.10.0 版本。

---

## 2019-10-18 23:30
实实在在给自己坑了一把！！！

我为什么要自己写路径判断规则？！！

我为什么要自己写路径判断规则？！！

我为什么要自己写路径判断规则？！！

是 **path.join** 不好用还是 **join** 不好读？？？

行吧，写入文件也完成了，然后就剩优化部分了，暂时考虑使用 **promise** 返回状态统一处理，所有异步执行完成后调用 **process.exit(0);** 退出命令行。

---

## 2019-10-27 17:15
尝试修改 **buildTemplate** 的时候思考了一下，发现使用 **promise** 进行处理并不合适，然后改为尝使用 **async/await** 来对写入文件部分进行处理。

目前还有一个问题需要考虑，就是 **fs.writeFile** 的函数是异步的，要考虑如何在所有写入任务完成后统一返回结果，最后再将函数信息 return 出去以结束同步状态，让调用方继续执行后续代码。

## 2019-12-27 21:15
尝试更新引用包版本的时候发现报错了，然后看了一下错误日志，是文件引用了不存在的链接。
然后使用 **npm-check -u** 命令发现 @vue 更新后变化太大，提示了我 **Major Update Potentially breaking API changes. Use caution.**
然后在我尝试了几个升级后依然无法正确更新引用包，依然是是文件引用了不存在的链接。我就查看 **npm debug.log** 的日志文件发现如下包错误：
```
tsserver -> typescript
lint-staged
sass-loader
node-sass
@vue/cli-service 
@vue/cli-plugin-babel
@vue/cli-plugin-e2e-nightwatch
@vue/cli-plugin-pwa
@vue/cli-plugin-typescript
@vue/cli-plugin-unit-mocha
```
当我尝试使用 **npm uninstall package -D** 移除这些引用，居然直接报错无法移除！那么看来只能手动删除相关的包了。

手动删除相关的包后，重新 **npm install package -D** 以上相关包，就可以正常运行项目了。

---

## 2019-12-28 15:48
更新路由初始化 **import** 逻辑，原来的逻辑无法处理正确非未引入的地址。
更新了 **tplgo** 生成的模板上的语法错误问题，导致生成的 **{name}.vue** 产生 **render** 错误。

---

## 2019-12-28 23:34
将路由的组件钩子进行了注册，然后可以在组件内使用 **TypeScript** 版本的路由钩子。
重新思考了 **微型 CLI** 的文件写入处理逻辑，使用 **Promise** 配合 **async/await** 获取异步文件写入结果再通过 **resolve/reject** 的方式来确认所有文件是否已经完成或者失败，最终再统一输出结果调用结束关闭命令行模式。
文件构建模板重新进行编写，然后支持了 **TypeScript** 的混写方式，即可以用 **Vue.js** 的方式。

---

## 2019-12-31 20:27
之前更新的时候把首页都给删除了，后来在本地中也没找到备份，一度都以为要重写来着了。但是没想到在查 git commit 记录的时候发现有提交记录。
现在将首页内容进行重新改写，将文章卡片部分单独作为一个组件。使用了 new Image 来对图片部分进行载入，目前还没发现数量过大时产生的性能问题，未来会考虑使用异步的方式。

---

## 2019-12-31 20:50
更新了构建模板的写入内容，加入少量注释

---

## 2020-01-11 23:02
将之前未完成的 **web storage** 改写成 **TypeCcript** 版本, 然后将其注册至 Vue 下。
写完的时候直接使用是可以将数据写入 **web storage** 中，但是在 **.vue** 文件中未能识别出，导致在控制台会输出错误。
这个主要是因为 **TypeScript** 本身不支持额外的类型定义，所以需要自己提供一个 **\*.d.ts** 文件来描述定义的类型。主要是将相关的 **export declare interface、class、type** 等在类型定义文件中重新描述。以及再通过 **declare module 'path'** 来指定关联的模块和接口，就可以完成对该类型的定义了。
```javascript
export declare class WebLocals {
  set (key: string, value: any, opts?: Options): void;
  get (key: string): object | string | undefined;
}

declare module 'vue/types/vue' {
  interface Vue {
    $webLocals: WebLocals
  }
}
```

---

## 2020-01-12 11:00
昨天让小队成员尝试使用我自己封装处理了一下的 **Vue-Router** 功能，定义的一级路由的可以正常访问没有问题的，然而在使用多级路由或者子级路由的时候无法正常解析从而无法判断是否是合法跳转而导致直接**404**或者控制台输出了**错误信息**。
回来了以后我好好思考了一下，又对着官方文档以及源码 **Routes** 部分尝试理解他们。最后我发现还是我想得太多了，然后导致了过度设计过度考虑，以至于是以我个人的想法来限定了使用行为，这是非常不好的。
所以，我就用 **TypeScript** 重新将 **Router** 封装了一下，只处理必要的导航部分，对白名单、访问权限、身份等进行处理，而将过度设计的动态构建 **Routes-View** 全部删除。

- 新增 routes.config.ts 文件用来编写 **Routes** 部分，用以以实现 **Routes** 接口。
- 更新 config.json 文件，删除不必要的 **key/value** 内容，只保留用于处理对白名单、访问权限、身份等列表。

---

## 2020-01-18 13:42

引用的包有大量更新，直接使用命令更新则无法完成，还会报错。
要先删除既有 **node_modules** 然后使用 **npm i** 更新，更新完成后再使用 **npm-check -u** 将剩余包选择更新即可。
记得先删除 **package-lock.json** 文件

---

## 2020-01-19 22:33

更新了编程路由的配置实现，使得可以用过配置路由的方式进行编写路由访问。

新增了简历模板父页面，通过路由访问动态加载组件的方式来加载子页面模板。提供了 demo 便于查看实现效果。

**重要！** 更新了引入包的版本，请参考更新日志！！！

---

## 2020-01-20 16:32

正式将 web storage 的逻辑从项目中移除，web storage 已提交至 npm package 可通过 npm install 方式获取使用。
对 key/value 存储内容加密函数还未实现。
非插件集成方式目前还未实现，未来会考虑是否可以将这部分进行补充完善。

---
