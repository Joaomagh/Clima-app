import React, { useState } from 'react'
import './WheaterApp.css'
import search_icon from '../Assets/search.png';
import clear_icon from '../Assets/clear.png';
import clear_moon_icon from '../Assets/clear_moon.png';
import cloud_icon from '../Assets/cloud.png';
import cloud_moon_icon from '../Assets/cloud_moon.png';
import drizzle_icon from '../Assets/drizzle.png';
import drizzle_moon_icon from '../Assets/drizzle_moon.png'
import rain_icon from '../Assets/rain.png';
import snow_icon from '../Assets/snow.png';
import wind_icon from '../Assets/wind.png';
import humidity_icon from '../Assets/humidity.png';

const WheaterApp = () => {

  let api_key = "5d9b7c5306d526ddb68da9ed67b3a8b4";

  const [wicon,setWicon] = useState(cloud_icon);

  const search = async () => {
    const element = document.getElementsByClassName("cityInput");
    if (element[0].value ==="") {
      return 0;
    }

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;


    let response = await fetch (url);
    let data = await response.json();
    const humidity = document.getElementsByClassName("humidity-percent")
    const wind = document.getElementsByClassName("wind-rate")
    const temperature = document.getElementsByClassName("weather-temp")
    const location = document.getElementsByClassName("weather-location")

    humidity[0].innerHTML = data.main.humidity+ "%";
    wind[0].innerHTML = Math.floor(data.wind.speed)+ " km/h";
    temperature[0].innerHTML = Math.floor(data.main.temp)+ " ºC";
    location[0].innerHTML = data.name;


    const iconMappings = {
      "01d": clear_icon,
      "01n": clear_moon_icon,
      "02d": cloud_icon,
      "02n": cloud_moon_icon,
      "03d": drizzle_icon,
      "03n": drizzle_moon_icon,
      "04d": drizzle_icon,
      "04n": drizzle_moon_icon,
      "09d": rain_icon,
      "09n": rain_icon,
      "10d": rain_icon,
      "10n": rain_icon,
      "13d": snow_icon,
      "13n": snow_icon,
    };

    const defaultIcon = clear_icon; // Ícone padrão

    if (data.weather[0] && data.weather[0].icon) {
      const weatherIcon = data.weather[0].icon;
      setWicon(iconMappings[weatherIcon] || defaultIcon);
    } else {
      setWicon(defaultIcon);
    }

  };

  return (
    <div className='container'>
      <div className='top-bar'>
        <input type='text' className='cityInput' placeholder='Search' />
        <div className='search-icon' onClick={() =>{search()}}>
            <img src={search_icon} alt='lupa de procurar' />
        </div>
      </div>
      <div className="weather-image">
        <img src={wicon} alt="" />
      </div>
        <div className="weather-temp">-1ºC</div>
        <div className="weather-location">Alaska</div>
        <div className="data-container">
          <div className="element">
            <img src={humidity_icon} alt="" className="icon" />
            <div className="data">
              <div className="humidity-percent">64%</div>
              <div className="text">humidity</div>
            </div>
          </div>
          <div className="element">
            <img src={wind_icon} alt="" className="icon" />
            <div className="data">
              <div className="wind-rate">18 km/h</div>
              <div className="text">Veloc. vento</div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default WheaterApp
