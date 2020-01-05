# 更新记录
用于记录开发过程中各种问题的记录。

---

## 2020-01-05 18:37
解决了七年之痒，删除了之前废掉的node与npm。
明白了下载文件时不能乱用复制命令行，应该在读懂原文意义的基础上活用代码。
vs-code是查看“./xxx”等不可看文件的好东西。
路由，在配置好 to、link、path、route等部分的基础上，还要确认相关路径是在‘whiteList’还是“Other”（基于本版本）。
rm 删除文件 rm -f 是删除文件夹
mkdir 是创建文件夹 opne、touch是打开文件
npm run +‘xxx’， ‘xxx’依据config.js的内容来定。比如本项目启动语句为‘npm run serve’

```command
git remote add upstream projectUrl // projectUrl 是项目源的git地址
git fetch upstream // upstream 是 remote 项目的别名
git merge upstream/zuosi // 将项目更新合并到本地项目
// 以后项目有更新，只用执行 第二步 与 第三步
```

github 提交步骤：
```command
git add -A
git commit
// 这时会先检查代码然后进入 vim 模式
// 在 vim 模式中编辑提交记录
// i 是编辑文档，esc 退出当前模式，:wq 是保存并退出 vim
// 此时会将记录提交至本地仓库
git push // 会将本地变更全部提交至 GitHub 项目中
```
vim 格式：
标题

- 内容x
- 内容x
- 内容x

---
