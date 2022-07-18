const adFormElement = document.querySelector('.ad-form')
const filterFormElement = document.querySelector('.map__filters')
const typeSelectElement = adFormElement.querySelector('#type')
const priceElement = adFormElement.querySelector('#price')
const timeInSelect = adFormElement.querySelector('#timein')
const timeOutSelect = adFormElement.querySelector('#timeout')

const disableAdForm = () => {
  adFormElement.classList.add('ad-form--disabled')
  adFormElement.querySelectorAll('fieldset').forEach((item) => item.setAttribute('disabled', 'disabled'))
  filterFormElement.classList.add('map__filters--disabled')
  filterFormElement.querySelectorAll('select').forEach((item) => item.setAttribute('disabled', 'disabled'))
  typeSelectElement.removeEventListener('change', selectType)
  timeInSelect.removeEventListener('change', setTimeOut)
  timeOutSelect.removeEventListener('change', setTimeIn)

}

const enableAdForm = () => {
  adFormElement.classList.remove('ad-form--disabled')
  adFormElement.querySelectorAll('fieldset').forEach((item) => item.disabled = false)
  filterFormElement.classList.remove('map__filters--disabled')
  filterFormElement.querySelectorAll('select').forEach((item) => item.disabled = false)
  setType()
  setTime()
}


const selectType = () => {
  let type = typeSelectElement.value
  switch (type) {
    case ('bungalow'):
      priceElement.setAttribute('placeholder', '0');
      priceElement.setAttribute('min', '0');
      break
    case ('flat'):
      priceElement.setAttribute('placeholder', '1000');
      priceElement.setAttribute('min', '1000');
      break
    case ('hotel'):
      priceElement.setAttribute('placeholder', '3000');
      priceElement.setAttribute('min', '3000');
      break
    case ('house'):
      priceElement.setAttribute('placeholder', '5000');
      priceElement.setAttribute('min', '5000');
      break
    case ('palace'):
      priceElement.setAttribute('placeholder', '10000');
      priceElement.setAttribute('min', '10000');
      break
  }
}

const setType = () => {
  selectType(typeSelectElement.value)
  typeSelectElement.addEventListener('change', selectType)
}

const setTimeOut = evt => timeOutSelect.options.selectedIndex = evt.target.options.selectedIndex
const setTimeIn = evt => timeInSelect.options.selectedIndex = evt.target.options.selectedIndex

const setTime = () => {
  timeInSelect.addEventListener('change', setTimeOut)
  timeOutSelect.addEventListener('change', setTimeIn)
}

export {disableAdForm, enableAdForm}
