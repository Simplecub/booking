const adFormElement = document.querySelector('.ad-form')
const submitButton = adFormElement.querySelector('.ad-form__submit')


adFormElement.querySelectorAll('input').forEach((item) => {
  if (item.hasAttribute('required')) {
    item.setAttribute('data-pristine-required-message', "Обязательно для заполнения")
  }
})

const config = {
  classTo: 'ad-form__element', //выбор элементов для валидации
  errorClass: 'form__error',  //добавляет класс (для изменения цвета текста если валидация не пройдена)
  successClass: 'ad-form--valid', //добавляет класс ad-form--valid (не используется)
  errorTextParent: 'ad-form__element', //родительский элемент для которого будет отображена ошибка валидации
  errorTextTag: 'span',   //сообщение ошибки выводится - как строка
  errorTextClass: 'form__error' //к сообщению об ошибки применяется класс ..'form__error'
};
const addValidator = () => {
  const pristine = new Pristine(adFormElement, config);
  pristine.validate();

  adFormElement.onsubmit = (evt) => {
    if (!pristine.validate() || 0) {
      console.log('errr');
      evt.preventDefault()
    }
  }


}


export {addValidator}
