import {startValidate} from "./validate.js";
import {getPopup} from "./adverts-popup.js";

const adFormElement = document.querySelector('.ad-form')
const setAddressElement = adFormElement.querySelector('#address')
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
mainPinMarker.addTo(map);

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

const getMap = (cb1, cb2, array) => {
  map.on('load', () => {
    console.log('map loaded');
    cb1();
    cb2()
    //enableAdForm();
    //  startValidate()
  })
    .setView({lat: 35.6883, lng: 139.7735}, 10)


  mainPinMarker.on('moveend', (evt) => {
    console.log(evt.target.getLatLng());
    setAddressElement.value = `${evt.target.getLatLng().lat.toFixed(5)}, ${evt.target.getLatLng().lng.toFixed(5)}`;
    startValidate(setAddressElement)
  });

  resetButton.addEventListener('click', () => {
    setDefaultViewMap();
    setTimeout(() => startValidate(setAddressElement), 400)
  });

  array.forEach((item) => {
    const {lat, lng} = item.location
    const marker = L.marker({
        lat,
        lng,
      },
      {
        icon,
      },);
    marker
      .addTo(map)
      .bindPopup(getPopup(item))
  });
}

export {getMap}
