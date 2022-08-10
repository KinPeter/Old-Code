/**
 *  WELCOME, LOCATION and WEATHER functions
 */

//check if there is user name in the localstorage, if not, set it
var user;
if (!localStorage.name) {
    var name = prompt('It seems you\'re visiting for the first time. May I know your name?');
    localStorage.setItem('name', name);
    user = name;
} else {
    user = localStorage.name;
}

//starting function to get location by IP address and call the weather functions 
function getLocationByIP(user, dom1, dom2, callback) {
    dom1.html('<p>Loading location...</p>')
    $.getJSON('https://ipapi.co/json/', (data) => {
        console.log(data);
        dom1.html(`
            <h1>Hi ${user}!</h1>
            <p>You seem to be in <span class="emp">${data.city}</span>.</p> 
            <p class="separator"></p>
            <p>Today it's <span class="emp">${moment().format('dddd, YYYY MMMM Do')}</span>.</p>
            <p class="separator"></p> `);
        callback(data, dom2); //getWeather()
    }).fail((xhr, status, message) => {
        dom1.html('Sorry, something went wrong.' + status + ': ' + message);
    });
}

//function to get weather from DarkSky API via my PHP on the server and call the displaying function
function getWeather(loc, dom2) {
    var key = keys.weatherKey; //from separate js file 
    var cors = 'https://cors-anywhere.herokuapp.com/'; //if needed
    dom2.html('<p>Fetching weather data...</p>');
    $.getJSON(`${domain}/start/php/weather.php?lat=${loc.latitude}&lon=${loc.longitude}&key=${key}`, (data) => {
        console.log(data);
        showWeather(data, dom2);
    }).fail((xhr, status, message) => {
        dom2.html('Sorry, something went wrong.' + status + ': ' + message);
    });
}

//function to display the weather data (and call function to determine wind data)
function showWeather(data, dom2) {
    var andOrBut = data.currently.temperature !== data.currently.apparentTemperature ? 'but it' : 'and it also'
    var html = `
    <p>The weather is <span class="emp">${data.currently.summary}</span>, temperature is <span class="emp">${Math.round(data.currently.temperature)} &degC</span>, ${andOrBut} feels like <span class="emp">${Math.round(data.currently.apparentTemperature)} &degC</span>. ${windData(data)}</p>
    <p class="separator"></p>
    <p>They say it's gonna be <span class="emp">${data.daily.data[0].summary}</span></p>
    `
    dom2.html(html);
}

//function to compose wind data
function windData(data) {
    var wSpeed = data.currently.windSpeed;
    var wBearing = data.currently.windBearing;   
    var wDir, wScale = '';

    if (wSpeed > 1) {
        wScale = getWindScale(wSpeed);
        wDir = getWindDirection(wBearing);
        return `You can feel <span class="emp">${wScale}</span> from the <span class="emp">${wDir}</span>.`;
    } else {
        return 'Fortunately it\'s <span class="emp">not windy</span> today.';
    }
}
//function to determine wind direction
function getWindDirection(wBearing) {
    var wDir = '';
    if (wBearing == 0) {wDir = 'North';}
    else if (wBearing > 0 && wBearing < 90) {wDir = 'Northeast';}
    else if (wBearing == 90) {wDir = 'East';}
    else if (wBearing > 90 && wBearing < 180) {wDir = 'Southeast';}
    else if (wBearing == 180) {wDir = 'South';}
    else if (wBearing > 180 && wBearing < 270) {wDir = 'Southwest';}
    else if (wBearing == 270) {wDir = 'West';}
    else if (wBearing > 270 && wBearing < 360) {wDir = 'Northwest';}
    return wDir;
}
//function to determine wind scale
function getWindScale(wSpeed) {
    var wScale = '';
    if      (wSpeed > 1 && wSpeed <= 4) {wScale = 'Light breeze';}
    else if (wSpeed > 4 && wSpeed <= 9) {wScale = 'Light wind';}
    else if (wSpeed > 9 && wSpeed <= 13) {wScale = 'Moderate wind';}
    else if (wSpeed > 13 && wSpeed <= 19) {wScale = 'Strong wind';}
    else if (wSpeed > 19 && wSpeed <= 24) {wScale = 'Stormy wind';}
    else if (wSpeed > 24) {wScale = 'Crazy wind';}
    return wScale;
}