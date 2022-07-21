import {removeMessageEl} from "./util.js";

const errorElement = document.querySelector('#error').content.cloneNode(true)
const successElement = document.querySelector('#success').content.cloneNode(true)

const showFailMsg = (msg) => {
  errorElement.querySelector('.error__message').textContent = msg;
  document.body.appendChild(errorElement.cloneNode(true));
  removeMessageEl('error');
}

const showSuccessMsg = () => {
  document.body.append(successElement.cloneNode(true));
  removeMessageEl('success');
  // setTimeout(() => {document.body.querySelector('.success').remove()}, 2000);
}


export {showFailMsg, showSuccessMsg}
