# 歌词搜索

```css
/* header内容的层级 */
header *{
	z-index: 1;
}
```
```js
// 跨域地址
const cors = 'https://cors-anywhere.herokuapp.com/'
// 接口地址
const apiUrl = "https://api.lyrics.ovh"
// 搜索接口
"https://api.lyrics.ovh/suggest/" + (artist/title)
// 歌词接口
"https://api.lyrics.ovh/v1/artist/title"

// 歌词换行
const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g,'<br>')

// 事件代理
父级.onclick = (e) => {
	e.target //子级元素
}

// 获取标签data
<p name="11"></p>
dom.getAttribute("name") //11


```