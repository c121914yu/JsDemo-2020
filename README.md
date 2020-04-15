# SVG 矢量图

|        | 优点                                     | 缺点                 |
| ------ | ---------------------------------------- | -------------------- |
| svg    | 不依赖像素，放大后不失真，可直接绑定 dom | 动画性能低           |
| canvas | 定制型强，动画效果好                     | 依赖像素，绘制较复杂 |

```html
<svg height="250" width="200" class="figure-container">
	<!-- 起点坐标，终点坐标 -->
	<line x1="60" y1="20" x2="140" y2="20" />
	<!-- 圆心坐标，半径 -->
	<circle cx="140" cy="70" r="20" />
</svg>
```

```css
/* svg */
/* 填充 */
fill: transparent;
/* 边框 */
stroke: #fff;
/* 线宽度 */
stroke-width: 4px;
/* 边缘效果 */
stroke-linecap: round;
```

```js
// 判断arr是否包含item
arr.include(item)
// 键盘事件
e.key // 获取输入的键名
e.keyCode // 键值（数字）
```
