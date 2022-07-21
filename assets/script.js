$(document).ready(function() {
    // ajax request 
    var cityVar = "";
    const api_key = "e14cf45a50592027f0ccce5ea6982a48";
    var weatherURL;
    var forecastURL;
    var date = moment().format('MMM Do YY');
    var history;
    var cityName;
    var forecast = document.querySelectorAll(".card");
    
    
// local storage for city search 
    function loadHistory() {
        if (!localStorage.getItem("name")) {
            cityName = -1;
            $("#searchHistory").append(`<li>Empty History</li><hr>`);
            history = false;
        }
        else {
            $("#searchHistory").empty();
            cityIndex = localStorage.getItem("name");
            for (let i=-1; i<cityName; i++) {
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
    
        for (let i=0; i<forecast.length; i++) {
            var icon = forecast[i].children[1].getAttribute('data-name');
            if (icon=="Clear") {
                forecast[i].children[1].setAttribute("class", "fas fa-sun-bright");
            }
            else if (icon == "Clouds") {
                forecast[i].children[1].setAttribute("class", "fas fa-clouds");
            }
            else if (icon == "Rain") {
                forecast[i].children[1].setAttribute("class", "fas fa-clouds");
            }
            else if (icon == "Snow") {
                forecast[i].children[1].setAttribute("class","fas fa-snowflakes")
            }
            else {
                forecast[i].children[1].setAttribute("class", "fas fa-wrench");  
            }
        }
    }
    // search button
    loadHistory();
      $(".searchBtn").on("click", function() {
        savedHistory();
        cityVar = $("#searchBar").val();
        weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityVar}&appid=${api_key}&units=imperial`;
        forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityVar}&appid=${api_key}&units=imperial`;

        cityName++;
        localStorage.setItem(`City: ${cityName}`, `${cityVar}`);
        localStorage.setItem(`name`, `${cityName}`);
        var newCity = $(`<li class="history" type="button">${cityVar}</li>`);
        var hr = $("<hr>");

        $("#searchHistory").prepend(hr);
        $("#searchHistory").prepend(newCity);


          // api calls for requested items
          var lat = "";
          var lon = "";
        $.ajax({
            url: weatherURL 
        })
        .then(function(response) {
            lon = response.coord.lon;
            lat = response.coord.lat;
            $("#displayCity").text(`${response.name}  (${date})`);
            var tempF =response.main.temp 
            $("#temperature").text(`Temperature: ${tempF}\F `);
            $("#humidity").text(`Humidity ${response.main.humidity}%`);
            $("#wind").text(`Wind   ${response.wind.speed} MPH`);

            uviURL = `https://api.openweathermap.org/data/2.5/uvi?appid=${api_key}&lon=${lon}&lat=${lat}`; 
            $.ajax({
                url: uviURL 
            })
            .then(function(newResponse) {
                var uvi = newResponse.value;
                $("#uv").text(uvi);
                if (uvi <= 2) {
                    $("#uv").css("background-color", "#77DF78");
                    $("#uv").css("color", "black");
                }
                else if (uvi <= 5) {
                    $("#uv").css("background-color", "#FEFD95");
                    $("#uv").css("color", "black");
                }
                else if (uvi <= 7) {
                    $("#uv").css("background-color", "#FF8A5D");
                }
                else if (uvi <= 10) {
                    $("#uv").css("background-color", "#FF6663");
                }else {
                    $("#uv").css("background-color", "#C38EC6");
                }
            });
        });

        $.ajax({
            url: forecastURL 
        })
        .then(function(response) {
            for (let i=0; i<forecast.length; i++) {
                forecast[i].children[0].textContent = moment().add(i+1, "days").format('MMM Do YY');
                forecast[i].children[1].setAttribute("data-name", response.list[i*8].weather[0].main);
                var temp = response.list[i*8].main.temp ;
                var humidity = response.list[i*8].main.humidity;
                forecast[i].children[2].textContent = `Temperature ${temp}\F`;
                forecast[i].children[3].textContent = `Humidity ${humidity}%`;
            }
            icons();
        });
    });

    $(".aside").on("click", ".history", function() {
        cityVar = this.innerHTML;
        weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityVar}&appid=${api_key}`;
        forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityVar}&appid=${api_key}`;
    })

    var lat=""
    var lon=""
    $.ajax({
        url: weatherURL 
    })
    .then(function(response) {
        lon = response.coord.lon;
        lat = response.coord.lat;
        $("#displayCity").text(`${response.name}  (${date})`);
        var tempF = ((response.main.temp - 273.15) * 9/5 + 32).toPrecision(2);
        $("#temperature").text(`Temperature ${tempF}\u00B0F `);
        $("#humidity").text(`Humidity ${response.main.humidity}%`);
        $("#wind").text(`Wind   ${response.wind.speed} MPH`);

        uviURL = `https://api.openweathermap.org/data/2.5/uvi?appid=${api_key}&lon=${lon}&lat=${lat}`; 
        $.ajax({
            url: uviURL 
        })
        .then(function(newResponse) {
            var uvi = newResponse.value;
            $("#uv").text(uvi);
            if (uvi <= 2) {
                $("#uv").css("background-color", "#77DF78");
                $("#uv").css("color", "black");
            }
            else if (uvi <= 5) {
                $("#uv").css("background-color", "#FEFD95");
                $("#uv").css("color", "black");
            }
            else if (uvi <= 7) {
                $("#uv").css("background-color", "#FF8A5D");
            }
            else if (uvi <= 10) {
                $("#uv").css("background-color", "#FF6663");
            }else {
                $("#uv").css("background-color", "#C38EC6");
            }
        });
    });

    $.ajax({
        url: forecastURL 
    })
    .then(function(response) {
        for (let i=0; i<forecast.length; i++) {
            forecast[i].children[0].textContent = moment().add(i+1, "days").format('MMM Do YY');
            forecast[i].children[1].setAttribute("data-name", response.list[i*8].weather[0].main);
            var temp = ((response.list[i*8].main.temp - 273.15) * 9/5 + 32).toPrecision(2);
            var humidity = response.list[i*8].main.humidity;
            forecast[i].children[2].textContent = `Temperature ${temp}\u00B0F`;
            forecast[i].children[3].textContent = `Humidity ${humidity}%`;
        }
        icons();
    });
});



