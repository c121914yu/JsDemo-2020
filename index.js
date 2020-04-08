// dom
const main = document.getElementById('main')
const addUser = document.getElementById('add-user')
const Double = document.getElementById('double')
const showMillionaires = document.getElementById('show-millionaires')
const Sort = document.getElementById('sort')
const Calculate = document.getElementById('caculate-wealth')

var persionArr = new Array()

// 获取数据
async function getRandomUser(){
	const res = await fetch("https://randomuser.me/api")
	const data = await res.json()
	const user = data.results[0]
	const newUser = {
	  name: `${user.name.first} ${user.name.last}`,
	  money: Math.floor(Math.random() * 1000000)
	}
	persionArr.push(newUser)
	updataDOM()
}
getRandomUser()
getRandomUser()
getRandomUser()

function updataDOM(){
	main.innerHTML = " <h2><strong>Person</strong>Wealth</h2>"
	persionArr.forEach(item => {
		const element = document.createElement('div')
		element.classList.add('person')
		element.innerHTML = `<strong>${item.name}</strong>${formatMoney(item.money)}`
		main.appendChild(element)
	})
}
// 转换货币格式
function formatMoney(money){
	return "$ " + money.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
}

addUser.onclick = getRandomUser

Double.onclick = () => {
	 const newArr = persionArr.map(item => {
		 return {
			 name : item.name,
			 money : item.money * 2
		 }
	 })
	 persionArr = newArr
	 updataDOM()
}

showMillionaires.onclick = () => {
	const newArr = persionArr.filter(item => {
		return item.money >= 1000000
	})
	persionArr = newArr
	updataDOM()
}

Sort.onclick = () => {
	// >0则交换顺序
	persionArr.sort((a,b) => {
		return b.money - a.money
	})
	updataDOM()
}

Calculate.onclick = () => {
	let sum = persionArr.reduce((sum,item) => {
		return sum += item.money
	},0)
	sum = formatMoney(sum)
	const element = document.createElement('div')
	element.innerHTML = `<h3>Total Wealth<strong>${sum}</strong></h3>`
	main.appendChild(element)
}

