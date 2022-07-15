const adFormElement = document.querySelector('.ad-form')
const submitButton = adFormElement.querySelector('.ad-form__submit')
const rooms = adFormElement.querySelector('#room_number')
const capacity = adFormElement.querySelector('#capacity')
const elem = adFormElement.querySelector('.ad-form__header')

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
    //  return true
  }
  return !msg.length
}

Pristine.addValidator('rooms', getRoomsCapacity, () => msg, 5, false)
//Pristine.addValidator('capacity', getRoomsCapacity, () => msg, 5, false)

const addValidator = () => {
  const pristine = new Pristine(adFormElement, CONFIG_PRISTINE);
  capacity.onchange = () => {
    pristine.validate(rooms)
  }
  pristine.validate();
  adFormElement.onsubmit = (evt) => {
    if (!pristine.validate() || 0) {
      console.log('stop-send-error');
      evt.preventDefault()
    }
  }
}


export {addValidator}
