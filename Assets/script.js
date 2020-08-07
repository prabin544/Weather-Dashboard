$(document).ready(function(){

    $("#searchBtn").click(function(){
        var cityName = $("#city").val();
        $("#city").empty();
        console.log(cityName);
        var weatherURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=9cb706456cc29e11df0385d8eb8de0f8";
        $.ajax({
            url: weatherURL,
            method: "GET",
        }).then(function(response) {
            var tempResults = response.list[0];
            var lat = response.city.coord.lat;
            var lon = response.city.coord.lon;

            getUV(lat, lon);

            var tempDiv = $("<div>");
            var hCity = $("<h2>").text(response.city.name);
            var pTemp = $("<p>").text("Temperature: " + tempResults.main.temp + " \u00B0F");
            var pHum = $("<p>").text("Humidity: " + tempResults.main.humidity + " %");
            var pWind = $("<p>").text("Humidity: " + tempResults.wind.speed + " MPH");
            var pWind = $("<p>").text("Humidity: " + tempResults.wind.speed + " MPH");
            var pUIndex = $("<p>").text("UV Index: Loading....").addClass("uvClass");
            // var iconurl = "http://openweathermap.org/img/w/" + pIcon + ".png";
            // $('#wicon').attr('src', iconurl);
            
            $("#temp-goes-here").empty();
            tempDiv.append(hCity, pTemp, pHum, pWind, pUIndex);
            $("#temp-goes-here").append(tempDiv);
            
        });
    });
    
        function getUV(lat, lon){
            uvUrl = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=9cb706456cc29e11df0385d8eb8de0f8";
            $.ajax({
                url: uvUrl,
                method: "GET",
            }).then(function(response) {
                console.log(response.value);
                $(".uvClass").text("UV Index: " + response.value)

            });
        }

        function weatherIcon(){

        }

        function fiveDayForecast(){

        }
});