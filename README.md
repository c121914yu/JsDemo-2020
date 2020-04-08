# DOM方法

1. 货币转化表达式
2. sort排序
3. reduce求和

```js
// 货币转化表达式
money.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")

//sort，返回值>0时会交换a,b.会修改原数组
// 可以理解为冒泡排序，后者大就向前移动
arr.sort((a,b) => {
	return b - a//按降序
})

// reduce求和
/*
	sum : 和（最终返回的值）
	num : 数组的值
	init : 初始值
*/
arr.reduce((sum,num) => {
	return sum += num
},init)
```