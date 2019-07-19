/* *************************************
*  Acme Site JavaScript Functions
************************************* */
console.log('My javascript is being read.');    

// Variables for Function Use
let acmeURL = "https://justinlilly.github.io/acme/js/acme.json";
let homePage = document.getElementById("home-page");
let contentPage = document.getElementById("content-page");

let navList = document.getElementById("nav-list")
let name = document.getElementById("product-name");
let path = document.getElementById("path");
let description = document.getElementById("product-description");
let manufacturer = document.getElementById("product-manufacturer");
let price = document.getElementById("product-price");
let reviews = document.getElementById("product-rating");
let title = document.getElementById("page-title");

// Function Calls


// Build and Display Navigation Bar
fetch(acmeURL)
  .then(function(response){
      if(response.ok){
          return response.json();
      }
      throw new ERROR('Response not OK.');
  })
  .then(function(data){
      console.log(data);
      let keys = Object.keys(data);
      console.log(keys);
      let navLink = '<li><a href="#">Home</a></li>';

      for (let i = 0; i < keys.length; i++){
        navLink += '<li><a href="#">' + keys[i] + '</a></li>';
      }
      console.log(navLink);
      document.getElementById('nav-list').innerHTML = navLink;
  })
  .catch(function(error){
    console.log('There was a fetch problem: ', error.message);
})

// Page Title
title.insertBefore(document.createTextNode("Home"), title.childNodes[0]);

navList.addEventListener('click', function(evt) {

  let itemSelect = evt.target.innerHTML;
  console.log(itemSelect);
  title.innerHTML = itemSelect;


  if(itemSelect == "Home"){
    homePage.classList.remove("hidden");
    contentPage.classList.add("hidden");
  }
  else { 
    homePage.classList.add("hidden");
    contentPage.classList.remove("hidden");
    fetch(acmeURL)
    .then(function(response){
      if(response.ok){
        return response.json();
      }
      throw new ERROR('Response not OK.');
    })
    .then(function(data){
      let itemInfo = data[itemSelect];
      console.log(itemInfo);

      name.innerHTML = itemInfo.name;
      path.src = itemInfo.path;
      description = itemInfo.description;
      manufacturer = itemInfo.manufacturer;
      price = itemInfo.price;
      reviews = itemInfo.reviews;

    })
  }
})