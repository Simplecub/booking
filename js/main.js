import {getAllAdverts} from "./mock-adverts.js";
import {getPopups} from "./adverts-popup.js";
import {disableAdForm, enableAdForm} from "./form.js";
import {startValidate} from "./validate.js";
import {getMap} from "./map.js";
import {COUNT_ADVERTS} from "./mock-data.js";

//console.log(getAllAdverts());


//console.log();
/*
(function () {
  disableAdForm();
  setTimeout(() => enableAdForm(), 5000)
}());

 */
disableAdForm();

getMap(enableAdForm, startValidate, getAllAdverts(COUNT_ADVERTS))

export {enableAdForm}
