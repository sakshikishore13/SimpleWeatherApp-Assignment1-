const API_KEY = "MyAPI"; // Replace with your OpenWeatherMap API key

async function getWeather() {
  const city = document.getElementById("locationInput").value.trim();
  if (!city) return alert("Please enter a location");

  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;

  fetchWeatherData(weatherUrl, forecastUrl);
}

function getLocationWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;

      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;

      fetchWeatherData(weatherUrl, forecastUrl);
    }, () => {
      alert("Unable to retrieve your location.");
    });
  } else {
    alert("Geolocation is not supported by your browser.");
  }
}

async function fetchWeatherData(weatherUrl, forecastUrl) {
  try {
    const weatherRes = await fetch(weatherUrl);
    const forecastRes = await fetch(forecastUrl);
    const weatherData = await weatherRes.json();
    const forecastData = await forecastRes.json();

    if (weatherData.cod !== 200) {
      throw new Error(weatherData.message);
    }

    displayCurrentWeather(weatherData);
    displayForecast(forecastData);
  } catch (error) {
    console.error("Error fetching weather:", error);
    alert(`Error fetching weather data: ${error.message}`);
  }
}

function displayCurrentWeather(data) {
  const output = document.getElementById("weatherOutput");

  if (!data.weather || data.weather.length === 0) {
    output.innerHTML = "<p>Weather data not available.</p>";
    return;
  }

  output.innerHTML = `
    <div class="weather-box">
      <h2>${data.name}</h2>
      <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />
      <p><strong>${data.weather[0].main}</strong> - ${data.weather[0].description}</p>
      <p>Temperature: ${data.main.temp}°C</p>
      <p>Humidity: ${data.main.humidity}%</p>
      <p>Wind: ${data.wind.speed} m/s</p>
    </div>
  `;
}

function displayForecast(data) {
  const output = document.getElementById("forecastOutput");
  output.innerHTML = "<h3>5-Day Forecast</h3>";

  if (!data.list || data.list.length === 0) {
    output.innerHTML += "<p>No forecast data available.</p>";
    return;
  }

  const daily = {};

  data.list.forEach(item => {
    const date = item.dt_txt.split(" ")[0];
    if (!daily[date] && item.dt_txt.includes("12:00:00")) {
      daily[date] = item;
    }
  });

  for (let key in daily) {
    const day = daily[key];
    output.innerHTML += `
      <div class="forecast-box">
        <h4>${key}</h4>
        <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" />
        <p>${day.weather[0].description}</p>
        <p>Temp: ${day.main.temp}°C</p>
      </div>
    `;
  }
}
