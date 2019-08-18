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

## 2019-03-31 05:11
今天在和人聊天的时候发现了一些好玩的html5的东西

css 伪类（:）
- :not
- :focus-within

html 属性（attribute）
- accesskey

## 2019-04-27 15:02
周五的时候和同事在开发理念上产生了分歧,争论之中我冒出了一个新想法: 路由是不是也可以整个抽象化?

所以重新考虑了路由的实现

1. 首先先将路由需要配置的对象剥离
2. 然后公共部分可以通过读取配置json来构建简单的路由信息 **routeList()**
3. 再提供一个额外的方法可以添加高级路由用法的入口 **routeList().append([{route object}])**
4. 以及提供一个懒加载的路由视图的方法 **routeView( filename )**

这样一来可以减少了大部分需要编写路由的部分。路由部分的工作也能减少大部分维护需求。

## 2019-08-18 19:04
在看了 element-ui 部分组件实现的源码后了解了一些之前并没了解很清楚的东西，然后开始试一试。然后发现修改过后页面跳转不正常了，浏览器地址是变更了，但是路由行为并没有触发，也就是说只是改变了url，并没有真正的跳转页面。

在尝试了一下后还是没发现哪里错了，然后就开始重新看之前写的路由规则，最后发现，我原来已经将路由的处理是抽象化的了，具体的路径、页面以及所需的组件引入都剥离成一个配置文件了。

最后是将新的页面路径加入白名单数组就好了，真的要气哭我自己了。

然后还发现个 vue-cli 3.10.0 的一个小Bug，就是在尝试修改 webpack 配置信息，然后发现 vue.config.js 中 devServer 配置 port 无效，在 package.json 脚本命令中配置 --port 也无法生效，最后运行结果还是随机端口。

关于尝试组件化的部分：
1. 使用 Vue.extend 来生成 VueConstructor
2. 提供外部调用函数接受 options，然后进行处理，options 最终会 merge 到指定的 *.vue 文件中。
3. VueConstructor 的实例必须调用 $mount()
4. vue-cli 3.10.0 可以通过 vue inspect > output.js 来输出 webpack config，它输出的并不是一个有效的 webpack 配置文件，而是一个用于审查的被序列化的格式。