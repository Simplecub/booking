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

let res1 = []
let res2 = []
let res3 = []
let feature = []
const onFiltered = (evt, array) => {
  let filtered = array.slice()
  res1.length = 0
  res2.length = 0
  feature.length = 0
  res1 = filtered.filter((item) =>
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
      Number(guestElement.value) === item.offer.guests)
  )
    /*
       && ((!wifi.checked && (!item.offer.features || !item.offer.features.includes(wifi.value))) ||
          (wifi.checked && item.offer.features && item.offer.features.includes(wifi.value))) &&
        ((!dishwasher.checked) || (dishwasher.checked && item.offer.features && item.offer.features.includes(dishwasher.value))) &&
        ((!parking.checked) || (parking.checked && item.offer.features && item.offer.features.includes(parking.value))) &&
        ((!washer.checked) || (washer.checked && item.offer.features && item.offer.features.includes(washer.value))) &&
        ((!elevator.checked) || (elevator.checked && item.offer.features && item.offer.features.includes(elevator.value))) &&
        ((!conditioner.checked) || (conditioner.checked && item.offer.features && item.offer.features.includes(conditioner.value)))
     */

  const equal = (arr) => {
    let rank = 0
    if (arr.offer.features) {
    if (arr.offer.features.includes(wifi.value)) { rank +=1 }
    if (arr.offer.features.includes(dishwasher.value)) {rank +=1}
    if (arr.offer.features.includes(parking.value)) {rank +=1}
    if (arr.offer.features.includes(washer.value)) {rank +=1}
    if (arr.offer.features.includes(elevator.value)) {rank +=1}
    if (arr.offer.features.includes(conditioner.value)) {rank +=1}
    }
    return rank
}
const compare = (a,b) => {
    const arank = equal(a)
  const  brank = equal(b)
  return brank - arank
}
const getFilterItem = (arr, feature) => {
return arr.filter((i)=> feature.checked && i.offer.features && i.offer.features.includes(feature.value) || (!feature.checked))
}

res2 = res1.sort(compare)
  .filter((i)=> wifi.checked && i.offer.features && i.offer.features.includes(wifi.value) || (!wifi.checked))
  .filter((i)=> dishwasher.checked && i.offer.features && i.offer.features.includes(dishwasher.value) ||(!dishwasher.checked))
  .filter((i)=> parking.checked && i.offer.features && i.offer.features.includes(parking.value) || (!parking.checked))
  .filter((i)=> washer.checked && i.offer.features && i.offer.features.includes(washer.value)|| (!washer.checked))
  .filter((i)=> elevator.checked && i.offer.features && i.offer.features.includes(elevator.value) || (!elevator.checked))
  .filter((i)=> conditioner.checked && i.offer.features && i.offer.features.includes(conditioner.value) || (!conditioner.checked))

 res3 = getFilterItem(getFilterItem(getFilterItem(getFilterItem(getFilterItem(getFilterItem(res2,wifi), dishwasher), parking),washer),elevator), conditioner)

  /*
  let featuresAll = filterFormElement.querySelector('#housing-features').querySelectorAll('input')
  featuresAll.forEach((i) => i.checked ? feature.push(i.value) : feature)
  console.log(feature);
  console.log(feature.join(' '))
  if (feature.length) {
    res1.filter((item) => {
      if (item.offer.features) {
        console.log(item.offer.features.join(', '))
        if (new RegExp(feature.sort().join('&')).test(item.offer.features.sort().join('&'))) {
          res2.push(item)
        }
      }
    })
  } else res2 = res1


   */
  console.log(res2)
  console.log(res3)
  return res3
}

export {enableFilter, disableFilter, onFiltered}