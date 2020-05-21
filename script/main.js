"use strict";

const ZERO_ABS = -273.15;

/**
 * Make some usefull conversions
 */
const CONV = {
    /**
     * Convert °K -> °C
     */
    k_a_c: k => (k + ZERO_ABS).toFixed(1),

    /**
     * Provides time with format hh:mm from timestamp
     */
    dt_a_hm: dt => {
        let date = new Date(dt * 1000);
        return ("0" + date.getHours()).substr(-2) + "h :" + (date.getMinutes() + "0").substr(0, 2);
    }

}

/**
 * Latitude and longitude of Montréal city 
 */
 const 
 MONTREAL = {
     lat: 45.508320,
     lon: -73.566431,
 },
 
 ARIZONA =
 {
     lat: -28.3908,
     lon: -43.3812,
 },
 NORTHCAROLINA =
 {
     lat: 35.7596,
     lon: 79.0193,
 };
 

 
 const OW_API = {
     base_api_url: 'http://api.openweathermap.org/data/2.5/',
     base_icon_url: 'http://openweathermap.org/img/w/',
     weather: 'weather?lat={lat}&lon={lon}',
     forecast: 'forecast?lat={lat}&lon={lon}',
     key: '&APPID=d372021858e26c181fc642ca0f0dbd18',
 
     //http://api.openweathermap.org/data/2.5/weather?lat=45.508320&lon=-73.566431&appid=d372021858e26c181fc642ca0f0dbd18
     get_weather_url: function (lat, lon) {
         return this.base_api_url + this.weather.replace('{lat}', lat).replace('{lon}', lon) + this.key;
     },

    //http://api.openweathermap.org/data/2.5/forecast?lat=45.508320&lon=-73.566431&appid=d372021858e26c181fc642ca0f0dbd18
     get_forecast_url: function (lat, lon) {
         return this.base_api_url + this.forecast.replace('{lat}', lat).replace('{lon}', lon) + this.key;
     },

     //http://openweathermap.org/img/w/10d.png
     get_icon_url: function (icon_id) {
         return this.base_icon_url + icon_id + ".png";
     },
 };

 // AJAx request and temperature description for the current weather of montreal
 let xhr1 = new XMLHttpRequest();
 xhr1.open("GET", OW_API.get_weather_url(MONTREAL.lat,MONTREAL.lon), true);
 xhr1.send();
 xhr1.addEventListener ('load',function(e){
     if (xhr1.readyState === XMLHttpRequest.DONE) {
         if (xhr1.status === 200) 
         {
             console.log('Request1 :', xhr1.responseText);
              let jsobj = JSON.parse(xhr1.responseText);
             console.log(jsobj);
             console.log(jsobj.main.temp);
             console.log(jsobj.weather[0].description);
             console.log(jsobj.weather[0].icon);
                         
             let d = new Date();
             
             let view = document.getElementById("current");
             console.log(view);
             
             document.querySelector(".hour .val").innerHTML = (d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds());
             document.querySelector(".temperature .val").innerHTML = CONV.k_a_c(jsobj.main.temp)+"&deg;C";
             document.querySelector(".description .val").innerHTML = jsobj.weather[0].description;
 
             view.getElementsByClassName("icon")[0].getElementsByClassName('val')[0].src = OW_API.get_icon_url(jsobj.weather[0].icon);
            
         }
     }
 });

 //Access of the buttion by getelement by tag name
let search = document.getElementsByClassName("search")[0];
console.log(search);

// Addeventlisterner for the click event ,
// Switch cases for the city options on the selection from the drop down
search.addEventListener('click',function()
{
    let select = document.getElementById('select_city');
    let value = select.value;
    switch(value)
{
    case "Montreal":
     displayWeather(MONTREAL.lat,MONTREAL.lon);
    break;

    case "Arizona":
     displayWeather(ARIZONA.lat,ARIZONA.lon);
    break;
    
    case "North-Carolina":
    displayWeather(NORTHCAROLINA.lat,NORTHCAROLINA.lon);
     break;
    
     case "Gujarat":
     displayWeather(GUJARAT.lat,GUJARAT.lon);  //this is not properly works for the temperature 
    break;
    
    case "Toronto":
     displayWeather(TORONTO.lat,TORONTO.lon);    //this is not properly works for the temperature           
     break;
    
    default:
      console.log("defaut");
     break;
}
});

// function for the weather description with the help of latitude and longitude
function displayWeather(lat,lon)
{
let xhr2 = new XMLHttpRequest();
xhr2.open("GET", OW_API.get_forecast_url(lat,lon), true );
xhr2.send();
xhr2.addEventListener ('load',function(e){
    if (xhr2.readyState === XMLHttpRequest.DONE) {
        if (xhr2.status === 200)                        //holds the status of the XMLHttpRequst object
        {
            console.log('Request1 :', xhr2.responseText);
             let jsobj = JSON.parse(xhr2.responseText);
            console.log(jsobj);            
            console.log(jsobj.city.name);
            console.log(jsobj.city.coord.lat);
            console.log(jsobj.city.coord.lon);

            let table = document.getElementById("for_forecast").getElementsByClassName("for_data")[0];
            console.log(table);                             
            let tbody = document.getElementsByTagName("tbody")[0];
            console.log(tbody);
            
            while(tbody.firstElementChild.nextElementSibling)
            {
                tbody.removeChild(tbody.firstElementChild.nextElementSibling);
            }

            for (let data of jsobj.list) 
            {
                let tableNode = table.cloneNode(true);      //for appending the child node 
                tableNode.classList.remove("for_data");
                tbody.appendChild(tableNode);
                table.getElementsByClassName("time")[0].innerHTML = data.dt_txt;
                table.getElementsByClassName("temperature")[0].innerHTML = CONV.k_a_c(data.main.temp) +"&deg;C";
                table.getElementsByClassName("wind")[0].innerHTML = data.wind.speed + " km/h";
                table.getElementsByClassName("icon")[0].getElementsByTagName("img")[0].src = OW_API.get_icon_url(data.weather[0].icon);
                table.getElementsByClassName("description")[0].innerHTML = data.weather[0].description;
            }
        }
    }
});
}
// Celcius and feranhit buttons are static


