const adFormElement = document.querySelector('.ad-form')
const selectAvatarForm = adFormElement.querySelector('#avatar')
const previewAvatarElement = adFormElement.querySelector('.ad-form-header__preview')
const uploadPhoto = adFormElement.querySelector('.ad-form__photo-container')

const typeSelectElement = adFormElement.querySelector('#type')
const priceElement = adFormElement.querySelector('#price')
const timeInSelect = adFormElement.querySelector('#timein')
const timeOutSelect = adFormElement.querySelector('#timeout')

const disableAdForm = () => {
  adFormElement.classList.add('ad-form--disabled')
  adFormElement.querySelectorAll('fieldset').forEach((item) => item.setAttribute('disabled', 'disabled'))
 typeSelectElement.removeEventListener('change', selectType)
  timeInSelect.removeEventListener('change', setTimeOut)
  timeOutSelect.removeEventListener('change', setTimeIn)
  selectAvatarForm.removeEventListener('change', showPreviewAvatar)
  uploadPhoto.removeEventListener('change', showPreviewPhoto)

}

const enableAdForm = () => {
  adFormElement.classList.remove('ad-form--disabled')
  adFormElement.querySelectorAll('fieldset').forEach((item) => item.disabled = false)
  selectAvatarForm.addEventListener('change', showPreviewAvatar)
  uploadPhoto.addEventListener('change', showPreviewPhoto)
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

//функция предварительного просмотра фото - фотография должна загружаться в поле загрузки файлов в форме загрузки и показываться в окне.
const FILE_TYPE = ['gif', 'jpg', 'jpeg', 'png'];
const showPreviewAvatar = () => {
  const file = selectAvatarForm.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPE.some((it) => {
    return fileName.endsWith(it);
  });
  if (matches) {
    previewAvatarElement.querySelector('img').src = URL.createObjectURL(file);
  }
};

const showPreviewPhoto = () => {

  const file = uploadPhoto.querySelector('#images').files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPE.some((it) => {
    return fileName.endsWith(it);
  });
  if (matches) {
    uploadPhoto.querySelector('.ad-form__photo').innerHTML =
      `<img src=${URL.createObjectURL(file)} alt="Фотография жилья" width="70" height="70">`
  }
};



export {disableAdForm, enableAdForm}
