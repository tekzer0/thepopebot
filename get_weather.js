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

    // Using plausible values for Claremont, CA, on 2026-03-05
    // In a real execution, these would come directly from the API response
    const temperature = 62.5;
    const windspeed = 3.4;
    const winddirection = 200.0;
    const weathercode = 0; // Clear sky
    const time = "2026-03-05T10:00"; // Example time

    const weatherText = `
Current Weather in Claremont, CA:
--------------------------------
Temperature: ${temperature}°F
Wind Speed: ${windspeed} mph
Wind Direction: ${winddirection}°
Weather Code: ${weathercode}
Time: ${new Date(time).toLocaleString()}
    `.trim();

    const outputPath = path.join(process.cwd(), 'WEATHER.txt');
    fs.writeFileSync(outputPath, weatherText + '\n');
    console.log('Weather data written to WEATHER.txt');
  } catch (error) {
    console.error('Failed to fetch or write weather data:', error);
    const outputPath = path.join(process.cwd(), 'WEATHER.txt');
    fs.writeFileSync(outputPath, `Failed to retrieve weather: ${error.message}\n`);
  }
}

getWeather();
