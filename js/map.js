import {startValidate} from "./validate.js";
import {getPopup} from "./adverts-popup.js";
import {getUiSlider} from "./slider.js";
import {disableAdForm, enableAdForm} from "./form.js";

const adFormElement = document.querySelector('.ad-form')
const setAddressElement = adFormElement.querySelector('#address')
const roomsElement = adFormElement.querySelector('#room_number')
const titleElement = adFormElement.querySelector('#title')
const priceElement = adFormElement.querySelector('#price')


const map = L.map('map-canvas')

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: 35.6883,
    lng: 139.7735,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);


const setDefaultViewMap = () => {
  mainPinMarker.setLatLng({
    lat: 35.6883,
    lng: 139.7735,
  });
  map.setView({
    lat: 35.6883,
    lng: 139.7735,
  }, 12);
}

const icon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});
//мега -ресет Оо
const fullReset = (cb) => {
  setDefaultViewMap();
  document.querySelector('.ad-form').reset()
  document.querySelector('.map__filters').reset()
  disableAdForm()
  enableAdForm()
  getUiSlider(1)
  setTimeout(() => {
    startValidate(setAddressElement);
    startValidate(roomsElement);
    startValidate(priceElement);
    startValidate(titleElement)
  }, 400)

  if (document.querySelector('.leaflet-popup')) {
    document.querySelector('.leaflet-popup').remove()
  }
  if (cb) {
    cb()
  }
}

//функция создания карты
const getMap = () => {
return new Promise((resolve, reject) => {

  const errorTimeout = setTimeout(reject, 10000) //
  const addMainPin = () => mainPinMarker.addTo(map);


  mainPinMarker.on('moveend', (evt) => {
    console.log(evt.target.getLatLng());
    setAddressElement.value = `${evt.target.getLatLng().lat.toFixed(5)}, ${evt.target.getLatLng().lng.toFixed(5)}`;
    startValidate(setAddressElement)
  });


//создается слой на который наносятся метки
  const markerGroup = L.layerGroup().addTo(map)
//ф*я для создания одной метки и добавления её на слой markerGroup
  const createMarker = (item) => {
    const {lat, lng} = item.location
    const marker = L.marker({
        lat,
        lng,
      },
      {
        icon,
      },);
    marker
      .addTo(markerGroup)
      .bindPopup(getPopup(item))
  }

  const setMarkers = (array) => {
    markerGroup.clearLayers()
    console.log(array)
    array.forEach((item) => createMarker(item))
  }
  // markerGroup.clearLayers()
  map.on('load', () => {
    console.log('map loaded');
    clearTimeout(errorTimeout);
    resolve({setMarkers, addMainPin})
  })
    .setView({lat: 35.6883, lng: 139.7735}, 12)
})
}

export {getMap, setDefaultViewMap, fullReset}
