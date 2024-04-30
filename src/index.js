import './index.css';

document.body.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    console.log('enter pressed');
    getWeather()
  }
});

const getWeather = async () => {
  try {
    const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=ca55ec8337974141a05233215242104&q=${document.querySelector('#location-input').value}`)
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error)
  }
}