const errorElement = document.querySelector('#error').content.cloneNode(true)
const successElement = document.querySelector('#success').content.cloneNode(true)

const showFailMsg = (msg) => {
  errorElement.querySelector('.error__message').textContent = msg
  document.body.appendChild(errorElement.cloneNode(true))
  document.body.querySelector('.error__button').addEventListener('click', () => {
    document.body.querySelector('.error').remove()
  }, {once: true})
  console.log(errorElement)
}

const showSuccessMsg = () => {
  document.body.append(successElement.cloneNode(true))
  console.log(successElement)
  setTimeout(() => {
    document.body.querySelector('.success').remove()
  }, 3000)
}


export {showFailMsg, showSuccessMsg}
