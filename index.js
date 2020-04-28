const word = document.getElementById("word")
const input = document.getElementById("input")
const scoreEl = document.getElementById("score")
const timeEl = document.getElementById("time")
const endGame = document.getElementById("end-game-container")
const settingBtn = document.getElementById("setting-btn")
const settings = document.getElementById("setting")
const difficultySelect = document.getElementById("difficulty")

// 游戏单词
const words = [
	"steer",
	"sliver",
	"test",
	"difficult",
	"what",
	"team"
]
var rightWords = []
// 初始单词
var randomWord
// 初始得分
var score = 0
// 初始时间
var time = 10
// 难度对应时间
var difficulty = {
	easy: 5,
	medium: 3,
	hard: 2
}
var timer,diffTime

// 初始信息
function init(){
	settings.classList.remove("show")
	settingBtn.classList.remove("active")
	diffTime = difficulty[difficultySelect.value]
	time = 10 
	score = 0
	updateAll()
	input.focus()
	endGame.style.display = "none"
	timer = setInterval(() => {
		time--
		updateTime()
		if(time <= 0){
			clearInterval(timer)
			gameOver()
		}
	},1000)
}

// 更新单词
function addWordToDom(){
	randomWord = getWord()
	word.innerText = randomWord
}
// 获取单词
function getWord(){
	const newWords = words.filter(word => {
		// 不包含
		return rightWords.indexOf(word) === -1
	})
	const word = newWords[Math.floor(Math.random()*newWords.length)]
	rightWords.push(word)
	return word
}
// 更新时间
function updateTime(){
	timeEl.innerText = time + " s"
}
// 更新分数
function updateScore(){
	scoreEl.innerText = score
}

function updateAll(){
	addWordToDom()
	updateScore()
	updateTime()
}

// 输入正确
function inputRight(){
	input.value = ""
	time += diffTime
	score += 1
	updateAll()
}

// 游戏结束
function gameOver(){
	endGame.innerHTML = 
	`
		<h1>游戏结束</h1>
		<p>您的最终得分: ${score}</p>
		<button onclick="init()">再玩一次</button>
	`
	endGame.style.display = "flex"
}

input.oninput = (e) => {
	const val = e.target.value
	if(val === randomWord)
		inputRight()
}
settingBtn.onclick = () => {
	settings.classList.toggle("show")
	settingBtn.classList.toggle("active")
}
difficultySelect.onchange = () => {
	diffTime = difficulty[difficultySelect.value]
}