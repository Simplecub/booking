const filterFormElement = document.querySelector('.map__filters')
const typeElement = filterFormElement.querySelector('#housing-type')
const priceElement = filterFormElement.querySelector('#housing-price')
const roomsElement = filterFormElement.querySelector('#housing-rooms')
const guestElement = filterFormElement.querySelector('#housing-guests')
const features = filterFormElement.querySelector('#housing-features')

const wifi = features.querySelector('#filter-wifi')
const dishwasher = features.querySelector('#filter-dishwasher')
const parking = features.querySelector('#filter-parking')
const washer = features.querySelector('#filter-washer')
const elevator = features.querySelector('#filter-elevator')
const conditioner = features.querySelector('#filter-conditioner')

const disableFilter = () => {
  filterFormElement.classList.add('map__filters--disabled')
  filterFormElement.querySelectorAll('select').forEach((item) => item.setAttribute('disabled', 'disabled'))
}

const enableFilter = () => {
  filterFormElement.classList.remove('map__filters--disabled')
  filterFormElement.querySelectorAll('select').forEach((item) => item.disabled = false)
}

//фильтры
const filterType = (item) => typeElement.value === item.offer.type || typeElement.value === 'any';
const filterPrice = (item) => priceElement.value === 'any' ||
  priceElement.value === 'middle' && (item.offer.price >= 10000 && item.offer.price < 50000) ||
  priceElement.value === 'low' && item.offer.price < 10000 ||
  priceElement.value === 'high' && item.offer.price >= 50000;
const filterRooms = (item) => roomsElement.value === 'any' || Number(roomsElement.value) === item.offer.rooms;
const filterGuests = (item) => guestElement.value === 'any' || Number(guestElement.value) === item.offer.guests;

//функции для сортировки
//ранги
const equal = (arr) => {
  let rank = 0
  if (arr.offer.features) {
    if (arr.offer.features.includes(wifi.value)) {
      rank += 1
    }
    if (arr.offer.features.includes(dishwasher.value)) {
      rank += 1
    }
    if (arr.offer.features.includes(parking.value)) {
      rank += 1
    }
    if (arr.offer.features.includes(washer.value)) {
      rank += 1
    }
    if (arr.offer.features.includes(elevator.value)) {
      rank += 1
    }
    if (arr.offer.features.includes(conditioner.value)) {
      rank += 1
    }
  }
  return rank
}
// ф-я сравнения которая потом пойдет в sort(compare)
const compare = (a, b) => {
  const arank = equal(a)
  const brank = equal(b)
  return brank - arank
}

let res1 = []
//мега-фильтр !!!
const onFiltered = (array) => {
  res1.length = 0

  res1 = array.slice()
    .sort(compare)
    .filter(filterType)
    .filter(filterPrice)
    .filter(filterRooms)
    .filter(filterGuests)
    .filter((i) => wifi.checked && i.offer.features && i.offer.features.includes(wifi.value) || (!wifi.checked))
    .filter((i) => dishwasher.checked && i.offer.features && i.offer.features.includes(dishwasher.value) || (!dishwasher.checked))
    .filter((i) => parking.checked && i.offer.features && i.offer.features.includes(parking.value) || (!parking.checked))
    .filter((i) => washer.checked && i.offer.features && i.offer.features.includes(washer.value) || (!washer.checked))
    .filter((i) => elevator.checked && i.offer.features && i.offer.features.includes(elevator.value) || (!elevator.checked))
    .filter((i) => conditioner.checked && i.offer.features && i.offer.features.includes(conditioner.value) || (!conditioner.checked))
//every
  console.log(res1)
  return res1.slice(0, 10)
}

export {enableFilter, disableFilter, onFiltered}
