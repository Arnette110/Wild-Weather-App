var currentDay = moment().format('L')


$("#searchBtn").on("click", function (event) {
    clear();
    today();
});

$("#location").on("keypress", function (e) {
    if (e.which === 13) {
        clear();
        today(); 
    };
});

function today(){
    var APIKey = "5425a2aac49cece9bf036bfd0e2a21b1";
    var searchParam = $("#location")
        .val()
        .trim();
    // Here we are building the URL we need to query the database
    var queryURL =
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        searchParam +
        "&units=imperial&appid=" +
        APIKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(queryURL);
        console.log(response);

        var weatherList = $("<ul class='box content'>");
        var city = $("<li>" + "<h1 class= 'title'>" + response.name + " " + "(" + currentDay + ")" + response.weather.icon + "</h1>" + "</li");
        var temp = $("<li>" + "<span>" + "Temperature:  " + response.main.temp + "  &#8457" + "</span>" + "</li>");
        var humid = $("<li>" + "<span>" + "Humidity:  " + response.main.humidity + "  %" + "</span>" + "</li>");
        var wind = $("<li>" + "<span>" + "Wind Speed:  " + response.wind.speed + "  mph" + "</span>" + "</li>");
       
        $("#currentWeather").append(weatherList);
        weatherList.append(city, temp, humid, wind);

        $.ajax({
            url: "http://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + response.coord.lat + "&lon=" + response.coord.lon,
            method: "GET"
        }).then(function (uvi) {
            console.log(uvi);
            var uvIVal = uvi.value;
            var uv = $("<li>" + "<span>" + "UV Index: " + "<span>" + uvIVal + "</span>" + "</span>" + "</li>");
            weatherList.append(uv);
            if (uvIVal < 3) {
                $(uv).css({"background-color": "green", "color": "white"})
            } else if (uvIVal >= 3 && uvIVal < 6 ) {
                $(uv).css({"background-color": "yellow", "color": "black"})
            } else if (uvIVal >= 6 && uvIVal < 8) {
                $(uv).css({"background-color": "orange", "color": "white"})
            } else if (uvIVal >= 8 && uvIVal < 11) {
                $(uv).css({"background-color": "red", "color": "white"})
            } else {
                $(uv).css({"background-color": "purple", "color": "white"})
            }
        });
    });
};

function fiveDayForecast(){

}

// Function to empty out the currentWeather div
function clear() {
    $("#currentWeather").empty();
}
