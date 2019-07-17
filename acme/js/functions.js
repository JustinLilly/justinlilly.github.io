/* *************************************
*  Acme Site JavaScript Functions
************************************* */
console.log('My javascript is being read.');    

// Variables for Function Use
let acmeURL = "https://justinlilly.github.io/acme/js/acme.json";


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
      let navLink = '';

      for (let i = 0; i < keys.length; i++){
        navLink += '<li><a href="#">' + keys[i] + '</a></li>';
      }
      console.log(navLink);
      document.getElementById('nav-list').innerHTML = navLink;
  })
  .catch(function(error){
    console.log('There was a fetch problem: ', error.message);
})
