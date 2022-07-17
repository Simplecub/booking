import {addValidator} from "./validate.js";
import {getPopup} from "./adverts-popup.js";
import {getMarkersFromAdverts} from "./main.js";

import {disableAdForm, enableAdForm} from "./form.js";

const adFormElement = document.querySelector('.ad-form')
const setAddressElement = adFormElement.querySelector('#address')
const resetButton = adFormElement.querySelector('.ad-form__reset')
const map = L.map('map-canvas')
  .on('load', () => {
    console.log('map loaded');
    enableAdForm();
   addValidator()
  })
  .setView({lat: 35.6883, lng: 139.7735}, 10)

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

mainPinMarker.on('moveend', (evt) => {
  console.log(evt.target.getLatLng());
  setAddressElement.value = `${evt.target.getLatLng().lat.toFixed(5)}, ${evt.target.getLatLng().lng.toFixed(5)}`;
  addValidator(setAddressElement)

});
resetButton.addEventListener('click', () => {
  // addValidator(Pristine.destroy)
  //setTimeout(() => addValidator(Pristine.reset), 1)
  mainPinMarker.setLatLng({
    lat: 35.6883,
    lng: 139.7735,
  });
  map.setView({
    lat: 35.6883,
    lng: 139.7735,
  }, 10);
});
// mainPinMarker.remove();

const icon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

getMarkersFromAdverts(10).forEach((item) => {
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
