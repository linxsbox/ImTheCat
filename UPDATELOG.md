# 更新记录
用于记录开发过程中各种问题的记录。

---

## 2018-10-21 23:44
- **node-sess** 还是无法通过 **npm install** 下载， 但是请求下载的连接和文件可以通过浏览器正常打开和下载。
- 用 **npm-check** 更新了一堆东西，有些都经历了一个大版本号了。
- 更新后 re run 提示 缺少 **webpack-cli** ，查看了一下 package ，webpack 版本号是 4.22 了据之前的了解 **webpack 4.0** 和之前的方式有很大不同。它需要 **webpack** 和 **webpcak-cli** 同时存在于本地项目内。

---

## 2018-10-22 00:38
- check 了一下 Vue 的最新版本，都已经 **3.0.5** 了，短暂的思考了一下，索性就直接整个项目都更新成 Vue 3.0 了。
- 简单的过了一下官方文档，create project 完成后，发现整个项目的结构 tree 清爽了很多，一些配置的东西不再零散，而是集中起来了，官方的说法 **cli-service** 是基于 **webpack** 和 **webpack-dev-server** 之上的，一些配置的东西集中在了 **package.json**，以及Babel/TypeScript 转译、ESLint 集成、单元测试和 end-to-end 测试等配置集中在 **babel.config.js** 里了。
- 支持了 TypeScript 那么就可以考虑插件部分使用 TypeScript来实现，页面相关的就用 JavaScript。
- plugin 部分还需要去熟悉一下，还有Vue 3.0 提供了一套完全**图形化**的创建和管理 Vue.js 项目的用户界面，以及 **cli-service-global** 快速开始**零配置**原型开发。

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
```commond
// 你想要怎么样配置 ESLint?
? How would you like to configure ESLint? (Use arrow keys)
  Use a popular style guide // 流行的风格
> Answer questions about your style // 回答有关您的风格问题
  Inspect your JavaScript file(s) // 检查你的 JavaScript 文件
```

```commond
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

```commond
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


