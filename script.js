const fetchWeatherBtn = document.getElementById('fetchWeatherBtn');
const locationInput = document.getElementById('locationInput');
const weatherInfo = document.getElementById('weatherInfo');

fetchWeatherBtn.addEventListener('click', () => {
  const location = locationInput.value.trim();
  if (location) {
    fetchWeather(location);
  } else {
    alert('Please enter a location.');
  }
});

async function fetchWeather(location) {
  const apiKey = '3c05190499e9acf53f1bfd38e140a156';
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.cod === '404') {
      weatherInfo.textContent = 'Location not found.';
    } else {
      const weatherDescription = data.weather[0].description;
      const temperature = data.main.temp;
      const humidity = data.main.humidity;
      const windSpeed = data.wind.speed;

      weatherInfo.innerHTML = `
        <p><strong>Location:</strong> ${data.name}, ${data.sys.country}</p>
        <p><strong>Weather:</strong> ${weatherDescription}</p>
        <p><strong>Temperature:</strong> ${temperature} °C</p>
        <p><strong>Humidity:</strong> ${humidity} %</p>
        <p><strong>Wind Speed:</strong> ${windSpeed} m/s</p>
      `;
    }
  } catch (error) {
    console.error('Error fetching weather data:', error);
    weatherInfo.textContent = 'An error occurred. Please try again later.';
  }
}
