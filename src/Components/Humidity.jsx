import React from 'react'
import './Humidity.css'
import wind_icon from '../assets/wind.png'
import humidity_icon from '../assets/humidity.png'

const Humidity = ({cityMainHumidity, cityWindSpeed }) => {
    return (
        <div className="humidityWind">

            <div className="humidity">

                <div className="humidityImage">
                    <img src={humidity_icon} alt="" />
                </div>
                <div className="humidityValue">{cityMainHumidity}% Humidity</div>
            </div>

            <div className="wind">

                <div className="windImage">
                    <img src={wind_icon} alt="" />
                </div>
                <div className="windValue"> {Math.round(cityWindSpeed)} km/hr Wind Speed</div>
            </div>
        </div>
    )
}

export default Humidity