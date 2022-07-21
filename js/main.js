import {getAllAdverts} from "./mock-adverts.js";
import {getDebounce} from "./util.js";
import {disableAdForm, enableAdForm} from "./form.js";
import {startValidate} from "./validate.js";
import {getMap} from "./map.js";
import {getUiSlider} from "./slider.js";
import {getData} from "./api.js";
import {showFailMsg, showSuccessMsg} from "./events-messages.js";
import {enableFilter, disableFilter, onFiltered} from "./filter-map.js";
const TIME_OUT = 500;
const filterFormElement = document.querySelector('.map__filters')
document.addEventListener('DOMContentLoaded', async () => {
  disableAdForm();
  disableFilter()

  const {setMarkers, addMainPin} = await getMap()
  enableAdForm()

  const offers = await getData(showFailMsg).catch((e) => showFailMsg(e))
  setMarkers(offers)
  addMainPin()
  getUiSlider()
  startValidate()
  enableFilter()
  filterFormElement.addEventListener('change', getDebounce((evt) => setMarkers(onFiltered(evt, offers)), TIME_OUT))

})


/*
//const array = getAllAdverts(COUNT_ADVERTS)
getData((array) => {
  getMap(enableAdForm, startValidate, getUiSlider, disableAdForm, array);
}, (i) => {
  showFailMsg(i)
  console.log(i)
})

//showFailMsg()
// onSuccess()




 */
