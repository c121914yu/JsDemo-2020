# 文字转语言API

```js
speechSynthesis //目前浏览器兼容性还不是很好

//实例化
var synth = window.speechSynthesis
  .getVoices() //获取支持的语言列表（谷歌的语言用不了）
  .onvoiceschanged //解决异步问题
  .speaking //正在说话
  .cancel() //清除说话列表
  .pause() //暂停说话
  .resume() //恢复暂停
  .speak(speakText) //发音
  .onerror //错误
  .onend //说话结束

//获得说话文本
const speakText = new SpeechSynthesisUtterance(textInput.value)
  .voice = voice  //选择语言
  .rate = number //音速
  .pitch = number//音调
  .volume = number//声音大小
  .onstart = function // 语言开始
  .onend = function //结束
  .error = function //错误
  .onpause = function //暂停
  .onresume = function //恢复暂停
  .onboundary //说到单词或句子边界
  .onmark //到标记处
```