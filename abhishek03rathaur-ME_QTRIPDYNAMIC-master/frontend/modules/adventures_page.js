import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
 let paramString  = search.split('?')[1];
 let query = new URLSearchParams(paramString);
 let city_id ;
 for(let pair of query.entries()){
   city_id=pair[1];
 }
 return city_id;

}


//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  const city_id =getCityFromURL(`?city=${city}`);
  try{
  //const city_id =getCityFromURL(`?city=${city}`);
  const fetched_data = await fetch(config.backendEndpoint+`/adventures?city=${city_id}`);
  const data = await fetched_data.json();
   return data;
  }catch{
      return null;
  }

}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  const row = document.querySelector("#data");
  
  adventures.forEach((ele) => {

    const col_data = document.createElement('div');

    col_data.setAttribute("class","col-sm-12 col-md-6 col-lg-3 mb-4 position-relative");
        
    col_data.innerHTML= `
              <a href="detail/?adventure=${ele.id}" id="${ele.id}">
              <div class="category-banner ">${ele.category}</div>
              <div class="activity-card">
               
                <img src="${ele.image}" alt="${ele.id}" class="img-responsive" />

                <div class="card-text-container text-md-center w-100 mt-3">
                <div class="d-block d-md-flex justify-content-between flex-wrap px-3">
                 <h5 class="text-left">${ele.name}</h5>
                 <p>₹${ele.costPerHead}</p>
                </div>
              
                <div class="d-block d-md-flex justify-content-between flex-wrap px-3">
                 <h5 class="text-left">Duration</h5>
                 <p>${ele.duration} Hours</p>
                </div>
               </div>

              </div>

           </a>` 
      row.appendChild(col_data);
  });


return row;
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list

  let filtered_list = [];
 for(let i=0;i<list.length;i++){
   if(list[i].duration>=low && list[i].duration<=high){
     filtered_list.push(list[i]);
   }
 }
 return filtered_list;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list

  let filtered_list = [];
  for(let i=0;i<list.length;i++){
    for(let j=0;j<categoryList.length;j++){
      if(list[i].category === categoryList[j]){
        filtered_list.push(list[i]);
      }
    }
  }
 
  return filtered_list;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures

  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  let filteredList = [];
 
  // 1. filter By Category and Duration
  if(filters['category'].length>0 && filters['duration'].length>0){

    let lowHigh = filters["duration"].split('-');
    filteredList=filterByDuration(list,parseInt(lowHigh[0]),parseInt(lowHigh[1]));
    
    filteredList= filterByCategory(filteredList,filters["category"]); 
     
  }else if(filters["duration"].length >0) {
   
   // 2. Filter By Duration 

    let lowHigh = filters["duration"].split('-');
    filteredList=filterByDuration(list,parseInt(lowHigh[0]),parseInt(lowHigh[1]));
  
  }else if(filters['category'].length>0){
   // 3.Filter By Category 
   filteredList= filterByCategory(list,filters["category"]);
  
  }else{
     filteredList=list;
  }

 return filteredList;

}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem("filters",JSON.stringify(filters));

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object

    return    JSON.parse( localStorage.getItem('filters'));
  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  
  const div_category = document.querySelector("#category-list");
  filters.category.forEach((ele)=>{
    const pElement = document.createElement('p');
    pElement.setAttribute("class","category-filter");
    pElement.innerText=`${ele}`
    div_category.appendChild(pElement);
  });
  return div_category;
  
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
