const apiKey = "G5WFV786TEFHJL42QXRUTXANY";
const searchInput = document.querySelector("#inputField");
const searchBTn = document.querySelector("#inputBtn");


async function showWeatherData(city) {
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=${apiKey}`);
    if (response.status == 400 || response.status == 404) {
        alert("Invalid City Name, please enter valid city name")
    } else {
        let data = await response.json();
        console.log(data);
        document.querySelector("#cityName").innerHTML = data.resolvedAddress;
        document.querySelector("#temp").innerHTML = Math.round(data.currentConditions.temp) + " °C";
        document.querySelector("#weatherStatus").innerHTML = data.currentConditions.conditions;
        document.querySelector("#wind").innerHTML = data.currentConditions.windspeed + " km/h";
        document.querySelector("#humidity").innerHTML = data.currentConditions.humidity + " %";
        document.querySelector("#sunRise").innerHTML = "Sunrise: " + data.currentConditions.sunrise + " AM";
        document.querySelector("#sunSet").innerHTML = "Sunset: " + data.currentConditions.sunset + " PM";
        document.querySelector("#TimeZone").innerHTML = "Timezone: " + data.timezone;
        document.querySelector("#description").innerHTML = "Weather Description: " + data.description;
       

        function updateCityClock() {
            // const timestamp = data.currentConditions.datetimeEpoch;
            const cityTimezone = data.timezone;


            const nowUtc = new Date();
            const formattedTime = nowUtc.toLocaleString("en-IN", {
                timeZone: cityTimezone,
                weekday: "long",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                day: "numeric",
                month: "long",
                year: "numeric",
            });
            document.querySelector("#localTime").innerHTML = formattedTime;
        }
        updateCityClock();

        setInterval(updateCityClock, 1000);

        function updateDailyData() {
            let otherdayForecast = '';

            data.days.slice(0, 7).forEach((days, idx) => {
                if (idx !== 0) {
                    const dayName = window.moment(days.datetimeEpoch * 1000).format('ddd');
                    // const iconName = days.icon || 'default'; 
                    // const condition = days.conditions || 'Unknown';

                    otherdayForecast += `
                <div class="w-20 lg:w-30 shrink-0 bg-black/40 flex flex-col justify-center items-center p-5 rounded">
                    <span>${dayName}</span>
                    <span>${days.temp}°C</span>
                </div>`;
                }
            });

            document.querySelector("#dailyForecast").innerHTML = otherdayForecast;
        }


        updateDailyData();
    }
}



searchBTn.addEventListener("click", () => {
    showWeatherData(searchInput.value)
})


// async function checkWeather(cityName) {
//     const response = await fetch(apiUrl + cityName + `&appid=${apiKey}`);
//     if (response.status == 404) {
//         alert("Invalid City Name")
//     } else {
//         let data = await response.json();
//         console.log(data);

//         document.querySelector("#cityName").innerHTML = data.name;
//         document.querySelector("#temp").innerHTML = Math.round(data.main.temp) + "°C";
//         document.querySelector("#wind").innerHTML = data.wind.speed + " km/h ";
//         document.querySelector("#humidity").innerHTML = data.main.humidity + "%";
//         document.querySelector("#weatherStatus").innerHTML = data.weather[0].main;

//         const timezoneOffset = data.timezone;
//         function updateCityClock() {
//             const utcTime = new Date().getTime() + new Date().getTimezoneOffset() * 60000;
//             const cityTime = new Date(utcTime + timezoneOffset * 1000);

//             const formattedTime = cityTime.toLocaleString("en-US", {
//                 weekday: "long",
//                 hour: "2-digit",
//                 minute: "2-digit",
//                 second: "2-digit",
//                 day: "numeric",
//                 month: "long",
//                 year: "numeric",
//             });

//             document.querySelector("#localTime").innerHTML = formattedTime;
//         }
//         updateCityClock();
//         clockInterval = setInterval(updateCityClock, 1000);
//     }
// }

// searchBTn.addEventListener("click", () => {
//     checkWeather(searchInput.value);
// })
