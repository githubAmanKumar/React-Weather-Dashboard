import React, { useState } from 'react'
import './WeatherDashboard.css'
import search_icon from '../assets/search.png'
import Humidity from './Humidity'

function WeatherDashboard({favoriteCities, addCity}) {

    const [city, setCity] = useState(null)
    const [search, setSearch] = useState("")
    const [currentCity, setCurrentCity] = useState('');
    const [tempImage, setTempImage] = useState()
    const [tempText, setTempText] = useState("")

    const fetchapi = async () => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`;

        try {
            const res = await fetch(url);
            if (res.ok) {
                const response = await res.json();
                setCity(response)
                setTempText(response.weather[0].description);
                setTempImage(require(`../assets/icons/${response.weather[0].icon}.png`));

            } else {
                alert('City not found');
            }
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }

        const trimmed = search.trim();
        if (trimmed) {
            setCurrentCity(trimmed);
        }
    };

    function handleKeyPress(event) {
        if (event.keyCode === 13) {
            fetchapi();
        }
    }


    const handleAddToFavorites = () => {
        addCity(currentCity);
    };

    const isAlreadyFavorite = favoriteCities.includes(currentCity);



    return (

        <div className="weatherApp" >

            <div className="searchBar">
                <input className="searchBox"
                    onChange={(event) => { setSearch(event.target.value) }} placeholder='Enter City...' onKeyUp={handleKeyPress} />
                <div className="searchicon">
                    <img src={search_icon} onClick={() => {
                        if (search != "" || search != null) {
                            fetchapi(search);
                        }
                    }} className='' alt="" />
                </div>
            </div>
            {
                !city ? (
                    <p> Welcome to the weather app 🙏</p>
                ) : (
                    <div className='material'>

                        {currentCity && (
                            <div style={{ marginTop: '20px' }}>
                                {!isAlreadyFavorite && (
                                    <button onClick={handleAddToFavorites}>Add to Favorites</button>
                                )}
                            </div>
                        )}

                        <div className="weatherImage vibrate-1">
                            <img src={tempImage} className='weatherImageIcon color-change' alt="" />
                        </div>


                        <div className="temperature">{Math.round((city.main.temp - 273.15))}°C - {tempText}</div>


                        <div className="cityName">{city.name},{city.sys.country}</div>



                        <Humidity
                            cityMainHumidity={city.main.humidity}
                            cityWindSpeed={Math.round(city.wind.speed * 3)}
                        />
                    </div>
                )
            }
        </div>
    )
}

export default WeatherDashboard