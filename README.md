# 滚动懒加载


```js
// 可视界面顶部距离body顶部距离
document.documentElement.scrollTop
// body所有元素的总高度
document.documentElement.scrollHeight
// 界面可视高度
document.documentElement.clientHeight

// 判断滚动到底部条件
scrollTop + clientHeight >= scrollHeight-5


// 筛选文章方式
// 获取输入的值，全部转大写，去掉所有空格
const val = e.target.value.toUpperCase().replace(/\s/g,"")
// 需要匹配的文本做同样处理
const title = post.querySelector(".post-title").innerText.toUpperCase().replace(/\s/g,"")
const body = post.querySelector(".post-body").innerText.toUpperCase().replace(/\s/g,"")
// 判断是否包含输入的内容
if(title.indexOf(val) > -1 || body.indexOf(val) > -1)
```