---
title: 用Markdown写Hugo博客的一些小技巧
description: 一边写博客一边整理中
date: 2025-10-17
tags: [Markdown, hugo, KaTeX, iframe, markmap]
license: ""
categories: diary
---
*本文主要基于Hugo和Stack主题*
## 基本语法
[Stack主题Frontmatter Configs](https://stack.jimmycai.com/writing/frontmatter#frontmatter-configs)  
[Markdown Cheatsheet](https://www.markdown-cheatsheet.com/)  

还可以用到一些html的语法，但我暂时只学会了写`<kbd>Enter</kbd>`<kbd>Enter</kbd>

## KaTeX与渲染问题
Stack主题支持KaTeX。[KaTeX数学公式](https://katex.org/docs/supported.html)  
注意如果需要显示KaTeX公式需要在Frontmatter里写`math: true`  

Hugo有时会有无法正确渲染KaTeX的问题，我遇到的问题是用`$$`包裹的`%`或`\%`无法显示  
上网搜索找到了相应的解决办法：[Chlorine：在Hugo博客中正确渲染多行数学公式](https://chlo.is/hugo-math-rendering/)

如果用的也是Stack主题那么只需要添加这些代码就可以了：
```yaml {title="config.yaml"}
markup:
    goldmark:
        extensions:
            passthrough:
                enable: true
                delimiters:
                    block:
                        - - \[
                          - \]
                        - - $$
                          - $$
                    inline:
                        - - \(
                          - \)
                        - - $ # 这里
                          - $ # 这里
```
注意输入百分号或下划线等需要转义的符号还是需要在前面加反斜杠：`\%` `\_`
## 短代码
可以参见[树响集：短代码应用](https://donbro.vercel.app/p/daima/#%E7%9F%AD%E4%BB%A3%E7%A0%81%E5%BA%94%E7%94%A8)，整理的很全
## 构建网页时不上传草稿
```yaml {title="项目根目录\config.yaml"}
# 构建排除草稿
build: 
    excludeDrafts: true
```
```yaml {title="Front Matter"}
---
title: 这是一篇草稿文章
description: 它只在本地预览时出现，构建网页时不会放入public文件夹
date: 2025-10-17
draft: true # true-草稿；false-非草稿
---
```
本地预览时使用`hugo server -D`指令，则显示草稿；  
构建时使用`hugo`指令，则忽略草稿（如果用`hugo -D`则上传草稿）
## 使用iframe嵌入网页
iframe可以用来嵌入外部网页或本地html。

基本格式：`<iframe src="网址或本地html路径" style="width:100%;……css怎么写就怎么写"></iframe>`

如果需要嵌入本地html，注意把文件放在`项目根目录\static\`下，src里写`static`文件夹下的路径
### 嵌入Godot制作的网页游戏
具体写在另一个帖子里了：[第一个2D游戏](https://ryihuan.github.io/p/%E7%AC%AC%E4%B8%80%E4%B8%AA2d%E6%B8%B8%E6%88%8F/#%E5%A6%82%E4%BD%95%E5%AF%BC%E5%87%BAgodot%E7%BD%91%E9%A1%B5%E6%B8%B8%E6%88%8F%E5%B9%B6%E9%80%9A%E8%BF%87hugo%E9%83%A8%E7%BD%B2%E5%88%B0%E5%8D%9A%E5%AE%A2%E9%A1%B5%E9%9D%A2)

别的游戏引擎导出的项目文件应该也大差不差，但我没用过所以不乱说

我这个嵌入的游戏手机端是玩不了的，会卡在开始界面（虽然本来也没有设计给移动端玩，用的键盘操控），不知道有没有解决方案
### 嵌入思维导图
使用开源工具Markmap来实现。（[GitHub](https://github.com/markmap/markmap)）  

打开网址 https://markmap.js.org/repl ，左边栏可以用markdown语法写下需要整理成思维导图的内容，右边会生成思维导图。  
点击`Download as interactive HTML`，将下载的文件放到`项目根目录\static`中

在.md文件中使用iframe嵌入下载的html文件：
<iframe src="/p/markmap.html" 
style="width:100%; 
height:60vh; 
max-width:100%;
border:none; 
border-radius:20px;">
</iframe>

```html {title=".md文件里引用"}
<iframe src="/p/markmap.html" 
style="width:100%; 
height:60vh; 
border:none; 
border-radius:20px;">
</iframe>
```
不建议导出为svg嵌入，可能会有显示不完全的问题
## 多个表格横排
deepseek帮写的，仅记录  
已发现手机上显示会横向超出屏幕的问题，但也不怎么用到就懒得想办法优化了

<div style="display: flex; gap: 20px; justify-content: space-between;">

<div style="flex: 1;">

表格一
| 姓名 | 年龄 | 城市 |
| ---- | ---- | ---- |
| 张三 | 25   | 北京 |
| 李四 | 30   | 上海 |

</div>

<div style="flex: 1;">

表格二
| 产品 | 价格 | 库存 |
| ---- | ---- | ---- |
| 手机 | 2999 | 50   |
| 电脑 | 5999 | 20   |

</div>

<div style="flex: 1;">

表格三
| 月份 | 收入 | 支出 |
| ---- | ---- | ---- |
| 1月  | 1000 | 500  |
| 2月  | 1200 | 600  |

</div>

</div>

```html
<div style="display: flex; gap: 20px; justify-content: space-between;">

<div style="flex: 1;">

表格一
| 姓名 | 年龄 | 城市 |
| ---- | ---- | ---- |
| 张三 | 25   | 北京 |
| 李四 | 30   | 上海 |

</div>

<div style="flex: 1;">

表格二
| 产品 | 价格 | 库存 |
| ---- | ---- | ---- |
| 手机 | 2999 | 50   |
| 电脑 | 5999 | 20   |

</div>

<div style="flex: 1;">

表格三
| 月份 | 收入 | 支出 |
| ---- | ---- | ---- |
| 1月  | 1000 | 500  |
| 2月  | 1200 | 600  |

</div>

</div>
```
