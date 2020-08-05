$(document).ready(function(){

    $("#searchBtn").click(function(){
        var cityName = $("#city").val();
        $("#city").empty();
        console.log(cityName);
        var weatherURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=9cb706456cc29e11df0385d8eb8de0f8";
        $.ajax({
            url: weatherURL,
            method: "GET",
        }).then(function(response) {
            var tempResults = response.list[0];
            var lat = response.city.coord.lat;
            var lon = response.city.coord.lon;

            var uv = getUV(lat, lon);
            console.log(uv);

            var tempDiv = $("<div>");
            var hCity = $("<h2>").text(response.city.name);
            var pTemp = $("<p>").text("Temperature: " + tempResults.main.temp + " \u00B0F");
            var pHum = $("<p>").text("Humidity: " + tempResults.main.humidity + " %");
            var pWind = $("<p>").text("Humidity: " + tempResults.wind.speed + " MPH");
            var pIcon = $("<p>").text(tempResults.weather[0].icon);
            var iconurl = "http://openweathermap.org/img/w/" + pIcon + ".png";
            $('#wicon').attr('src', iconurl);
            
            $("#temp-goes-here").empty();
            tempDiv.append(hCity, pTemp, pHum, pWind);
            $("#temp-goes-here").append(tempDiv);
            
        });
    });
    
        function getUV(lat, lon){
            uvUrl = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=9cb706456cc29e11df0385d8eb8de0f8";
            $.ajax({
                url: uvUrl,
                method: "GET",
            }).then(function(response) {
                console.log(response.value);
                return response.value;
            });
        }

        function weatherIcon(){
            
        }

        function fiveDayForecast(){

        }
});