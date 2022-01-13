const api = {
    key: "255b63a4d5fa510528e569f621824ad5",
    base: "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
    if (evt.key === 'Enter') {
        getResults(searchbox.value);
    }
}

function getResults (query) {
    fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
        .then(weather => {
            return weather.json();
        }).then(displayResults);
}

function displayResults (weather) {
    console.log(weather);
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°F</span>`;

    let iconcode = weather.weather[0].icon;
    let iconurl = "https://openweathermap.org/img/w/" + iconcode + ".png";
    document.getElementById("wicon").src = `${iconurl}`

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;

    let hi_lo = document.querySelector('.current .hi-lo');
    hi_lo.innerText = `${Math.round(weather.main.temp_max)}°F / ${Math.round(weather.main.temp_min)}°F`

    if(weather.sys.sunrise*1000 < Date.now() && Date.now() < weather.sys.sunset*1000) {
        document.getElementById("input").style.borderBottom = "3px solid \#ff6a00"
        document.getElementById("w_app_body").style.backgroundImage = "url(./images/weather_app_bkgd_day.png)"
    } else {
        document.getElementById("input").style.borderBottom = "3px solid \#8f2dff"
        document.getElementById("w_app_body").style.backgroundImage = "url(./images/weather_app_bkgd_2.png)"
    }
}

function dateBuilder(d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October",
    "November", "December"]
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}

