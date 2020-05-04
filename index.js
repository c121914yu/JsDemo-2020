const card = document.querySelector(".card")
const cardFont = card.querySelector(".card-front")
const cardBack = card.querySelector(".card-back")
const history = document.querySelector(".history")

var words
var wordIndex = 0

var synth = window.speechSynthesis
var voices

// 初始化speedAPi
function getVoices(){
	voices = synth.getVoices()
	console.log(voices)
	if(voices.length > 0)
		getWords()
}
getVoices()
if(synth.onvoiceschanged !== undefined)
  synth.onvoiceschanged = getVoices
	
// 获取英文单词
function getWords(){
	let temp = localStorage.getItem("words")
	if(temp){
		randomWords(JSON.parse(temp))
		updateContainer()
	}
	else
	fetch("./word.json")
	.then(res => res.json())
	.then(data => {
		randomWords(data)
		localStort()
		updateContainer()
	})
	
	function randomWords(val){
		words = val
		words.sort(() => {
			return Math.random() - Math.random()
		})
	}
}

// 切换单词
function changeWord(index){
	wordIndex += index
	if(wordIndex < 0)
		wordIndex = words.length-1
	else if(wordIndex === words.length)
		wordIndex = 0
	// 清空正在播放的单词
	synth.cancel()
	updateContainer()
}

// 生/熟词切换
function signWord(){
	words[wordIndex].remenber = !words[wordIndex].remenber
	if(words[wordIndex].remenber){
		history.innerText = "熟词"
		history.classList.add("remenber")
	}
	else{
		history.innerText = "生词"
		history.classList.remove("remenber")
	}
	localStort()
}

// 本地存储
function localStort(){
	localStorage.setItem("words",JSON.stringify(words))
}

function updateContainer(){
	const word = words[wordIndex]
	cardFont.innerHTML = 
	`
		<p>${word.word}</p>
		<p>
			${word.voice}
			<i class="fa fa-volume-down" onclick="speakWord('${word.word}')"></i>
		</p>
	`
	cardBack.innerHTML = 
	`
		<p>${word.translate}</p>
	`
	if(word.remenber){
		history.innerText = "熟词"
		history.classList.add("remenber")
	}
	else{
		history.innerText = "生词"
		history.classList.remove("remenber")
	}
	speakWord(word.word)
}

// 播放单词
function speakWord(word){
	if(voices.length === 0){
		alert("你的浏览器不支持语言播放")
		return
	}
	let speakText = new SpeechSynthesisUtterance(word)
	speakText.lang = "en-US"
	speakText.volume = 1
	speakText.rate = 1
	speakText.pitch = 1
	
	speakText.onerror = (err) => {
		console.log(err)
	}
	synth.speak(speakText)
}

card.onclick = () => {
	if(synth.speaking)	return
	card.classList.toggle("active")
}