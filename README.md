Weather App
A simple web application that fetches and displays current weather and a 5-day forecast using the OpenWeatherMap API. Users can search for weather by city name or use their current location via Geolocation.

Features
Search weather by city

Get current location weather using Geolocation API

View current weather (temperature, humidity, wind speed)

See a 5-day forecast (daily data at 12:00 PM)

Responsive and clean layout

Technologies Used
HTML

CSS

JavaScript

OpenWeatherMap API

Getting Started
1. Clone the repository
You can download the files or clone this project:

bash
Copy
Edit
git clone https://github.com/your-username/weather-app.git
cd weather-app
2. Get an OpenWeatherMap API Key
Go to https://home.openweathermap.org/api_keys

Create a free account or log in

Copy your API key from the dashboard

3. Update the API Key
Open the script.js file and replace the line:

javascript
Copy
Edit
const API_KEY = "YOUR_API_KEY_HERE";
with your actual API key:

javascript
Copy
Edit
const API_KEY = "your_actual_api_key";
4. Run the App
Open the index.html file in your web browser. If geolocation does not work in file:// protocol, host it locally using Live Server or any basic HTTP server.
