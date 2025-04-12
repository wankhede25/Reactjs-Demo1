import { useState, useEffect } from "react";

const Weather = () => {
    const [city, setCity] = useState('London');
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const API_KEY = 'f9f9a09799d92ae447897eee6b0b2b3f'; // Get from https://openweathermap.org/api
  
    const fetchWeather = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        );
        const data = await response.json();
        setWeather(data);
      } catch (error) {
        console.error("Error fetching weather:", error);
      } finally {
        setLoading(false);
      }
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (city.trim()) {
        fetchWeather();
      }
    };
  
    useEffect(() => {
      fetchWeather();
    }, []);
    return(
        <>
        <div className="app">
      <h1>Simple Weather App</h1>
      
      <form onSubmit={handleSubmit} className="search-box">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading weather data...</p>}

      {weather && weather.cod === 200 && (
        <div className="weather-card">
          <h2>{weather.name}, {weather.sys.country}</h2>
          <div className="weather-main">
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
            <div className="temp">{Math.round(weather.main.temp)}°C</div>
          </div>
          <p className="description">{weather.weather[0].description}</p>
          <div className="details">
            <p>Feels like: {Math.round(weather.main.feels_like)}°C</p>
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Wind: {weather.wind.speed} m/s</p>
          </div>
        </div>
      )}

      {weather && weather.cod !== 200 && (
        <p className="error">City not found. Please try another location.</p>
      )}
    </div>
  
        </>
    )
}
export default Weather