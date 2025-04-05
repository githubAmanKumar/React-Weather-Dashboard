import { React, useState } from 'react'
import './FavouriteCities.css'
import Humidity from './Humidity'

export const FavouriteCities = ({ favoriteCities, removeCity }) => {

  const [isOpen, setIsOpen] = useState(false);

  const closeSidebar = () => setIsOpen(false);
  
  const [temp, setTemp] = useState(null)
  const [city, setCity] = useState(null)
  const [country, setCountry] = useState(null)
  const [tempImage, setTempImage] = useState()
  const [tempText, setTempText] = useState("")
  const [humidity, setHumidity] = useState("")
  const [windSpeed, setWindSpeed] = useState("")


  const fetchapi = async (e) => {
    setIsOpen(!isOpen)
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${e.target.innerText.slice(0, -1)}&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`;

    try {
      const res = await fetch(url);
      if (res.ok) {
        const response = await res.json();
        setTemp(Math.round(response.main.temp - 273.15))
        setCity(response.name)
        setCountry(response.sys.country)
        setTempText(response.weather[0].description);
        setTempImage(require(`../assets/icons/${response.weather[0].icon}.png`));
        setHumidity(response.main.humidity)
        setWindSpeed(response.wind.speed * 3)

      } else {
        alert('City not found');
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  return (
    <div className='favouriteCities'>
      <div>
        <h2>Favourite Cities</h2>
        {favoriteCities.length === 0 ? (
          <p>No favourite cities added.</p>
        ) : (
          <ul>
            {favoriteCities.map((city, index) => (
              <li key={index} onClick={fetchapi}>
                {city}
                <button onClick={() => removeCity(city)} style={{ marginLeft: '10px' }}>
                  ❌
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={`sidebar ${isOpen ? '' : 'closed'}`}>
        <button className="close-btn" onClick={closeSidebar}>
          &times;
        </button>
        <h2>{city},{country}</h2>
        <div className="weatherImage vibrate-1">
          <img src={tempImage} className='weatherImageIcon color-change' alt="" />
        </div>
        <div className="temperature">{Math.round((temp))}°C - {tempText}</div>

        <Humidity
          cityMainHumidity={humidity}
          cityWindSpeed={windSpeed}
        />

      </div>
    </div>
  )
}
