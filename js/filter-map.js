const filterFormElement = document.querySelector('.map__filters')
const typeElement = filterFormElement.querySelector('#housing-type')
const priceElement = filterFormElement.querySelector('#housing-price')
const roomsElement = filterFormElement.querySelector('#housing-rooms')
const guestElement = filterFormElement.querySelector('#housing-guests')
const features = filterFormElement.querySelector('#housing-features').querySelectorAll('input')
const disableFilter = () => {
  filterFormElement.classList.add('map__filters--disabled')
  filterFormElement.querySelectorAll('select').forEach((item) => item.setAttribute('disabled', 'disabled'))

}

const enableFilter = () => {
  filterFormElement.classList.remove('map__filters--disabled')
  filterFormElement.querySelectorAll('select').forEach((item) => item.disabled = false)

}

let res1 = []
let res2 = []
let res3 = []

const onFiltered = (evt, array) => {
  let filtered = array.slice()
  res1.length = 0
  filtered.forEach((item) => {
      console.log(typeElement.value)
      if (typeElement.value === item.offer.type || typeElement.value === 'any') {
        res1.push(item)
      }
    }
  )
  res2.length = 0
  res1.forEach((item) => {
      if (priceElement.value === 'any') {
        res2.push(item)
      }
      if (priceElement.value === 'middle' && (item.offer.price >= 10000 && item.offer.price < 50000)) {
        res2.push(item)
      }
      if (priceElement.value === 'low' && item.offer.price < 10000) {
        res2.push(item)
      }
      if (priceElement.value === 'high' && item.offer.price >= 50000) {
        res2.push(item)
      }
    }
  )
  res1.length = 0
  res2.forEach((item) => {
    if (roomsElement.value === 'any') {
      res1.push(item)
    }
    if (Number(roomsElement.value) === item.offer.rooms) {
      res1.push(item)
    }
  })
  res2.length=0
  res1.forEach((item) =>{
    if (guestElement.value === 'any')
    {res2.push(item)}
    if(Number(guestElement.value) === item.offer.guests )
    {res2.push(item)}

  })
res1.length =0
  res3.length=0
  features.forEach((item) => {
    if (item.checked) {res3.push(item.value)}
  })

res2.forEach((item) => {
  console.log(item.offer.features);
  if (res3.includes(item.offer.features)) {
      res1.push(item)
    }

  })


  console.log(res3)
  return res2
}

export {enableFilter, disableFilter, onFiltered}
