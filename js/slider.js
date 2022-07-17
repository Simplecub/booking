import {getDebounce} from "./util.js";
import {addValidator} from "./validate.js";

const sliderElement = document.querySelector('.ad-form__slider')
const priceElement = document.querySelector('#price')
const typeElement = document.querySelector('#type')

const PRICE= Object.freeze({
  bungalow: {min: 0, max: 100000, start: 0, step: 1},
  flat: {min: 1000, max: 100000, start: 1000, step: 1},
  hotel: {min: 3000, max: 100000, start: 3000, step: 1},
  house: {min: 5000, max: 100000, start: 5000, step: 1},
  palace: {min: 10000, max: 100000, start: 10000, step: 1}
});


let min = Number(priceElement.min)
console.log(min)
noUiSlider.create(sliderElement, {
  range: {
    min: min,
    max: 100000,
  },
  start: 0,
  step: 1,
  connect: 'lower',
  format: {
    //  to: (value) => value.toFixed(!Number.isInteger(value))
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(0);
    },
    from:  function (value) {
      return parseFloat(value);
    }
  },
})

const setPriceConfig = (evt) =>{
  let config = PRICE[evt.target.value];
  console.log((config))
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: config.min,
      max: config.max,
    },
    start: config.start,
    step: config.step,
    connect: 'lower',
  });

}
typeElement.addEventListener('change', setPriceConfig)
priceElement.addEventListener('input', getDebounce(()=> sliderElement.noUiSlider.set(priceElement.value), 500))

sliderElement.noUiSlider.on('update', (...rest) => {
 // console.log(rest);
  priceElement.value = sliderElement.noUiSlider.get();
  addValidator(priceElement)
})