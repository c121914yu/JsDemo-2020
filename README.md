# 折叠侧边栏

```js
// 判断点击dom外
window.onclick = (e) => {
	e.target == modal ? modal.classList.remove('show-modal') : ''
}
```