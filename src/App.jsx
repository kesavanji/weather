import "./App.css";
import search from "./assets/images/search.png";
import humidity from "./assets/images/humidity.png";
import wind from "./assets/images/wind.png";
import sun from "./assets/images/clear.png";
import snow from "./assets/images/snow.png";
import rain from "./assets/images/rain.png";
import mist from "./assets/images/mist.png";
import drizzle from "./assets/images/drizzle.png";
import clouds from "./assets/images/clouds.png";
import { useEffect, useState } from "react";

function App() {
  const [img, setImg] = useState(sun);
  const [text, setText] = useState("Perambalur");
  const [temp, setTemp] = useState(0);
  const [city, setcity] = useState("Perambalur");
  const [country, setCountry] = useState("IN");
  const [lat, setlat] = useState(0);
  const [long, setlong] = useState(0);
  const [shumidity, setHumidity] = useState(0);
  const [swind, setWind] = useState(0);
  const apikey = "22989f93543d775eb54718c13fc7be85";

  async function searchFun() {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${apikey}&units=metric`;

      const response = await fetch(url);
      const data = await response.json();
      console.log(data)
      setTemp(data.main.temp);
      setWind(data.wind.speed);
      setCountry(data.sys.country);
      setcity(data.name);
      setlat(data.coord.lat);
      setHumidity(data.wind.deg);
      setlong(data.coord.lon);
      if(shumidity > 70){
        setImg(rain)
      }else if (temp <=0){
        setImg(snow)
      }
      else if (temp <= 10){
        setImg(mist)
      }
      else if (temp <= 20){
        setImg(drizzle)
      }
      else if (temp <= 30){
        setImg(clouds)
      }
      else{
        setImg(sun)
      }
  }

  useEffect(() => {
    searchFun();
  }, []);

  function handleKey(e) {
    if (e.key == "Enter") {
      searchFun();
    }
  }
  return (
    <>
      <h1>Weather App</h1>

      <div className="container">
        {/* -----Container--Start------ */}
        {/* ---------------input--------------------------- */}

        <div className="input-contianer">
          <input type="text"   value={text} onChange={(e) => setText(e.target.value)}  onKeyDown={handleKey}/>
          <img src={search} alt="image" onClick={searchFun}/>
        </div>
        {/* -----------------end Input-------------------- */}

        <div className="weather-container">

          <div className="img-dev">

            <img src={img} alt="weather" className="weather-img" />
            <p className="temp">{temp}°C</p>
            <p className="city">{city}</p>
            <p className="country">{country}</p>

            <div className="latlog">

              <div className="lot">
                <span>Latitude</span>
                <span className="num">{lat}</span>
              </div>

              <div className="lot">
                <span>Longitude</span>
                <span className="num">{long}</span>
              </div>

            </div>


          </div>

          <div className="wind-container">

            <div className="humidity">
              <img src={humidity} alt="img" />
              <span>{shumidity}%</span>
              <p>Humidity</p>
            </div>

            <div className="wind">
              <img src={wind} alt="img" />
              <span>{swind}KM/S</span>
              <p>Wind Speed</p>
            </div>

          </div>

        </div>

        {/* <---container end------ */}
      </div>
    </>
  );
}
export default App;
