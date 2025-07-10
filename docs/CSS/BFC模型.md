---
title: BFC模型
date: 2018/03/07 20:11:30
categories:
- CSS
---

#### BFC

一个块格式化上下文（`block formatting context`），是web页面的可视化CSS渲染出的一部分。__形成了BFC就形成了独立的区域，区域里面的子元素不会影响到外面的元素。__

形成BFC：

1. 浮动元素：元素的float不是none的元素。
2. 绝对定位：position的值为absolute或fixed。
3. 内联块：display:inline-block;
4. 具有overflow并且值不是visible的块元素。
5. display的值为flow-root（CSS3中新增加的，只是单纯的触发BFC）。

1、2、3、4也能形成BFC但是它还有自己的特性。flow-root只是单纯的触发BFC。

形成BFC之后通常用来做的事：

1. 爸爸管儿子，来让爸爸抱抱。（父元素上使用）

   1. 解决float高度塌陷问题。

      ```html
      <!DOCTYPE html>
      <html>
      
      <head>
          <style>
              #f{
                  width:200px;
                  border:5px solid green;
                  /* overflow: hidden; */
                  display: flow-root;
              }
              #z{
                  float:left;
                  width:100px;
                  height:100px;
                  border:1px solid blue;
              }
          </style>
      </head>
      
      <body>
          <div id="f">
              <div id="z"></div>
          </div>
      </body>
      
      </html>
      ```

   2. 解决父子之间margin合并问题

      ```html
      <!DOCTYPE html>
      <html>
      
      <head>
          <style>
              #f {
                  width: 200px;
                  /* border:5px solid green; */
      
                  display: flow-root;
              }
      
              #z {
                  margin: 10px;
                  width: 100px;
                  height: 100px;
                  border: 1px solid blue;
              }
          </style>
      </head>
      
      <body>
          <div id="f">
              <div id="z"></div>
          </div>
      </body>
      
      </html>
      ```

2. 兄弟之间划清界限（亲兄弟明算账），在子元素上使用。

   1. 解决兄弟之间上下margin合并

      ```html
      <!DOCTYPE html>
      <html>
      
      <head>
          <style>
              #f {
                  border: 1px solid green;
              }
      
              #z1,
              #z2 {
                  width: 200px;
                  height: 200px;
                  border: 1px solid blue;
                  margin: 20px;
              }
          </style>
      </head>
      
      <body>
          <div id="f">
              <div style="display:flow-root;">
                  <div id="z1"></div>
              </div>
              <div id="z2"></div>
          </div>
      
      </body>
      
      </html>
      ```

   2. 解决float块状元素重叠行内元素不重叠问题。s

      ```html
      <!DOCTYPE html>
      <html>
      
      <head>
          <style>
              img {
                  float: left;
              }
          </style>
      </head>
      
      <body>
      
          <div id="f">
              <img src="./2021-04-17_103425.png" />
              <!-- 后面的div形成新的BFc，不受外部元素的影响 -->
              <div style="border:10px solid green;display:flow-root;">123456</div>
          </div>
      </body>
      
      </html>
      ```

