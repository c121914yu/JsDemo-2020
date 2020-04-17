# 遗传算法求解二元方差最大值

种群(二维数组) -> 个体(一位数组) -> 基因（包含3个元素:x,y,z）  

> 参数
> rangeX - x的取值范围  
> rangeY - y的取值范围  
> coordinatesLength - 种群大小（二维数组长度）  
> evolveTimes - 进化次数（迭代次数）
> copyRatio - 复制比例
> crossNum - 交叉数量

总体步骤：
1. 初始化参数  
2. 获取初代（根据x,y范围随机获取一组二维数组）
3. 进化：  
3.1 计算适应度（自然选择概率）  
3.2  复制  
3.3 交叉  
3.4 变异  
3.5 组合新种群继续进化  
4. 结束进化输出结果  

个人对遗传算法的理解就是从一部分数据中选出好的数据，去掉坏的数据，然后对好的数据进行一些处理后继续选出好的数据。本质上还是个广撒点然后排序的问题，但是区别在于进化次数越多，后面的数据越集中在某个值。可能是我还没get到它的本质，所以一时间看不出啥优点。  

1，2步就不多说了，直接写个随机函数就好了。  

**适应度（选择概率）**
```js
// 元素的第二位是函数的值
// 通俗点就是计算每个函数值占的一个权重
selectionProbability = []
const sum = calSum()
for (let i = 0; i < coordinatesLength; i++)
	selectionProbability.push(coordArr[i][2] / sum)

function calSum() {
	let sum = coordArr.reduce((val, item) => {
		return item[2] + val
	}, 0)
	return sum
}
```

**复制**
```js
// 从小到大排序后按复制比选择
function copy() {
	let arr = [...coordArr]
	arr = sortArr(arr)
	arr = arr.slice(0, copyRatio * coordinatesLength)
	return arr
}
function sortArr(Arr) {
	let arr = [...Arr]
	arr.sort((a, b) => {
		return b[2] - a[2]
	})
	return arr
}
```

**交叉**

根据选择概率选中两个数据，对其中的x,y进行重新组合，有4种情况：
[x1,y1] [x1,y2] [x2,,y1] [x2,y2]

```js
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
/*
	轮盘赌算法
	概率大的容易被选中
*/
function RWS() {
	let sum = 0
	let rand = Math.random()
	for (let i = 0; i < coordinatesLength; i++) {
		sum += selectionProbability[i]
		if (sum > rand)
			return i
	}
}
```

**变异**  
```js
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
```

**组合新种群**  
直接把复制生成的数组跟变异后的数组组合起来即可，再重新求值，之后继续循环直至结束。  

**结果展示**
图形绘制方面用到了echats库的散点图，传入的数据也是一个二维数组。echarts的散点图是根据每个元素的0,1元素绘制即：[横坐标,纵坐标]  
```js
// calculate
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


function calData(i) {
	let arr = []
	coordArr.forEach(item => {
		arr.push([i, item[2]])
	})
	return arr
}
```
注：该算法未验证合理性，仅能确定输出的最大值正确。  
 