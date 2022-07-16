import {getAllAdverts} from "./mock-adverts.js";
import {getPopups} from "./adverts-popup.js";
import {disableAdForm, enableAdForm} from "./form.js";
import {addValidator} from "./validate.js";


//console.log(getAllAdverts());

const getMarkersFromAdverts = (count) =>{
  let arr = getAllAdverts(count)
  getPopups(arr)
  return arr

}
//console.log();

(function () {
  disableAdForm();
  setTimeout(() => enableAdForm(), 5000)
}());


addValidator()
export {getMarkersFromAdverts}
