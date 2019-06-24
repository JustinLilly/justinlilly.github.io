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
function buildHourlyData(nextHour,hourlyTemps) {
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

    // Get the next hour based on the current time
    let date = new Date(); 
    let nextHour = date.getHours() + 1;