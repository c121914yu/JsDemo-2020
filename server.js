var fs = require("fs")
var readline = require('readline')

var fReadName = "./word.txt"
var fRead = fs.createReadStream(fReadName)
var objReadline = readline.createInterface({
	input:fRead
})
var arr = new Array()
objReadline.on('line',function (line) {
	// 去掉空格
	line = line.replace(/\s*/g,"")
	if(line != ""){ //排除空行
		// 查找两次/出现的位置
		const index = []
		for(let i=0;i<line.length;i++)
			if(line[i] === "/")
				index.push(i)
		const word = line.slice(0,index[0])
		const voice = line.slice(index[0],index[1]+1)
		const translate = line.slice(index[1]+1)
		arr.push({
			word,
			voice,
			translate,
			remenber: false
		})
	}
})

objReadline.on('close',function () {
		let json = JSON.stringify(arr,"","\t")
		fs.writeFileSync('./word.json',json)
})
