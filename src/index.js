
const URL =  ' http://localhost:3000/beers'
document.addEventListener('DOMContentLoaded', () => {
loadBeers()

})

function loadBeers() {
  fetch(URL)
  .then(res => res.json())
  .then(beers => {
    displayBeers(beers)
  })
}

function displayBeers(beers) {
  beers.forEach(beer => {
    displayBeer(beer)
  })
}


function displayBeer(beer) {
  let ul = document.getElementById('list-group')
  let li = document.createElement('li')

  li.className = "list-group-item"
  ul.appendChild(li)

  li.textContent = beer.name

  li.addEventListener('click', () => {
    showBeer(beer)
  })
}

function showBeer(beer) {

  let div = document.getElementById('beer-detail')
  let h1 = document.createElement('h1')
  let img = document.createElement('img')
  let h3 = document.createElement('h3')
  let text = document.createElement('textarea')
  let saveBtn = document.createElement('button')

  h1.textContent = beer.name
  img.src = beer.image_url
  h3.textContent = beer.tagline
  text.textContent = beer.description
  saveBtn.textContent = "Save"

  while (div.firstChild) {
      div.firstChild.remove()
    }

  div.appendChild(h1)
  div.appendChild(img)
  div.appendChild(h3)
  div.appendChild(text)
  div.appendChild(saveBtn)

  saveBtn.addEventListener('click', (ev) => {
    handleSave(beer, text)
  })
}

function handleSave(beer, textEl) {
  // beer.description = textEl.value

  let value = {description: textEl.value}
  let config = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(value)
  }

  fetch(URL + '/' + beer.id, config)
  .then(res => res.json())
  .then(beers => {
      beer.description = textEl.value
  })
}
