$(document).ready(function () {
  var apiKey = "0578539c9ba7ff6fc8e3f6f54cac232c";
  var searchEl = document.getElementsByClassName("cityvalue");
  var citySearch = $(".inputcity");

  function getWeather(lat, lon) {
    console.log("getWeather Started");
    fetch(
      "https://api.openweathermap.org/data/2.5/forecast?units=imperial&lat=" +
        lat +
        "&lon=" +
        lon +
        "&appid=" +
        apiKey
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        // Current Weather
        var today = document.querySelectorAll(".today");
        for (let i = 0; i < 1; i++) {
          currentDate = data.list[i].dt;
          var time = document.getElementsByClassName("date");
          var image = document.getElementsByClassName("pic");
          var temp = document.getElementsByClassName("temp");
          var wind = document.getElementsByClassName("wind");
          var hum = document.getElementsByClassName("humd");
          time.innerHTML = dayjs.unix(currentDate).format("MMM/DD/YYYY");
          temp.innerHTML = "Temp: " + data.list[i].main.temp_min + "°F";
          // image.setAttribute(
          //   "src",
          //   "https://openweathermap.org/img/wn/" +
          //     data.list[i].weather[0].icon +
          //     "@2x.png"
          // );
          // image.setAttribute("alt", list[i].weather[0].description);
          wind.innerHTML = "Wind: " + data.list[i].wind.speed + "MPH";
          hum.innerHTML = "Humidity: " + data.list[i].main.humidity + "%";
        }
        // 5 DAY WEATHER DATA
        console.log(data);
        var weather = document.querySelectorAll(".wcard");
        for (let i = 0; i < 1; i++) {
          currentDate = data.list[i].dt;
          var time = document.getElementsByClassName("date");
          var image = document.getElementsByClassName("pic");
          var temp = document.getElementsByClassName("temp");
          var wind = document.getElementsByClassName("wind");
          var hum = document.getElementsByClassName("humd");
          time.innerHTML = dayjs.unix(currentDate).format("MMM/DD/YYYY");
          temp.innerHTML = "Temp: " + data.list[i].main.temp_min + "°F";
          // image.setAttribute(
          //   "src",
          //   "https://openweathermap.org/img/wn/" +
          //     data.list[i].weather[0].icon +
          //     "@2x.png"
          // );
          // image.setAttribute("alt", list[i].weather[0].description);
          wind.innerHTML = "Wind: " + data.list[i].wind.speed + "MPH";
          hum.innerHTML = "Humidity: " + data.list[i].main.humidity + "%";
        }
        console.log(data);
        console.log(weather);
      });
  }

  function init() {
    console.log("init Started");
    var city = "greensboro";

    // calls API and sets required parameters such as city and key
    fetch(
      "https://api.openweathermap.org/geo/1.0/direct?q=" +
        city +
        "&limit=" +
        1 +
        "&appid=" +
        apiKey
    )
      .then(function (response) {
        return response.json();
      })
      // from data, lat and lon is pulled, then function is given variables
      .then(function (data) {
        var lat = data[0].lat;
        var lon = data[0].lon;
        getWeather(lat, lon);
      });
  }

  citySearch.on("click", function (event) {
    console.log("btn clicked");
    console.log(searchEl.value);
    // prevents page wipe before localStorage log
    event.preventDefault();
    console.log("line 45");

    // Stringifies object to JSON string for easy localStorage call opposed to multiple values having to be called
    localStorage.setItem("search", searchEl);
    console.log("line 54");

    init();
  });
});
