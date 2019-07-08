/* *************************************
*  Weather Site JavaScript Functions
************************************* */
console.log('My javascript is being read.');    

// Variables for Function Use
let temp = 31;
let speed = 5;
let direction = "SSW"; // Set your own value
let weatherDesc = document.getElementById("weatherView");
let weatherCondition = getCondition(weatherDesc);
let weatherBackground = document.getElementById("currentWeather");
let meters = 1514.246;
let feet = 0;
let elevation = document.getElementById("elevation");
let statusContainer = document.getElementById('status');
let contentContainer = document.getElementById('main-content');

// Set global variable for custom header required by NWS API
var idHeader = {
    headers: {
      "User-Agent": "Student Learning Project - lil16003@byui.edu"
    }
  };
// Setup localStorage
var storage = window.localStorage;
 
// Get the next hour based on the current time
let date = new Date(); 
let nextHour = date.getHours() + 1;
let hourlyTemps = [];

// Function Calls
buildWC(speed, temp);
windDial(direction);
getCondition(weatherDesc);


// Calculate the Windchill
function buildWC(speed, temp) {
    let feelTemp = document.getElementById("feelTemp");
    
    // Compute the windchill
    console.log('Wind Chill Computations:');
    let wc = 35.74 + 0.6215 * temp - 35.75 * Math.pow(speed, 0.16) + 0.4275 * temp * Math.pow(speed, 0.16);
    console.log(wc);    

    // Round the answer down to integer
    wc = Math.floor(wc);

    // If chill is greater than temp, return the temp
    wc = (wc > temp)?temp:wc;

    // Display the windchill
    console.log(wc);
    feelTemp.innerHTML = Math.round(wc) + "&deg;F";
}

// Wind Dial Function
function windDial(degrees){
    // Get the wind dial container
    let dial = document.getElementById("dial");
    degrees = parseInt(degrees);
    dial.style.transform = "rotate(" + degrees + "deg)";

    if ((degrees >= 337.5 || (degrees >= 0 && degrees <= 22.5))) {
      document.getElementById("windDirection").innerHTML = "N";
    }
    else if (degrees > 22.5 && degrees <= 67.5) {
      document.getElementById("windDirection").innerHTML = "NE";
    }
    else if (degrees > 67.5 && degrees <= 112.5) {
      document.getElementById("windDirection").innerHTML = "E";
    }
    else if (degrees > 112.5 && degrees <= 157.5) {
      document.getElementById("windDirection").innerHTML = "SE";
    }
    else if (degrees > 157.5 && degrees <= 202.5) {
      document.getElementById("windDirection").innerHTML = "S";
    }
    else if (degrees > 202.5 && degrees <= 247.5) {
      document.getElementById("windDirection").innerHTML = "SW";
    }
    else if (degrees > 247.5 && degrees <= 292.5) {
      document.getElementById("windDirection").innerHTML = "W";
    }
    else if (degrees > 292.5 && degrees < 337.5) {
      document.getElementById("windDirection").innerHTML = "NW";
    }

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
    switch(weatherDesc) {
        case "Clear":
        weatherDesc = "clear"; break;
        case "Fog":
        case "foggy":
        case "Foggy":
        weatherDesc = "fog"; break;
        case "Rain":
        case "rainy":
        case "Rainy":
        case "Thunderstorms":
        case "thunderstorms":
        weatherDesc = "rain"; break;
        case "cloudy":
        case "Cloudy":
        case "Cloud":
        case "Partly Cloudy":
        weatherDesc = "cloud"; break;
        case "Snow":
        case "snowy":
        case "Snowy":
        weatherDesc = "snow"; break;
    }
    console.log('Weather Desc: ' + weatherDesc);
    return weatherDesc;
}
function changeSummaryImage(weatherCondition) {
    // Change summary image
    switch (weatherCondition) {
        case "clear":
        weatherBackground.setAttribute("class", "clear");
        weatherView.setAttribute("class", "clear"); break;
        case "fog":
        weatherBackground.setAttribute("class", "fog");
        weatherView.setAttribute("class", "fog"); break;
        case "rain":
        weatherBackground.setAttribute("class", "rain");
        weatherView.setAttribute("class", "rain"); break;
        case "cloud":
        weatherBackground.setAttribute("class", "cloudy");
        weatherView.setAttribute("class", "cloudy"); break;
        case "snow":
        weatherBackground.setAttribute("class", "snow");
        weatherView.setAttribute("class", "snow"); break;
    }
}

// Convert meters to feet function
function convertMeters(meters) {
    feet = Math.floor(meters * 3.28084);
    elevation.innerHTML = feet;
    return feet;
}

// Two New Functions
// Convert, Format time to 12 hour format
function format_time(hour) {
    if(hour > 23){ 
     hour -= 24; 
    } 
    let amPM = (hour > 11) ? "pm" : "am"; 
    if(hour > 12) { 
     hour -= 12; 
    } 
    if(hour == 0) { 
     hour = "12"; 
    } 
    return hour + amPM;
   }

   // Build the hourly temperature list
function buildHourlyData(nextHour, hourlyTemps) {
    // Data comes from a JavaScript object of hourly temp name - value pairs
    // Next hour should have a value between 0-23
    // The hourlyTemps variable holds an array of temperatures
    // Line 8 builds a list item showing the time for the next hour 
    // and then the first element (value in index 0) from the hourly temps array
     let hourlyListItems = '<li>' + format_time(nextHour) + ': ' + hourlyTemps[0] + '&deg;F</li>';
     // Build the remaining list items using a for loop
     for (let i = 1, x = hourlyTemps.length; i < x; i++) {
      hourlyListItems += '<li>' + format_time(nextHour+i) + ': ' + hourlyTemps[i] + '&deg;F</li>';
     }
     console.log('HourlyList is: ' +hourlyListItems);
     return hourlyListItems;
    }




/*******************
 * From geo_loc.js
 *******************/
// Gets location information from the NWS API
function getLocation(locale) {
    const URL = "https://api.weather.gov/points/" + locale; 
    // NWS User-Agent header (built above) will be the second parameter 
    fetch(URL, idHeader) 
    .then(function(response){
      if(response.ok){ 
       return response.json(); 
      } 
      throw new ERROR('Response not OK.');
    })
    .then(function (data) { 
      // Let's see what we got back
      console.log('Json object from getLocation function:'); 
      console.log(data);
      // Store data to localstorage 
      storage.setItem("locName", data.properties.relativeLocation.properties.city); 
      storage.setItem("locState", data.properties.relativeLocation.properties.state); 
   
      // Next, get the weather station ID before requesting current conditions 
      // URL for station list is in the data object 
      let stationsURL = data.properties.observationStations; 
      // Call the function to get the list of weather stations
      getStationId(stationsURL); 

      // Get hourly forecast and place in local storage
      const hourlyURL = data.properties.forecastHourly;
      console.log(`Hourly URL is: ${hourlyURL}`);

      storage.setItem("hourlyData", hourlyURL)

      const highLowURL = data.properties.forecast;
      console.log(`High/Low URL is: ${highLowURL}`);

      storage.setItem("highLowURL", highLowURL);

     }) 
    .catch(error => console.log('There was a getLocation error: ', error)) 
} // end getLocation function

// Gets weather station list and the nearest weather station ID from the NWS API
function getStationId(stationsURL) { 
    // NWS User-Agent header (built above) will be the second parameter 
    fetch(stationsURL, idHeader) 
    .then(function(response){
      if(response.ok){ 
       return response.json(); 
      } 
      throw new ERROR('Response not OK.');
    })
    .then(function (data) { 
      // Let's see what we got back
      console.log('From getStationId function:'); 
      console.log(data);
    
      // Store station ID and elevation (in meters - will need to be converted to feet) 
      let stationId = data.features[0].properties.stationIdentifier; 
      let stationElevation = data.features[0].properties.elevation.value; 
      console.log('Station and Elevation are: ' + stationId, stationElevation); 
   
      // Store data to localstorage 
      storage.setItem("stationId", stationId); 
      storage.setItem("stationElevation", stationElevation); 
   
      // Request the Current Weather for this station 
      getWeather(stationId);
     }) 
    .catch(error => console.log('There was a getStationId error: ', error)) 
   } // end getStationId function

// Gets current weather information for a specific weather station from the NWS API
function getWeather(stationId) { 
    // This is the URL for current observation data 
    const URL = 'https://api.weather.gov/stations/' + stationId + '/observations/latest';
    // NWS User-Agent header (built above) will be the second parameter 
    fetch(URL, idHeader) 
    .then(function(response){
      if(response.ok){ 
       return response.json(); 
      } 
      throw new ERROR('Response not OK.');
    })
    .then(function (data) { 
      // Let's see what we got back
      console.log('From getWeather function:'); 
      console.log(data);
    
      // Store weather information to localStorage 
      storage.setItem("windSpeed", data.properties.windSpeed.value);
      storage.setItem("currentTemp", data.properties.temperature.value);
      storage.setItem("direction", data.properties.windDirection.value);
      storage.setItem("summary", data.properties.textDescription);
      storage.setItem("coordinates0", data.geometry.coordinates[0]);
      storage.setItem("coordinates1", data.geometry.coordinates[1]);
      storage.setItem("elevation", data.properties.elevation.value);
      storage.setItem("gusts", data.properties.windGust.value);

      // storage.setItem("highTemp", data.properties.maxTemperatureLast24Hours.value);
      // storage.setItem("lowTemp", data.properties.minTemperatureLast24Hours.value);

      // Build the page for viewing 
      buildPage();
     }) 
    .catch(error => console.log('There was a getWeather error: ', error)) 
   } // end getWeather function

// Get the hourly forecast data for current location weather page
function getHourly() {
  fetch(storage.getItem("hourlyData"))
  .then(function(response){
    if(response.ok){
      return response.json();
    }
    throw new ERROR ('Response not OK.');
  })
  .then(function(data) {
    console.log("Results from Hourly Forecast:");
    console.log(data);

    let hourlyTemps = [];
    // Push hourlyTemps into local storage
    for (let i = 0; i < 13; i++){
      hourlyTemps[i] = data.properties.periods[i].temperature;
    }
    console.log(hourlyTemps);
    storage.setItem("hourlyTemps", hourlyTemps);
  })
  .catch(error => console.log('There was a getHourly error: ', error)) 
} // end getHourly function

// Populate the current location weather page
 function buildPage(){
  // Task 1 - Feed data to WC, Dial, Image, Meters to feet and hourly temps functions
  speed = storage.getItem("windSpeed");
  temp = convertToFahrenheit(storage.getItem("currentTemp"));
  buildWC(speed, temp);

  let degrees = storage.getItem("direction");
  windDial(degrees);

  weatherDesc = storage.getItem("summary");
  weatherCondition = getCondition(weatherDesc);
  changeSummaryImage(weatherCondition);

  let locElevation = storage.getItem("elevation");
  convertMeters(locElevation);

  getHourly();
  document.getElementById("hourlyData").innerHTML = buildHourlyData(nextHour, hourlyTemps);

  // Task 2 - Populate location information
    let fullName = storage.getItem("locName") + ", " + storage.getItem("locState");
    // Set the title with the location name at the first
    // Gets the title element so it can be worked with
    let pageTitle = document.getElementById('page-title');
    // Create a text node containing the full name 
    let fullNameNode = document.createTextNode(fullName);
    // inserts the fullName value before any other content that might exist
    pageTitle.insertBefore(fullNameNode, pageTitle.childNodes[0]);

  document.getElementById("contentHeading").innerHTML = fullName;
  document.getElementById("elevation").innerHTML = convertMeters(locElevation) + " ft. | ";
  document.getElementById("longitude").innerHTML = storage.getItem("coordinates0") + " &deg;N";
  document.getElementById("latitude").innerHTML = storage.getItem("coordinates1") + " &deg;W";
  
  // Task 3 - Populate weather information
  document.getElementById("tempCurrent").innerHTML = Math.round(temp) + "&deg;F";
  document.getElementById("windSpeed").innerHTML = Math.round(speed) + " mph";
  document.getElementById("gusts").innerHTML = Math.round(storage.getItem("gusts")) + " mph";
  document.getElementById("summaryCondition").innerHTML = storage.getItem("summary");

  // Task 4 - Hide status and show main
  contentContainer.setAttribute('class', ''); // removes the hide class
  statusContainer.setAttribute('class', 'hide'); // hides the status container
}

// Get degrees in Celsius and convert to Fahrenheit
function convertToFahrenheit(celsius) {
  return celsius * 9/5 + 32;
}