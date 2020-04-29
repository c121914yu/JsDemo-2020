// 获取dom
const remenberBtn = document.querySelector(".remenber-btn")
const container = document.querySelector(".container")

var words
var wordIndex = 0

var synth = window.speechSynthesis
var voices

// 初始化speedAPi
function getVoices(){
	voices = synth.getVoices()
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

// 本地存储
function localStort(){
	localStorage.setItem("words",JSON.stringify(words))
}

// 更新container
function updateContainer(){
	const word = words[wordIndex]
	container.innerHTML = 
	`
		<h2>${word.word}</h2>
		<p>
			${word.voice}
			<i class="fa fa-volume-down" onclick="speakWord('${word.word}')"></i>
		</p>
		<h3 class="open-translate" onclick="showTranslate()">点击查看中文</h3>
		<h3 class="translate">${word.translate}</h3>
	`
	
	signWord()
	speakWord(word.word)
}

// 生/熟词切换
function signWord(){
	if(words[wordIndex].remenber){
		remenberBtn.innerText = "熟词"
		remenberBtn.classList.add("remenber")
	}
	else{
		remenberBtn.innerText = "生词"
		remenberBtn.classList.remove("remenber")
	}
}
// 查看中文
function showTranslate(){
	document.querySelector(".open-translate").classList.add("show")
	document.querySelector(".translate").classList.add("show")
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

// 播放单词
function speakWord(word){
	let speakText = new SpeechSynthesisUtterance(word)
	speakText.voice = voices[1]
	speakText.volume = 1
	speakText.rate = 0.8
	
	speakText.onerror = (err) => {
		console.log(err)
	}
	synth.speak(speakText)
}

// 记住了
remenberBtn.onclick = () => {
	words[wordIndex].remenber = !words[wordIndex].remenber
	localStort()
	signWord()
}
