$(document).ready(function() {
    // ajax request 
    var cityVar = "";
    const api_key = "e14cf45a50592027f0ccce5ea6982a48";
    var weatherURL;
    var forecastURL;
    var date = moment().format('MMM Do YY');
    var history;
    var cityName;
    var $forecast = document.querySelector(".card");
// local storage for city search 
    function loadHistory() {
        if (!localStorage.getItem("index")) {
            cityName = -1;
            $("#searchHistory").append(`<li>Empty History</li><hr>`);
            history = false;
        }
        else {
            $("#searchHistory").empty();
            cityIndex = localStorage.getItem("index");
            for (let i=-1; i<cityIndex; i++) {
                $("#searchHistory").prepend(`<li class="history" type="button">${localStorage.getItem(`City: ${i+1}`)}</li><hr>`);
            }
        }
    }

    function savedHistory() {
        if (history==false) {
            $("#searchHistory").empty();
            history = true;
        }
    }
// icon depending on the weather 
    function icons() {
    
        for (let i=0; i<$forecast.length; i++) {
            var icon = $forecast[i].children[1].getAttribute('data-name');
            if (icon=="Clear") {
                $forecast[i].children[1].setAttribute("class", "fa-solid fa-sun-bright");
            }
            else if (icon == "Clouds") {
                $forecast[i].children[1].setAttribute("class", "fa-solid fa-clouds");
            }
            else if (icon == "Rain") {
                $forecast[i].children[1].setAttribute("class", "fa-solid fa-clouds");
            }
            else if (icon == "Snow") {
                $forecast[i].children[1].setAttribute("class","fa-solid fa-snowflakes")
            }
            else {
                $forecast[i].children[1].setAttribute("class", "fa-solid fa-wrench");  
            }
        }
    }
    loadHistory();
    $(".searchBtn").on("click", function() {
        savedHistory();
        cityVar = $("#searchBar").val();
        weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityVar}&appid=${api_key}`;
        forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityVar}&appid=${api_key}`;
    })
})