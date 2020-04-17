// 随机获取一个范围在(min,max)的数
function random([min, max]) {
	let length = max - min
	return Math.random() * length + min
}
// 随机获取一个(min,max)的整数
function intRandom(min, max) {
	let length = max - min + 1
	return Math.floor(Math.random() * length + min)
}

/*
	获取随机一组坐标
	length : 数组长度
	start : 最小值
	end : 最大值
*/
function getRandomArray(length) {
	let randomArray = []
	for (let i = 0; i < length; i++) {
		randomArray[i] = new Array()
		randomArray[i][0] = random(rangeX)
		randomArray[i][1] = random(rangeY)
		randomArray[i] = getval(randomArray[i])
	}
	return randomArray
}

// 从大到小排序
function sortArr(Arr) {
	let arr = [...Arr]
	arr.sort((a, b) => {
		return b[2] - a[2]
	})
	return arr
}

// 根据公式计算出函数值
function getval(item) {
	while (1) {
		const [x, y] = [item[0], item[1]]
		const first = -(y + 47) * Math.sin(Math.sqrt(Math.abs(y + x / 2 + 47)))
		const second = -x * Math.sin(Math.sqrt(Math.abs(x - y - 47)))
		item[2] = first + second
		if (item[2] > 0)
			break
		item[0] = random(rangeX)
		item[1] = random(rangeY)
	}
	return item
}

// 计算函数和
function calSum() {
	let sum = coordArr.reduce((val, item) => {
		return item[2] + val
	}, 0)
	return sum
}

// 计算data
function calData(i) {
	let arr = []
	coordArr.forEach(item => {
		arr.push([i, item[2]])
	})
	return arr
}

// 获取输入
function initData() {
	let getVal = (id) => {
		return +document.getElementById(id).value
	}
	rangeX = [getVal("startX"), getVal("endX")]
	rangeY = [getVal("startY"), getVal("endY")]
	coordinatesLength = getVal("arrLen")
	evolveTimes = getVal("evolveTimes")
	copyRatio = getVal("copyRatio")

	crossNum = Math.round(coordinatesLength - coordinatesLength * copyRatio)
	data = []
}

var playing = false
var beginTime
document.getElementById("begin").onclick = () => {
	if (playing) return
	playing = true
	document.querySelector(".time").innerText = ''
	document.querySelector(".max").innerText = ''
	document.querySelector(".mask").style.display = "block"

	setTimeout(() => {
		beginTime = +new Date()
		calculate()
	}, 100)
}