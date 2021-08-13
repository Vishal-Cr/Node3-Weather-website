const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const errorText = document.getElementById("error");
const weatherData = document.getElementById("weather-data");
const icon = document.getElementById("weather-icon");
weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  error.textContent = "Loading...";
  weatherData.textContent = "";

  fetch("http://localhost:3000/weather?address=" + location).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          errorText.textContent = data.error;
        } else {
          error.textContent = `Location:${data.location.name},${data.location.region},${data.location.country}`;
          weatherData.textContent = `${data.Description}. It is currently ${data.Temperature} degrees out.
       There is a ${data.chance_of_rain} chance of rain.`;

          // icon.innerHTML = `<img src=${data.weather_icon} />`;
        }
      });
    }
  );

  search.value = "";
});
