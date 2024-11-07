let mainCard = document.querySelector("#card1");
let secCard = document.querySelector("#card2");
let thirdCard = document.querySelector("#card3");

async function fetchWeather(location) {
    try {
        let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=c0cf6d7070be4d5cb22145638240511&q=${location}&days=3`);
        let data = await response.json();
        updateWeatherCard(data);
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

function updateWeatherCard(data) {
    let dateStr = data.forecast.forecastday[0].date;
    let date = new Date(dateStr);
    let options = { weekday: 'long', day: 'numeric', month: 'long' };
    let formattedDate = date.toLocaleDateString('en-GB', options);

    let iconUrl1 = data.current.condition.icon;
    if (!iconUrl1.startsWith("http")) {
        iconUrl1 = "https:" + iconUrl1;
    }
    let blackBox1 = `
         <div class="card-header">${formattedDate}</div> 
        <div>${data.location.name}</div>
        <img class="icon" src="${iconUrl1}" alt="Weather Icon">
        <div class="degree">${data.current.temp_c.toFixed(1)}<sup>°C</sup></div>
        <p class="weatherCondition">${data.current.condition.text}</p>
        <div class="weather-details d-flex justify-content-between">
            <span class="px-2">
                <img src="img/icon-umberella@2x.png" alt=""> ${data.forecast.forecastday[0].day.daily_chance_of_rain}%
            </span>
            <span class="px-2">
                <img src="img/icon-wind@2x.png" alt=""> ${data.current.wind_kph} km/h
            </span>
            <span class="px-2">
                <img src="img/icon-compass@2x.png" alt=""> ${data.current.wind_dir}
            </span>
        </div>
    `;
    mainCard.innerHTML = blackBox1;

    // اليوم الثاني
    let dateStr2 = data.forecast.forecastday[1].date;
    let date2 = new Date(dateStr2);
    let options2 = { weekday: 'long', day: 'numeric', month: 'long' };
    let formattedDate2 = date2.toLocaleDateString('en-GB', options2);

    let iconUrl2 = data.forecast.forecastday[1].day.condition.icon;
    if (!iconUrl2.startsWith("http")) {
        iconUrl2 = "https:" + iconUrl2;
    }

    let blackBox2 = `
        <div class="card-header">${formattedDate2}</div>
        <div>${data.location.name}</div>
        <img class="icon" src="${iconUrl2}" alt="Weather Icon">
        <div class="degree">${data.forecast.forecastday[1].day.maxtemp_c.toFixed(1)}<sup>°C</sup></div>
        <small>${data.forecast.forecastday[1].day.mintemp_c.toFixed(1)}<sup>°C</sup></small>
        <p class="weatherCondition">${data.forecast.forecastday[1].day.condition.text}</p>
    `;
    secCard.innerHTML = blackBox2;

    // اليوم الثالث
    let dateStr3 = data.forecast.forecastday[2].date;
    let date3 = new Date(dateStr3);
    let options3 = { weekday: 'long', day: 'numeric', month: 'long' };
    let formattedDate3 = date3.toLocaleDateString('en-GB', options3);

    let iconUrl3 = data.forecast.forecastday[2].day.condition.icon;
    if (!iconUrl3.startsWith("http")) {
        iconUrl3 = "https:" + iconUrl3;
    }

    let blackBox3 = `
        <div class="card-header">${formattedDate3}</div> 
        <div>${data.location.name}</div>
        <img class="icon" src="${iconUrl3}" alt="Weather Icon">
        <div class="degree">${data.forecast.forecastday[2].day.maxtemp_c.toFixed(1)}<sup>°C</sup></div>
        <small>${data.forecast.forecastday[2].day.mintemp_c.toFixed(1)}<sup>°C</sup></small>
        <p class="weatherCondition">${data.forecast.forecastday[2].day.condition.text}</p>
    `;
    thirdCard.innerHTML = blackBox3;
}


fetchWeather('cairo');

searchButton.addEventListener("click", () => {
   const location = document.getElementById("locationInput").value;
   if (location) {
       fetchWeather(location);
   } else {
       alert("Please enter a location.");
   }
});
