// TODO
//  Esempio di chiamata delle API di OpenWeatherMap
//  http://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=b1b15e88fa797225412429c1c50c122a
//
var $ = require('jquery');

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

var lat, long, apiID, apiCall;
var condizioni, temperatura, luogo, unitaDiMisura, nazione, icon;
lat = 0;
long = 0;
apiID = 'bcfc647b5d633c924d1b9b0f10190539';

var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};


function success(pos) {
  lat = pos.coords.latitude;
  long = pos.coords.longitude;
  apiCall = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long;
  apiCall += '&APPID=' + apiID;
  apiCall += '&units=metric';
  apiCall += '&lang=IT';
  $.getJSON(apiCall, function (json) {
    condizioni = json.weather[0].description;
    temperatura = Math.round(json.main.temp * 10) / 10;
    luogo = json.name;
    nazione = json.sys.country;
    unitaDiMisura = ' °C'
    icon = 'http://openweathermap.org/img/w/'+ json.weather[0].icon +'.png'
    $('.luogo').html(luogo + ', ' + nazione);
    $('.stato').html(condizioni.capitalize());
    $('.temp').html(temperatura + unitaDiMisura);
    $('.ico').prop('src', icon);










  });
};

function error(err) {
  console.warn('ERROR(' + err.code + '): ' + err.message);
};

navigator.geolocation.getCurrentPosition(success, error, options);
