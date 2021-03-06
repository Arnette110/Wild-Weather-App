$("#city-list").on("click", "button", function(event) {
    event.preventDefault();
    clear();

    var btnVal = $(this).text();
    var APIKey = "5425a2aac49cece9bf036bfd0e2a21b1";
    var queryURL =
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        btnVal +
        "&units=imperial&appid=" +
        APIKey;
        
    // -- ajax call for current weather start -- 
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        // -- building current weather card start --
        var weatherList = $("<ul class='box content'>");
        var weatherIcon = response.weather[0].icon;
        var currentWeatherIcon = "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
        var Icon = $("<img/>", {
            id: "weatherIcon",
            src: currentWeatherIcon,
            width: 75
        });
        var city = $("<li>" + "<h1 class= 'title'>" + response.name + " " + "(" + currentDay + ")" + "</h1>" + "</li");
        var temp = $("<li>" + "<span>" + "Temperature:  " + response.main.temp + "  &#8457" + "</span>" + "</li>");
        var humid = $("<li>" + "<span>" + "Humidity:  " + response.main.humidity + "  %" + "</span>" + "</li>");
        var wind = $("<li>" + "<span>" + "Wind Speed:  " + response.wind.speed + "  mph" + "</span>" + "</li>");

        $("#currentWeather").append(weatherList);
        weatherList.append(city, Icon, temp, humid, wind);
        // -- building current weather card end --
    

        // -- ajax call for UV Index start --
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + response.coord.lat + "&lon=" + response.coord.lon,
            method: "GET"
        }).then(function (uvi) {

            var uvIVal = uvi.value;
            var uv = $("<li>" + "<span>" + "UV Index: " + "<span>" + uvIVal + "</span>" + "</span>" + "</li>");
            weatherList.append(uv);
            if (uvIVal < 3) {
                $(uv).css({
                    "background-color": "green",
                    "color": "white"
                })
            } else if (uvIVal >= 3 && uvIVal < 6) {
                $(uv).css({
                    "background-color": "yellow",
                    "color": "black"
                })
            } else if (uvIVal >= 6 && uvIVal < 8) {
                $(uv).css({
                    "background-color": "orange",
                    "color": "white"
                })
            } else if (uvIVal >= 8 && uvIVal < 11) {
                $(uv).css({
                    "background-color": "red",
                    "color": "white"
                })
            } else {
                $(uv).css({
                    "background-color": "purple",
                    "color": "white"
                })
            }
        });
    
    });
    
    // -- URL to query database --
    var queryURL =
        "https://api.openweathermap.org/data/2.5/forecast?q=" +
        btnVal +
        "&units=imperial&appid=" +
        APIKey;
    
    // -- ajax call for dayOne start --  
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        // -- get values of temp and humidity for each 3hr block --
        var sumTemp = 0;
        var sumHumid = 0;
        for (i = 0; i <= 7; i++) {
            sumTemp += parseInt(response.list[i].main.temp);
            sumHumid += parseInt(response.list[i].main.humidity);
        };

        // -- computes average temp and humidity for the day --
        var avgTemp = Math.floor(sumTemp/8);
        var avgHumid = Math.floor(sumHumid/8);
        

         // -- building dayOne weather card start --
         var weatherList = $("<ul class='tile is-child box'>").css({
             "background-color": "lightblue",
             "color": "white"

         });
         var weatherIcon = response.list[3].weather[0].icon;
         var currentWeatherIcon = "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
         var Icon = $("<img/>", {
             id: "weatherIcon",
             src: currentWeatherIcon,
             width: 50,
         });
         var date = $("<li>" + "<span>" + dayOne + "</span>" + "</li");
         var temp = $("<li>" + "<span>" + "Temp:  " + avgTemp + "  &#8457" + "</span>" + "</li>");
         var humid = $("<li>" + "<span>" + "Humidity:  " + avgHumid + "  %" + "</span>" + "</li>");
 
         $("#dayOne").append(weatherList);
         weatherList.append(date, Icon, temp, humid);
         // building dayOne weather card end --
         
    });
    // -- ajax call for dayOne end --

    // -- ajax call for dayTwo start --
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        // -- get values of temp and humidity for each 3hr block --
        var sumTemp = 0;
        var sumHumid = 0;
        for (i = 8; i <= 15; i++) {
            sumTemp += parseInt(response.list[i].main.temp);
            sumHumid += parseInt(response.list[i].main.humidity);
        };

        // -- computes average temp and humidity for the day --
        var avgTemp = Math.floor(sumTemp/8);
        var avgHumid = Math.floor(sumHumid/8);
        

         // -- building dayTwo weather card start --
         var weatherList = $("<ul class='tile is-child box'>").css({
             "background-color": "lightblue",
             "color": "white"

         });
         var weatherIcon = response.list[11].weather[0].icon;
         var currentWeatherIcon = "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
         var Icon = $("<img/>", {
             id: "weatherIcon",
             src: currentWeatherIcon,
             width: 50,
         });
         var date = $("<li>" + "<span>" + dayTwo + "</span>" + "</li");
         var temp = $("<li>" + "<span>" + "Temp:  " + avgTemp + "  &#8457" + "</span>" + "</li>");
         var humid = $("<li>" + "<span>" + "Humidity:  " + avgHumid + "  %" + "</span>" + "</li>");
 
         $("#dayTwo").append(weatherList);
         weatherList.append(date, Icon, temp, humid);
         // building dayTwo weather card end --
    });
    // -- ajax call for dayTwo end --

    // -- ajax call for dayThree start --
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        // -- get values of temp and humidity for each 3hr block --
        var sumTemp = 0;
        var sumHumid = 0;
        for (i = 16; i <= 23; i++) {
            sumTemp += parseInt(response.list[i].main.temp);
            sumHumid += parseInt(response.list[i].main.humidity);
        };

        // -- computes average temp and humidity for the day --
        var avgTemp = Math.floor(sumTemp/8);
        var avgHumid = Math.floor(sumHumid/8);
        

         // -- building dayThree weather card start --
         var weatherList = $("<ul class='tile is-child box'>").css({
             "background-color": "lightblue",
             "color": "white"

         });
         var weatherIcon = response.list[19].weather[0].icon;
         var currentWeatherIcon = "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
         var Icon = $("<img/>", {
             id: "weatherIcon",
             src: currentWeatherIcon,
             width: 50,
         });
         var date = $("<li>" + "<span>" + dayThree + "</span>" + "</li");
         var temp = $("<li>" + "<span>" + "Temp:  " + avgTemp + "  &#8457" + "</span>" + "</li>");
         var humid = $("<li>" + "<span>" + "Humidity:  " + avgHumid + "  %" + "</span>" + "</li>");
 
         $("#dayThree").append(weatherList);
         weatherList.append(date, Icon, temp, humid);
         // building dayThree weather card end --
    });
    // -- ajax call for dayThree end --

    // -- ajax call for dayFour start --
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        // -- get values of temp and humidity for each 3hr block --
        var sumTemp = 0;
        var sumHumid = 0;
        for (i = 24; i <= 31; i++) {
            sumTemp += parseInt(response.list[i].main.temp);
            sumHumid += parseInt(response.list[i].main.humidity);
        };

        // -- computes average temp and humidity for the day --
        var avgTemp = Math.floor(sumTemp/8);
        var avgHumid = Math.floor(sumHumid/8);
       

         // -- building dayFour weather card start --
         var weatherList = $("<ul class='tile is-child box'>").css({
             "background-color": "lightblue",
             "color": "white"

         });
         var weatherIcon = response.list[27].weather[0].icon;
         var currentWeatherIcon = "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
         var Icon = $("<img/>", {
             id: "weatherIcon",
             src: currentWeatherIcon,
             width: 50,
         });
         var date = $("<li>" + "<span>" + dayFour + "</span>" + "</li");
         var temp = $("<li>" + "<span>" + "Temp:  " + avgTemp + "  &#8457" + "</span>" + "</li>");
         var humid = $("<li>" + "<span>" + "Humidity:  " + avgHumid + "  %" + "</span>" + "</li>");
 
         $("#dayFour").append(weatherList);
         weatherList.append(date, Icon, temp, humid);
         // building dayFour weather card end --
    });
    // -- ajax call for dayFour end --

    // -- ajax call for dayFive start --
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        // -- get values of temp and humidity for each 3hr block --
        var sumTemp = 0;
        var sumHumid = 0;
        for (i = 32; i <= 39; i++) {
            sumTemp += parseInt(response.list[i].main.temp);
            sumHumid += parseInt(response.list[i].main.humidity);
        };

        // -- computes average temp and humidity for the day --
        var avgTemp = Math.floor(sumTemp/8);
        var avgHumid = Math.floor(sumHumid/8);
        

         // -- building dayOne weather card start --
         var weatherList = $("<ul class='tile is-child box'>").css({
             "background-color": "lightblue",
             "color": "white"

         });
         var weatherIcon = response.list[35].weather[0].icon;
         var currentWeatherIcon = "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
         var Icon = $("<img/>", {
             id: "weatherIcon",
             src: currentWeatherIcon,
             width: 50,
         });
         var date = $("<li>" + "<span>" + dayFive + "</span>" + "</li");
         var temp = $("<li>" + "<span>" + "Temp:  " + avgTemp + "  &#8457" + "</span>" + "</li>");
         var humid = $("<li>" + "<span>" + "Humidity:  " + avgHumid + "  %" + "</span>" + "</li>");
 
         $("#dayFive").append(weatherList);
         weatherList.append(date, Icon, temp, humid);
         // building dayFive weather card end --
    });
    
});
