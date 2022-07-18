import {getAllAdverts} from "./mock-adverts.js";
import {COUNT_ADVERTS} from "./mock-data.js";
import {disableAdForm, enableAdForm} from "./form.js";
import {startValidate} from "./validate.js";
import {getMap} from "./map.js";
import {getUiSlider} from "./slider.js";
import {getData} from "./api.js";
import {showFailMsg, showSuccessMsg} from "./events-messages.js";


disableAdForm();

//const array = getAllAdverts(COUNT_ADVERTS)
getData((array) => {
  getMap(enableAdForm, startValidate, getUiSlider, disableAdForm, array);
}, (i) => {
  showFailMsg(i)
  console.log(i)
})

//showFailMsg()
// onSuccess()


