const adFormElement = document.querySelector('.ad-form')
const submitButton = adFormElement.querySelector('.ad-form__submit')

const config = {
  classTo: 'ad-form__element',
  errorClass: 'ad-form--invalid',
  successClass: 'ad-form--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'form__error'
};
const addValidator = () => {
  const pristine = new Pristine(adFormElement, config);
  pristine.validate();

  adFormElement.onsubmit = (evt) => {
    if (!pristine.validate() || 0 ) {
      console.log('errr');
      evt.preventDefault()
    }
  }


}


export {addValidator}
