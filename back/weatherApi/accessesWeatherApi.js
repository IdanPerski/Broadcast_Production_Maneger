const axios = require("axios");
const terminalColors = require("../chalk/terminalColors");
const { handleError } = require("../utils/handleErrors");
require("dotenv").config();

const apiKey = process.env.WEATHER_API_KEY;

axios;
const getWeatherIcon = async (cityName) => {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

  try {
    const response = await axios.get(apiUrl);
    const data = response.data;
    const icon = data.weather[0].icon;
    const temperature = `${Math.floor(data.main.temp)}\u00B0C`;

    const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
    const iconImg = `<img src=${iconUrl} style="width:3em">`;
    const html = `${iconImg}<p style= font-size:1em'>${temperature}<p/>`;
    return html;
  } catch (error) {
    console.log("Error fetching weather API:", error);
    console.log(terminalColors.lemon(error));
    console.log(terminalColors.lemon(error.code));

    if (error.code) {
      return "<p style='color:#F56300 ; font-size:1em'>No Connection to API<p/>";
    }
    handleError(error, 400, "Error fetching weather API");
  }
};

/* ------Daily Forecast 16 days------- */

//needs to be paid

// TODO=

//search 16 day weather forecast with daily average parameters by city name. All weather data can be obtained in JSON and XML formats.

//api.openweathermap.org/data/2.5/forecast/daily?q={city name}&cnt={cnt}&appid={API key}

// documantion link: openweathermap.org/forecast16#16days`

module.exports = getWeatherIcon;
