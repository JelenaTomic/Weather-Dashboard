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
})