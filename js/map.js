import {startValidate} from "./validate.js";
import {getPopup} from "./adverts-popup.js";
import {getUiSlider} from "./slider.js";
import {disableAdForm, enableAdForm} from "./form.js";

const adFormElement = document.querySelector('.ad-form')
const setAddressElement = adFormElement.querySelector('#address')
const roomsElement = adFormElement.querySelector('#room_number')
const titleElement = adFormElement.querySelector('#title')
const priceElement = adFormElement.querySelector('#price')
const resetButton = adFormElement.querySelector('.ad-form__reset')

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
  }, 10);
}

const icon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});
//мега -ресет Оо
const fullReset = () => {
  setDefaultViewMap();
  document.querySelector('.ad-form').reset()
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
}

//функция создания карты
const getMap = () => {
  map.on('load', () => {
    console.log('map loaded');
  })
    .setView({lat: 35.6883, lng: 139.7735}, 10)
  const addMainPin = () => mainPinMarker.addTo(map);

  mainPinMarker.on('moveend', (evt) => {
    console.log(evt.target.getLatLng());
    setAddressElement.value = `${evt.target.getLatLng().lat.toFixed(5)}, ${evt.target.getLatLng().lng.toFixed(5)}`;
    startValidate(setAddressElement)
  });


  resetButton.addEventListener('click', fullReset);

  const markerGroup = L.layerGroup().addTo(map)

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
    //  .bindPopup(getPopup(item))
  }

  const setMarkers = (array) => {
    array.forEach((item) => createMarker(item))
  }
  return {setMarkers, addMainPin}
}

export {getMap, setDefaultViewMap, fullReset}
