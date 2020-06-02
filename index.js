const rulesBtn = document.getElementById("rules-btn")
const closeBtn = document.getElementById("close-btn")
const rules = document.getElementById("rules")
const canvas = document.getElementById("canvas")

rulesBtn.onclick = () => {
	rules.classList.add("show")
}
closeBtn.onclick = () => {
	rules.classList.remove("show")
}

// 绘图
var ctx = canvas.getContext("2d")
// 创建小球
var ball = {
	x: canvas.width / 2,
	y: canvas.height / 2,
	size: 8,
	speed: 4,
	dx: 4,
	dy: -4
}
// 绘制小球
function drawBall(){
	ctx.beginPath()
	ctx.arc(ball.x,ball.y,ball.size,0,Math.PI*2)
	ctx.fillStyle = "#0095dd"
	ctx.fill()
	ctx.closePath()
}
function moveBall(){
	ball.x += ball.dx
	ball.y += ball.dy
	// 边界监听
	if(ball.x + ball.size > canvas.width || ball.x <= 0)
		ball.dx *= -1
	if(ball.y + ball.size > canvas.height || ball.y <= 0)
		ball.dy *= -1
	// 监听撞击挡板
	if(ball.x >= paddle.x && ball.x <= paddle.x+paddle.width && ball.y+ball.size > paddle.y){
		ball.dy = -ball.speed
	}
	// 监听撞击砖块
	for(let i=0;i<bricks.length;i++)
		if(ball.x - ball.size >= bricks[i].x &&
			 ball.x + ball.size <= bricks[i].x + bricks[i].width &&
			 ball.y + ball.size >= bricks[i].y &&
			 ball.y - ball.size <= bricks[i].y + bricks[i].height
		){
			ball.dy *= -1
			bricks.splice(i,1)
			score++
			break
		}
	// 监听碰到地板
	if(ball.y + ball.size >= canvas.height){
		score = 0
		bricks = [...bricks_arr]
	}
}

var mouse_x,mouse_y
var mouseMove = false
// 创建挡板
var paddle = {
	x: canvas.width / 2 - 40,
	y: canvas.height - 20,
	width: 80,
	height: 10,
	speed: 8,
	dx: 0
}
function draw_paddle(){
	ctx.beginPath()
	ctx.rect(paddle.x,paddle.y,paddle.width,paddle.height)
	ctx.fillStyle = "#0095DD"
	ctx.fill()
	ctx.closePath()
}
// 挡板动画
function movePaddle(){
	paddle.x += paddle.dx
	if(paddle.x + paddle.width > canvas.width)
		paddle.x = canvas.width - paddle.width
	else if(paddle.x <= 0)
		paddle.x = 0
}
window.onkeydown = (e) => {
	switch(e.keyCode){
		case 65: paddle.dx = -paddle.speed;break;
		case 68: paddle.dx = paddle.speed;break;
	}
}
window.onkeyup = () => {
	paddle.dx = 0
}
window.onmousedown = (e) => {
	mouse_x = e.offsetX
	mouse_y = e.offsetY
	mouseMove = true
}

// 绘制目标砖块
var brick = {
	width: 30,
	height: 30,
	padding: 10
}
var bricks_arr = []
var bricks = []
for(let i=0;i<20;i++)
	for(let j=0;j<4;j++)
		bricks_arr.push({
			...brick,
			x: 5 + i*(brick.width + brick.padding),
			y: 50 + j*(brick.height + brick.padding)
		})
bricks = [...bricks_arr]
function draw_thicks(){
	ctx.beginPath()
	bricks.forEach(item => {
		ctx.rect(item.x,item.y,item.width,item.height)
		ctx.fillStyle = "#0095DD"
		ctx.fill()
	})
	ctx.closePath()
}

// 绘制得分
var score = 0
function draw_score(){
	ctx.font = "20px Arial"
	ctx.fillText(`得分: ${score}`,canvas.clientWidth-100,30)
}

draw()
function draw(){
	ctx.clearRect(0,0,canvas.width,canvas.height)
	drawBall()
	draw_paddle()
	draw_score()
	draw_thicks()
	
	// 挡板移动
	movePaddle()
	// 小球移动
	moveBall()
	requestAnimationFrame(draw)
}
