// dom获取
const wordEl = document.getElementById("word")
const errLetter = document.getElementById("error-letters")
const noteContainer = document.getElementById("note-container")
const popup = document.getElementById("popup-contaniner")
const finalMessage = document.getElementById("final-message")
const playAgain = document.getElementById("play-btn")

const partArr = document.querySelectorAll(".figure")

const words = [
	"application", "programming", "intertface", "wonder"
]
var selectedWord = words[Math.floor(Math.random() * words.length)]

var correctLetters = []
var wrongLetters = []

// 显示单词函数
function displayWord() {
	wordEl.innerHTML =
		`
		${selectedWord.split("").map(letter => 
			`
				<span class="letter">
					${correctLetters.includes(letter) ? letter : ""}
				</span>
			`
		).join("")}
	`
	const innerWord = wordEl.innerText.replace(/\n/g, "")

	if (innerWord === selectedWord) {
		finalMessage.innerText = "恭喜你输入正确"
		popup.style.display = "flex"
	}
}
displayWord()

// 显示提示框函数
function showNote() {
	noteContainer.classList.add("show")
	setTimeout(() => {
		noteContainer.classList.remove("show")
	}, 2000);
}

// 更新错误内容
function updateWrongLettersEl() {
	errLetter.innerHTML =
		`
		<p>错误：</p>
		<span>${wrongLetters.join(',')}</span>
	`

	// 火柴人
	partArr.forEach((item, index) => {
		const errTimes = wrongLetters.length
		if (index < errTimes)
			item.style.display = "block"
	})

	// 判断次数用尽
	if (wrongLetters.length === partArr.length) {
		finalMessage.innerText = "输入错误次数过多！游戏结束。"
		popup.style.display = "flex"
	}
}

// 再玩一次
playAgain.onclick = () => {
	correctLetters = []
	wrongLetters = []
	selectedWord = words[Math.floor(Math.random() * words.length)]
	errLetter.innerHTML = ""
	partArr.forEach(item => {
		item.style.display = "none"
	})
	popup.style.display = "none"
	displayWord()
}

// 监听键盘输入
window.onkeydown = (e) => {
	console.log(e.key)
	if (e.keyCode >= 65 && e.keyCode <= 90) {
		const letter = e.key
		// 输入正确且不存在已经输入的字母中
		if (selectedWord.includes(letter)) {
			if (!correctLetters.includes(letter)) {
				correctLetters.push(letter)
				displayWord()
			} else {
				showNote()
			}
		} else {
			if (!wrongLetters.includes(letter)) {
				wrongLetters.push(letter)
				updateWrongLettersEl()
			} else {
				showNote()
			}
		}
	}
}