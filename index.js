const postContainer = document.getElementById("posts-container")
const loading = document.querySelector(".loader")
const filter = document.getElementById("filter")

const url = "http://jsonplaceholder.typicode.com/posts"

let limit = 5 //每次请求5条
let page = 1 //第n页
var scrolled = true

async function getPosts(){
	const res = await fetch(`${url}?_limit=${limit}&_page=${page}`)
	const data = await res.json()
	return data
}

async function showPosts(){
	scrolled = false
	loading.classList.add('show')
	const posts = await getPosts()
	posts.forEach(post => {
		const postEl = document.createElement("div")
		postEl.classList.add("post")
		postEl.innerHTML = 
		`
			<div class="number">${post.id}</div>
			<div class="post-info">
				<h2 class="post-title">${post.title}</h2>
				<p class="post-body">${post.body}</p>
			</div>
		`
		postContainer.appendChild(postEl)
	})
	loading.classList.remove('show')
	scrolled = true
}

showPosts()

window.onscroll = () => {
	if(!scrolled) return
	const {scrollTop,scrollHeight,clientHeight} = document.documentElement
	if(scrollTop + clientHeight >= scrollHeight-5){
		page++
		showPosts()
	}
}

// 监听输入
filter.oninput = (e) => {
	// 全部转大写，且忽略空格
	const val = e.target.value.toUpperCase().replace(/\s/g,"")
	const posts = postContainer.querySelectorAll(".post")
	posts.forEach(post => {
		const title = post.querySelector(".post-title").innerText.toUpperCase().replace(/\s/g,"")
		const body = post.querySelector(".post-body").innerText.toUpperCase().replace(/\s/g,"")
		if(title.indexOf(val) > -1 || body.indexOf(val) > -1)
			post.style.display = "block"
		else
			post.style.display = "none"
	})
}