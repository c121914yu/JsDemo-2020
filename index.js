// 获取dom
const currency1 = document.getElementById("currency-one")
const amount1 = document.getElementById('amount-one')
const currency2 = document.getElementById("currency-two")
const amount2 = document.getElementById('amount-two')
const swap = document.getElementById('swap')
const rateEl = document.getElementById('rate')

// 获取汇率
function calculate(){
	const val1 = currency1.value
	const val2 = currency2.value
	
	fetch(`https://api.exchangerate-api.com/v4/latest/${val1}`)
	.then(res => res.json())
	.then(data => {
		const rate = data.rates[val2]
		rateEl.innerText = `1${val1} = ${rate}${val2}`
		amount2.value = (amount1.value * rate).toFixed(2)
	})
}
calculate()

// 事件监听
currency1.onchange = calculate
amount1.oninput = calculate
currency2.onchange = calculate

swap.onclick = () => {
	const temp = currency1.value
	currency1.value = currency2.value
	currency2.value = temp
	calculate()
}