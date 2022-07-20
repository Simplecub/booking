const filterFormElement = document.querySelector('.map__filters')
const typeElement = filterFormElement.querySelector('#housing-type')
const priceElement = filterFormElement.querySelector('#housing-price')
const roomsElement = filterFormElement.querySelector('#housing-rooms')
const guestElement = filterFormElement.querySelector('#housing-guests')
const features = filterFormElement.querySelector('#housing-features')
const wifi = features.querySelector('#filter-wifi')
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
  res1 = array.filter((item) =>
    //условие для типа жилья
    (typeElement.value === item.offer.type || typeElement.value === 'any') &&
    //условие для цены
    (priceElement.value === 'any' ||
      priceElement.value === 'middle' && (item.offer.price >= 10000 && item.offer.price < 50000) ||
      priceElement.value === 'low' && item.offer.price < 10000 ||
      priceElement.value === 'high' && item.offer.price >= 50000) &&
    //условие для количества комнат
    (roomsElement.value === 'any' ||
      Number(roomsElement.value) === item.offer.rooms) &&
    //условие для количества гостей
    (guestElement.value === 'any' ||
      Number(guestElement.value) === item.offer.guests) &&
    (!wifi.checked) ||
   (wifi.checked && ~item.offer.features.indexOf(wifi.value))
  )
  if (wifi.checked)
  {console.log(wifi.value)}
  //(array.indexOf(typeElement.value)!==-1 || typeElement.value === 'any') ? res1.push(array)
  /*

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



   */
  console.log(res3)
  return res1
}

export {enableFilter, disableFilter, onFiltered}
