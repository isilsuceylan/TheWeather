import React, { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");
  const [showAbout, setShowAbout] = useState(false); 

  const fetchWeatherData = async () => {
    const apiKey = "281e6a789b05fe7ce5129f20ec4b7044"; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=tr`;

    try {
      const response = await axios.get(url);
      setWeatherData(response.data);
      setError("");
    } catch (err) {
      setError("Şehir bulunamadı veya bir hata oluştu.");
      setWeatherData(null);
    }
  };

  const getBackground = () => {
    if (!weatherData) return `url(${process.env.PUBLIC_URL}/resimler/gokyuzu.jpg)`;

    const weatherMain = weatherData.weather[0].main;

    switch (weatherMain) {
      case "Rain":
        return `url(${process.env.PUBLIC_URL}/resimler/yagmurlu.jpg)`;
      case "Snow":
        return `url(${process.env.PUBLIC_URL}/resimler/karli.jpg)`;
      case "Clear":
        return `url(${process.env.PUBLIC_URL}/resimler/gunesli.jpg)`;
      case "Clouds":
        return `url(${process.env.PUBLIC_URL}/resimler/bulutlu.jpeg)`;
      case "Mist":
      case "Fog":
        return `url(${process.env.PUBLIC_URL}/resimler/sisli.jpg)`;
      case "Wind":
      case "Storm":
      case "Breeze":
        return `url(${process.env.PUBLIC_URL}/resimler/ruzgarli.png)`;
      default:
        return `url(${process.env.PUBLIC_URL}/resimler/gokyuzu.jpg)`;
    }
  };

  return (
    <div
      className="app"
      style={{
        backgroundImage: getBackground(),
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <div className="container">
        <h1 style={{ color: "white", textShadow: "1px 1px 4px black" }}>
          Hava Durumu Uygulaması
        </h1>
        <input
          type="text"
          placeholder="Şehir Adını Giriniz"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && fetchWeatherData()}
          className="input"
        />
        <button onClick={fetchWeatherData} className="btn">
          Hava Durumunu Getir
        </button>

        {error && <p className="error">{error}</p>}

        {weatherData && (
          <div className="weather-result">
            <h2>{weatherData.name}</h2>
            <p>⭐ Durum: {weatherData.weather[0].description}</p>
            <p>🌡️ Sıcaklık: {weatherData.main.temp}°C</p>
            <p>💧 Nem: {weatherData.main.humidity}%</p>
            <p>🌬️ Rüzgar Hızı: {weatherData.wind.speed} m/s</p>
          </div>
        )}

        {/* hakkında butonu */}
        <button
          onClick={() => setShowAbout(!showAbout)} 
          className="btn btn-about"
        >
          Hakkında
        </button>

        {}
        {showAbout && (
          <div className={`about ${showAbout ? "show" : ""}`}>
            <p>Bu uygulama BTE311 Web Tabanlı Programlama dersi için geliştirilmiştir.</p>
            <p>Geliştiren: Işılsu Ceylan</p>
            <p>Numara: 2220780041</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
