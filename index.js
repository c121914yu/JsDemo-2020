// dom
const form = document.getElementById("form")
const searchText = document.getElementById("search")
const searchBtn = document.getElementById("search-btn")
const result = document.getElementById("result")
const more = document.getElementById("more")

const apiUrl = "https://api.lyrics.ovh"

form.onsubmit = (e) => {
	e.preventDefault()
	const searchTerm = searchText.value.trim()
	if(!searchTerm){
		alert("内容为空")
		return
	}
	
	searchSong(searchTerm)
}
// 事件代理
result.onclick = (e) => {
	const dom = e.target
	if(dom.tagName != "BUTTON") return
	const artist = dom.getAttribute("data-artist")
	const songTitle = dom.getAttribute("data-songtitle")
	getLyrics(artist,songTitle)
}

// 搜索歌词
async function searchSong(term){
	const res = await fetch(`${apiUrl}/suggest/${term}`)
	const data = await res.json()
	showData(data)
}
// 获取更多
async function getMoreSongs(url){
	const cors = 'https://cors-anywhere.herokuapp.com/'
	const res = await fetch(cors + url)
	const data = await res.json()
	showData(data)
}
// 获取歌词
async function getLyrics(artist,title){
	const url = `${apiUrl}/v1/${artist}/${title}`
	console.log(url)
	const res = await fetch(url)
	const data = await res.json()
	const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g,'<br>')
	result.innerHTML = 
	`
		<h2><strong>${artist}</strong> - ${title}</h2>
		<span>${lyrics}</span>
	`
	more.innerHTML = ''
}

// 显示歌词信息dom
function showData(data){
	// 方法1
	// let output = ''
	// data.data.forEach(song => {
	// 	output += `
	// 		<li>
	// 			<span><strong>${song.artist.name}</strong> - ${song.title}</span>
	// 			<button 
	// 				class="btn"
	// 				data-artist="${song.artist.name}"
	// 				data-songtitle="${song.title}"
	// 			>
	// 				歌词
	// 			</button>
	// 		</li>
	// 	`
	// })
	// result.innerHTML = 
	// `
	// 	<ul class="song">${output}</ul>
	// `
	
	// 方法2
	result.innerHTML = 
	`
		<ul class="song">
			${data.data.map(song => 
			`
					<li>
						<span><strong>${song.artist.name}</strong> - ${song.title}</span>
						<button 
							class="btn"
							data-artist="${song.artist.name}"
							data-songtitle="${song.title}"
						>
							歌词
						</button>
					</li>
			`).join("")}
		</ul>
	`
	if(data.data.length === 0)
		result.innerHTML = '<p>无数据</p>'
	
	if(data.prev || data.next){
		more.innerHTML = 
		`
			${data.prev ? `<button class="btn" onclick="getMoreSongs('${data.prev}')">上一页</button>` : ''}
			${data.next ? `<button class="btn" onclick="getMoreSongs('${data.next}')">下一页</button>` : ''}
		`
	}
	else
		more.innerHTML = ""
}