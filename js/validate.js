import {sendData} from "./api.js";
import {showFailMsg, showSuccessMsg} from "./events-messages.js";
import {disableAdForm, enableAdForm} from "./form.js";
import {getUiSlider} from "./slider.js";
import {fullReset, setDefaultViewMap} from "./map.js";

const adFormElement = document.querySelector('.ad-form')
const roomsElement = adFormElement.querySelector('#room_number')
const capacityElement = adFormElement.querySelector('#capacity')
const titleElement = adFormElement.querySelector('#title')
const setAddressElement = adFormElement.querySelector('#address')

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
  if (roomsElement.value === '100' && capacityElement.value !== '0') {
    msg.push('Для 100 комнат выберите - не для гостей')
    console.log('100*!0')
    // return !msg.length
  }
  if (roomsElement.value !== '100' && capacityElement.value === '0') {
    msg.push('Для не для гостей выберите - 100 комнат')
    console.log('!100*0')
    //  return !msg.length
  }
  if (roomsElement.value < capacityElement.value) {
    msg.push('Комнат не может быть меньше гостей')
    console.log('Комнат не может быть меньше гостей');
    //  return !msg.length
  }
  if (roomsElement.value >= capacityElement.value) {
    console.log('good');
    // return true
  }
  return !msg.length
}

//функция валидации цены жилья
let errorsPrice = []
const getValidPrice = () => {
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
    pristine.addValidator(roomsElement, getRoomsCapacity, () => msg, 5, false)
    pristine.addValidator(priceElement, getValidPrice, () => errorsPrice, 5, false)
    capacityElement.addEventListener('change', () => {
      pristine.validate(roomsElement)
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
            fullReset()
          },
          () => {
            showFailMsg('Ошибка размещения объявления')

          },
          new FormData(evt.target)
        )
      }
    }
  }
}

export {startValidate}
