// 获取节点
const video = document.getElementById('video')
const play = document.getElementById('play')
const stop = document.getElementById('stop')
const progress = document.getElementById('progress')
const time = document.getElementById('time')

function changeStatus(){
	if(video.paused)
		video.play()
	else
		video.pause()
}

// 添加事件
// 点击视频播放/暂停
video.onclick = changeStatus
// 视频暂停
video.onpause = () => {
	play.innerHTML = 
		`
			<i class="fa fa-play fa-2x"></i>
		`
}
// 视频播放
video.onplay = () => {
	play.innerHTML =
		`
			<i class="fa fa-pause fa-2x"></i>
		`
}

// 监听播放时间
video.ontimeupdate = (e) => {
	const currentTime = video.currentTime
	progress.value = (currentTime/video.duration) * 100
	let mins = Math.floor(currentTime / 60)
	if(mins < 10)
		mins = '0' + mins
	let seconds = Math.floor(currentTime % 60)
	if(seconds < 10)
		seconds = '0' + seconds
	time.innerText = `${mins}:${seconds}`
}

// 点击播放/暂停按键
play.onclick = changeStatus
//点击停止
stop.onclick = () => {
	video.pause()
	video.currentTime = 0
}
// 拖动进度条
progress.onchange = () => {
	video.currentTime = +progress.value/100 * video.duration
}