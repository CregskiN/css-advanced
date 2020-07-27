> 本文代码从兼容性和耦合性考虑。注意，CSS 布局没有银弹！
>
> 建议使用 https://caniuse.com/#home 查看 CSS 属性的兼容性



# 1. 居中布局

+ 水平居中
+ 垂直居中
+ 水平垂直居中



## 1.1 水平居中

### 1.1.1 inline + text-align

```html
<div class="parent">
  <div class="child">
    <div>child继承了text-align</div>
  </div>
</div>

<style>
  body {
    background-color: #f2f2f2;
  }

  .parent {
    width: 500px;
    height: 100px;
    background-color: red;
    
    text-align: center;
  }

  .child {
    width: 200px;
    height: 50px;
    background-color: #fff;
    
    display: inline-block;
  }
</style>
```

+ 优点
  + 兼容性好 IE 6-9
+ 缺点
  + text-align 具有继承性
    + 解决办法： 1. 给子元素设置text-align:xxx; 以覆





### 1.1.2 table + margin 

```html
<div id="parent">
  <div id="child"></div>
</div>

<style>
  #parent {
    width: 500px;
    height: 200px;
    background-color: red;
  }
  #child {
    width: 300px;
    height: 100px;
    background-color: #fff;
    
    display: table;
    margin: 0 auto;
  }
</style>
```

+ 优点
  + 只对子级元素设置margin，实现居中
+ 缺点
  + 如果子级元素child脱离文档流，margin会失效
    + float: left / right
    + position: absolute / fixed



### 1.1.3 absolute + transform

```html
<div class="parent">
  <div class="child"></div>
</div>

<style>
  .parent {
    width: 500px;
    height: 100px;
    background-color: red;
    
    position: relative;
    /* absolute relative fixed 都是开启定位 */
  }

  .child {
    width: 200px;
    height: 50px;
    background-color: #fff;
    
    position: absolute;
    left: 50%;
    /* transform: translateX(-100px); */
    transform: translateX(-50%);
  }
</style>
```

+ 优点
  + 无论父级元素是否脱离文档流，都不会影响子级元素
+ 缺点
  + transform 兼容性不好 IE 9+





## 1.2 垂直居中

### 1.2.1 table-cell + vertical-align

```html
<div class="parent">
  验证父级元素是否有垂直居中对齐
  <div class="child">

  </div>
</div>
<style>
  .parent {
    width: 500px;
    height: 100px;
    background-color: red;

    display: table-cell;
    /* 
    display: table-cell;
      table: 设置当前元素为<table>效果
      table-cell: 设置<td>（单元格）效果，内容有水平和垂直布局
    */
    vertical-align: middle;
    /* 
    vertical-align 用来设置文本内容的垂直方向
      top
      middle
      bottom
    */
  }

  .child {
    width: 200px;
    height: 50px;
    background-color: #fff;
  }
</style>
```

+ 优点
  + 兼容性好 IE 6-9
+ 缺点
  + vertical-align 有继承性，导致其他子级元素元素也有效果





### 1.2.2 absolute + transform

```html
<div class="parent">
  验证parent是否被影响：未被影响
  <div class="child">

  </div>
</div>
<style>
  .parent {
    width: 500px;
    height: 200px;
    background-color: red;

    position: relative;
  }

  .child {
    width: 200px;
    height: 50px;
    background-color: #fff;

    position: absolute;
    top: 50%; /* 距离顶部偏移量 */
    transform: translateY(-50%);
  }
  /* 
  优点
  1. 无论父级元素是否脱离文档流，不会影响子级元素效果
  缺点
  1. transform 兼容性不好 IE9+
  */
</style>
```

+ 优点
  + 无论父级元素是否脱离文档流，子级元素不会受影响
+ 缺点
  + transform 兼容性 IE 9+





## 1.3 水平居中布局

### 1.3.1 水平 block + margin，垂直 table-cell + vertical-align

```html
<div class="parent">
  <div class="child"></div>
</div>

<style>
  .parent {
    width: 500px;
    height: 200px;
    background-color: red;
    color: black;

    display: table-cell; /* <td> */
    vertical-align: middle;
  }

  .child {
    width: 200px;
    height: 50px;
    background-color: #fff;
    /* <table> */
    display: block; /* block table 都可以 */
    margin: 0 auto;
  }
</style>
```

+ 优点
  + 兼容性杠杠的
+ 缺点
  + 语义话不太好
  + 父元素实现垂直居中，子元素实现水平居中





### 1.3.2 absolute + transform

```html
<div class="parent">
  <div class="child"></div>
</div>

<style>
  .parent {
    width: 500px;
    height: 200px;
    background-color: red;
    color: black;

    position: relative;
  }

  .child {
    width: 200px;
    height: 50px;
    background-color: #fff;

    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
</style>
```

+ 优点

  + 松耦合

+ 缺点

  + transform 兼容性不好 IE 9+

    解决办法：可以通过 left / top (父元素高度二分之一 - 子元素高度二分之一)解决

    ```html
    <style>
      .parent {
        width: 500px;
        height: 200px;
        background-color: red;
        color: black;
    
        position: relative;
      }
    
      .child {
        width: 200px;
        height: 50px;
        background-color: #fff;
    
        position: absolute;
        left: 150px;
        top: 75px;
      }
    </style>
    ```

    + 优点
      + 兼容性更好
    + 缺点
      + 与父元素宽高、自身宽高 极度耦合，出现bug不易定位



# 2. 多列布局

几个元素以水平方式排列

+ 两列布局：两个元素按水平方向排列
+ 三列布局
+ 圣杯布局、双飞翼布局
+ 等分布局
+ 等高布局
+ CSS3 多列布局



## 2.1 两列布局

左右两列，父元素制定宽，子元素自适应。如果左列指定宽度，右列自适应

+ float + margin-left
+ float + overflow ( BFC )
+ table + table-layoout + table-cell

### 2.1.1 float + margin

```html
<div class="parent">
  <div class="left">左：定宽</div>
  <div class="right">右：自适应
    <div class="inner"></div>
  </div>
</div>

<style>
  * {
    padding: 0;
    margin: 0;
  }
  
  .parent {
    width: 100vw;
    height: 100vh;
    background-color: #f2f2f2;
  }

  .left,
  .right {
    height: 300px;
  }

  .left {
    /* 左侧设置定宽 */
    width: 300px;
    background-color: chartreuse;

    float: left;
  }

  .right {
    background-color: coral;

    margin-left: 300px;
  }

  /* .inner {
    height: 300px;
    background-color: #fff;

    clear: both;
  } */

  /* 
  优点
  1. 实现方式简单
  缺点
  1. 右侧自适应模块的margin与左侧width耦合
  2. 定宽元素浮动 与 自适应元素不浮动，导致兼容性不好。两元素之间存在空白区域
  3. 右侧内部子元素使用clear: both 会造成子级元素跑到右侧之外
  解决办法：为自适应元素定位父级元素
  */
</style>
```

+ 优点
  + 实现方式简单
+ 缺点
  + 右列 margin-left 与左列 width 耦合
  + 左列 float 浮动，右列不浮动，有些浏览器会在二者之间存在空白
  + 右列子级元素使用clear:both; 会导致样式异常



#### 优化版

````html
<div class="parent">
  <div class="left">左：定宽</div>
  <div class="right-fix">
    <div class="right">右：自适应
      <div class="inner">inner</div>
    </div>
  </div>
</div>

<style>
  * {
    padding: 0;
    margin: 0;
  }

  .parent {
    background-color: #f2f2f2;
  }

  .left,
  .right {
    height: 300px;
  }

  .left {
    /* 左侧设置定宽 */
    width: 300px;
    background-color: chartreuse;

    float: left;
    /* 设置更高的显示层级，避免被右侧 right-fix 覆盖 */
    position: relative;
  }

  .right-fix {
    float: right;
    background-color: cadetblue;
    /* 
    为消除右侧子级元素 clear:both; 导致的样式异常，使用right-fix float:right;
    1. float:right 后，div 自动占满的特性失效 —— 设置 width: 100%; 
    2, left 行剩余空间不足 100%，right-fix 被挤到第二行 —— margin-left: -300px; left、right-fix 同在第一行
    3. right-fix 占满整个第一行空间，right 被 left 覆盖 —— margin-left: 300px; right 显示
    */
    width: 100%;
    margin-left: -300px;
  }


  .right {
    background-color: coral;

    margin-left: 300px;
  }

  .inner {
    background-color: #fff;
    color: black;

    clear: both;
  }

</style>
````

+ 优点
  + 实现方式简单
+ 缺点
  + right-fix 的 margin-left 、 right 的 margin-left 与 左列的 width 耦合



### 2.2.2 float + overflow ( BFC )

```html
<div class="parent">
  <div class="left">左：定宽</div>
  <div class="right">右：自适应
    <div>inner</div>
  </div>
</div>

<style>
  * {
    padding: 0;
    margin: 0;
  }

  .parent {
    background-color: #f2f2f2;
  }

  .left,
  .right {
    height: 300px;
  }

  .left {
    /* 左侧设置定宽 */
    width: 300px;
    background-color: chartreuse;

    float: left;
  }

  .right {
    background-color: coral;
    /* 开启BFC - 当前元素的内部环境与外界完全隔离 */
    overflow: hidden;
  }

</style>
```

+ 优点
  + 开启 BFC，左列浮动右列不浮动，老旧浏览器不会出现空白区域
  + 简单易用
+ 缺点
  + 右列内容溢出部分会被隐藏



### 2.2.3 display: table + table-layout

```html
<div class="parent">
  <div class="left">左：定宽</div>
  <div class="right">右：自适应</div>
</div>

<style>
  * {
    padding: 0;
    margin: 0;
  }

  body {
    /* width: 1000px; */
  }

  .parent {
    background-color: #f2f2f2;
    width: 100%;

    /* 表格单元格自动分配，左侧定宽，右侧自动分配 */
    display: table;
    table-layout: fixed; /* 为了解决表格中双边框问题 */
  }

  .left,
  .right {
    height: 300px;

    display: table-cell;
  }

  .left {
    /* 左侧设置定宽 */
    width: 300px;
    background-color: chartreuse;

  }

  .right {
    background-color: coral;
  }
</style>
```

+ 优点

  + 兼容性好

+ 缺点

  + display:table; 可能制约格式。

    + 如双边框问题

      解决办法：table-layout: fixed;



## 2.2 三列布局

列1 列2 定宽，列3 自适应。与两列布局大同小异这里不再展示

### 2.2.1 float + margin

### 2.2.2 float + overflow

### 2.2.3 display: table + table-layout



## 2.3 圣杯布局

左中右、上中下

左列定宽、中列自适应、右列定宽

上行定高、中行自适应、下行定高

三行三列

行：三个 div

核心是第二行的三列，中列自适应如何实现

### 2.3.1. 基础实现

```html
<body>
    <div class="left"></div>
    <div class="right"></div>
    <div class="center">center</div>
</body>

<style>
  * {
    padding: 0;
    right: 0;
  }

  .left,
  .center,
  .right {
    height: 300px;
  }

  .left {
    background-color: red;

    width: 300px;
    float: left;
  }

  .center {
    background-color: green;

    margin: auto 300px;
  }

  .right {
    background-color: blue;

    float: right;
    width: 300px;
  }
</style>
```

+ 优点
  + 实现简单
+ 缺点
  + 自适应的中心列放在最后，不利于 SEO

> 需求：将 center 放在最前



### 2.3.2 优化

```html

```



## 2.4 双飞翼布局

淘宝提出，针对圣杯布局的优化。针对圣杯布局中的定位问题

### 2.4.1 float

### 2.4.2 display:table 相关



## 2.5 等分布局

一行被分为若干列，每一列宽度相等





## 2.6 等高布局

### 2.6.1 display:table 相关

### 2.6.2 padding + margin 实现等高布局



## 2.7 CSS 多列布局

