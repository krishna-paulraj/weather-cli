import axios from "axios";
import chalk from "chalk";

export async function getLocationInfo(city) {
  if (!process.env.API_KEY) {
    console.log("❌ API Key not found. Use --setApi to save it.");
    return;
  }

  if (!city) {
    console.log("❌ City not provided. Use --setCity to specify a city.");
    return;
  }

  try {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.API_KEY}`;
    const response = await axios.get(apiUrl);

    const data = response.data;
    console.log(
      chalk.blueBright(`\n📍 Location: ${data.name}, ${data.sys.country}`),
    );
    console.log(`🌡️ Temperature: ${data.main.temp}°C`);
    console.log(`🌥️ Weather: ${data.weather[0].description}`);
    console.log(`💧 Humidity: ${data.main.humidity}%\n`);
  } catch (err) {
    console.log(
      "❌ Failed to fetch weather. Please check the city name and API key.",
    );
    console.error(err.message);
  }
}
