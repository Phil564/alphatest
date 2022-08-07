//Phil's note: credits to this repo https://github.com/gr2m/localstorage-tutorial for literally teaching me how to do this black magic.
if (typeof(Storage) !== "undefined") {
var $form = document.querySelector('#add-form')
var $removeform = document.querySelector('#remove-form')

var playtesterids = JSON.parse(localStorage.getItem('playtesterids') || '[]')

playtesterids.forEach(function (playtesterid) {
	var $login2 = document.getElementById("login2")
	$login2.dataset.id = playtesterid.id
	$login2.innerHTML = `
		Login Successful<br>Your playtester ID (do not share): <div class="uid">${playtesterid.name}</div>
	`
})

$form.addEventListener('submit', function (event) {
	event.preventDefault()
	
	var name = document.querySelector('#name').value
	var id = Math.random().toString(36).substr(2, 7)
	var $login2 = document.getElementById("login2")
	$login2.dataset.id = id
	$login2.innerHTML = `
		Login Successful<br>Your playtester ID (do not share): <div class="uid">${name}</div>
	`

	$form.reset()

	playtesterids.push({
		id: id,
		name: name
	})
	localStorage.setItem('playtesterids', JSON.stringify(playtesterids))
})

$removeform.addEventListener('click', function (event) {
	event.preventDefault()

	localStorage.clear()
	location.reload()
})
}
else {
document.getElementById("login2").innerHTML = `
		Unable to connect to main servers and set cookies.<br>Check if JavaScript support is enabled in your browser.<br>Try refreshing the page.
	`
}
