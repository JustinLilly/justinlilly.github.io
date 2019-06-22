/* *************************************
*  Weather Site JavaScript Functions
************************************* */
console.log('My javascript is being read.');    

// Variables for Function Use
let temp = 31;
let speed = 5;
let direction = "SSW"; //Set your own value
let weatherDesc = "Rainy";
let weatherCondition = "";


buildWC(speed, temp);
windDial(direction);
getCondition(weatherDesc);

// Calculate the Windchill
function buildWC(speed, temp) {
    let feelTemp = document.getElementById("feelTemp");
    
    // Compute the windchill
    let wc = 35.74 + 0.6215 * temp - 35.75 * Math.pow(speed, 0.16) + 0.4275 * temp * Math.pow(speed, 0.16);
    console.log(wc);    

    // Round the answer down to integer
    wc = Math.floor(wc);

    // If chill is greater than temp, return the temp
    wc = (wc > temp)?temp:wc;

    // Display the windchill
    console.log(wc);
    feelTemp.innerHTML = wc;
}

// Wind Dial Function
function windDial(direction){
    // Get the wind dial container
    let dial = document.getElementById("dial");

    // Determine the dial class
    switch (direction){
        case "North":
        case "N":
        dial.setAttribute("class", "n"); //"n" is the CSS rule selector
        break;
        case "NE":
        case "NNE":
        case "ENE":
        dial.setAttribute("class", "ne");
        break;
        case "NW":
        case "NNW":
        case "WNW":
        dial.setAttribute("class", "nw");
        break;
        case "South":
        case "S":
        dial.setAttribute("class", "s");
        break;
        case "SE":
        case "SSE":
        case "ESE":
        dial.setAttribute("class", "se");
        break;
        case "SW":
        case "SSW":
        case "WSW":
        dial.setAttribute("class", "sw");
        break;
        case "East":
        case "E":
        dial.setAttribute("class", "e");
        break;
        case "West":
        case "W":
        dial.setAttribute("class", "w");
        break;
   }
}


// Get Condition function
function getCondition(weatherDesc) {
    // Determine weather condition
    if(weatherDesc == "whatever") {
        weatherCondition = "Clear";
    }
    if(weatherDesc == "whatever") {
        weatherCondition = "Cloud";
    }
    if(weatherDesc == "whatever") {
        weatherCondition = "Fog";
    }
    if(weatherDesc == "whatever") {
        weatherCondition = "Rain";
    }
    if(weatherDesc == "whatever") {
        weatherCondition = "Snow";
    }
    return weatherCondition;
}
function changeSummaryImage(weatherCondition) {
    // Change summary image
    switch (weatherCondition) {
        case "clear":
        case "Clear":
        weatherView.setAttribute("class", "clear"); break;
        case "fog":
        case "Fog":
        case "foggy":
        case "Foggy":
        weatherView.setAttribute("class", "fog"); break;
        case "rain":
        case "Rain":
        case "rainy":
        case "Rainy":
        weatherView.setAttribute("class", "rain"); break;
        case "cloudy":
        case "Cloudy":
        case "cloud":
        case "Cloud":
        weatherView.setAttribute("class", "cloudy"); break;
        case "snow":
        case "Snow":
        case "snowy":
        case "Snowy":
        weatherView.setAttribute("class", "snow"); break;
    }
}




/*********************  Not Ready for this yet ***************/

let weatherURL = "path/to/weather.json";
function fetchData(weatherURL){
  let cityName = 'Greenville'; // The data we want from the weather.json file
  fetch(weatherURL)
  .then(function(response) {
  if(response.ok){
  return response.json();
  }
  throw new ERROR('Network response was not OK.');
  })
  .then(function(data){
    // Check the data object that was retrieved
    console.log(data);
    // data is the full JavaScript object, but we only want the greenville part
    // shorten the variable and focus only on the data we want to reduce typing
    let g = data[cityName];

    // ************ Get the content ******************************

    // Get the location data
    let locName = g.City;
    let locState = g.State;
    // Put them together
    let fullName = locName+', '+locState;
    // See if it worked
    console.log('fullName is: '+fullName);

    // Get the temperature data
    let locTemp = g.Temp;

    // Get the wind data 
    let wind = g.Wind;

    // Get the current conditions


    // Get the hourly data 

    // ************ Display the content ******************************
    // Set the title with the location name at the first
    // Gets the title element so it can be worked with
    let pageTitle = document.getElementById('page-title');
    // Create a text node containing the full name 
    let fullNameNode = document.createTextNode(fullName);
    // inserts the fullName value before any other content that might exist
    pageTitle.insertBefore(fullNameNode, pageTitle.childNodes[0]);
    // When this is done the title should look something like this:
    // Greenville, SC | The Weather Site

    // Set the Location information
    // Get the h1 to display the city location
    let contentHeading = document.getElementById('contentHeading');
    contentHeading.innerHTML = fullName;
    // The h1 in main h1 should now say "Greenville, SC"


    // Set the temperature information
    document.getElementById("curTemp").innerHTML = locTemp;

    // Set the wind information
    document.getElementById("wind-speed").innerHTML = wind;

    // Set the current conditions information


    // Set the hourly temperature information


    // Change the status of the containers
    contentContainer.setAttribute('class', ''); // removes the hide class
    statusContainer.setAttribute('class', 'hide'); // hides the status container
  })
  .catch(function(error){
  console.log('There was a fetch problem: ', error.message);
  statusContainer.innerHTML = 'Sorry, the data could not be processed.';
  })
}