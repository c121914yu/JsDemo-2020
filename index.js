// 获取dom
const remenberBtn = document.querySelector(".remenber-btn")
const container = document.querySelector(".container")
const voicesSelect = document.getElementById("voices-select")
const pitchRange = document.getElementById("pitch")
const pitchText = document.getElementById("pitch-text")
const rateRange = document.getElementById("rate")
const rateText = document.getElementById("rate-text")

var words
var wordIndex = 0

var synth = window.speechSynthesis
var voices

// 初始化speedAPi
function getVoices(){
	voices = synth.getVoices()
	console.log(voices)
	if(voices.length > 0){
		voices.forEach(voice => {
			const option = document.createElement("option")
			option.classList.add("voice")
			option.value = voice.lang
			option.innerText = voice.name
			if(voice.name === "Microsoft Zira Desktop - English (United States)")
				option.selected = "option"
			voicesSelect.appendChild(option)
		})
		
		getWords()
	}
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
	if(voices.length > 0)
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
	if(voices.length === 0){
		alert("你的浏览器不支持语言播放")
		return
	}
	let speakText = new SpeechSynthesisUtterance(word)
	console.log(voicesSelect.value)
	speakText.lang = voicesSelect.value
	speakText.volume = 1
	speakText.rate = +rateText.innerText
	speakText.pitch = +pitchText.innerText
	
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

// 监听拖动改变音调/音速
pitchRange.oninput = (e) => {
	const val = e.target.value
	pitchText.innerText = val
}
rateRange.oninput = (e) => {
	const val = e.target.value
	rateText.innerText = val
}