// -- variables for dates --
var currentDay = moment().format('L');
var dayOne = moment().add(1, 'days').format('L');
var dayTwo = moment().add(2, 'days').format('L');
var dayThree = moment().add(3, 'days').format('L');
var dayFour = moment().add(4, 'days').format('L');
var dayFive = moment().add(5, 'days').format('L');

// -- variables for dynamic buttons --
var citiesListEl = $("#city-list");
var cities = [];

init();
loadLastWeather();
// -- function to create buttons with names of cities that have been searched and saved to localStorage --
function renderCities() {
    if (cities.length > 7) {
        cities.shift();
    }
    for (var i = 0; i < cities.length; i++) {

        var city = cities[i];
        var li = $("<li>")
        var button = $("<button>");
        button.text(city);
        button.attr("data-index", i);
        button.addClass("button is-link is-fullwidth is-outlined box")
        li.append(button);
        $("#city-list").prepend(li);
        $("#city-list").prepend("<br>");
    }
};

// -- function to retrieve city names from localStorage --
function init() {
    $("#city-list").empty();
    var storedCities = JSON.parse(localStorage.getItem("cities"));
    if (storedCities !== null) {
        cities = storedCities;
    };
    renderCities();
};

// -- searchBtn onclick event --
$("#searchBtn").on("click", function (event) {
    clear();
    today();
    fiveDayForecast();
});

// -- search on keypress of "enter" event --
$("#location").on("keypress", function (e) {
    if (e.which === 13) {
        clear();
        today();
        fiveDayForecast();
    };
});

// -- function to empty out the currentWeather and fiveDayForecast divs --
function clear() {
    $("#currentWeather").empty();
    $("#dayOne").empty();
    $("#dayTwo").empty();
    $("#dayThree").empty();
    $("#dayFour").empty();
    $("#dayFive").empty();
};