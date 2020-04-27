# 记账本

```js
// 创建一个标签的方法
const html = 
`
	<li class="${className}">
		${transaction.name}
		<span>${sign}${Math.abs(transaction.amount)}</span>
		<button class="delete-btn" onclick="deleteRecord(${transaction.id})">×</button>
	</li>
`
let dom = document.createElement("div")
dom.innerHTML = html
dom = dom.children[0]
```