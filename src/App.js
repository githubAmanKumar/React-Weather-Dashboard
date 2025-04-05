import { FavouriteCities } from './Components/FavouriteCities';
import WeatherApp from './Components/WeatherDashboard';
import { Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css'

function App() {

  const [favoriteCities, setFavoriteCities] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('favoriteCities')) || [];
    setFavoriteCities(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem('favoriteCities', JSON.stringify(favoriteCities));
  }, [favoriteCities]);

  const addCity = (city) => {
    if (city && !favoriteCities.includes(city)) {
      setFavoriteCities([...favoriteCities, city]);
    }
  };

  const removeCity = (cityToRemove) => {
    setFavoriteCities(favoriteCities.filter((c) => c !== cityToRemove));
  };
  return (
    <>
      <div className="container" >

        {/* Navigation */}
        <nav>
          <Link to="/">Home</Link> |{' '}
          <Link to="/FavouriteCities">⭐Favourite Cities</Link>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<WeatherApp
            favoriteCities={favoriteCities}
            addCity={addCity}
          />} />
          <Route path="/FavouriteCities" element={<FavouriteCities
            favoriteCities={favoriteCities}
            removeCity={removeCity}
          />} />
        </Routes>

      </div>
    </>
  );
}

export default App;
