import {sendData} from "./api.js";
import {showFailMsg, showSuccessMsg} from "./events-messages.js";
import {disableAdForm, enableAdForm} from "./form.js";
import {getUiSlider} from "./slider.js";

let adFormElement = document.querySelector('.ad-form')
let rooms = adFormElement.querySelector('#room_number')
let capacity = adFormElement.querySelector('#capacity')

const priceElement = document.querySelector('#price')
const CONFIG_PRISTINE = {
  classTo: 'ad-form__element', //выбор элементов для валидации
  errorClass: 'form__error',  //добавляет класс (для изменения цвета текста если валидация не пройдена)
  successClass: 'ad-form--valid', //добавляет класс ad-form--valid (не используется)
  errorTextParent: 'ad-form__element', //родительский элемент для которого будет отображена ошибка валидации
  errorTextTag: 'span',   //сообщение ошибки выводится - как строка
  errorTextClass: 'form__error' //к сообщению об ошибки применяется класс ..'form__error'
};


adFormElement.querySelectorAll('input').forEach((item) => {
  if (item.hasAttribute('required')) {
    item.setAttribute('data-pristine-required-message', "Обязательно для заполнения")
  }
})
//функция валидации количества комнат
let msg = []
const getRoomsCapacity = () => {
  msg.length = 0
  if (rooms.value === '100' && capacity.value !== '0') {
    msg.push('Для 100 комнат выберите - не для гостей')
    console.log('100*!0')
    // return !msg.length
  }
  if (rooms.value !== '100' && capacity.value === '0') {
    msg.push('Для не для гостей выберите - 100 комнат')
    console.log('!100*0')
    //  return !msg.length
  }
  if (rooms.value < capacity.value) {
    msg.push('Комнат не может быть меньше гостей')
    console.log('Комнат не может быть меньше гостей');
    //  return !msg.length
  }
  if (rooms.value >= capacity.value) {
    console.log('good');
     // return true
  }
  return !msg.length
}

//функция валидации цены жилья
let errorsPrice = []
const getValidPrice = ()=> {
 errorsPrice.length = 0;
  if (Number(priceElement.value) < Number(priceElement.min)) {
    console.log('minprise<')
errorsPrice.push(`Минимальная цена ${Number(priceElement.min)} руб`)
  }
  return !errorsPrice.length
}

const pristine = new Pristine(adFormElement, CONFIG_PRISTINE);

const startValidate = (cb) => {
   if (cb) {
   pristine.validate(cb);
    console.log('dfd')
  } else {
     pristine.addValidator(rooms, getRoomsCapacity, () => msg, 5, false)
     pristine.addValidator(priceElement, getValidPrice, () => errorsPrice, 5, false)
     capacity.addEventListener('change', () => {
       pristine.validate(rooms)
     });

     pristine.validate();
     adFormElement.onsubmit = (evt) => {
       if (!pristine.validate() || 0) {
         console.log('stop-send-error');
         evt.preventDefault()
       } else {
         evt.preventDefault()
         sendData(
           () => {
             showSuccessMsg()
             adFormElement.reset()
             disableAdForm()
             enableAdForm()
             getUiSlider()
           },
           ()=> {
             showFailMsg()

           },
           new  FormData(evt.target)

         )




       }
     }
   }
}
export {startValidate}
