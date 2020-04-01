# 电影票预定

```html
<!-- 选择器 -->
<select id="">
	<option value=""></option>
</select>
```

```css
/* 同类选择器:nth-child,nth-last-child*/
:nth-child(2) /*第二个*/
:nth-last-child(2) /*倒数第二个*/

/* 反向选择 */
:not(.occupied) /* 不包含occipied的类 */

/* 3D效果 */
perspective: 1000px; /* 3D视距*/
transform: rotateX(-45deg); /* X轴旋转*/
```

```js
// 本地永久存储
localStorage.getItem(key)
localStorage.setItem(key,string)

// 关于点击事件
dom.onclick = (e) => {
	e.target // 可直接获取到被点击的子元素
}

// dom类切换
dom.classList.toggle(name) // 包含name则去掉，不包含则添加

// 通过展开运算符将类数组转化成数组
const selectedSeats = document.querySelectorAll('.row .seat.selected')//类数组
const seats = [...selectedSeats] //数组

// 下拉框改变事件
select.onchange = (e) => {
	e.target.selectedIndex //选中的下标
	+e.target.value //选中的value值，+号是字符串转数字的隐式转化
}
select.selectedIndex = number //手动切换下拉框选中值，不会触发onchange
```