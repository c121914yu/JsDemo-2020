const container = document.getElementById("container")
const text = document.getElementById("text")
const pointer = document.querySelector(".pointer-container")

const totalTime = 7500
const breatheTime = totalTime*2/5
const holdTime = totalTime/5

pointer.classList.add("rotate")
breatheAnimation()
function breatheAnimation(){
	container.className = "container grow"
	text.innerText = "吸气"
	setTimeout(() => {
		text.innerText = "保持"
		setTimeout(() => {
			text.innerText = "呼气"
			container.className = "container shrink"
		},holdTime)
	},breatheTime)
}
setTimeout(() => {
	breatheAnimation()
},totalTime)