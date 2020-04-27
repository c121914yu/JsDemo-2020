// 获取节点
const balance = document.getElementById("balance")
const money_plus = document.getElementById("money-plus")
const money_minus= document.getElementById("money-minus")
const list = document.getElementById("list")
const form = document.getElementById("form")
const name = document.getElementById("name")
const amount = document.getElementById("amount")

var records = []
var money = {}

function addTransactionDom(transaction){
	const sign = transaction.amount < 0 ? "-" : "+"
	const className = transaction.amount < 0 ? "minus" : "plus"
	// 创建标签
	const html = 
	`
		<li class="${className}">
			${transaction.name}
			<span>${sign}${Math.abs(transaction.amount)}</span>
			<button class="delete-btn" onclick="deleteRecord(${transaction.id})">×</button>
		</li>
	`
	let dom = document.createElement("div")
	dom.innerHTML = html
	dom = dom.children[0]
	
	list.appendChild(dom)
	updateMoney(transaction)
}

// 更新余额/收入/支出
function updateMoney(transaction){
	money.balance += transaction.amount
	transaction.amount < 0 ? money.minus+=transaction.amount : money.plus+=transaction.amount

	// 更新dom
	balance.innerText = `$${money.balance.toFixed(2)}`
	money_plus.innerText = `+$${Math.abs(money.plus).toFixed(2)}`
	money_minus.innerText = `-$${Math.abs(money.minus).toFixed(2)}`
}

// 删除
function deleteRecord(id){
	records.find((item,index) => {
		if(item.id === id){
			records.splice(index,1)
			localStorage.setItem("records",JSON.stringify(records))
			init()
			return true
		}
	})
}

form.onsubmit = (e) => {
	e.preventDefault()
	const transaction = {id: +(new Date()),name: name.value,amount: Number(amount.value)}
	records.push(transaction)
	addTransactionDom(transaction)
	name.value = ""
	amount.value = ""
	
	localStorage.setItem("records",JSON.stringify(records))
}

// 初始化
function init(){
	if(localStorage.getItem("records"))
		records = JSON.parse(localStorage.getItem("records"))
	money = {
		plus: 0,
		minus: 0,
		balance: 0,
	}
	list.innerHTML = ""
	records.forEach(item => {
		addTransactionDom(item)
	})
}
init()