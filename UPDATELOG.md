# 更新记录
用于记录开发过程中各种问题的记录。

## 2018-10-21 23:44
- **node-sess** 还是无法通过 **npm install** 下载， 但是请求下载的连接和文件可以通过浏览器正常打开和下载。
- 用 **npm-check** 更新了一堆东西，有些都经历了一个大版本号了。
- 更新后 re run 提示 缺少 **webpack-cli** ，查看了一下 package ，webpack 版本号是 4.22 了据之前的了解 **webpack 4.0** 和之前的方式有很大不同。它需要 **webpack** 和 **webpcak-cli** 同时存在于本地项目内。

## 2018-10-22 00:38
- check 了一下 Vue 的最新版本，都已经 **3.0.5** 了，短暂的思考了一下，索性就直接整个项目都更新成 Vue 3.0 了。
- 简单的过了一下官方文档，create project 完成后，发现整个项目的结构 tree 清爽了很多，一些配置的东西不再零散，而是集中起来了，官方的说法 **cli-service** 是基于 **webpack** 和 **webpack-dev-server** 之上的，一些配置的东西集中在了 **package.json**，以及Babel/TypeScript 转译、ESLint 集成、单元测试和 end-to-end 测试等配置集中在 **babel.config.js** 里了。
- 支持了 TypeScript 那么就可以考虑插件部分使用 TypeScript来实现，页面相关的就用 JavaScript。
- plugin 部分还需要去熟悉一下，还有Vue 3.0 提供了一套完全**图形化**的创建和管理 Vue.js 项目的用户界面，以及 **cli-service-global** 快速开始**零配置**原型开发。

## 2018-10-23 00:45
- 在看 Vue/cli 3.0 [配置参考](https://cli.vuejs.org/zh/config/)的时候发现使用的是 **module.exports**，然后回想了一下之前写代码都是用的 **export** ，然后就去查了一下资料，之前认为是不同版本的模块化导入导出方式而已，没想到是**完全不同**的两个**模块规范**。
- 通过查资料了解了 **ES 模块规范** 和 **CommonJS 模块规范**。**ES 模块规范** 来自本家 **ECMAScript**，**CommonJS 模块规范**是一种思想/规范，**NodeJS** 是它的实现。

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

## 2018-11-17 18:05
配置文件夹的更新，路由 verifyRules 规则配置

## 2018-11-17 16:56
- 了解 indexedDB
- 创建 indexedDB
- 存储文件 storageDB

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
