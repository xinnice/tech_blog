---
title: ES6
date: 2018/04/24 23:11:10
categories:
- JavaScript
---


# 关键字扩展(重要)

## let和块级作用域

### 函数作用域

在ES5中,JS的作用域分为全局作用域和局部作用域。通常是用函数区分的，函数内部属于局部作用域。

```js
//ES6之前只有函数才构成局部作用域
//案例1
{ var a = 10; }
console.log(a);

//案例2
console.log(a);
if (true) {
    var a = 10;
}
console.log(a);
```

ES5 只有全局作用域和函数作用域，没有块级作用域，这带来很多不合理的场景

- 内层变量可能会覆盖外层变量。

  ```js
  var b = 1;
  fn1();
  function fn1() {
      console.log(b);//undefined
      if (true) {
          var b = 2;
      }
  }
  ```

- 用来计数的循环变量泄露为全局变量。

  ```js
  //变量i是var命令声明的，在全局范围内都有效，所以全局只有一个变量i。每一次循环，变量i的值都会发生改变
  for (var i = 0; i < 5; i++) {
      setTimeout(function () {
          console.log(i);//5 5 5 5 5
      })
  }
  ```

### 块级作用域

- 在ES6中新增了块级作用域的概念，使用{}扩起来的区域叫做块级作用域
- let关键字声明变量，实际上为 JavaScript 新增了块级作用域。
- 块作用域由 { } 包括，if语句和for语句里面的{ }也属于块作用域。
- 在块内使用let声明的变量，只会在当前的块内有效。

```js
//全局声明一个变量b
let b = 1;
fn1();
function fn1() {
    //当前的作用于没有b，沿着作用于寻找到全局的b
    console.log(b);
    if (true) {
        //只在当前的作用于中生效
        let b = 2;
    }
}
```

### let关键字

ES6 新增了`let`命令，用来声明变量。它的用法类似于`var`，但是所声明的变量，只在`let`命令所在的代码块内有效，也就是增加了块级作用域。

- 使用块级作用域（let定义的变量属于块级作用域） 防止全局变量污染

  ```js
  {
      let b = 20;
  }
  console.log(b);//Uncaught ReferenceError: b is not defined
  
  ```

- 块级作用域可以任意嵌套

  ```js
  //外层作用域无法读取内层作用域的变量
  {
      {
          let a = 1;
          {
             console.log(a); //1
          }
      }
      console.log(a);//Uncaught ReferenceError: a is not defined
  }
  ```

- for循环的计数器，就很合适使用let命令

  ```js
  //计数器i只在for循环体内有效，在循环体外引用就会报错
  for (let i = 0; i < 4; i++) {
      console.log(i);
  }
  console.log(i);
  ```

- 变量i是let声明的，当前的i只在本轮循环有效，所以每一次循环的i其实都是一个新的变量

  > 你可能会问，如果每一轮循环的变量i都是重新声明的，那它怎么知道上一轮循环的值，从而计算出本轮循环的值？这是因为 JavaScript 引擎内部会记住上一轮循环的值，初始化本轮的变量i时，就在上一轮循环的基础上进行计算

  ```js
  for (let i = 0; i < 5; i++) {
      setTimeout(function () {
          console.log(i);//0 1 2 3 4
      })
  }
  ```

- for循环还有一个特别之处，就是设置循环变量的那部分是一个父作用域，而循环体内部是一个单独的子作用域

  ```js
  for (let i = 0; i < 4; i++) {
      console.log(i);//a
  }
  console.log(i);//报错
  ```
  
- 练习

  ```js
  //练习1：
  var a = [];
  for (var i = 0; i < 10; i++) {
      a[i] = function () {
          console.log(i);
      };
  }
  a[6]();
  
  // 练习2:
  var a = [];
  for (let i = 0; i < 10; i++) {
      a[i] = function () {
          console.log(i);
      };
  }
  a[6]();
  ```

### let关键字特点

1. 没有声明提升

   ```js
   //ES6 明确规定，如果区块中存在let和const命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。凡是在声明之前就使用这些变量，就会报错）
   // 这样的设计是为了让大家养成良好的编程习惯，变量一定要在声明之后使用，否则就报错
   let c = 1;
   {
       console.log(c);//Uncaught ReferenceError(引用错误): Cannot access 'c' before initialization
       let c = 2;
   }
   ```

2. 不允许重复声明

   ```js
   // let不允许在相同作用域内，重复声明同一个变量
   // 报错
   function func() {
       let a = 10;
       var a = 1;
   }
   
   // 报错
   function func() {
       let a = 10;
       let a = 1;
   }
   ```

3. 块级作用域的出现，实际上使得获得广泛应用的匿名立即执行函数表达式（匿名 IIFE）不再必要了

   ```js
   // IIFE 写法
   (function () {
       var tmp = "...;"
   }());
   
   // 块级作用域写法
   {
       let tmp = "...;"
   }
   ```

## const关键字

常量：不会变化的数据，有些时候有的数据是不允许修改的，所以需要定义常量。

- `const`声明一个只读的常量。定义常量可以写大写。

  ```js
  const PI = "3.1415926";
  console.log(PI)
  ```

- `const`声明的常量不得改变值

  ```js
  const PI = "3.1415926";
  PI = 22;//Assignment to constant variable.(报错：给常量赋值)
  ```

- `const`声明的常量如果是对象，可以修改对象的内容

  ```js
  // const只能保证这个指针是固定的（即总是指向另一个固定的地址），至于它指向的数据结构是不是可变的，就完全不能控制了
  //但是对象的引用不能被修改，比如用一个对象替代这个对象，那么引用就被修改了
  const PATH = {};
  PATH.name = "lily";
  console.log(PATH);//{name:"lily"}
  PATH = {}//Assignment to constant variableCopy to clipboardErrorCopied
  ```

- `const`一旦声明常量，就必须立即初始化，不能留到以后赋值

  ```js
  const time;//SyntaxError: Missing initializer in const declarationCopy to clipboardErrorCopied
  ```

- `const`只在声明所在的块级作用域内有效

  ```js
  {
      const PI = 3.14;
  }
  console.log(PI)//ReferenceError(引用错误)PI is not defined
  ```

- `const`命令声明的常量也是不提升

  ```js
  console.log(c);//Cannot access 'c' before initialization
  const c = "hello"
  ```

- `const`声明的常量，也与`let`一样不可重复声明

  ```js
  const PI = "3.14";
  const PI = "3.14";//SyntaxError: Identifier(标识符) 'PI' has already been declared(声明)
  ```

- let命令、const命令、class命令声明的全局变量，不属于顶层对象的属性。也就是说，从 ES6 开始，全局变量将逐步与顶层对象的属性脱钩。

  ```js
  var a = 1;
  console.log(window.a);//1
  let a = 2;
  console.log(window.a)//undefined
  ```

## 块级作用域的函数声明

函数声明一般常用的是两种，一种是function声明，一种是函数表达式。

```js
//函数声明 及 两种声明的区别
f1()//可以使用
f2();//f2 is not a function

function f1() {}
var f2 = function () {

}
```

函数能不能在块级作用域之中声明？这是一个相当令人混淆的问题。

- ES5 规定，函数只能在顶层作用域和函数作用域之中声明。
- ES6 引入了块级作用域，明确允许在块级作用域之中声明函数。ES6 规定，块级作用域之中，函数声明语句的行为类似于`let`，在块级作用域之外不可引用。
- ES6 在附录 B里面规定，浏览器的实现可以不遵守上面的规定，有自己的行为方式
- 考虑到环境导致的行为差异太大，应该避免在块级作用域内声明函数。如果确实需要，也应该写成函数表达式，而不是函数声明语句。

```js
//尽量避免以下写法
fn1();
if (true) {
    function fn1() {
        alert(1);
    }
}
fn1();

//如果真的想在声明块级作用域函数，使用函数表达式
if (true) {
    let fn1 = function () {
        alert(1);
    }
}
```

# 变量解构赋值(重要)

## 什么是变量的解构赋值

ES6 允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构（Destructuring）。

解构赋值 本质就是赋值，把结构解散重构 然后赋值 其实是一种模式的匹配，关键要掌握一一对应关系。

解构赋值作用就是方便赋值。

```js
//1.请把数组arr1中的值分别赋值给变量 a b c d
//ES5的方法
/* let arr1 = [1, 2, 3, 4];
        let a = arr1[0];
        let b = arr1[1];
        let c = arr1[2];
        let d = arr1[3];
        console.log(a, b, c, d) */

//解构赋值的方法
let [a, b, c, d] = [1, 2, 3, 4];
console.log(a, b, c, d)
```

## 数组的解构赋值

- 数组解构赋值可以从数组中提取值，按照对应位置，对变量赋值

  ```js
  let arr = [1, 2]
  let [a, b] = arr;
  console.log(a, b)
  ```

- 解构失败返回undefined

  ```js
  let [c, d] = [1];
  console.log(d);//undefined
  ```

- 不完全解构也可以成功

  ```js
  let [a] = [10, 20];
  console.log(a);
  ```

- 可以为解构赋值可以设置默认值

  ```js
  let [e = 2, f = 20] = [10];
  console.log(e, f)//10 20
  ```

- 可以使用rest参数（当值比变量多的时候）

  ```js
  let [g, h, ...rest] = [10, 11, 23, 22, 12, 3, 4, 5, 3];
  console.log(g, h, rest)//10，11，[23, 22, 12, 3, 4, 5, 3]
  ```

- 多维数组只要解构关系一一对应也可以进行赋值

  ```js
  let [a, [b, c, d], e] = [1, [2, 3, 4], 5]
  console.log(a, b, c, d, e);
  ```

- 练习

  ```js
  // 练习1:交换两个变量
  let a = 1;
  let b = 2;
  [b, a] = [a, b];//[1,2]
  console.log(a, b)
  
  //练习2
  let [foo = hoo, hoo = 2] = [];
  console.log(foo, hoo)
  ```

## 对象的解构赋值

- 解构不仅可以用于数组，还可以用于对象.

- 对象的解构与数组有一个重要的不同。数组的元素是按次序排列的，变量的取值由它的位置决定；而对象的属性没有次序，变量必须与属性同名，才能取到正确的值

- 对应关系是根据key不需要考虑顺序

  ```js
  //对象的解构赋值(对应关系是根据key)
  let { foo, hoo } = { foo: "hello", hoo: "word" };//key和value一样可以简写
  console.log(foo, hoo);
  
  //上边{foo,hoo}这样写法的来历
  //其实如果对象的key和value是一样的，可以简写
  let a = 1, b = 2;
  console.log({ a: a, b: b })
  console.log({ a, b })
  
  //找到foo对应的关系，然后把1赋值给c
  let { foo: c, hoo: d } = { foo: 1, hoo: 2 };
  console.log(foo, hoo);//报错
  console.log(c, d);//1,2
  ```

- 对象解构赋值可以设置默认值

  ```js
  let { x, y = 10 } = { x: 1 };
  console.log(x, y)
  ```

- 对象和数组解构可以嵌套

  ```js
  let obj = { a: 1, b: [2, 3, 4] }
  let { a, b: [b1, b2, b3] } = obj;
  console.log(a, b1, b2, b3)
  ```

- 练习

  ```js
  //练习1：如果想要获取数组的第一个和最后一个值怎么办(使用解构赋值)
  let arr = [1, 2, 3];
  // 由于数组本质是特殊的对象，因此可以对数组进行对象属性的解构
  let { 0: first, [arr.length - 1]: last } = arr;
  
  //练习2:获取log方法
  let { log } = console;
  log(1);
  ```

## 解构赋值的应用

- 函数的多个返回值获取

  ```js
  //1.接收函数的多个返回值
  function fn(){
      return [1,2,3,4];
  }
  let [a,b,c,d] = fn();
  console.log(a,b,c,d);
  
  function fn() {
      return { foo: "hello", hoo: "word" };
  }
  let { foo } = fn();
  console.log(foo);
  ```

- 函数传参数

  ```js
  //2.函数传参数
  function fn1([x,y,z]) {
      console.log(x, y, z);
  }
  fn1([1, 2, 3]);
  
  function fn2({ x, y, z }) {
      console.log(x, y, z);
  }
  fn2({ y: 2, x: 1, z: 3 });
  ```

- json数据的提取

  ```js
  //3.json数据的提取
  let json = {
      name: "lily",
      sex: "nv",
      age: 18
  }
  let { name, age, sex } = json;
  console.log(name, age, sex)
  ```

# 字符串的扩展

## 模版字符串(重要)

- 传统的 JavaScript 语言，输出模板通常要拼接字符串

  ```js
  // 原始方法做模版
  let data = {
      message: {
          title: "今天天气真的很好",
          todo: "打台球",
          time: "时间2020.3.25"
      }
  }
  let oOuter = document.getElementById("outer");
  let str = '<div class="box"><h2> ' + data.message.title + '</h2><p>' + data.message.todo + '</p><p>' + data.message.time + '</p></div> ';
  oOuter.innerHTML = str; 
  ```

- 模板字符串（template string）是增强版的字符串，用反引号（`）标识。可以嵌套变量，可以换行，可以包含单引号和双引号。

- 它可以当作普通字符串使用，也可以用来定义多行字符串。模板字符串中嵌入变量，需要将变量名写在`${}`之中。

- 大括号内部可以放入任意的 JavaScript 表达式，可以进行运算，以及引用对象属性。

  ```js
  let data = {
      message: {
          title: "今天天气真的很好",
          todo: "打台球",
          time: "时间2020.3.25",
          isLike: false
      }
  }
  let oOuter = document.getElementById("outer");
  let str = `
      <div class="box">
      <h2>${data.message.title}</h2>
      <p>${data.message.todo}</p>
      <p>${data.message.time}</p>
      <p>${data.message.isLike ? "我喜欢你" : "我不喜欢你"}</p >
      </div>
  `;
  // oOuter.appendChild(str);//Failed to execute 'appendChild' on 'Node': parameter 1 is not of type 'Node'.
  oOuter.innerHTML = str;//需要用innerHTML设置到元素中
  ```

- 模板字符串之中还能调用函数。

  ```js
  function fn(){
      return "hello";
  }
  let str = `${fn()} world`;
  console.log(str);//hello world
  ```

## 字符串新增的方法

- 去空格

  - trim():删除字符串两端的空白符
  - trimStart() 去除首部的空格
  - trimEnd() 去除尾部的空格

  ```js
  //字符串是基本类型值，一般的方法只能返回新值，而不能改变字符串
  let message = "      hello    world      ";
  log(message);
  
  log(message.trim());
  log(message.trimStart());
  log(message.trimEnd());
  ```

- 判断

  - startsWith();判断开头有没有包含某个字符串
  - endsWith();判断结尾有没有包含某个字符串
  - includes判断字符串是否包含某个字符串

  ```js
  //字符串是基本类型值，一般的方法只能返回新值，而不能改变字符串
  let message = "hello    world";
  log(message);
  
  log(message.startsWith("hello"));//true
  log(message.endsWith("world"));////true
  log(message.endsWith("ld"));//true
  log(message.includes("ld"));//true
  log(message.includes("or"));//true
  log(message.includes("你好啊"));//false
  ```

- repeat重复当前的字符串，可以规定次数

  ```js
  let message = "海静，你好s啊";
  log(message.repeat(10));
  ```

- 补充字符

  - padStart()当字符串不够某个长度的时候，在前边补充任意字符
  - padEnd(),//当字符串不够某个长度的时候，在后边补充任意字符

  ```js
  let message = "这个是密码";
  log(message.padStart(8, '#'))
  log(message.padEnd(8, '#'))
  log(message.padStart(8, '#*2222'))
  ```

# 数组扩展

## 扩展运算符

### 什么是扩展运算符

扩展运算符（spread）是三个点（`...`）。它好比 rest 参数的逆运算，将一个数组转为用逗号分隔的参数序列，目前也可以用来展开数组。

```js
let arr = [1, 2, 3];
console.log(...arr);

console.log([1,2,...[3,4,5],6]);//[1,2,3,4,5,6]
```

该运算符常常用于函数调用。

```js
//2.抓住一一对应关系
function fn(x, y, z) {
    console.log(x, y, z)
}
fn(...arr);
```

### 其他应用

- 复制数组
- 合并数组
- 解构赋值
- 字符串转换为数组

```js
// 1.复制数组：（ES5中直接复制，会产生引用关系）（ES5可以使用concat方法复制数组）
let arr2 = [1, 2, 3];
let arr3 = [...arr2];
arr3.push(4);
console.log(arr2, arr3);

//2.合并数组
let arr4 = [...arr2, ...arr3];
console.log(arr4);

//3.解构复制
//生成一个数组 (此时扩展运算符必须在最后一个)
let [a, b, ...newarr] = [1, 2, 3, 4, 5, 5, 6, 8, 9];
console.log(newarr);

//4.字符串转数组
let arr5 = [..."hello"];
console.log(arr5);
```

## 数组的新方法

### Array对象的新方法

#### Array.from(实用)

Array.from 把伪数组转换成数组(可以使用数组的方法)

```js
let oLis = document.getElementsByTagName("li");//伪数组
for (let i in oLis) {
    console.log(i)//有问题
    oLis[i].style.color = "red";
}

//伪数组使用数组的方法也不可以
oLis.forEach(function (item, index) {
    console.log(item, index)
});//oLis.forEach is not a function

//3.使用Array.from
// console.log(Array.from(oLis));
// for (let i in Array.from(oLis)) {
//     oLis[i].style.color = "red";
// }
```

#### Array.of

将一组数字转换成数组 弥补Array的不足

```js
let arr1 = Array.of(1, 2, 3, 4);
console.log(arr1);
let arr2 = Array.of(1);
console.log(arr2);
```

### Array原型上的新方法

#### copyWithin(了解)

数组实例的`copyWithin()`方法，在当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组。也就是说，使用这个方法，会修改当前数组

它接受三个参数。

- target（必需）：从该位置开始替换数据。如果为负值，表示倒数。
- start（可选）：从该位置开始读取数据，默认为 0。如果为负值，表示从末尾开始计算。
- end（可选）：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示从末尾开始计算。

```js
{
    let arr = [1, 2, 3, 4, 5, 6, 7, 8];
    arr.copyWithin(0, 4, 6);
    console.log(arr);//[5, 6, 3, 4, 5, 6, 7, 8]
}
{
    let arr = [1, 2, 3, 4, 5, 6, 7, 8];
    arr.copyWithin(0, 3);
    console.log(arr);// [4, 5, 6, 7, 8, 6, 7, 8]
}
```

#### fill(了解)

使用固定值填充数组

`fill`方法用于空数组的初始化非常方便。数组中已有的元素，会被全部抹去。

`fill`方法还可以接受第二个和第三个参数，用于指定填充的起始位置和结束位置。

```js
let arr2 = [1, 2, 3, 4, 5, 6, 7, 8];
arr2.fill("a");
console.log(arr2);

['a', 'b', 'c'].fill(7, 1, 2)
// ['a', 7, 'c']
```

#### entries()，keys() 和 values()

ES6 提供三个新的方法——`entries()`，`keys()`和`values()`——用于遍历数组。它们都返回一个遍历器对象,可以用`for...of`循环进行遍历，唯一的区别是`keys()`是对键名的遍历、`values()`是对键值的遍历，`entries()`是对键值对的遍历。

```js
//3.entries,keys,values  配合for of解构遍历数组的
//keys 是所有数组的下标
let arr3 = ["a", "b", "c", "d", "e"];
console.log(arr3.keys());//Array Iterator
for (index of arr3.keys()) {
    console.log(index);
}
//values 所有数组的值
for (item of arr3.values()) {
    console.log(item);
}
//values
for (item of arr3.entries()) {
    console.log(item);
}
```

#### find() 和 findIndex()(常用)

数组实例的`find`方法，用于找出第一个符合条件的数组成员。它的参数是一个回调函数，所有数组成员依次执行该回调函数，直到找出第一个返回值为`true`的成员，然后返回该成员。如果没有符合条件的成员，则返回`undefined`

```js
let arr4 = ["a", "b", "c", "d", "e"];
let result = arr4.find(function (item, index, arr) {
    console.log(item, index, arr)
    return typeof item == "string"
})
console.log(result);


let arr4 = [{name:"xiaowang1"},{name:"xiaowang2"},{name:"xiaowang3"}];
let result = arr4.findIndex(function (item, index, arr) {
    return typeof item.name == "xiaowang2"
})
console.log(result);
```

#### includes()(实用)

`includes`方法返回一个布尔值，表示某个数组是否包含给定的值，与字符串的`includes`方法类似

```js
let arr6 = [1, 2, 3, ["a"]];
console.log(arr6.includes(1));//true
console.log(arr6.includes(["a"]));//false
```

#### flat()

- 数组的成员有时还是数组，`Array.prototype.flat()`用于将嵌套的数组“拉平”，变成一维的数组。该方法返回一个新数组，对原数据没有影响。
- `flat()`默认只会“拉平”一层，如果想要“拉平”多层的嵌套数组，可以将`flat()`方法的参数写成一个整数，表示想要拉平的层数，默认为1
- 如果不管有多少层嵌套，都要转成一维数组，可以用`Infinity`关键字作为参数

```js
{
    //二维数组
    let arr = [1, 2, [3, 4]];
    console.log(arr.flat())
}
{
    //多维数组 想拉平 可以传入参数
    let arr = [1, 2, [3, [5, 6, 7]]];
    console.log(arr.flat(2))
}
{
    //如果不知道自己的数组有多少层  那么可以传递infinity 代表无穷大
    let arr = [1, 2, [3, [5, 6, 7]]];
    console.log(arr.flat(Infinity))
}
```

# 函数的扩展

## 函数参数默认值(重要)

### ES5默认参数

ES6 之前，不能直接为函数的参数指定默认值，只能采用变通的方法。

```js
function fn1(a, b) {
    // b = b || "world";
    if (typeof b === "undefined") {
        b = "world";
    }
    console.log(a, b);
}
fn1("hello", "");
fn1("hello");
fn1("hello", "world");

```

### ES6 默认参数

ES6 允许为函数的参数设置默认值，即直接写在参数定义的后面。

```js
function fn2(a, b = "world") {
    console.log(a, b);
}
fn2("hello", "");
fn2("hello");
```

## rest参数(剩余参数)(重要)

- ES6 引入 rest 参数（形式为`...变量名`），用于获取函数的多余参数，这样就不需要使用`arguments`对象了。rest 参数搭配的变量是一个数组，该变量将多余的参数放入数组中。
- 和普通参数混合使用的时候，需要放在参数的最后
- 函数的`length`属性，不包括 rest 参数

```js
function fn3(...arg) {
    console.log(arg);
}
fn3(1, 2, 3, 4, 5)

//和普通参数混合使用的时候，需要放在参数的最后
function fn4(a, b, ...arg) {
    console.log(a, b, arg);
}
fn4(1, 2, 3, 4, 5)
```

## 箭头函数(重要)

### 什么是箭头函数

ES6 允许使用“箭头”（`=>`）定义函数

### 箭头函数的写法

箭头函数分为以下几种情况

- 只有一个参数,可以忽略小括号 .没有参数或者多个参数的时候，参数的括号不能省略
- 函数体是一句话的时候, 可以忽略 花括号,并且自动return 这行代码
- 当函数体不是一句话的时候, 必须写{}

```js
//1. 只有一个参数 并函数体是一句话的时候（如果是返回值则可以省略return）
// let f1 = function (n) {
//     return n + 1;
// }

let f1 = n => n + 1;
console.log(f1(2))

let arr = [1, 2, 3, "a", 5, 6, 7];
let result = arr.find(item => typeof item === "string");
console.log(result);


//2.没有参数或者多个参数的时候，参数的括号不能省略
let f2 = (a, b) => a + b;
console.log(f2(1, 2));

let f3 = () => console.log("hello");
f3();

//3.当函数体不是一句话的时候
let f4 = (a, b) => {
    console.log(a);
    console.log(b);
    console.log(a + b);
    return "ok~"
}
console.log(f4(1, 2))
```

### 箭头函数的注意事项

- 关于this 箭头函数没有自己的this，箭头函数内部的this并不是调用时候指向的对象,而是定义时指向的对象

  ```js
  document.onclick = function () {
         console.log(this)//普通函数的this指向调用对象
  }
  
  document.onclick = () => {
       //定义这个箭头函数的时候，是在window环境下定义的，所以指向window
       console.log(this);
  }
  
  document.onclick = function () {
        console.log(this);
        let f = () => {
            console.log(this);
        }
        f();
  }
  
  document.onclick = () => {
        console.log(this);
        let f = () => {
            console.log(this);
        }
        f();
  }
  ```

- 箭头函数不能用于构造函数，也就是不能使用new关键字调用

  ```js
  let F2 = () => { };
  new F2();//F2 is not a constructor
  ```

- 箭头函数没有arguments对象

  ```js
  let f3 = () => {
        console.log(arguments);//arguments is not defined
  }
  f3(1, 2, 3, 4, 5)
  ```

- 箭头函数不能使用yield命令，意味着不能当作gennerator函数（后边会讲）

# Math的扩展(了解)

## 指数运算符

- 在Math中提供了 pow的方法 用来计算一个值的n次方
- es2016中提出了新的方法求一个值的n次方 那就是 ** 操作符

```js
//求 一个数字的 n次方  是一个很大的需求
console.log(Math.pow(3, 3));
console.log(Math.pow(30, 7));


//es2016 提出了新的方法求一个值的n次方  那就是 ** 操作符
console.log(3 ** 3);
console.log(30 ** 10);

//计算顺序 先计算右边  在依次计算
console.log(3 ** 3 ** 3);
```

## 进制写法

- 书写二进制数字
- ES6表示八进制方法

```js
//书写二进制数字
let n1 =  0b00001111;
console.log(n1);//15

//书写八进制
// let n2 = 017;//严格模式下报错
// console.log(n2)

// ES6表示八进制方法
let n3 = 0o17; //严格模式下也不会报错
console.log(n3)
```

## Math的新增方法

- Math.trunc()方法会将数字的小数部分去掉，只保留整数部分
- Math.sign() 判断一个数字的正数还是负数 还是0 或者是NaN
- Math.sqrt()平方根
- Math.cbrt()立方根
- Math.hypot() 求所有参数平方和的平方根

```js
const { log } = console;
/*
   Math.trunc()去除小数部分
*/
log(Math.floor(1.33));//1
log(Math.ceil(1.33));//2
log(Math.trunc(1.33));//1

log(Math.floor(-1.33));//-2
log(Math.ceil(-1.33));//-1
log(Math.trunc(-1.33));//-1

/*
   Math.sign() 判断一个数字的正数还是负数 还是0  或者是NaN
   如果说是正数 则返回1  负数返回-1  0 返回0   NaN返回NaN
*/
log(Math.sign(2.3));//1
log(Math.sign(-1.3));//-1
log(Math.sign(0));//0
log(Math.sign(NaN));//NaN
log(Math.sign(Infinity));//1

/*
    Math.sqrt()平方根
    Math.cbrt()立方根
*/
log(Math.cbrt(27));

/*
   Math.hypot() 求所有参数平方和的平方根
*/
log(Math.hypot(4, 9, 16))//Math.sqrt(4*4 + 9*9 + 16*16)
//勾股定理  a的2次方  + b的2次方  = c的2次方
// 已知直角三角形两个直角边的长度是 3 和 4  求斜边的长度
log(Math.hypot(3, 4))//5
```

## Number扩展

- Number.isFinite(i) : 判断是否是有限大的数
- Number.isNaN(i) : 判断是否是NaN
- Number.isInteger(i) : 判断是否是整数
- Number.parseInt(str) : 将字符串转换为对应的数值

# 对象的扩展(重要)

## 对象的简写

ES6 允许在大括号里面，直接写入变量和函数，作为对象的属性和方法。这样的书写更加简洁。

```js
// 1.属性的简写
let [name, age, sex] = ["xiaowang", 20, "女"];
let p1 = {
    name: name,
    age: age,
    sex: sex
}
console.log(p1);
//在es6中，对象的key和value如果相同，则可以简写
let p2 = {
    name,
    age,
    sex
}
console.log(p2);
//2.方法的简写
let p3 = {
    name,
    age,
    sex,
    do: function () {
        console.log("eat")
    }
}
p3.do();

let p4 = {
    name,
    age,
    sex,
    do() {
        console.log("eat")
    }
}
p4.do();

```

## 属性名表达式

JavaScript 定义对象的属性，有两种方法：点运算符和中括号运算符

但是，如果使用字面量方式定义对象（使用大括号），在 ES5 中只能使用标识符，而不能使用变量定义属性。

也就是说在ES5中 key/value key是固定不变的，在ES6中，支持属性表达式，支持key发生变化

```js
//在ES5中 key/value key是固定不变的
let p5 = {
    name: "laowang",
    sex: "女"
   
}

// 在ES6中，支持key发生变化
let a = "name";
let b = "sex";
let p6 = {
    [a]: "laowang",
    [b + "1"]: "nv"
}
console.log(p6)

//表达式还可以用于定义方法名
```

## 对象的扩展运算符

ES2018 将这个运算符引入了对象。

```js
let { a, b, ...c } = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: 5
}
console.log(c)
```

## 对象新增的方法(了解)

### Object.is()

判断对象是否相等 相当于===,修复NaN不等自己的问题

```js
console.log(Object.is(1, 1))
console.log(Object.is({}, {}))
console.log(Object.is(NaN, NaN))
```

### 合并方法Object.assign

```js
let obj1 = { a: 1 };
let obj2 = { b: 2 };
let obj3 = { c: 3 };
let newObj = Object.assign(obj1, obj2, obj3);
console.log(newObj)
```

# 新增数据类型(了解)

## Symbol

### 什么是Symbol

ES5 的对象属性名都是字符串，这容易造成属性名的冲突。比如，你使用了一个他人提供的对象，但又想为这个对象添加新的方法，新方法的名字就有可能与现有方法产生冲突。如果有一种机制，保证每个属性的名字都是独一无二的就好了，这样就从根本上防止属性名的冲突。这就是 ES6 引入`Symbol`的原因。

ES6 引入了一种新的原始数据类型`Symbol`，表示独一无二的值。它是 JavaScript 语言的第七种数据类型

### Symbol的使用

- Symbol 值通过`Symbol`函数生成。
- 这就是说，对象的属性名现在可以有两种类型，一种是原来就有的字符串，另一种就是新增的 Symbol 类型。凡是属性名属于 Symbol 类型，就都是独一无二的，可以保证不会与其他属性名产生冲突

```js
let s = Symbol();

typeof s
// "symbol"

let s1 = Symbol('foo');
let s2 = Symbol('bar');
s1 // Symbol(foo)
s2 // Symbol(bar)
s1.toString() // "Symbol(foo)"
s2.toString() // "Symbol(bar)"
```

### Symbol表示独一无二的值

```js
//1.之前出现的问题
/* let obj = {
      name: "lily",
      todo() {
         console.log("eat");
      }
}
//修改
obj.name = "xiaowang";
obj.todo = () => {
     console.log("someThing~")
}
console.log(obj.name);
obj.todo(); */

//需求：让新增的属性和方法不和之前的冲突
let name = Symbol("name");
let todo = Symbol("todo");
let obj = {
    name: "小王"
}
obj[name] = "老王"

console.log(obj);
console.log(obj.name)
console.log(obj[name])
```

### Symbol的注意事项

- Symbol中传入的字符串没有任何意义，只是用来描述Symbol的

  ```js
  {
      let obj1 = {
          name: "lily",//原有对象拥有name属性
          age: 18,
      }
      let name = Symbol("name");
      let age = Symbol("age");
      obj1[name] = "xiaowang";
      obj1[age] = 21;
      console.log(obj1)
  }
  ```

- Symbol不能使用New调用

  ```js
  new Symbol();//Symbol is not a constructor
  ```

- 类型转换的时候，不能转数字

  ```js
  console.log(String(Symbol("a")));//Symbol(a)
  console.log(Boolean(Symbol()));//true
  // console.log(Symbol() + 1);//Cannot convert a Symbol value to a number
  // console.log(Number(Symbol()));//Cannot convert a Symbol value to a number
  ```

- 如果把Symbol当作一个对象的属性和方法的时候，一定要用一个变量来储存，否则定义的属性和方法没有办法使用

  ```js
  {
      let obj = {
          name: "lily",//原有对象拥有name属性
          age: 18,
      }
      obj[Symbol()] = "再见";//如果直接设置，则再也获取不到这个属性了
      console.log(obj);
  
      console.log(obj[Symbol()])//undefined
  }
  ```

- for in 不能遍历出来，可以使用Object.getOwnPropertySymbols方法来拿

  ```js
  {
      let obj = {
          name: "lily",//原有对象拥有name属性
          age: 18,
      }
      let name = Symbol();
      obj[name] = "再见";//如果直接设置，则再也获取不到这个属性了
  
      for (let i in obj) {
          console.log(i);
      }
  
      //可以使用 Object.getOwnPropertySymbols方法来拿
      console.log(Object.getOwnPropertySymbols(obj));//[Symbol()]
  }
  ```

## BigInt

- JavaScript 所有数字都保存成 64 位浮点数，这给数值的表示带来了两大限制。一是数值的精度只能到 53 个二进制位（相当于 16 个十进制位），大于这个范围的整数，JavaScript 是无法精确表示的，这使得 JavaScript 不适合进行科学和金融方面的精确计算。二是大于或等于2的1024次方的数值，JavaScript 无法表示，会返回`Infinity`。

- 引入了一种新的数据类型 BigInt（大整数），来解决这个问题。BigInt 只用来表示整数，没有位数的限制，任何位数的整数都可以精确表示。

  ```js
  // 超过 53 个二进制位的数值，无法保持精度
  Math.pow(2, 53) === Math.pow(2, 53) + 1 // true
  
  // 超过 2 的 1024 次方的数值，无法表示
  Math.pow(2, 1024) // Infinity
  
  
  const a = 2172141653n;
  const b = 15346349309n;
  // BigInt 可以保持精度
  a * b // 33334444555566667777n
  
  // 普通整数无法保持精度
  Number(a) * Number(b) // 33334444555566670000
  ```

- 为了与 Number 类型区别，BigInt 类型的数据必须添加后缀`n`。

  ```js
  1234 // 普通整数
  1234n // BigInt
  
  // BigInt 的运算
  1n + 2n // 3n
  ```

- BigInt 与普通整数是两种值，它们之间并不全等。

  ```js
  42n === 42 // false
  ```

- `typeof`运算符对于 BigInt 类型的数据返回`bigint`。

# 新增数据结构

## Set

### 什么是Set

- ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。
- `Set`本身是一个构造函数，用来生成 Set 数据结构。
- `Set`函数可以接受一个数组（或者具有 iterable 接口的其他数据结构）作为参数，用来初始化

```js
let st = new Set([1, 2, 3, 4, 4, 3, 3, 1, 5]);
console.log(st);
```

### Set的属性及方法

- size 返回Set的长度
- add 添加某个值，返回 Set 结构本身。
- delete 删除某个值，返回一个布尔值，表示删除是否成功。
- has 返回一个布尔值，表示该值是否为`Set`的成员
- clear 清除所有成员，没有返回值。
- `keys()`：返回键名的遍历器,由于 Set 结构没有键名，只有键值（或者说键名和键值是同一个值），所以`keys`方法和`values`方法的行为完全一致。
- `values()`：返回键值的遍历器
- `entries()`：返回键值对的遍历器
- `forEach()`：使用回调函数遍历每个成员

```js
// 2.属性 size
console.log(st.size);

//3.添加 add
st.add(4);
st.add(10);
st.add("hoo");
console.log(st);

//4.删除
st.delete(2);
console.log(st);

//5.判断是否存在某个元素
console.log(st.has(10));
console.log(st.has(11));

//6.清空所有的
// st.clear();
// console.log(st);

//7.和循环遍历相关的方法  keys方法和valus方法行为是一致的
let st2 = new Set(["a", "b", "c", "d"]);
console.log(st2.keys())//"a","b","c","d"
console.log(st2.values())//"a","b","c","d"

for (let a of st2) {
    console.log(a); //"a", "b", "c", "d"
}

//8.entries() 获得键值对
console.log(st2.entries());
for (let b of st2.entries()) {
    console.log(b)
}

//9.forEach
st2.forEach((item, index, s) => {
    console.log(item, index, s)
})
```

### Set的其他使用(实用)

```js
// 去除数组的重复成员
[...new Set(array)]

//上面的方法也可以用于，去除字符串里面的重复字符
[...new Set('ababbc')].join('')
// "abc"
```

## Map

### 什么是Map

- JavaScript 的对象（Object），本质上是键值对的集合（Hash 结构），但是传统上只能用字符串当作键。这给它的使用带来了很大的限制。
- 为了解决这个问题，ES6 提供了 Map 数据结构。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。也就是说，Object 结构提供了“字符串—值”的对应，Map 结构提供了“值—值”的对应，是一种更完善的 Hash 结构实现。如果你需要“键值对”的数据结构，Map 比 Object 更合适。

```js
 //为什么会有Map，因为对象属性名称必须是字符串，如果是其他类型则不行
let p1 = { name: "lily" };
let obj1 = {
    id: 1,
    [p1]: "good"
}
console.log(obj1)

// Map也是新增的数据结构  类似于对象
let mp1 = new Map([
    ["a", 1],
    ["b", 2],
])
console.log(mp1)



let p2 = { name: "lily" };
let mp2 = new Map([
    ["a", 1],
    [p2, 2],
])
console.log(mp2)
```

### Map的属性和方法

- `size`属性返回 Map 结构的成员总数。
- `set`方法设置键名`key`对应的键值为`value`，然后返回整个 Map 结构。如果`key`已经有值，则键值会被更新，否则就新生成该键。`set`方法返回的是当前的`Map`对象，因此可以采用链式写法。
- `get`方法读取`key`对应的键值，如果找不到`key`，返回`undefined`。
- `has`方法返回一个布尔值，表示某个键是否在当前 Map 对象之中。
- `delete`方法删除某个键，返回`true`。如果删除失败，返回`false`。
- `clear`方法清除所有成员，没有返回值。
- `keys()`：返回键名的遍历器。
- `values()`：返回键值的遍历器。
- `entries()`：返回所有成员的遍历器。
- `forEach()`：遍历 Map 的所有成员。

# iterator(迭代器)(了解)

## 什么是iterator

- JavaScript 原有的表示“集合”的数据结构，主要是数组（`Array`）和对象（`Object`），ES6 又添加了`Map`和`Set`。这样就有了四种数据集合，用户还可以组合使用它们，定义自己的数据结构，比如数组的成员是`Map`，`Map`的成员是对象。这样就需要一种统一的接口机制，来处理所有不同的数据结构。
- 遍历器（Iterator）就是这样一种机制。它是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署 Iterator 接口，就可以完成遍历操作（即依次处理该数据结构的所有成员）。
- Iterator 的作用有三个：一是为各种数据结构，提供一个统一的、简便的访问接口；二是使得数据结构的成员能够按某种次序排列；三是 ES6 创造了一种新的遍历命令`for...of`循环，Iterator 接口主要供`for...of`消费。

```js
let arr = [1, 2, 3];
function Iterator() {
    //用一个计数器，保存现在处理到哪里了
    let index = 0;
    return {
        next: () => {
            if (index < arr.length) {
                return {
                    value: arr[index++],
                    done: false
                }
            } else {
                return {
                    done: true
                }
            }
        }
    }
}

//只要调用这个Iterator接口，就可以依次处理成员了
let it = Iterator(arr);
console.log(it);
console.log(it.next().value);
console.log(it.next().value);
console.log(it.next().value);
```

## iterator的使用

- 一种数据结构只要部署了Iterator接口，我们就称这种数据结构是可以迭代的
- 在ES6中，只要数据结构具有了Symbol.iterator属性，那么就认为是可以迭代的
- 在ES6中，很多数据结构都部署了iterator接口(Array,set,Map,string)
- 应用场景：
  - 解构赋值的时候默认调用iterator接口
  - 扩展运算符使用的时候也默认调用iterator接口
  - for of 使用的是iterator接口
  - 对象是没有部署Iterator接口

```js
let arr = [1, 2, 3, 4, 5];
//arr[Symbol.iterator] 就是一个函数块
console.log(arr[Symbol.iterator])
console.dir(arr[Symbol.iterator])

let it = arr[Symbol.iterator]();
//可以看出arr拥有Iterator接口  那我们手动调用它
console.log(it)
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());


let str = "abc";
let it2 = str[Symbol.iterator]();
console.log(it2.next());
console.log(it2.next());
console.log(it2.next());
console.log(it2.next());
```

## for...of

- ES6 借鉴 C++、Java、C# 和 Python 语言，引入了`for...of`循环，作为遍历所有数据结构的统一的方法。
- 一个数据结构只要部署了`Symbol.iterator`属性，就被视为具有 iterator 接口，就可以用`for...of`循环遍历它的成员。也就是说，`for...of`循环内部调用的是数据结构的`Symbol.iterator`方法。
- `for...of`循环可以使用的范围包括数组、Set 和 Map 结构、某些类似数组的对象（比如`arguments`对象、DOM NodeList 对象）、后文的 Generator 对象，以及字符串。

```js
let arr = ["a", "b", "c", "d"];
for (let i of arr) {//for of 得到的是值
    console.log(i)//a b c d
}
for (let i in arr) {//for in得到的是键名
    console.log(i);//0 1 2 3 
}

let str = "abcde";
for (let i of str) {
    console.log(i);
}

//obj is not iterable  对象没有部署iterator  没办法迭代 
let obj = {
    name: "lily"
}
for (let i of obj) {
    console.log(i)
}
```

### for..of 和 for..in

- JavaScript 原有的`for...in`循环，只能获得对象的键名，不能直接获取键值。ES6 提供`for...of`循环，允许遍历获得键值,如果要通过`for...of`循环，获取数组的索引，可以借助数组实例的`entries`方法和`keys`方法
- `for...of`循环调用遍历器接口，数组的遍历器接口只返回具有数字索引的属性。这一点跟`for...in`循环也不一样

# Generator(生成器)(了解)

## 什么是Generator

- Generator 函数是 ES6 提供的一种异步编程解决方案，内部封装了很多的状态，被称作状态机 生成器
- 执行Generator会返回一个迭代器对象（iterator），使用iterator来遍历出Generator内部的状态
- 形式上，Generator 函数是一个普通函数，但是有两个特征。一是，`function`关键字与函数名之间有一个星号；二是，函数体内部使用`yield`表达式，定义不同的内部状态（`yield`在英语里的意思就是“产出”）

```js
//定义的时候和普通函数定义不一样，使用yeild关键字在内部定义各种状态
function* gen() {
    yield "状态1";
    yield "状态2";
    yield "状态3";
    yield "状态4";
}

// 调用了generator后返回的是迭代器对象
// 在generator函数中，遇到yield就会停止
let it = gen();
console.log(it);
console.log(it.next());
```

## Generator的注意事项

- generator代码内部不会马上执行，需要调用next方法的时候才会执行

- yield语句返回结果通常为undefined， 当调用next方法时传参内容会作为启动时yield语句的返回值。

- 调用了generator后返回的是迭代器对象，在generator函数中，遇到yield就会停止，直到运行next

- 可以使用for of执行gen

- 对象没有Iterator接口，可以手动部署一个

  ```js
  var myIterable = {}
        myIterable[Symbol.iterator] = function* () {
            yield 1
            yield 2
            yield 3
        }
       
  for (let prop of myIterable) {
      console.log(prop)
  }
  ```

  

## Generator的练习

```html
<button id="btn">点击抽奖</button>
<script>
    let oBtn = document.getElementById("btn");
    let start = gen();
    oBtn.onclick = function () {
        start.next();
    }
    function draw(count) {
        alert("还剩" + (count - 1) + "次机会")
    }
    function* gen(count) {
        //..
        yield draw(5);
        //..
        yield draw(4);
        //..
        yield draw(3);
        //..
        yield draw(2);
        //..
        yield draw(1);
        
        return "";

    }
</script>
/*
  需求：请求a数据，再请求b数据，请求c数据
*/

function* fn() {
    yield setTimeout(() => {
        console.log("a数据成功了");
        iteratorObj.next(); // 执行下一段代码
    }, 1000);

    yield setTimeout(() => {
        console.log("b数据成功了");
        iteratorObj.next(); // 执行下一段代码
    }, 2000);

    yield setTimeout(() => {
        console.log("c数据成功了");
        iteratorObj.next(); // 执行下一段代码
    }, 3000);

    console.log('全部数据请求回来~');
}

const iteratorObj = fn();
iteratorObj.next();
```

## async和await(语法糖)

async 用于申明一个 function 是异步的，而 await 用于等待一个异步方法执行完成

### async

- async函数(源自ES2017 - ES8),真正意义上去解决异步回调的问题，同步流程表达异步操作,是 Generator的语法糖

- 语法：

  async function foo(){

   await 异步操作;

   await 异步操作；

  }

- async 函数会返回一个 Promise 对象，如果在函数中 `return` 一个直接量，async 会把这个直接量通过`Promise.resolve()` 封装成 Promise 对象。

```js
async function fn() {
    console.log("fn函数执行了");
    return 333;
}
```

### await

- async取代Generator函数的星号*，await取代Generator的yield

- 不需要像Generator去调用next方法，遇到await等待，当前的异步操作完成就往下执行

- `await` 是个运算符，用于组成表达式，await 表达式的运算结果取决于它等的东西

  - 如果它等到的不是一个 Promise 对象，那 await 表达式的运算结果就是它等到的东西
  - 如果它等到的是一个 Promise 对象，await 就忙起来了，它会阻塞后面的代码，等着 Promise 对象 resolve，然后得到 resolve 的值，作为 await 表达式的运算结果。
  - 如果promise执行结果为reject，则await无返回值,退出当前的async函数

- await会等promise对象状态发生变化，如果是pending状态，就一直等，如果是resolved状态，就会自动执行下面代码，如果是rejected状态，就会退出当前async函数

- 执行async函数，返回值是一个promise对象：

  promise对象状态：

  如果async函数内部出错了（1. 正常报错 2. 内部promise对象是失败状态），promise对象就会变成失败状态

  如果async函数所有代码全部执行完了，才会变成成功状态

```js
async function fn() {
    console.log("fn函数执行了");
    await 123//不等
    await setTimeout(() => {//不等
        console.log(222);
    }, 1000)
}
async function fn(){
    console.log("333");
    const re2 = await new Promise((resolve,reject) => {
        setTimeout(function(){
            console.log(222);
            reject("heng")
        },2000)
    })
    console.log(111);
    console.log(re2);
    return "hello";//返回成功结果值
}
const re = fn();
re.catch((error)=>{console.log(error)})//解决await的reject状态报错
re.then((data)=>{console.log(data)})//data是成功结果 函数返回值
console.log(re);
```

- 练习：请求a数据，请求成功在请求b数据

  ```js
  async function fn() {
          await new Promise((resolve) => {
            setTimeout(() => {
              console.log('a异步操作完成')
              resolve()
            }, 1000)
          })
          console.log(2)
          await new Promise((resolve) => {
            setTimeout(() => {
              console.log('b异步操作完成')
              resolve()
            }, 1000)
          })
        }
  fn()
  console.log(1)
  
  
  // 上面的代码,执行的效果类似于下面的代码: 
  function* fn() {
      yield setTimeout(() => {
          console.log('a异步操作完成')
          it.next()
      }, 1000)
      console.log(2)
      yield setTimeout(() => {
          console.log('b异步操作完成')
          it.next()
      }, 1000)
  }
  let it = fn()
  it.next()
  console.log(1)
  ```

# class(重要)

## 类的由来

- JavaScript 语言中，生成实例对象的传统方法是通过构造函数

  ```js
  function Person(name, age) {
      this.name = name;
      this.age = age;
  }
  Person.prototype = {
      course: "html5",
      do() {
          console.log("study");
      }
  }
  let p1 = new Person("lily", 18);
  console.log(p1.name)
  console.log(p1.course)
  p1.do();
  ```

- 上面这种写法跟传统的面向对象语言（比如 C++ 和 Java）差异很大，很容易让新学习这门语言的程序员感到困惑。

- ES6 提供了更接近传统语言的写法，引入了 Class（类）这个概念，作为对象的模板。通过`class`关键字，可以定义类。

- 基本上，ES6 的`class`可以看作只是一个语法糖，它的绝大部分功能，ES5 都可以做到，新的`class`写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已。

- `constructor`方法是类的默认方法，通过`new`命令生成对象实例时，自动调用该方法。一个类必须有`constructor`方法，如果没有显式定义，一个空的`constructor`方法会被默认添加。

- 构造函数的静态的方法或属性 直接用构造函数调用 使用static定义 ,如果不加static 则声明的属性和方法是构造器的

```js
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    score = 100;//最终还是实例构造了
    do() {
        console.log("study");
    }
}
Person.prototype.course = "html5";
//当Person被new的时候，constructor就会被执行
let p1 = new Person("lily", 18);
console.log(p1.__proto__)
console.log(p1.name)
console.log(p1.course)
p1.do(); 
```

## 类的继承

- 在ES5中，我们通常这么写

  ```js
  function Person(name, age) {
      this.name = name;
      this.age = age;
  }
  Person.prototype = {
      do() {
          console.log("study");
      }
  }
  function Child(name, age, gender) {
      Person.call(this, name, age, gender)
  }
  
  let cat1 = new Child("小王", 19, "male");
  console.log(cat1.name);
  
  
  //对象的继承
  function extend(obj1, obj2) {
      for (let attr in obj2) {
          obj1[attr] = obj2[attr];
      }
  }
  ```

- Class 可以通过`extends`关键字实现继承，这比 ES5 的通过修改原型链实现继承，要清晰和方便很多

- ES6中继承的子类中，如果使用构造函数constructor()那么就必须使用super()方法初始化，这样下面才可以调用this关键字。super()只能用在子类的构造函数之中，用在其他地方就会报错,这是因为子类自己的this对象，必须先通过父类的构造函数完成塑造，得到与父类同样的实例属性和方法，然后再对其进行加工，加上子类自己的实例属性和方法。

- 如果不调用super方法，子类就得不到this对象。

```js
 //class 是一个定义类的关键字(是书写面向对象的语法糖，一种新语法 )
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    do() {
        console.log("study");
    }
}
class Child extends Person {
    constructor(name, age, gender) {
        //ES6中继承的子类中，如果使用构造函数constructor()那么就必须使用super()方法初始化，这样下面才可以调用this关键字。
        //super()只能用在子类的构造函数之中，用在其他地方就会报错
        // 这是因为子类自己的this对象，必须先通过父类的构造函数完成塑造，得到与父类同样的实例属性和方法，然后再对其进行加工，加上子类自己的实例属性和方法。如果不调用super方法，子类就得不到this对象。
        super(name, age);
        this.gender = gender;
    }
}
```

# Promise基础(非常重要)

## Promise功能

- 回调函数嵌套回调函数被称作**回调地狱**，代码层层嵌套，环环相扣，很明显，逻辑稍微复杂一些，这样的程序就会变得难以维护。代码臃肿，可读性差，耦合度过高。
- 对于这种情况，程序员们想了很多解决方案（比如将代码模块化），但流程控制上，还是大量嵌套。
- ES2015的标准里，Promise的标准化，一定程度上解决了JavaScript的流程操作问题。Promise对象时一个异步变成的解决方案，**可以将异步操作以同步的流程表达出来, 避免了层层嵌套的回调函数(俗称'回调地狱')**

```js
setTimeout(() => {
    console.log("a数据请求回来了~");
    setTimeout(() => {
        console.log("b数据请求回来了~");
        setTimeout(() => {
            console.log("c数据请求回来了~");
        }, 3000);
    }, 2000);
}, 1000);
```

## Promise入门

- `Promise`是一个构造函数，自己身上有`all`、`reject`、`resolve`这几个眼熟的方法，原型上有`then`、`catch`等同样很眼熟的方法

- `Promise`的构造函数接收一个参数，是函数，并且传入两个参数：`resolve`，`reject`，分别表示异步操作执行成功后的回调函数和异步操作执行失败后的回调函数。

- `Promise`对象有三种状态：代表异步执行的状态,对象的状态只能改变一次

  - pending 初始化状态（异步代码还在执行中）

    ```js
    const promise = new Promise((resolve, reject) => {
        // 同步调用
        //....code
        
        // 执行异步操作/异步代码
        setTimeout(() => {
            console.log("setTimeout()");
        }, 1000);
    });
    console.log(promise)
    ```

  - resolved / fulfilled 成功状态（异步代码执行成功了），调用resolve函数，可以将promise对象的状态由pending变成resolved

    ```js
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("setTimeout()");
            resolve('a数据');
        }, 1000);
    });
    console.log(promise)
    ```

  - rejected 失败状态（异步代码执行失败了），调用reject函数，可以将promise对象的状态由pending变成rejected

    ```js
    const promise = new Promise((resolve, reject) => {
        // 执行异步操作/异步代码
        setTimeout(() => {
            console.log("setTimeout()");
            reject("失败了~");
        }, 1000);
    });
    console.log(promise)
    ```

- Promise的同步异步状态

  `new Promise()`函数是同步执行的

  ```js
  console.log(111)
  const promise = new Promise((resolve, reject) => {
      console.log(222)
      // 同步调用
      //...code
      // 执行异步操作/异步代码
      setTimeout(() => {
          console.log(333)
          console.log("setTimeout()");
          resolve('a数据');
      }, 1000);
      console.log(444)
  });
  console.log(555)
  console.log(promise)
  ```

## Promise的then和catch方法

- `Promise.prototype.then` 捕获promise成功的状态，执行成功的回调

  ```js
  const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
          console.log("setTimeout()");
          // console.log(333);
          // resolve('a数据');
          reject("失败了~");
      }, 1000);
  });
  promise.then(
      (result) => { // 成功的回调
          // 当promise对象的状态变成resolved，就会执行当前函数
          // console.log("resolved 111");
          console.log(result);
      },
      (error) => { // 失败的回调
          // 当promise对象的状态变成rejected，就会执行当前函数
          // console.log("rejected 111");
          console.log(error);
      }
  );
  ```

- `Promise.prototype.catch` 捕获promise失败的状态，执行失败的回调

  ```js
  const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
          console.log("setTimeout()");
          // console.log(333);
          // resolve('a数据');
          reject("失败了~");
      }, 1000);
  });
  //链式调用
  promise.then(
      (result) => { // 成功的回调
          // 当promise对象的状态变成resolved，就会执行当前函数
          // console.log("resolved 111");
          console.log(result);
      },
  ).catch(
      (error) => { // 失败的回调
          // 当promise对象的状态变成rejected，就会执行当前函数
          // console.log("rejected 111");
          console.log(error);
      }
  )
  ```

- then / catch 方法返回值是一个新的promise对象

  - 新promise对象默认是成功状态
  - 如果 then / catch 接受的函数返回值是一个promise对象，那么 then / catch 方法返回值的promise就是这个promise对象
  - 如果没有返回 promise对象，就会新建一个默认成功状态promise
  - 内部如果报错了，返回一个失败状态的promise

  ```js
  const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
          console.log("setTimeout()");
          // console.log(333);
          resolve('a数据');
          // reject("失败了~");
      }, 1000);
  });
  promise.then(
      (result) => { // 成功的回调
          // 当promise对象的状态变成resolved，就会执行当前函数
          // console.log("resolved 111");
          console.log(result);
          return "then";
      },
  ).catch(
      (error) => { // 失败的回调
          // 当promise对象的状态变成rejected，就会执行当前函数
          // console.log("rejected 111");
          console.log(error);
      }
  ).
  then(
      (result) => {
          console.log(111);
          console.log(result)
      },
  ).catch(
      () => {
          console.log(222);
      }
  )
  ```

## Promise 练习

- 题目1

  ```js
  console.log(111);
  
  const promise = new Promise((resolve, reject) => {
      reject();
      console.log(222);
  });
  
  promise
      .then(() => {
      console.log(333);
      return new Promise((resolve) => {
          reject();
      });
  })
      .catch(() => {
      console.log(444);
  })
      .then(() => {
      console.log(555);
      return new Promise((reject, resolve) => {
          reject();
          // resolve();
      });
  })
      .catch(() => {
      console.log(666);
      throw new Error("报错了~");
  })
      .then(() => {
      console.log(777);
      throw new Error("报错了~");
  })
      .then(() => console.log(888))
      .then(() => console.log(999))
      .catch(() => console.log(101010));
  
  console.log(111111);
  ```

- 练习2

  ```js
  /*
    需求：setTimeout模拟发送请求
    请求a数据，请求成功在请求b数据，请求成功在请求c数据
  */
  
  const promise = new Promise((resolve, reject) => {
      // 执行异步代码，请求a数据
      setTimeout(() => {
          console.log("a数据ok");
          resolve();
      }, 1000);
  });
  
  promise.then(() => {
      // 请求b数据
      return new Promise((resolve, reject) => {
          setTimeout(() => {
              console.log("b数据ok");
              resolve();
          }, 2000);
      });
  }).then(() => {
      // 请求c数据
      return new Promise((resolve, reject) => {
          setTimeout(() => {
              console.log("c数据ok");
              resolve();
          }, 3000);
      });
  }).then(() => {
      console.log('所有数据都请求完毕了~');
  })
  
  ```

- 练习3

  ```js
  /*
    需求： 同时请求三个数据，全部请求成功了，才OK，只要有一个失败，就失败
  */
  
  /*
  const promise = new Promise((resolve, reject) => {
      let successNum = 0;
  
      setTimeout(() => {
          console.log("a数据ok");
          reject();
          successNum++;
          if (successNum === 3) {
              resolve();
          }
      }, 1000);
  
      setTimeout(() => {
          console.log("b数据ok");
          successNum++;
          if (successNum === 3) {
              resolve();
          }
      }, 2000);
  
      setTimeout(() => {
          console.log("c数据ok");
          successNum++;
          if (successNum === 3) {
              resolve();
          }
      }, 3000);
  });
  
  promise
      .then(() => console.log("全部成功了~"))
      .catch(() => console.log("失败了~")); 
  */
      
  const promise1 = new Promise((resolve, reject) => {
      setTimeout(() => {
          console.log("a数据ok");
          resolve();
      }, 1000);
  });
  
  const promise2 = new Promise((resolve, reject) => {
      setTimeout(() => {
          console.log("b数据ok");
          reject();
      }, 2000);
  });
  
  const promise3 = new Promise((resolve, reject) => {
      setTimeout(() => {
          console.log("c数据ok");
          resolve();
      }, 3000);
  });
  
  const promise = Promise.all([promise1, promise2, promise3]);
  
  promise
      .then(() => console.log("全部成功了~"))
      .catch(() => console.log("失败了~"));
  
  ```

## Promise的then和catch方法

promise变成成功/失败都触发，pending不触发

```js
const promise = new Promise((resolve, reject) => {
    // resolve(111);
    // reject(222);
});
// promise变成成功/失败都触发，pending不触发
promise.finally(() => {
    console.log("finally()");
});
```

## 其他Promise方法

- Promise.all([promise1, ...]) 传入n个promise对象，只有n个promise对象的状态都成功，才成功，只要有一个失败，就失败
- Promise.resolve() 返回一个成功状态promise对象
- Promise.reject() 返回一个失败状态promise对象
- Promise.allSettled([promise1, ...])传入n个promise对象，等n个promise对象状态全部发生变化，得到所有结果值

# 动态import

- `import`函数的参数，指定所要加载的模块的位置。
- `import`命令能够接受什么参数，`import()`函数就能接受什么参数，两者区别主要是后者为动态加载
- `import()`返回一个 Promise 对象。
- 它是运行时执行，也就是说，什么时候运行到这一句，就会加载指定的模块

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Title</title>
  </head>
  <body>
    <button id="btn">按钮</button>
    <script type="text/javascript">
      document.getElementById("btn").onclick = function () {
        import("./a.js")
          .then(() => {
            console.log(111);
          })
          .catch(() => {
            console.log(222);
          });
      };
    </script>
  </body>
</html>
//a.js
console.log('a.js执行了~');
```