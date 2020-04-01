// 获取dom
const seats = document.querySelectorAll('.row .seat:not(.occupied)')
const container = document.querySelector('.container')
const count = document.getElementById('count')
const total = document.getElementById('total')
const movieSelect = document.getElementById('movie')
let movieIndex = 0
let ticketPrice = +movieSelect.value

// 读取历史记录
if(localStorage.getItem('selectIndex')){
	const storage = JSON.parse(localStorage.getItem('selectIndex'))
	console.log(storage)
	movieSelect.selectedIndex = storage.movieIndex
	movieIndex = storage.movieIndex
	ticketPrice = storage.ticketPrice
	seats.forEach((seat,index) => {
		if(storage.seatsIndex.indexOf(index) > -1)
			seat.classList.add('selected')
	})
	updateSelected()
}

// 监听点击座位
container.onclick = (e) => {
	const seat = e.target
	// 判断是否是不可选
	if(seat.classList.contains('seat') && !seat.classList.contains('occupied')){
		// 切换selected属性，包含则删除，不包含则添加
		seat.classList.toggle('selected')
		// 更新座位数和票价
		updateSelected()
	}
}
// 监听下拉框
movieSelect.onchange = (e) => {
	// 下拉框的index
	movieIndex = e.target.selectedIndex
	// 票价
	ticketPrice = +e.target.value
	seats.forEach(seat => {
		seat.classList.remove('selected')
	})
	updateSelected()
}

function updateSelected(){
	const selectedSeats = document.querySelectorAll('.row .seat.selected')
	
	// 通过展开运算符将类数组转化成数组
	const seatsIndex = [...selectedSeats].map(seat => {
		return [...seats].indexOf(seat)
	})
	localStorage.setItem('selectIndex',JSON.stringify({
		movieIndex,
		ticketPrice,
		seatsIndex,
	}))
	
	
	count.innerText = selectedSeats.length
	total.innerText = selectedSeats.length * ticketPrice
}
