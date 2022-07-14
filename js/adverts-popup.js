const cardElement = document.querySelector('#card').content.querySelector('.popup')

const mapCanvasElement = document.querySelector('#map-canvas')


const getPopup = (item) => {
  let card = cardElement.cloneNode(true)
  card.querySelector('.popup__title').textContent = item.offer.title
  card.querySelector('.popup__text--address').textContent = item.offer.address
  card.querySelector('.popup__text--price').innerHTML = `${item.offer.price} <span>₽/ночь</span>`
  card.querySelector('.popup__type').textContent = item.offer.type
  card.querySelector('.popup__text--capacity').textContent = `${item.offer.rooms} комнаты для ${item.offer.guests} гостей`
  card.querySelector('.popup__text--time').textContent = `Заезд после ${item.offer.checkin}, выезд до ${item.offer.checkout}`
  card.querySelector('.popup__features').textContent = item.offer.features
  card.querySelector('.popup__description').textContent = item.offer.description
 // card.querySelector('.popup__photos').querySelector('.popup__photo').src = item.offer.photos
  card.querySelector('.popup__avatar').src = item.author.avatar


  return card
}

const getPopups = (array) => {
  let cardBox = document.createDocumentFragment()
  array.forEach((item) => cardBox.append(getPopup(item)))
  console.log(cardBox);
  mapCanvasElement.append(cardBox)
  return cardBox
}

export {getPopups}

