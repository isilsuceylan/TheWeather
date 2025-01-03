import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    const apiKey = '281e6a789b05fe7ce5129f20ec4b7044'; // API key burada tanımlı
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=tr`;

    try {
      const response = await axios.get(url);
      setWeatherData(response.data);
      setError('');
    } catch (err) {
      setError('Şehir bulunamadı veya bir hata oluştu.');
      setWeatherData(null);
    }
  };

  const getBackground = () => {
    if (!weatherData) return "url('/resimler/gokyuzu.jpg')"; // Varsayılan arka plan
  
    const weatherMain = weatherData.weather[0].main;
    const currentHour = new Date().getHours(); // Şu anki saat
  
    // Akşam saatleri için güneşli görselini engelle
    if (currentHour >= 18 && weatherMain === 'Clear') {
      return "url('/resimler/akşam-gunesli.jpg')"; // Akşam için özel bir güneşli görseli
    }
  
    switch (weatherMain) {
      case 'Rain':
        return "url('/resimler/yagmurlu.jpg')";
      case 'Snow':
        return "url('/resimler/karli.jpg')";
      case 'Clear':
        return "url('/resimler/gunesli.jpg')";
      case 'Clouds':
        return "url('/resimler/ruzgarli.jpg')";
      default:
        return "url('/resimler/gokyuzu.jpg')";
    }
  };

  return (
    <div
      className="app"
      style={{
        backgroundImage: getBackground(),
      }}
    >
      <div className="container">
        <h1>Hava Durumu Uygulaması</h1>
        <input
          type="text"
          placeholder="Şehir Adını Giriniz"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Hava Durumunu Getir</button>

        {error && <p className="text-danger mt-3">{error}</p>}

        {weatherData && (
          <div className="weather-result">
            <h2>{weatherData.name}</h2>
            <p>Durum: {weatherData.weather[0].description}</p>
            <p>Sıcaklık: {weatherData.main.temp}°C</p>
            <p>Nem: {weatherData.main.humidity}%</p>
            <p>Rüzgar Hızı: {weatherData.wind.speed} m/s</p>
          </div>
        )}

        <div className="about">
          <h3>Hakkında</h3>
          <p>BTE311 WEB TABANLI PROGRAMLAMA DERSİ İÇİN GELİŞTİRİLMİŞTİR.</p>
        </div>
      </div>
    </div>
  );
}

export default App;
