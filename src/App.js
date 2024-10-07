import React, { useState } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const apiKey = 'cc3e24b383e7820eb138c83623fc9bcf'; // Replace with your actual API key

  const fetchWeather = async () => {
    if (!city) {
      setError("Please enter a city name");
      return;
    }

    setError(null);
    setWeather(null);
    setLoading(true);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      const data = await response.json();

      if (data.cod === '404') {
        setError('City not found');
      } else {
        setWeather(data);
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
        />
        <button onClick={fetchWeather}>Get Weather</button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {weather && (
        <div>
          <h2>
            {weather.name}, {weather.sys?.country || 'Unknown Country'}
          </h2>
          <p>Temperature: {weather.main?.temp || 'N/A'}°C</p>
          <p>Weather: {weather.weather?.[0]?.description || 'N/A'}</p>
          <p>Humidity: {weather.main?.humidity || 'N/A'}%</p>
          <p>Wind Speed: {weather.wind?.speed || 'N/A'} m/s</p>
        </div>
      )}
    </div>
  );
}

export default App;
