$(document).ready(function () {
  var apiKey = "88b98ce88c750083cc3efc235475dd54";
  var searchEl = document.querySelector(".cityvalue");
  var citySearch = $(".inputcity");
  var listEl = $(".searches");
  var history = localStorage.getItem("searches");

  function init() {
    console.log("init Started");

    // calls API and sets required parameters such as city and key
    fetch(
      "https://api.openweathermap.org/data/2.5/forecast?units=imperial&q=" +
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
        var todayDate = data.list[0].dt;
        console.log(todayDate);
        console.log(0);
        console.log(dayjs.unix(todayDate).format("MMM/DD/YYYY"));
        var time = document.getElementsByClassName("time");
        var image = document.getElementsByClassName("currentstatus");
        var temp = document.getElementsByClassName("temp");
        var wind = document.getElementsByClassName("wind");
        var hum = document.getElementsByClassName("humd");
        time[0].textContent =
          "Currently at " +
          searchEl.value +
          " on " +
          dayjs.unix(todayDate).format("MMM/DD/YYYY");
        temp[0].innerHTML = "Temp: " + data.list[0].main.temp_min + "°F";
        image[0].setAttribute(
          "src",
          "https://openweathermap.org/img/wn/" +
            data.list[0].weather[0].icon +
            "@2x.png"
        );
        image[0].setAttribute("alt", data.list[0].weather[0].description);
        wind[0].innerHTML = "Wind: " + data.list[0].wind.speed + " MPH";
        hum[0].innerHTML = "Humidity: " + data.list[0].main.humidity + "%";
        // 5 DAY WEATHER DATA
        console.log(data);
        var weather = document.querySelectorAll(".wcard");
        for (let i = 0; i < weather.length; i++) {
          var currentDate = data.list[i * 8 + 4].dt;
          console.log(currentDate);
          console.log(i * 8 + 4);
          console.log(dayjs.unix(currentDate).format("MMM/DD/YYYY"));
          var blocktime = document.getElementsByClassName("blocktime");
          var image = document.getElementsByClassName("status");
          var blocktemp = document.getElementsByClassName("blocktemp");
          var blockwind = document.getElementsByClassName("blockwind");
          var blockhum = document.getElementsByClassName("blockhumd");
          blocktime[i].textContent = dayjs
            .unix(currentDate)
            .format("MMM/DD/YYYY");
          blocktemp[i].innerHTML =
            "Temp: " + data.list[i * 8 + 4].main.temp_min + "°F";
          image[i].setAttribute(
            "src",
            "https://openweathermap.org/img/wn/" +
              data.list[i].weather[0].icon +
              "@2x.png"
          );
          image[i].setAttribute("alt", data.list[i].weather[0].description);
          blockwind[i].innerHTML =
            "Wind: " + data.list[i * 8 + 4].wind.speed + " MPH";
          blockhum[i].innerHTML =
            "Humidity: " + data.list[i * 8 + 4].main.humidity + "%";
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
    // history.push(searchEl);
    // renderSearches();
    // console.log("line 71");

    init();
  });

  // localize code
  // function renderSearches() {
  //   history.innerHTML = "";
  //   for (let i = 0; i < searchHistory.length; i++) {
  //     const historyItem = document.createElement("input");
  //     historyItem.setAttribute("type", "text");
  //     historyItem.setAttribute("readonly", true);
  //     historyItem.setAttribute("class", "form-control d-block bg-white");
  //     historyItem.setAttribute("value", searchHistory[i]);
  //     historyItem.addEventListener("click", function () {
  //       getWeather(historyItem.value);
  //     });
  //     historyEl.append(historyItem);
  //   }
  // }
  // renderSearches();
});
