const errorElement = document.querySelector('#error').content.cloneNode(true)
const closeButton = errorElement.querySelector('.error__button')
const  successElement = document.querySelector('#success').content.cloneNode(true)

const showFailMsg = () => {
 document.body.appendChild(errorElement)
  closeButton.addEventListener('click', ()=> {document.body.querySelector('.error').remove()}, {once: true})
  console.log(errorElement)
}

const showSuccessMsg =() => {
   document.body.append(successElement)
  console.log(successElement)
setTimeout(()=>{document.body.querySelector('.success').remove()}, 3000)
}


export {showFailMsg, showSuccessMsg}
