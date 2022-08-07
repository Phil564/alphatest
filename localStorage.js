//Phil's note: credits to this repo https://github.com/gr2m/localstorage-tutorial for literally teaching me how to do this black magic.
var $form = document.querySelector('#add-form')
var $table = document.querySelector('#list-table')

var playtesterids = JSON.parse(localStorage.getItem('playtesterids') || '[]')

playtesterids.forEach(function (playtesterid) {
  var $row = document.createElement('tr')
  $row.dataset.id = playtesterid.id
  $row.innerHTML = `
    <td>
      <div class="uid">${playtesterid.name}</div>
    </td>
    <td class="actions">
      <a href="#" data-action="delete">delete</a>
    </td>
  `
  $table.appendChild($row)
})

$form.addEventListener('submit', function (event) {
  event.preventDefault()

  var name = document.querySelector('#name').value
  var id = Math.random().toString(36).substr(2, 7)
  var $row = document.createElement('tr')
  $row.dataset.id = id
  $row.innerHTML = `
    <td>
      Login Successful<br>Your playtester ID (do not share): <div class="uid">${name}</div>
    </td>
    <td class="actions">
      <a href="#" data-action="delete">delete</a>
    </td>
  `
  $table.appendChild($row)

  $form.reset()

  playtesterids.push({
    id: id,
    name: name
  })
  localStorage.setItem('playtesterids', JSON.stringify(playtesterids))
})

$table.addEventListener('click', function (event) {
  event.preventDefault()

  var $button = event.target
  var $row = $button.closest('tr')
  var id = $row.dataset.id
  var action = $button.dataset.action

  if (action === 'delete') {
    playtesterids = playtesterids.filter(function (playtesterid) {
      return playtesterid.id !== id
    })
    localStorage.setItem('playtesterids', JSON.stringify(playtesterids))
    $row.remove()
  }
})