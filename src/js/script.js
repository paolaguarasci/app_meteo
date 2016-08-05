// TODO
//  Esempio di chiamata delle API di OpenWeatherMap
//  http://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=b1b15e88fa797225412429c1c50c122a
// - manca la conversione in farenith!
//

var $ = require('jquery');

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

var lat, long, apiID, apiCall;
var condizioni, temperaturaC, temperaturaF, luogo, unitaDiMisura, nazione, icon, country;

lat = 0;
long = 0;
apiID = 'bcfc647b5d633c924d1b9b0f10190539';

var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

////////////////////////////////////////////////////////////////////////////////

function cambioUnitaDiMisura() {
  var t = $('#temp');
  var cof = $('#cof');
  if (cof.html() == ' C')
  {
    t.html(temperaturaF);
    cof.html(" F");
  }
  else
  {
    t.html(temperaturaC);
    cof.html(" C");
  }
}

function toFaren(tempC) {
  var f = (tempC * 1.8) + 32
  return Math.round(f * 10) / 10;
}

////////////////////////////////////////////////////////////////////////////////

// chiamata al JSON che restituisce la posizione
// tutto quello che usa long e lat deve stare
// dentro la funzione "succes"
$.ajax({
  url: 'http://ip-api.com/json/?callback=?',
  dataType: 'json',
  async: false,
  success: function(data){
    lat = data.lat;
    long = data.lon;
    country = data.countryCode;

    console.log(long + ' ' + lat);

    apiCall = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long;
    apiCall += '&APPID=' + apiID;
    apiCall += '&units=metric';
    apiCall += '&lang=' + country;
    // chiamata al JSON che restituisce le condizioni meteo
    // tutto quello che utilizza i dati meteo deve stare
    // all'interno della funzione callback()
    $.getJSON(apiCall, function (json) {
      condizioni = json.weather[0].description;
      temperaturaC = Math.round(json.main.temp * 10) / 10;
      temperaturaF = toFaren(temperaturaC);
      luogo = json.name;
      nazione = json.sys.country;
      icon = 'http://openweathermap.org/img/w/'+ json.weather[0].icon +'.png';

      $('.luogo').html(luogo + ', ' + nazione);
      $('.stato').html(condizioni.capitalize());
      $('#temp').html(temperaturaC);
      $('.ico').prop('src', icon);

      document.getElementById("cof").addEventListener("click", cambioUnitaDiMisura, false);
    });//end json call
  }// end function succes ajax
});// end ajax call
