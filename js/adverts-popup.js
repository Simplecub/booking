const cardElement = document.querySelector('#card').content.querySelector('.popup')

const mapCanvasElement = document.querySelector('#map-canvas')
const photoElement = cardElement.querySelector('.popup__photos').querySelector('.popup__photo').cloneNode(true);

const getModifierLi = (item, element) => {
  const modifiers = item.map((feat) => 'popup__feature--' + feat)
  element.forEach((listItem) => {
    const modifier = listItem.classList[1]
    if (!modifiers.includes(modifier)) {
      listItem.remove()
    }
  })
}

const getPopup = (item) => {
  const card = cardElement.cloneNode(true)
//2 модификатор - popup__features
  const allPopups = card.querySelectorAll('.popup__feature')
  const getModifierLi = (item, selector, classItem) => {
    const modifiers = item.map((feat) => classItem + feat);
    selector.forEach((listItem) => {
      const modifier = listItem.classList[1]
      if (!modifiers.includes(modifier)) {
        listItem.remove()
      }
    })
  }
getModifierLi(item.offer.features, allPopups,'popup__feature--')
  //В блок .popup__type выведите тип жилья offer.type, сопоставив с подписями
  const allTypes =

  /*
  const modifiers = item.offer.features.map((feat) => 'popup__feature--' + feat)
  allPopups.forEach((listItem) => {
    const modifier = listItem.classList[1]
    if (!modifiers.includes(modifier)) {
      listItem.remove()
    }
  })

   */

  //3 В .popup__photos Каждая из строк массива photos должна записываться как атрибут src соответствующего изображения
  card.querySelector('.popup__photos').querySelectorAll('.popup__photo').forEach((item) => item.remove())
  item.offer.photos.forEach((item) => {
    let photo = photoElement.cloneNode(true)
    photo.src = item;
    card.querySelector('.popup__photos').appendChild(photo)
  })



  card.querySelector('.popup__title').textContent = item.offer.title
  card.querySelector('.popup__text--address').textContent = item.offer.address
  card.querySelector('.popup__text--price').innerHTML = `${item.offer.price} <span>₽/ночь</span>`
  //1 card.querySelector('.popup__type').textContent = item.offer.type
  card.querySelector('.popup__text--capacity').textContent = `${item.offer.rooms} комнаты для ${item.offer.guests} гостей`
  card.querySelector('.popup__text--time').textContent = `Заезд после ${item.offer.checkin}, выезд до ${item.offer.checkout}`
  //2 card.querySelector('.popup__features').textContent = item.offer.features
  card.querySelector('.popup__description').textContent = item.offer.description
  //3 card.querySelector('.popup__photos').querySelector('.popup__photo').src = item.offer.photos
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

