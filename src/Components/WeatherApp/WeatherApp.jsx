import React, { useRef, useState } from "react";
import "./WeatherApp.css";
import search from "../Assessts/search.png";
import clear from "../Assessts/clear.png";
import cloud from "../Assessts/cloud.png";
import drizzle from "../Assessts/drizzle.png";
import humidity from "../Assessts/humidity.png";
import rain from "../Assessts/rain.png";
import snow from "../Assessts/snow.png";
import wind from "../Assessts/wind.png";

export const WeatherApp = () => {
  const serachRef = useRef();
  const [weather, setWeather] = useState({
    location: "",
    temp: "",
    wind: "",
    humidity: "",
  });
  const [img, setImg] = useState(cloud);
  let key = "94d3ce2f3a02da52f0d6a994027b1276";

  const handleClick = async () => {
    if (serachRef.current.value === "") {
      return;
    }
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${serachRef.current.value}&units=Metric&appid=${key}`;
    let res = await fetch(url);
    try {
      let data = await res.json();
      let winds = Math.floor(data.wind.speed);
      setWeather({
        location: data.name,
        temp: data.main.temp,
        wind: winds,
        humidity: data.main.humidity,
      });
      if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
        setImg(clear);
      } else if (
        data.weather[0].icon === "02d" ||
        data.weather[0].icon === "02n"
      ) {
        setImg(cloud);
      } else if (
        data.weather[0].icon === "03d" ||
        data.weather[0].icon === "03n"
      ) {
        setImg(drizzle);
      } else if (
        data.weather[0].icon === "04d" ||
        data.weather[0].icon === "04n"
      ) {
        setImg(drizzle);
      } else if (
        data.weather[0].icon === "09d" ||
        data.weather[0].icon === "09n"
      ) {
        setImg(rain);
      } else if (
        data.weather[0].icon === "10d" ||
        data.weather[0].icon === "10n"
      ) {
        setImg(rain);
      } else if (
        data.weather[0].icon === "13d" ||
        data.weather[0].icon === "13n"
      ) {
        setImg(snow);
      } else {
        setImg(clear);
      }
    } catch (error) {
      alert("City not found. Please try again.");
    }
  };
  return (
    <div className="container">
      <div className="search">
        <input
          type="text"
          className="search-field"
          placeholder="Enter City"
          ref={serachRef}
        />
        <div className="search-icon" onClick={() => handleClick()}>
          <img src={search} alt="" />
        </div>
      </div>
      <div className="weather-img">
        <img src={img} alt="" />
      </div>
      <div className="weather-temp">{weather.temp}°c</div>
      <div className="weather-location">{weather.location}</div>
      <div className="weather-data">
        <div className="element">
          <img src={humidity} alt="" />
          <div className="values">
            <div className="data">
              <div className="humidity">{weather.humidity} %</div>
              <div className="text">Humidity</div>
            </div>
          </div>
        </div>
        <div className="element">
          <img src={wind} alt="" />
          <div className="values">
            <div className="data">
              <div className="humidity">{weather.wind} km/h</div>
              <div className="text">Wind Speed</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
