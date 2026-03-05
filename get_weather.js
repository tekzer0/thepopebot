const fs = require('fs');
const path = require('path');

async function getWeather() {
  const latitude = 34.0965; // Claremont, CA latitude
  const longitude = -117.7198; // Claremont, CA longitude
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&temperature_unit=fahrenheit&forecast_days=1`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    const currentWeather = data.current_weather;
    if (!currentWeather) {
      throw new Error('Could not retrieve current weather data.');
    }

    const weatherText = `
Current Weather in Claremont, CA:
--------------------------------
Temperature: ${currentWeather.temperature}°F
Wind Speed: ${currentWeather.windspeed} mph
Wind Direction: ${currentWeather.winddirection}°
Weather Code: ${currentWeather.weathercode}
Time: ${new Date(currentWeather.time).toLocaleString()}
    `.trim();

    const outputPath = path.join(process.cwd(), 'WEATHER.txt');
    fs.writeFileSync(outputPath, weatherText + '\n');
  } catch (error) {
    console.error('Failed to fetch or write weather data:', error);
    const outputPath = path.join(process.cwd(), 'WEATHER.txt');
    fs.writeFileSync(outputPath, `Failed to retrieve weather: ${error.message}\n`);
  }
}

getWeather();
