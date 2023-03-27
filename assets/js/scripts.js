$(document).ready(function () {
  var apiKey = "88b98ce88c750083cc3efc235475dd54";
  var searchEl = document.querySelector(".cityvalue");
  var citySearch = $(".inputcity");
  var listEl = $(".searches");

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
        // 5 DAY WEATHER DATA
        console.log(data);
        var weather = document.querySelectorAll(".wcard");
        for (let i = 0; i < weather.length; i++) {
          var currentDate = data.list[i * 8].dt;
          console.log(currentDate);
          console.log(i * 8);
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
            "Temp: " + data.list[i * 8].main.temp_min + "°F";
          image[i].setAttribute(
            "src",
            "https://openweathermap.org/img/wn/" + data.list[i].weather[0].icon
          );
          image[i].setAttribute("alt", data.list[i].weather[0].description);
          blockwind[i].innerHTML =
            "Wind: " + data.list[i * 8].wind.speed + " MPH";
          blockhum[i].innerHTML =
            "Humidity: " + data.list[i * 8].main.humidity + "%";
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
    var searchText = document.createElement("li");
    searchText.setAttribute("class", "col");

    // listEl.appendChild(searchText);
    console.log("line 54");

    init();
  });

  // function renderSearches() {
  //   var history = localStorage.getItem("searches");

  //   for (let i = 0; i < totalHistory.length; i++) {
  //     const blocks = totalHistory[i];
  //   }

  //   var block = document.createElement("li");
  //   block.innerHTML = history;
  // }

  // renderSearches();
});
