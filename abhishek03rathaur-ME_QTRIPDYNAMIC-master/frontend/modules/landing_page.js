import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description\

 // console.log('from init()');
 // console.log(config);
  let cities = await fetchCities();
  //console.log(cities);
  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try{
  const cities_data = await fetch(config.backendEndpoint+'/cities');
  const data = await cities_data.json();
 return data;
}catch{
   return null;
 }

}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
   const row_data =document.getElementById("data");
   const col_element =document.createElement('div');
   col_element.setAttribute("class","col-sm-12 col-md-6 col-lg-3 mb-4");
   
   col_element.innerHTML =`
               <a href="pages/adventures/?city=${id}" id="${id}">
               <div class='tile'>
               <div class='tile-text'>
               <h5>${city}</h5>
               <p>${description}</p>
               </div>
               <img src="${image} alt="${id}" class='img-responsive'>
               </div>
               </a>
   `
   row_data.appendChild(col_element);
   return row_data;
}

export { init, fetchCities, addCityToDOM };
