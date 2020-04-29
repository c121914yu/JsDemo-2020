// dom
const main = document.querySelector("main")
const voicesSelect = document.getElementById("voices")
const textarea = document.getElementById("text")
const readBtn = document.getElementById("read")
const toggleBtn = document.getElementById("toggle")
const closeBtn = document.getElementById("close")

var synth = window.speechSynthesis

// 创建data数据
const data = [
  {
    image: "./img/spring01.jpg",
    text: "春暖花开"
  },
  {
    image: "./img/summer01.jpg",
    text: "夏阳酷暑"
  },
  {
    image: "./img/autumn01.jpg",
    text: "雁过留声"
  },
  {
    image: "./img/winter01.jpg",
    text: "白雪皑皑"
  },
  {
    image: "./img/spring02.jpg",
    text: "草长莺飞"
  },
  {
    image: "./img/summer02.jpg",
    text: "骄阳似火"
  },
  {
    image: "./img/autumn02.jpg",
    text: "一叶知秋 "
  },
  {
    image: "./img/winter02.jpg",
    text: "瑞雪纷飞"
  },
  {
    image: "./img/spring03.jpg",
    text: "鸟语花香"
  },
  {
    image: "./img/summer03.jpg",
    text: "艳阳高照"
  },
  {
    image: "./img/autumn03.jpg",
    text: "秋风瑟瑟"
  },
  {
    image: "./img/winter03.jpg",
    text: "雪中送炭"
  }
]

data.forEach(createBox)
function createBox(item){
	const box = document.createElement("div")
	const {image,text} = item //相当于image = item.image
	box.classList.add("box")
	box.innerHTML = 
	`
		<image src="${image}" alt="${text}" />
		<p class="info">${text}</p>
	`
	main.appendChild(box)
	
	box.onclick = () => {
		speedText(text,box)
	}
}

// 获取voices
var voices = []
function getVoices(){
	voices = synth.getVoices()
	voices.forEach(voice => {
		const option = document.createElement("option")
		option.value = voice.lang
		option.innerText = `${voice.name} ${voice.lang}`
		voicesSelect.appendChild(option)
	})
}
getVoices()
if(synth.onvoiceschanged !== undefined)
  synth.onvoiceschanged = getVoices

// 打开文字框
toggleBtn.onclick = () => {
	document.getElementById("text-box").classList.toggle("show")
}

// 关闭按键
closeBtn.onclick = () => {
	document.getElementById("text-box").classList.remove("show")
}

// readBtn
readBtn.onclick = () => {
	if(synth.speaking) return
	const text = textarea.value
	if(text != "")
		speedText(text,readBtn)
}

// 播放语言
function speedText(text,dom){
	let speakText = new SpeechSynthesisUtterance(text)
	// 选择语言
	voices.find(voice => {
		if(voice.lang === voicesSelect.value){
			speakText.voice = voice
			return true
		}
	})
	// 设置声音大小
	speakText.volume = 1
	speakText.onstart = () => {
		dom.classList.add("active")
	}
	speakText.onend = () => {
		dom.classList.remove("active")
	}
	speakText.error = (err) => {
		console.log(err)
	}
	
	synth.speak(speakText)
}