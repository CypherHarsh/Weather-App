import React, { useState } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    if (!city) {
      setError("Please enter a city name");
      return;
    }
  
    setError(null);
    setWeather(null);
    setLoading(true);
  
    try {
      const response = await fetch(`/api/weather?city=${city}`);
      const data = await response.json();
  
      if (response.ok) {
        setWeather(data);
      } else {
        setError(data.error || 'Failed to fetch weather data');
      }
    } catch (error) {
      setError('Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };
  
  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      <div>
        <input
          type="text"
          value={city}
          onChange={handleInputChange}
          placeholder="Enter city name"
          style={{ padding: '10px', marginRight: '10px' }}
        />
        <button onClick={fetchWeather} style={{ padding: '10px' }}>Get Weather</button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {weather && (
        <div>
          <h2>
            {weather.name}, {weather.sys?.country || 'Unknown Country'}
          </h2>
          <p>Temperature: {(weather.main?.temp - 273.15).toFixed(2) || 'N/A'}°C</p>
          <p>Weather: {weather.weather?.[0]?.description || 'N/A'}</p>
          <p>Humidity: {weather.main?.humidity || 'N/A'}%</p>
          <p>Wind Speed: {weather.wind?.speed || 'N/A'} m/s</p>
        </div>
      )}
    </div>
  );
}

export default App;
