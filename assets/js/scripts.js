$(document).ready(function () {
  var apiKey = "88b98ce88c750083cc3efc235475dd54";
  var searchEl = document.querySelector(".cityvalue");
  var citySearch = $(".inputcity");

  function init() {
    console.log("init Started");

    // calls API and sets required parameters such as city and key
    fetch(
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
        searchEl.value +
        "&limit=" +
        1 +
        "&appid=" +
        apiKey
    )
      .then(function (response) {
        console.log(response);
        return response.json();
      })
      // from data, lat and lon is pulled, then function is given variables
      .then(function (data) {
        // Current Weather
        var today = document.querySelectorAll(".today");
        for (let i = 0; i < today.length; i++) {
          var nowDate = data.list[i].dt;
          var time = document.getElementsByClassName("date");
          var image = document.getElementsByClassName("pic");
          var temp = document.getElementsByClassName("temp");
          var wind = document.getElementsByClassName("wind");
          var hum = document.getElementsByClassName("humd");
          time.innerHTML = dayjs.unix(nowDate).format("MMM/DD/YYYY");
          temp.innerHTML = "Temp: " + data.list[i].main.temp_min + "°F";
          // image.setAttribute(
          //   "src",
          //   "https://openweathermap.org/img/wn/" +
          //     data.list[i].weather.icon
          // );
          // image.setAttribute("alt", data.list[i].weather.description);
          wind.innerHTML = "Wind: " + data.list[i].wind.speed + " MPH";
          hum.innerHTML = "Humidity: " + data.list[i].main.humidity + "%";
        }
        // 5 DAY WEATHER DATA
        console.log(data);
        var weather = document.querySelectorAll(".wcard");
        for (let i = 0; i < weather.length; i++) {
          var currentDate = data.list[i].dt;
          var time = document.getElementsByClassName("date");
          var image = document.getElementsByClassName("pic");
          var temp = document.getElementsByClassName("temp");
          var wind = document.getElementsByClassName("wind");
          var hum = document.getElementsByClassName("humd");
          // time[i].innerHTML = dayjs.unix(currentDate).format("MMM/DD/YYYY");
          temp[i].innerHTML = "Temp: " + data.list[i].main.temp_min + "°F";
          // image.setAttribute(
          //   "src",
          //   "https://openweathermap.org/img/wn/" +
          //     data.list[i].weather.icon
          // );
          // image.setAttribute("alt", data.list[i].weather.description);
          wind[i].innerHTML = "Wind: " + data.list[i].wind.speed + " MPH";
          hum[i].innerHTML = "Humidity: " + data.list[i].main.humidity + "%";
        }
        console.log(data);
        console.log(weather);
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
