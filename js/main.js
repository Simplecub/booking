import {getAllAdverts} from "./mock-adverts.js";
import {getPopups} from "./adverts-popup.js";
import {disableAdForm, enableAdForm} from "./form.js";
import {addValidator} from "./validate.js";


//console.log(getAllAdverts());


console.log(getPopups(getAllAdverts()));

(function () {
  disableAdForm();
  setTimeout(() => enableAdForm(), 5000)
}());


addValidator()
