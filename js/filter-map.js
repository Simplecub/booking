const filterFormElement = document.querySelector('.map__filters')


const disableFilter = () =>{
  filterFormElement.classList.add('map__filters--disabled')
  filterFormElement.querySelectorAll('select').forEach((item) => item.setAttribute('disabled', 'disabled'))
}

const enableFilter = () => {
  filterFormElement.classList.remove('map__filters--disabled')
  filterFormElement.querySelectorAll('select').forEach((item) => item.disabled = false)
}

class Filter {





}



const getFiltered = () => {
  filterFormElement.addEventListener('change', (evt) => {console.log(evt.target.value)})
}
getFiltered()
export {enableFilter, disableFilter}
