// FILE TO CONTROL API FOR WEATHER MODULE

// API key needed to access weather DB and pull information
const APIkey = "166a433c57516f51dfab1f7edaed8413";

// GET request/route for city linked to account

// Pulling the weather data(excludes UV) from the API using varible we took from out GET request

funciton getCurrentWeather(userCity) {

    // constructing the route to direct to api and pull data from it
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
        "q=" + encodeURI(userCity) + "&units=imperial&appid=" + APIKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .done(function (response) {

            // DISPLAYING CURRENT WEATHER (not including UX index) - City, date, icon image, temp, humidity, wind speed
            var lon = response.coord.lon;
            var lat = response.coord.lat;

            $(".city-name").html(response.name);
            $(".current-img").attr("src", "https://api.openweathermap.org/img/w/" + response.weather[0].icon);
            $(".current-temp").html("Current Temperature:" + response.main.temp + "°");
            $(".current-Humidity").html("Humidity:" + response.main.humidity + "%");
            $(".current-wind-speed").html("Wind Speed:" + response.wind.speed + "mph");
            setTimeout(function () {
                getUv(lon, lat);
            }, 100)

        })
}

// Pulling weather data(only UV idex) from the API using varible we took from out GET request
function getUv(index1, index2) {

    var queryURLindex = "https://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lon=" + index1 + "&lat=" + index2;

    $.ajax({
        url: queryURLindex,
        method: "GET"
    })
        .done(function (response) {

            $(".todays-uv-index").html("UV Index:" + response.value);
        })
}
