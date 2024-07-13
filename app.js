const weatherContainer = document.getElementById("wt-container");
const city = document.getElementById("city-select");
const weatherIcon = document.getElementById("wt-temp-img");
const tempPara = document.getElementById("temp-para");
const tempType = document.getElementById("temp-type");
const cityName = document.getElementById("city-name");
const tempMax = document.getElementById("temp-max");
const tempMin = document.getElementById("temp-min");
const tempFeels = document.getElementById("temp-feel");
const windSpeed = document.getElementById("wind-speed");
const dateContainer = document.getElementById("date-cont");
const dayContainer = document.getElementById("day-cont");
const timeContainer = document.getElementById("time-cont");

// Setting Up Date Object

const date = new Date();
const presentDate = date.getDate();
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const presentMonth = date.getMonth();
const presentMonthName = months[presentMonth];
const presentYear = date.getFullYear();
const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const presentDay = date.getDay();
const presentDayName = weekDays[presentDay];
const presentHours = date.getHours();
const presentMinutes = date.getMinutes();
let meradian;
function meridian() {
    if (presentHours <= 12) {
        meradian = "PM";
    } else {
        meradian = "AM";
    }
}
meridian();

// Setting up Api Query Param
const unit = "metric"
const appId = "3f729f13e252e86385b31b331de05394";

// Making Api Call
function submit() {
    let searchedCity = city.value;
    if (searchedCity === "") {
        alert("Please Enter a City");
        searchedCity == "Karachi";
    }
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&units=${unit}&appid=${appId}`).then((res) => {
        return res.json();
    }).then((data) => {
        console.log(data);
        let weatherDiscription = data.weather[0].main;
        switch (weatherDiscription) {
            case "Sunny":
                weatherIcon.src = "./images/heat-icn-removebg-preview.png";
                break;
            case "Clouds":
                weatherIcon.src = "./images/clouds-con-removebg-preview.png";
                break;
            case "Rain":
                weatherIcon.src = "./images/rain-icn-removebg-preview.png";
                break;
            case "Thunderstorm":
                weatherIcon.src = "./images/thd-rain-icn-removebg-preview.png";
                break;
            case "Haze":
                weatherIcon.src = "./images/haze-icn-removebg-preview.png";
                break;
            case "Smoke":
                weatherIcon.src = "./images/breeze-icn-removebg-preview.png";
                break;
            case "Breeze":
                weatherIcon.src = "./images/breeze-icn-removebg-preview.png";
                break; 
            default:
                weatherIcon.src = "./images/sun-icn-removebg-preview.png";       
        }
        cityName.innerText = data.name;
        tempPara.innerText = data.main.temp + "°C";
        tempType.innerText = data.weather[0].main;

        dayContainer.innerText = presentDayName;
        dateContainer.innerText = `${presentMonthName} ${presentDate} ${presentYear}`;
        tempMax.innerText = data.main.temp_max + "°C";
        tempMin.innerText = data.main.temp_min + "°C";
        tempFeels.innerText = data.main.feels_like + "°C";
        windSpeed.innerText = data.wind.speed + " m/s";
        timeContainer.innerText = `${presentHours} : ${presentMinutes} ${meradian}`;
    }).catch((err) =>{
        alert(err);
    });
    city.value = "";
}
city.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        submit();
    }
})
