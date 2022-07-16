import {
  getAvatar,
  getElementsAmount,
  getRandomPositiveFloat,
  getRandomPositiveInteger,
  getShuffleArray
} from "./util.js";
import {
  TITLE,
  PHOTOS_ARRAY,
  DESCRIPTIONS_ARRAY,
  CHECKIN_TIME,
  CHECKOUT_TIME,
  FEATURES,
  COUNT_ADVERTS,
  TYPE_ROOM
} from "./mock-data.js";

//класс для созания объявления
class Advert {
  author = {avatar: `img/avatars/user${getAvatar(1, 11)}.png`}
  offer = {
    title: getShuffleArray(TITLE, getElementsAmount(TITLE)).join(', '),
    address: `${this.lat = getRandomPositiveFloat(35.6500, 35.70000, 5)},${this.lng = getRandomPositiveFloat(139.70000, 139.80000, 5)}`,
    price: getRandomPositiveInteger(2500, 10000),
    type: TYPE_ROOM[getRandomPositiveInteger(0, TYPE_ROOM.length - 1)],
    rooms: getRandomPositiveInteger(1, 5),
    guests: getRandomPositiveInteger(1, 8),
    checkin: CHECKIN_TIME[getRandomPositiveInteger(0, CHECKIN_TIME.length - 1)],
    checkout: CHECKOUT_TIME[getRandomPositiveInteger(0, CHECKOUT_TIME.length - 1)],
    features: getShuffleArray(FEATURES, getElementsAmount(FEATURES)),
    description: getShuffleArray(DESCRIPTIONS_ARRAY, 1).join(' '),
    photos: getShuffleArray(PHOTOS_ARRAY, getElementsAmount(PHOTOS_ARRAY))
  }
  location = {
    lat: this.lat,
    lng: this.lng
  }

}

//генерация массива объявлений длиной COUNT_ADVERTS
const getAllAdverts = (COUNT) => {
  return Array.from(Array(COUNT), () => new Advert())
}

export {getAllAdverts}
