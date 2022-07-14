import {getAllAdverts} from "./adverts.js";
import {getPopups} from "./adverts-popup.js";
import {disableAdForm, enableAdForm} from "./form.js";


//console.log(getAllAdverts());


console.log(getPopups(getAllAdverts()));

(function () {
  disableAdForm();
  setTimeout(() => enableAdForm(), 5000)
}());
