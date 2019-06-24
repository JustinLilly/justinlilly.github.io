"use strict";
let weatherURL = "https://justinlilly.github.io/weather/js/weather.json";

// Call fetch function
fetchData(weatherURL);

// Variables
let pageNav = document.getElementsByClassName('page-nav');
let statusContainer = document.getElementById('status');
let contentContainer = document.getElementById('main-content');



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
    let locTempHigh = g.High;
    let locTempLow = g.Low;
    console.log('Temp: ' + locTemp);
    console.log('High: ' + locTempHigh);
    console.log('Low: ' + locTempLow);

    // Get the wind data 
    let locWind = g.Wind;
    let locWindDirection = g.Direction;
    let locWindGusts = g.Gusts;
    console.log('Wind: ' + locWind);
    console.log('Direction: ' + locWindDirection);
    console.log('Gusts: ' + locWindGusts);


    // Get the current conditions
    let locSummary = g.Summary;
    console.log('Summary: ' + locSummary);

    // Get the hourly data 
    let hourly = g.Hourly;
    console.log('Hourly: ' + hourly);

    // Get the location data continued
    let locLongitude = g.Longitude;
    let locLatitude = g.Latitude;
    let locElevation = g.Elevation;
    let locZip = g.Zip;
    console.log('Longitude: ' + locLongitude);
    console.log('Latitude: ' + locLatitude);
    console.log('Elevation: ' + locElevation);
    console.log('Zip: ' + locZip);

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
    document.getElementById("tempCurrent").innerHTML = locTemp + "&deg;F";
    document.getElementById("tempHigh").innerHTML = locTempHigh + "&deg;F";
    document.getElementById("tempLow").innerHTML = locTempLow + "&deg;F";
    buildWC(locWind, locTemp);

    // Set the wind information
    document.getElementById("windSpeed").innerHTML = locWind + " mph";
    document.getElementById("windDirection").innerHTML = locWindDirection;
    document.getElementById("gusts").innerHTML = locWindGusts + "mph";

    // Set the current conditions information
    document.getElementById("summaryCondition").innerHTML = locSummary;
    changeSummaryImage(locSummary);

    // Set the hourly temperature information
    let hourlyTemp = document.getElementById('hourlyData');
    hourlyTemp = buildHourlyData(nextHour, hourly);
    document.getElementById('hourlyData').innerHTML = hourlyTemp;

    // Set the location data continued
    document.getElementById("longitude").innerHTML = locLongitude + " &deg;N, ";
    document.getElementById("latitude").innerHTML = locLatitude + " &deg;W";
    document.getElementById("elevation").innerHTML = convertMeters(locElevation) + " ft. | ";
    document.getElementById("zip").innerHTML = locZip + " | ";

    // Change the status of the containers
    contentContainer.setAttribute('class', ''); // removes the hide class
    statusContainer.setAttribute('class', 'hide'); // hides the status container
  })
  .catch(function(error){
  console.log('There was a fetch problem: ', error.message);
  statusContainer.innerHTML = 'Sorry, the data could not be processed.';
  })
}