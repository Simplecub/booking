import {getAllAdverts} from "./mock-adverts.js";
import {getPopups} from "./adverts-popup.js";
import {disableAdForm, enableAdForm} from "./form.js";
import {startValidate} from "./validate.js";
import {getMap} from "./map.js";
import {COUNT_ADVERTS} from "./mock-data.js";
import {getUiSlider} from "./slider.js";
import {getData} from "./api.js";


disableAdForm();

//const array = getAllAdverts(COUNT_ADVERTS)
getData((array) => {
  getMap(enableAdForm, startValidate, getUiSlider, disableAdForm, array);
}, (i)=>console.log(i))




