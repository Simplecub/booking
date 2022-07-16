import {getAllAdverts} from "./mock-adverts.js";
import {getPopup} from "./adverts-popup.js";
import {getMarkersFromAdverts} from "./main.js";

const adForm = document.querySelector('.ad-form')
const resetButton = adForm.querySelector('.ad-form__reset')
const map = L.map('map-canvas')
  .on('load', ()=>{console.log('map loaded')})
  .setView({lat:35.6883,lng:139.7735}, 10)

console.log('tgtgtghtgtgtgt')

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
});
resetButton.addEventListener('click', () => {
  mainPinMarker.setLatLng({
    lat: 59.96831,
    lng: 30.31748,
  });
  map.setView({
    lat: 59.96831,
    lng: 30.31748,
  }, 10);
});
// mainPinMarker.remove();

const icon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});
getMarkersFromAdverts(4).forEach((item) => {
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
