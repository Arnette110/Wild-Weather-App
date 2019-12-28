var currentDay = moment().format('L')


// $("#searchBtn").on("click", function (event) {
//     clear();

//     var APIKey = "5425a2aac49cece9bf036bfd0e2a21b1";
//     var searchParam = $("#location")
//         .val()
//         .trim();
//     // Here we are building the URL we need to query the database
//     var queryURL =
//         "https://api.openweathermap.org/data/2.5/weather?q=" +
//         searchParam +
//         "&units=imperial&appid=" +
//         APIKey;

//     // Here we run our AJAX call to the OpenWeatherMap API
//     $.ajax({
//         url: queryURL,
//         method: "GET"
//     }).then(function (response) {
//         console.log(queryURL);
//         console.log(response);
//     });
// });

$("#location").on("keypress", function (e) {


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



    if (e.which === 13) {
        clear();
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(queryURL);
            console.log(response);

            var weatherList = $("<ul class='box content'>");
            var city = $("<li>" + "<h1 class= 'title'>" + response.name + " " + "(" + currentDay + ")" + response.weather.icon + "</h1>" + "</li");
            var temp = $("<li>" + "<span>" + "Temperature: " + response.main.temp + " &#8457" + "</span>" + "</li>");
            var humid = $("<li>" + "<span>" + "Humidity: " + response.main.humidity + " %" + "</span>" + "</li>");
            var wind = $("<li>" + "<span>" + "Wind Speed: " + response.wind.speed + " mph" + "</span>" + "</li>");
           
            $("#currentWeather").append(weatherList);
            weatherList.append(city, temp, humid, wind);

            $.ajax({
                url: "http://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + response.coord.lat + "&lon=" + response.coord.lon,
                method: "GET"
            }).then(function (uvi) {
                console.log(uvi);
                var uv = $("<li>" + "<span>" + "UV Index: " + uvi.value + "</span>" + "</li>");
                weatherList.append(uv);
                if (uv <= 2) {

                }


            });

          
            


        });
    };


});





// Function to empty out the currentWeather div
function clear() {
    $("#currentWeather").empty();
}
// time variables

// window.myWidgetParam ? window.myWidgetParam : (window.myWidgetParam = []);
// window.myWidgetParam.push({
//   id: 17,
//   cityid: "",
//   appid: "5425a2aac49cece9bf036bfd0e2a21b1",
//   units: "imperial",
//   containerid: "openweathermap-widget-17"
// });
// (function() {
//   var script = document.createElement("script");
//   script.async = true;
//   script.charset = "utf-8";
//   script.src =
//     "//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator.js";
//   var s = document.getElementsByTagName("script")[0];
//   s.parentNode.insertBefore(script, s);
// })()