import Notiflix from "notiflix";

import "../src/sass/styles.scss"
import debounce from 'lodash.debounce';
import fetchCountries from './js/fetchCountries.js';
import cardTemplate from "../src/partials/country.hbs";
import cardsTemplate from "../src/partials/countries.hbs";

let inputNameCountry = document.getElementById("search-box");
let insertCountry = document.querySelector(".country-info");
let insertCountries = document.querySelector(".country-list");

inputNameCountry.addEventListener("input", debounce(inputCountry, 500));

function inputCountry(e) {
   insertCountries.innerHTML = '';
   insertCountry.innerHTML = '';
    fetchCountries(e.target.value.trim())
    
     
    .then(countries => {
        if (e.target.value.trim() === '') {
          return;
        }
        if (countries.length === 1) {
        
        insertCountry.innerHTML = cardTemplate(countries);
       
    }
        else if (countries.length >= 2 && countries.length <= 10) {
        insertCountries.innerHTML = cardsTemplate(countries);
    }
        else if (countries.length >10) {
          Notiflix.Notify.init({width:'500px', fontSize:'18px', timeout:4000, messageMaxLength:200});
          Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
            }
            else if (countries.status===404){
              throw new Error(countries.status);
            }
           
})

.catch(error => {
  console.log("erroe", error);
  Notiflix.Notify.init({width:'500px', fontSize:'18px', timeout:4000, messageMaxLength:200});
  Notiflix.Notify.failure('Oops, there is no country with that name');
})
}



    
