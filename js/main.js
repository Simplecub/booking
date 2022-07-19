import {getAllAdverts} from "./mock-adverts.js";
import {COUNT_ADVERTS} from "./mock-data.js";
import {disableAdForm, enableAdForm} from "./form.js";
import {startValidate} from "./validate.js";
import {getMap} from "./map.js";
import {getUiSlider} from "./slider.js";
import {getData} from "./api.js";
import {showFailMsg, showSuccessMsg} from "./events-messages.js";

document.addEventListener('DOMContentLoaded', async () => {
  disableAdForm();
  const {setMarkers,addMainPin} = await getMap()
  enableAdForm()
  const offers = await getData(showFailMsg).catch((e) => showFailMsg(e))
  setMarkers(offers)
  addMainPin()
  getUiSlider()
  startValidate()
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
