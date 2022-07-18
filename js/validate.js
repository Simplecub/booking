let adFormElement = document.querySelector('.ad-form')
let submitButton = adFormElement.querySelector('.ad-form__submit')
let rooms = adFormElement.querySelector('#room_number')
let capacity = adFormElement.querySelector('#capacity')
let elem = adFormElement.querySelector('.ad-form__header')
let setAddressElement = adFormElement.querySelector('#address')

const priceElement = document.querySelector('#price')
const selectType = document.querySelector('#type')
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
// функция валидации адреса
let errorAddress =[]

  const getValidAddress = () =>{
  errorAddress.length =0
  if (!setAddressElement.value) {
   console.log(setAddressElement.value+'11')
    errorAddress.push('no address')
  }
  return !errorAddress.length
  }



//Pristine.addValidator(priceElement, getValidPrice, () => errorsPrice, 5, false)
//Pristine.addValidator('rooms', getRoomsCapacity, () => msg, 5, false)
const pristine = new Pristine(adFormElement, CONFIG_PRISTINE);
let run
const startValidate = (cb) => {
 // const pristine = new Pristine(adFormElement, CONFIG_PRISTINE);

   if (cb) {
   pristine.validate(cb);
 //   const pristine = new Pristine(adFormElement, CONFIG_PRISTINE);
    console.log('dfd')
  } else {
     pristine.addValidator(rooms, getRoomsCapacity, () => msg, 5, false)
     pristine.addValidator(priceElement, getValidPrice, () => errorsPrice, 5, false)
  //   pristine.addValidator(setAddressElement, getValidAddress, () => errorAddress, 5, false)
//  setAddressElement.addEventListener('change', () => pristine.validate(setAddressElement))
     capacity.addEventListener('change', () => {
       pristine.validate(rooms)
     });
 //    selectType.addEventListener('change', () => {
//       pristine.validate(priceElement)})
     //  priceElement.addEventListener('change', () => pristine.validate(priceElement))
     // setAddressElement.addEventListener('input', () => pristine.validate(setAddressElement))
     //  const sliderElement = document.querySelector('.ad-form__slider')
//  sliderElement.noUiSlider.on('update', (...rest) => {pristine.validate(priceElement)})
     pristine.validate();
     adFormElement.onsubmit = (evt) => {
       if (!pristine.validate() || 0) {
         console.log('stop-send-error');
         evt.preventDefault()
       }
     }
   }
}
export {startValidate}
