// 获取dom
const form = document.getElementById('form')
const username = document.getElementById('username')
const email = document.getElementById('email')
const password = document.getElementById('password')
const password2 = document.getElementById('password2')

const message = 

// 时间监听
form.addEventListener('submit',(e) => {
	e.preventDefault()
	checkSpace([
		{input:username,message:'用户名不能为空'},
		{input:email,message:'邮箱不能为空'},
		{input:password,message:'请输入密码'},
		{input:password2,message:'请再次输入密码'}
	])
	
	checkEmail()
	checkLength(username,3,15,'用户名')
	checkLength(password,6,12,'密码')
	checkEquality(password,password2,'两次密码不一致')
})

function checkSpace(inputArr){
	inputArr.forEach(item => {
		const input = item.input
		if(input.value === "")
			showError(input,item.message)
		else
			showSuccess(input)
	})
}
function checkEmail(){
	if(email.value === '') return
	const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
	if(!reg.test(email.value))
		showError(email,'邮箱格式错误')
	else
		showSuccess(email)
}
function checkLength(input,min,max,keyword){
	const val = input.value
	if(val === '') return
	console.log(val.length > max)
	if(val.length < min)
		showError(input,`${keyword}长度不能小于${min}`)
	else if(val.length > max)
		showError(input,`${keyword}长度不能大于${max}`)
}
function checkEquality(input1,input2,message){
	console.log()
	if(input1.value === input2.value)
		showSuccess(input2)
	else
		showError(input2,message)
}


function showError(input,message){
	const formControl = input.parentElement
	const small = formControl.querySelector('small')
	small.innerText = message
	formControl.classList.remove('success')
	formControl.classList.add('error')
}

function showSuccess(input){
	const formControl = input.parentElement
	formControl.classList.remove('error')
	formControl.classList.add('success')
}