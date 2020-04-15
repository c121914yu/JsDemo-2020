// dom
const toggle = document.getElementById('toggle')
const close = document.getElementById('close')
const open = document.getElementById('open')
const modal = document.getElementById('modal')

toggle.onclick = () => {
	document.body.classList.toggle('show-nav')
}

open.onclick = () => {
	modal.classList.add('show-modal')
}
close.onclick = () => {
	modal.classList.remove('show-modal')
}
window.onclick = (e) => {
	e.target == modal ? modal.classList.remove('show-modal') : ''
}