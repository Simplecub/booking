const adFormElement = document.querySelector('.ad-form')
const filterFormElement = document.querySelector('.map__filters')


const disableAdForm = () => {
  adFormElement.classList.add('ad-form--disabled')
  adFormElement.querySelectorAll('fieldset').forEach((item) => item.setAttribute('disabled', 'disabled'))
  filterFormElement.classList.add('map__filters--disabled')
  filterFormElement.querySelectorAll('select').forEach((item) => item.setAttribute('disabled', 'disabled'))
}

const enableAdForm = () => {
  adFormElement.classList.remove('ad-form--disabled')
  adFormElement.querySelectorAll('fieldset').forEach((item) => item.disabled = false)
  filterFormElement.classList.remove('map__filters--disabled')
  filterFormElement.querySelectorAll('select').forEach((item) => item.disabled = false)
}


export {disableAdForm, enableAdForm}
