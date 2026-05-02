---
title: 你好，Stack主题
date: "2025-10-01"
tags: ["Hugo", "Stack", "Waline", "博客装修"]
description: "Hugo Stack 主题装修历程分享"
draft: true
categories: ["diary"]
comments: false
---
*本文基于Hugo版本0.150.0，Stack版本3.31.0，部分代码使用AI完成*

## 从Neopost到Stack
我觉得对于像我这样的代码白痴，一开始装修博客就去选冷门主题真的是走弯路了。用Neopost主题的时候遇到很多问题用搜索引擎都搜不到可以抄作业的答案，只能一个劲问ai然后一遍一遍试错……  
虽然看到博客一点一点有个样子了也比较有满足感，但是太折磨了，思来想去还是换了更多人用教程也更全的Stack主题。

在此感谢：  
[莱特雷-Hugo Stack主题自定义更改](https://letere-gzj.github.io/hugo-stack/p/hugo/custom-stack-theme/)；  
[树响集-Stack主题调整](https://donbro.vercel.app/p/daima/)；  
[第三夏尔-Hugo Stack博客主题装修](https://thirdshire.com/series/hugo-stack-%E5%8D%9A%E5%AE%A2%E4%B8%BB%E9%A2%98%E8%A3%85%E4%BF%AE/)；  
[Naive Koala-Hugo Stack 魔改美化](https://www.xalaok.top/post/stack-modify/);  
[B1ain's Blog-hugo博客装修笔记](https://www.blain.top/categories/hugo/);  
[失迹的博客-建站技术 | 使博客更好地接入 Waline](https://blog.reincarnatey.net/2024/0719-better-waline)

顺便截图纪念一下用Neopost主题时候的样子吧。<details><summary>展开图片</summary>
![Neopost](/p/neopost.png)
</details>

## 从默认字体到猫啃糖圆
没啥好说的，星屑同款字体，圆体的神,  
附上[字体网站链接](https://www.maoken.com/tangyuan)
## 背景图和头像
因为还是很喜欢原来做的像素动图风格，本打算沿用，但在Pintrest找了一晚上素材都没有找到很满意的背景图  
自己画了一下草图，先凑合用着吧（画不画完还是未知数）  
<small>画不来像素风所以整个风格都改了> < </small>

画布开得尽可能大了，姑且应用到网页上看看会多么影响加载速度（
### 切换与旋转效果
按照[教程](https://www.xalaok.top/post/stack-modify/#%E5%A4%B4%E5%83%8F%E6%97%8B%E8%BD%AC)添加了头像旋转效果，并加了浅色/暗色模式切换头像和背景图的功能，效果不错（就是图太草了）  

以下是我魔改的代码：  
<details>
<summary>暗色模式下头像旋转（主题目录\assets\scss\custom.scss）</summary>

```scss
// 头像旋转动画
[data-scheme="dark"] .sidebar header .site-avatar .site-logo {
  transition: transform 1.65s ease-in-out; // 旋转时间
}

[data-scheme="dark"] .sidebar header .site-avatar .site-logo:hover {
  transform: rotate(360deg); // 旋转角度为360度
}
```
</details>
<details>
<summary>切换背景图片（主题目录\layouts\partials\footer\custom.html）</summary>

```scss
    /*修改背景图片*/
    [data-scheme="light"] body {
        background: url({{ (resources.Get "background/light.jpg").Permalink }}) no-repeat center top;
        background-size: cover;
        background-attachment: fixed;
    }
    [data-scheme="dark"] body {
        background: url({{ (resources.Get "background/dark.jpg").Permalink }}) no-repeat center top;
        background-size: cover;
        background-attachment: fixed;
    }
```
</details>
<details>
<summary>切换头像</summary>

先修改`主题目录\layouts\partials\head\custom.html`
```html
<script>
// 头像切换功能
function updateAvatar() {
  const avatarImg = document.querySelector('.site-avatar .site-logo');
  if (!avatarImg) return;
  
  const isDark = document.documentElement.getAttribute('data-scheme') === 'dark';
  const lightSrc = avatarImg.getAttribute('data-src-light') || avatarImg.src;
  const darkSrc = avatarImg.getAttribute('data-src-dark');
  
  if (darkSrc && isDark) {
    avatarImg.src = darkSrc;
  } else if (lightSrc && !isDark) {
    avatarImg.src = lightSrc;
  }
}

// 初始化
document.addEventListener('DOMContentLoaded', updateAvatar);

// 监听主题切换
new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    if (mutation.attributeName === 'data-scheme') {
      setTimeout(updateAvatar, 50);
    }
  });
}).observe(document.documentElement, { attributes: true });
</script>
```
再修改`主题目录\layouts\partials\sidebar\left.html`（在`<header>`后修改，注释掉原有设置）
```html
<header>
    {{ with .Site.Params.sidebar.avatar }}
        {{ if (default true .enabled) }}
        <figure class="site-avatar">
            <a href="{{ .Site.BaseURL | relLangURL }}">
            {{ if not .local }}
                <img src="{{ .src }}" width="300" height="300" class="site-logo" loading="lazy" alt="Avatar"
                    {{ with .srcDark }}data-src-dark="{{ . }}"{{ end }}>
            {{ else }}
                {{ $avatar := resources.Get (.src) }}
                {{ $avatarDark := resources.Get (.srcDark | default .src) }}
                
                {{ if and $avatar $avatarDark }}
                    {{ $avatarResized := $avatar.Resize "300x" }}
                    {{ $avatarDarkResized := $avatarDark.Resize "300x" }}
                    <img src="{{ $avatarResized.RelPermalink }}" 
                        data-src-light="{{ $avatarResized.RelPermalink }}"
                        data-src-dark="{{ $avatarDarkResized.RelPermalink }}"
                        width="{{ $avatarResized.Width }}" 
                        height="{{ $avatarResized.Height }}" 
                        class="site-logo" 
                        loading="lazy" 
                        alt="Avatar">
                {{ else if $avatar }}
                    {{ $avatarResized := $avatar.Resize "300x" }}
                    <img src="{{ $avatarResized.RelPermalink }}" 
                        width="{{ $avatarResized.Width }}"
                        height="{{ $avatarResized.Height }}" 
                        class="site-logo" 
                        loading="lazy" 
                        alt="Avatar">
                {{ else }}
                    {{ errorf "Failed loading avatar from %q" . }}
                {{ end }}
            {{ end }}
            </a>
            {{ with $.Site.Params.sidebar.emoji }}
                <span class="emoji">{{ . }}</span>
            {{ end }}
        </figure>
        {{ end }}
    {{ end }}
```
再在`hugo.yaml`的`sidebar`里面添加`srcdark: img/dark.jpg`
```yaml
    sidebar:
        emoji: 😨
        subtitle: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        avatar:
            enabled: true
            local: true
            src: img/light.jpg
            srcdark: img/dark.jpg
```
</details>

顺说目前的回顶部按钮和鼠标光标是用neopost主题的时候自己画的，我很满意^ ^  
<img src="/p/backtop.png" alt="回顶部" width=32px />![默认](/p/default.png)![点击](/p/pointer.png)![文本](/p/text.png)  
不过考虑到风格不匹配大概还要重画一个……

## 更换头像下图标链接
苦于没找到合适的图标素材，自己摸索了一个可以制作出完美适配主题下其他现有图标的办法

先看我做好的图标：![Misskey](/p/misskey.svg)![bluesky](/p/bluesky.svg) <small>（这样看起来两个线条粗细不太一致，我也没找到原因，但没关系，最终显示效果是差不多的就行……如果有谁知道为什么，请务必告诉我）</small>  
![效果](/p/效果.png)  

如果有同款需要，可以直接右键上面的图标另存^ ^

### 寻找svg素材
这里有一个很全的资源网站：[维基共享资源](https://commons.wikimedia.org/wiki/%E9%A6%96%E9%A1%B5?uselang=zh-cn)  
搜索你需要的logo，比如“bluesky”，选择`图像-文件类型-svg`，选择合适的logo并在下载时选择`full resolution`，这样我们就能得到一张初始的svg文件：  
<details><summary>展开图像</summary>

![bluesky](/p/初始-bluesky.svg)
</details>

### 编辑svg文件
使用编辑工具对svg文件进行编辑，这里我用的是[https://boxy-svg.com/ （需要注册，15天免费试用）](https://boxy-svg.com/)  

主要需要做的是先把view box调到24x24像素，再把图像调整到view box范围内，四周适当留出2px左右的空白（视具体图像而定），之后就可以保存了  
<details><summary>展开图像</summary>  
<img src=/p/100201.png alt="调整view box" width=100% /> <img src=/p/100202.png alt=调整图像 width=100% /></details>

把保存的svg文件在VScode里打开，默认会显示图像预览，需要在右上角找到`作为源文本重新打开`按钮，查看源文本  
为了跟主题原有的图标协调，这里我同时打开了`主题目录\assets\icons\brand-twitter.svg`的源文本进行比对：
<details><summary>brand-twitter.svg</summary>

```svg
<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-twitter" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <path d="M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c-.002 -.249 1.51 -2.772 1.818 -4.013z" />
</svg>
```
</details>

可以直接复制前面两行代码粘贴到正在修改的svg文件中：
<details><summary>未编辑的svg文件源文本</summary>

![图像](/p/Untitled.svg)
```svg
<?xml version="1.0" encoding="utf-8"?>
<svg width="24px" height="24px" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M 6.307 4.451 C 8.615 6.202 11.099 9.759 12.012 11.668 C 12.923 9.76 15.407 6.202 17.717 4.451 C 19.383 3.185 22.083 2.207 22.083 5.321 C 22.083 5.944 21.73 10.549 21.524 11.294 C 20.804 13.893 18.184 14.557 15.854 14.155 C 19.928 14.858 20.964 17.179 18.726 19.501 C 14.477 23.912 12.618 18.395 12.14 16.981 C 12.054 16.722 12.012 16.6 12.012 16.703 C 12.012 16.6 11.97 16.722 11.882 16.981 C 11.407 18.395 9.547 23.912 5.297 19.501 C 3.059 17.179 4.095 14.858 8.17 14.155 C 5.837 14.557 3.219 13.893 2.499 11.294 C 2.294 10.549 1.94 5.944 1.94 5.321 C 1.94 2.207 4.64 3.185 6.307 4.451 Z" style="transform-box: fill-box; transform-origin: 50% 50%;" fill="#000"/>
</svg>
```
</details>

注意删除正在修改的文件`<path>`末尾的样式（如`style=""`、`fill=""`、`stroke=""`等等，总之只保留前面一连串看不懂的数字）
<details><summary>编辑后的源文本</summary>

![图像](/p/bluesky2.svg)
```svg
<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-bluesky" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <path d="M 6.307 4.451 C 8.615 6.202 11.099 9.759 12.012 11.668 C 12.923 9.76 15.407 6.202 17.717 4.451 C 19.383 3.185 22.083 2.207 22.083 5.321 C 22.083 5.944 21.73 10.549 21.524 11.294 C 20.804 13.893 18.184 14.557 15.854 14.155 C 19.928 14.858 20.964 17.179 18.726 19.501 C 14.477 23.912 12.618 18.395 12.14 16.981 C 12.054 16.722 12.012 16.6 12.012 16.703 C 12.012 16.6 11.97 16.722 11.882 16.981 C 11.407 18.395 9.547 23.912 5.297 19.501 C 3.059 17.179 4.095 14.858 8.17 14.155 C 5.837 14.557 3.219 13.893 2.499 11.294 C 2.294 10.549 1.94 5.944 1.94 5.321 C 1.94 2.207 4.64 3.185 6.307 4.451 Z" style="transform-box: fill-box; transform-origin: 50% 50%;" />
</svg>
```
</details>

这样一个适配主题的svg图标就做好了。  
### 应用到主页
把做好的文件放到`主题目录\assets\icons\`中，并在`hugo.yaml`<small>（也可能叫`config.yaml`，我不记得我改过名字吗）</small>里修改`menu-social-icon`的设置（与文件的标题一致），这样就可以应用到博客页面上了  
如果需要更改图标链接的顺序，在`params:`前面一行添加`weight: 数字`即可，数字越小则越前
### 其他工具
找资料的时候又发现一个好用的工具： https://www.svgviewer.dev/ ，有自带的素材库，可以直接改代码看效果，如果只需要基础的图标这个够用了，也比较简单
## 添加文章封面渐变效果
参考了[田八-使用CSS让图片透明渐变](https://juejin.cn/post/7115236719019950088)中第三种方法的代码。
<details><summary>效果预览</summary>

![1](/p/100301.png)
</details>

将以下代码添加到`custom.scss`中即可：
```scss
//文章预览图渐变
.article-image {
    img {
    mask: linear-gradient(to bottom, black 0%, black 25%, rgba(0, 0, 0, 0.8) 40%, rgba(0, 0, 0, 0.4) 70%, transparent 100%);  }
}
```
## 为元素添加鼠标悬停效果
### 代码是什么，可以吃吗？
**先说题外话，** 装修过程中渐渐学会了用开发者工具、定位css文件中的元素位置、简单修改悬停效果和添加动画……这之前我真是一窍不通  
我是小白，所以把这个过程分享出来，希望能帮助到跟我小白程度一样的人吧。

我一开始还是各种问ai，但ai给出的方案实际上也是它海量检索资料然后缝合的，如果提问的方式不正确，它很难给出跟实际情况适配的答案。  
遇到问题时还是先谷歌搜寻一下，比如我想要上面提到的文章封面渐变效果，先用搜索引擎搜索“CSS 图片渐变”，找到了别人分享的实际内容，再去问ai是否可以应用到我的案例上、如果我需要为透明度添加中间值应该怎么做。这样可以提升效率，而不是在ai给出的海量错误代码中迷失。

**学会使用开发者工具检查元素，查看元素的属性。**  
用vscode的资源管理器打开主题文件夹，再在`style.scss`给出的文件列表里一个一个`ctrl+F`查找该属性，这样就能很快锁定这个元素的样式代码。  
通常建议不要直接在原文件上进行修改，应该在`custom.scss`中添加代码。

在样式栏中，你也可以很快查找到该元素的某个属性是由哪个选择器定义的，可以直接复制该选择器的名字到css文件中对具体属性进行更改。点击`:hov`键可以强制设置元素状态，查看该状态下的属性。  
![1](/p/f12.png)

**为常用颜色、阴影等参数创建变量**  
在`主题文件夹\assets\scss\variables.scss`中，可以看到主题设置的全部变量，我们也可以设置自己的变量以简便修改主题样式的过程。  
比如我的主题需要用到很多红色，我设置了`:root {--light-red: #e85b56;}`，这样我就可以使用`var(--light-red)`来调取这个值，而不用每次都输入具体的值。
### 案例：左侧菜单栏悬停效果
以下是实现左侧菜单栏悬停效果的具体案例：  
1. 用F12定位元素属性  
选择左侧菜单栏中的元素，可以很清楚地看到`class="menu" id="main-menu"`

2. 查找元素的样式代码  
可以在`menu.scss`中找到`#main-menu`关键词，以下是它相关的所有样式代码
```scss
/* Menu style */
#main-menu {
    list-style: none;
    overflow-y: auto;
    flex-grow: 1;
    font-size: 1.4rem;
    background-color: var(--card-background);

    box-shadow: var(--shadow-l1);
    display: none;
    margin: 0 calc(var(--container-padding) * -1);

    padding: 30px 30px;

    @include respond(xl) {
        padding: 15px 0;
    }

    &, .menu-bottom-section ol {
        flex-direction: column;
        gap: 30px;

        @include respond(xl) {
            gap: 25px;
        }
    }

    &.show {
        display: flex;
    }

    @include respond(md) {
        align-items: flex-end;
        display: flex;
        background-color: transparent;
        padding: 0;
        box-shadow: none;
        margin: 0;
    }

    li {
        position: relative;
        vertical-align: middle;
        padding: 0;

        @include respond(md) {
            width: 100%;
        }

        svg {
            stroke: currentColor;
            stroke-width: 1.33;
            width: 20px;
            height: 20px;
        }

        a {
            height: 100%;
            display: inline-flex;
            align-items: center;
            color: var(--body-text-color);
            gap: var(--menu-icon-separation);
        }

        span {
            flex: 1;
        }

        &.current {
            a {
                color: var(--accent-color);
                font-weight: bold;
            }
        }

        &.menu-bottom-section {
            margin-top: auto;

            ol {
                display: flex;
                padding-left: 0;
            }
        }
    }
}
```
3. 在`custom.scss`中添加样式  
  这是我为实现左侧菜单栏悬停后变色并加粗放大和添加阴影效果（并做暗色模式区分）而写的代码：
```scss
#main-menu { //左边菜单
    li {
        &:hover a{
            transition: all 0.2s ease-in-out;
            color: var(--light-red);
            transform: scale(1.05);
            font-weight: bold;
            filter: drop-shadow(var(--dropshadow-light));
        }

        [data-scheme="dark"] & {
            &:hover {
                filter: drop-shadow(var(--dropshadow-dark));
            }
        }
    }
}
```
对于像我这样的小白来说，写悬停效果只需要学会写`:hover`（悬停状态）、`transition`（动画效果）、`transform`（变形）这些很简单的代码，并学会看原样式代码的层级结构就可以了。  

如果写的代码效果与预期不一致，或者报错，此时再把已经写好的代码和原本的样式代码贴给ai让它进行修改，比什么都不做就茫然地向ai求助更有效率。

我为我的博客写了一大堆悬停效果，因为它最简单也最容易提升博客阅读体验。<small>（当然，移动端看不了鼠标悬停效果= =  </small>

全部的代码就不放出了，总之基本上都是重复上述案例的步骤，不同的元素根据它原有样式的不同可能会有差分  
<small>如果需要实现复杂的功能效果，可能需要编辑`layouts/partials/footer/custom.html`这个文件，这就涉及我知识盲区了> < </small>

## 页码栏鼠标悬停效果
因为有点复杂，java部分借助了ai

效果预览：    
![1](/p/页码栏.gif)

这个效果拆分为：
1. 当前页码高亮（stack自带）
2. 鼠标悬停在非当前页码时高亮（会写上面的代码就会写这个），同时当前页码变回默认样式
3. 鼠标悬停在当前页码时不发生改变

实现这一效果的代码：
1. 编辑`custom.scss`
```scss
.page-link { //页面页码栏（需要添加JavaScript代码实现当前页高亮）
    transition: all 0.2s ease-in-out;

    &.current.reset-style {
        font-weight: normal;
        background-color: var(--card-background);
        color: var(--card-text-color-secondary);
    }
    &:not(.current):hover { // 其他页面的悬停效果
        color: var(--light-red);
        background-color: var(--card-background-selected);
        transform: scale(1.05);
        font-weight: bold;
    }
}
```
2. 编辑`custom.html`
```javascript
<script>
/* 页码栏分页悬停效果 */
document.addEventListener('DOMContentLoaded', function() {
    const pagination = document.querySelector('.pagination');
    const pageLinks = document.querySelectorAll('.page-link');
    let currentPage = document.querySelector('.page-link.current');

    pageLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            // 如果悬停的不是当前页面
            if (!this.classList.contains('current') && currentPage) {
                currentPage.classList.add('reset-style');
            }
        });

        link.addEventListener('mouseleave', function() {
            // 恢复当前页面样式
            if (currentPage) {
                currentPage.classList.remove('reset-style');
            }
        });
    });
});
</script>
```
## 更改主页文章卡片可点击区域
Stack主题中，主页的文章卡片的默认点击区域只有文章标题区域，  
以下这些代码可以把点击打开文章的区域更改为除分类标签以外的所有区域。

在`custom.html`中添加：
```javascript
<!-- 扩大主页文章卡片可点击区域 -->
<script>
document.addEventListener('click', function(e) {
    const articleDetails = e.target.closest('.article-details');
    if (articleDetails && !e.target.closest('.article-category a')) {
        const titleLink = articleDetails.querySelector('.article-title a');
        if (titleLink) {
            window.location.href = titleLink.href;
        }
    }
});
</script>
```

在`custom.scss`中添加：
```scss
//扩大主页文章卡片可点击区域(java)，同步更改鼠标光标样式
.article-details {
  cursor: url('/mouse/pointer.png'), pointer;
}
```
如果没有自定义鼠标样式，去掉url的部分就好了。
## 配置Waline评论区
### 初步上手
Waline的官方文档有详细的配置教程。[Waline-快速上手](https://waline.js.org/guide/get-started/)

完成HTML引入后，在根目录下的配置文件`hugo.yaml`（也可能是`config.yaml`？）中修改参数：
```yaml
params:
    comments: # 默认在第39行
        enabled: true
        provider: waline

        waline: #默认在第75行
            serverURL: # 填写你的评论区网址，如：serverURL: https://xxxx.vercel.app/
            lang: zh-cn # 语言设置为中文
            emoji: # 为你的评论区引入表情
                - https://gcore.jsdelivr.net/gh/Saidosi/azuki-emoji-for-waline@1.0/azukisan/ # 小豆泥
            locale:
                admin: 博主 # 设置评论区管理员标签
                placeholder: |- # 评论框提示词，如果需要换行则输入换行符："|-"，不需要换行的话可以删掉
                    您无需登录即可发表评论。如果需要收到回复通知，请留下您的邮箱地址。
                    非登录状态下，如果您留下邮箱，您的头像将自动获取并设置为您的邮箱账户头像。
                    由于vercle.app域名受到DNS污染，大陆ip地址无法参与评论。
                nick: 昵称（选填） #昵称栏显示的标题文字，以下同理
                mail: 邮箱（选填） 
                link: 网址（选填）
```

但我在配置过程中还是遇到了评论区无法显示的问题，最后参考[失迹的博客-建站技术 | 使博客更好地接入 Waline](https://blog.reincarnatey.net/2024/0719-better-waline)第2.1条中的代码完美解决！如果有遇到同款问题，可以去阅读一下这篇文章。
### 修改评论区样式
配置成功后，Waline评论区可以在本地预览网址`localhost:1313`中显示，可以同样用F12检查元素的方法更改评论框的样式。  
以下是我的样式：  
```scss
    /* 评论区整体样式-by 失迹的博客 */
    .waline-container {
        background-color: var(--card-background);
        border-radius: var(--card-border-radius);
        box-shadow: var(--shadow-l1);
        padding: var(--card-padding);
        --waline-font-size: var(--article-font-size);
    }
    .waline-container .wl-count {
        color: var(--card-text-color-main);
    }
    /* 暗色模式下输入框背景 */
    [data-scheme="dark"] .wl-panel {
        background: #212121;
    }
    /* 提交按钮基础样式 */
    .wl-btn.primary {
        background: var(--body-text-color);
        border: none;
    }
    /* 提交按钮悬停&激活状态 */
    .wl-btn.primary:hover, .wl-btn.primary:active {
        border: none;
        background: var(--light-red);
    }
    /* 按正序、……悬停&激活状态 */
    .wl-sort li {
        transition: color 0.2s ease-in-out;
        &:hover {
            color: var(--body-text-color);
        }
        &.active {
            color: var(--light-red);
        }
    }
    /* markdown按钮与悬停状态 */
    [data-waline] a {
        color: var(--body-text-color);
        transition: color 0.2s ease-in-out;
        &:hover {
            color: var(--light-red)
        }
    }
    /* 删除、点赞、回复、编辑按钮悬停&激活状态 */
    .wl-card .wl-delete, .wl-card .wl-like, .wl-card .wl-reply, .wl-card .wl-edit {
        transition: color 0.2s ease-in-out;
        &:hover, &.active {
            color: var(--light-red);
        }
    }
    /* 登录按钮悬停&激活 */
    .wl-btn:hover, .wl-btn:active {
        border-color: var(--light-red);
        color: var(--light-red);
    }
    /* 表情、gif、图片、预览，悬停&激活状态 */
    .wl-action {
        transition: color 0.2s ease-in-out;
        &:hover, &.active{
            color: var(--light-red);
        }
    }
    /* 昵称等标签栏（= =艰难对齐） */
    .wl-header label {
        font-size: 1.4rem;
        padding-top: 1.8rem;
        padding-left: 2rem;
        padding-right: 0;
    }
    /* 主输入框间距 */
    .wl-editor {
        padding-left: 1.6rem;
        padding-top: 0.5rem;
    }
    /* 昵称等栏输入框：间距、圆角、字体大小 */
    .wl-header input {
        margin: 1rem;
        border-radius: 4px;
        font-size: 1.4rem;
    }
    /* 预览两个字的颜色 */
    .wl-preview h4 {
        color: var(--body-text-color);
    }
    /* 去掉认证符号背景 */
    .wl-cards .wl-user .verified-icon {
        background: none;
    }
    /* gif栏搜索框背景色、间距、圆角、输入符 */
    .wl-gif-popup input {
        background-color: var(--card-background);
        padding-left: 1.6rem;
        border-radius: 8px;
        &:focus-visible {
            color: var(--body-text-color);
        }
    }
    /* gif栏图片悬停效果与样式调整 */
    .wl-gif-popup img {
        border-radius: 8px;
        border: none;
        transition: all 0.2s ease-in-out;
        &:hover {
            border-radius: 8px;
            mask: linear-gradient(rgb(255, 255, 255) 0%, rgba(255, 255, 255, 0.75) 100%);
        }
    }
    /* 去掉表情悬停时背景 */
    .wl-emoji-popup button:hover {
        background: none;
    }
    /* 表情悬停效果：放大+旋转 */
    .wl-emoji-popup .wl-emoji {
        transition: transform 0.3s ease-in-out;
        &:hover {
            transform: scale(1.5) rotate(-15deg);
        }
    }
    /* 不显示评论ip和设备环境等 */
    .wl-card .wl-meta>span {
        display: none;
    }
    /* 设置上一条的同时调整评论文字位置弥补空缺 */
    .wl-card .wl-content {
        padding-top: 0;
    }
```
同时，因为我自定义了鼠标样式，也需要为评论区应用我的鼠标样式：  
```scss
// .wl 和.waline 开头的是waline评论区的选择器
// default光标图片
body,
html,
.article-content img,
.waline-container,
.wl-header label {
    cursor: url(../mouse/default.png),
    auto !important;
}

// pointer光标图片
a:hover,
button:hover,
.copyCodeButton:hover,
#dark-mode-toggle,
.wl-actions label,
.wl-actions a,
.wl-emoji-popup .wl-tab-wrapper button,
.wl-gif-popup img,
.wl-sort li {
    cursor: url(../mouse/pointer.png),
    auto !important;
}

// text光标图片
input:hover,
.site-description,
.article-subtitle,
.article-content span,
.article-content li,
.article-content p,
.wl-editor, .wl-input, 
.wl-header input,
[data-waline] p {
    cursor: url(../mouse/text.png),
    auto;
}
```
还隐藏了一些滚动条：
```scss
// 隐藏一大堆滚动条
#TableOfContents, //导航栏
#main-menu, //左侧菜单
.wl-emoji-popup .wl-tab-wrapper,//评论区表情
.wl-gallery, //评论区gif
.wl-editor { //评论区主输入框
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE and Edge */
}

#TableOfContents::-webkit-scrollbar,
#main-menu::-webkit-scrollbar,
.wl-emoji-popup .wl-tab-wrapper::-webkit-scrollbar,
.wl-gallery::-webkit-scrollbar,
.wl-editor::-webkit-scrollbar {
    display: none; /* Chrome, Safari and Opera */
}
```
### 设置邮件通知
参考了[失迹的博客-建站技术 | 使博客更好地接入 Waline](https://blog.reincarnatey.net/2024/0719-better-waline)第4条中的邮件通知设置，与[Sarakale-waline 邮件通知模板样式一览](https://www.sarakale.top/blog/posts/537344b2)中的邮件通知模板。  

在设置邮件通知过程中需要注意的是，  
1. Google账户需要开启两步验证才能生成应用专用密码；  
2. Vercel每次更改环境变量后都需要reploy才能生效。

此外，在测试邮箱通知功能时的几点发现：
1. 我用苹果默认邮箱应用打开收到评论的通知邮件，格式有所错位，但网页版邮箱是正常显示的，所以可能根据邮箱登录环境的不同效果会不一致；
2. 非登录状态下，如果评论者留下了邮箱，Waline会自动获取邮箱账户的头像并设置为评论头像；
3. 非登录状态下发表的评论只能由管理员删除；
4. 每分钟只能发表一次评论。
## 碎碎念
我的Waline评论区用的是Vercel自动分配的网址。知道Vercel.app的域名墙内打不开，搜了一下相关文章貌似解决办法只能是套自定义域名，不愿意购买域名于是我暂且作罢= =  
所以目前我的评论区大陆ip地址是无法参与评论的

此外文章点赞和访客数量功能，看到有很多大佬的博客分享了相关教程，但是本人数据敏感+嫌麻烦，也就不考虑做了

目前我的博客差不多就装好了！除了背景图和头像没有画完以外，估计三年内都不会愿意动它了= =  
装修博客真的是一件费精力的事情，编程小白更是费力，我从10月1日开始用Stack主题，打这行字的时间是10月5日20:15，中间的时间基本都在折腾博客，一觉醒来就hugo服务器启动，git push完了就去睡觉……

希望我的经验能够帮到其他人省下一些时间和精力。
## 参考资料
[Hugo官方文档](https://gohugo.io/documentation/)；  
[Stack官方文档](https://stack.jimmycai.com/guide/)；    
[Waline-快速上手](https://waline.js.org/guide/get-started/);  

[莱特雷-Hugo Stack主题自定义更改](https://letere-gzj.github.io/hugo-stack/p/hugo/custom-stack-theme/)；  
[树响集-Stack主题调整](https://donbro.vercel.app/p/daima/)；  
[第三夏尔-Hugo Stack博客主题装修](https://thirdshire.com/series/hugo-stack-%E5%8D%9A%E5%AE%A2%E4%B8%BB%E9%A2%98%E8%A3%85%E4%BF%AE/)；  
[Naive Koala-Hugo Stack 魔改美化](https://www.xalaok.top/post/stack-modify/)；  
[B1ain's Blog-hugo博客装修笔记](https://www.blain.top/categories/hugo/)；  
[维基共享资源](https://commons.wikimedia.org/wiki/%E9%A6%96%E9%A1%B5?uselang=zh-cn)；  
[失迹的博客-建站技术 | 使博客更好地接入 Waline](https://blog.reincarnatey.net/2024/0719-better-waline)；  
[田八-使用CSS让图片透明渐变](https://juejin.cn/post/7115236719019950088)；  
[Sarakale-waline 邮件通知模板样式一览](https://www.sarakale.top/blog/posts/537344b2)