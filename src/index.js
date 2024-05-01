import './index.css';
import { createDiv, createText } from './utils';
import testData from './testdata.json';
import loadingGif from './loading.gif';

const loading = document.createElement('img');
loading.classList.add('loading');
loading.src = loadingGif;

document.body.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    console.log('enter pressed');
    document.querySelector('.weatherData').innerHTML = '';
    document.querySelector('.weatherData').appendChild(loading);
    getWeather();
  }
});

const getWeather = async () => {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=ca55ec8337974141a05233215242104&q=${
        document.querySelector('#location-input').value
      }&days=3`
    );
    const data = await response.json();
    console.log(data);
    document.querySelector('.weatherData').innerHTML = '';
    displayWeatherData(data);
  } catch (error) {
    console.error(error);
  }
};

const displayWeatherData = (data) => {
  if (!data.forecast) return;
  const weatherDataContainer = createDiv('weatherDataContainer');
  data.forecast.forecastday.forEach((day, index) => {
    const dayData = data.forecast.forecastday[index].day;
    const weatherDayContainer = createDiv('weatherDayContainer');
    const dayDate = new Date(
      data.forecast.forecastday[index].date
    ).toLocaleDateString();
    createText('weatherDayDate', dayDate, weatherDayContainer);
    createText(
      'weatherTemp',
      `Temp: from ${dayData.mintemp_f} to ${dayData.maxtemp_f}`,
      weatherDayContainer
    );
    createText(
      'weatherCondition',
      `Condition: ${dayData.condition.text}`,
      weatherDayContainer
    );
    createText(
      'weatherChanceRain',
      `Chance of rain: ${dayData.daily_chance_of_rain}`,
      weatherDayContainer
    );
    if (dayData.daily_will_it_rain)
      createText(
        'weatherRainInches',
        `Inches of rain: ${dayData.totalprecip_in}`,
        weatherDayContainer
      );
    createText(
      'weatherHumidity',
      `Humidity: ${dayData.avghumidity}`,
      weatherDayContainer
    );
    weatherDataContainer.appendChild(weatherDayContainer);
  });
  document.querySelector('.weatherData').appendChild(weatherDataContainer);
};
