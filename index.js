// x,y取值范围
var rangeX, rangeY

// 样本长度
var coordinatesLength

// 进化次数(迭代次数)
var evolveTimes
// 复制的比例
var copyRatio

/* 
	样本数组
	格式：
	[
		[x,y,val]
	]
*/
var coordArr

// 交叉的个数
var crossNum
// 变异数
var variationNum

// 自然概率 : 下标对应坐标数组下标，值代表概率
var selectionProbability
// 绘图data
var data

function calculate() {
	// 获取输入
	initData()
	coordArr = getRandomArray(coordinatesLength, rangeX, rangeY)
	for (let i = 1; i <= evolveTimes; i++) {
		// 计算适应度
		calAdaptability()
		// 复制
		const copyArr = copy()
		// 交叉
		let newCoord = cross()
		// 变异
		newCoord = mutation(newCoord)
		// 组合成新数组
		coordArr = newCoord.concat(copyArr)
		coordArr.forEach(item => {
			item = getval(item)
		})
		data = data.concat(calData(i))
	}
	result()
}
// calculate()

// 计算适应度及选择概率
function calAdaptability() {
	selectionProbability = []
	const sum = calSum()
	for (let i = 0; i < coordinatesLength; i++)
		selectionProbability.push(coordArr[i][2] / sum)
}

/*
	寻找最大的n个保留
*/
function copy() {
	let arr = [...coordArr]
	arr = sortArr(arr)
	arr = arr.slice(0, copyRatio * coordinatesLength)
	return arr
}

/* 
	交叉
	生成{crossNum}条染色体
*/
function cross() {
	let newCoord = []
	for (let i = 0; i < crossNum; i++) {
		let father = [...coordArr[RWS()]]
		let mather = [...coordArr[RWS()]]
		// 进行交叉
		let results = [
			[father[0],father[1]],
			[father[0],mather[1]],
			[mather[0],father[1]],
			[mather[0],mather[1]]
		]
		let index = intRandom(0, 3)
		newCoord.push(results[index])
	}
	return newCoord
}

// 轮盘赌算法
function RWS() {
	let sum = 0
	let rand = Math.random()
	for (let i = 0; i < coordinatesLength; i++) {
		sum += selectionProbability[i]
		if (sum > rand)
			return i
	}
}

// 变异
function mutation(coord) {
	// 在交叉的个体中随机选中一个
	let coordIndex = intRandom(0, crossNum - 1)
	// 随机获取x/y
	let vector = intRandom(0, 1)
	// 随机获取坐标值
	let val = vector === 0 ? random(rangeX) : random(rangeY)
	coord[coordIndex][vector] = val
	return coord
}

function result() {
	// 绘图
	let chart = echarts.init(document.getElementById('canvas'))
	let option = {
		title: {
			text: "-(y+47)sin(✔|y+x/2+47|) - xsin(✔|x-y-47)| 极大值",
			left: "center"
		},
		// tooltip: {
		// 	trigger: "axis",
		// },
		xAxis: {
			type: 'value',
			scale: true,
			name: '迭代次数'
		},
		yAxis: {
			type: 'value',
			scale: true,
			name: '函数取值'
		},
		series: [{
			name: '遗传算法',
			type: 'scatter',
			large: true,
			symbol: "circle",
			symbolSize: 2,
			data: data
		}]
	}
	chart.setOption(option)

	// 计算dom文本
	let time = new Date() - beginTime
	const maxVector = sortArr(coordArr)[0]
	maxVector[0] = maxVector[0].toFixed(0)
	maxVector[1] = maxVector[1].toFixed(0)
	maxVector[2] = maxVector[2].toFixed(0)
	// 转化s
	time /= 1000
	document.querySelector(".time").innerText = `${time}s`
	document.querySelector(".max").innerText = `(${maxVector[0]},${maxVector[1]},${maxVector[2]})`
	document.querySelector(".mask").style.display = "none"
	playing = false
}