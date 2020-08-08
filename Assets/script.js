$(document).ready(function(){

    var currentDate = moment().format("YYYY/MM/DD");
    console.log(currentDate);
    
    $("#searchBtn").click(function(){
        var cityName = $("#city").val();
        var city = $("<li>").text(cityName);
        $("#savedcity").append(city);
    
        var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=9cb706456cc29e11df0385d8eb8de0f8";
        $.ajax({
            url: weatherURL,
            method: "GET",
        }).then(function(response) {
            var lat = response.coord.lat;
            var lon = response.coord.lon;

            getUV(lat, lon);

            var tempDiv = $("<div>");
            // weatherIcon(response);

            var wiconCode = response.weather[0].icon;
            var iconurl = "http://openweathermap.org/img/w/" + wiconCode + ".png";
            // $("#wicon").attr('src', iconurl);

            var hCity = $("<h2>").text(response.name + " " + currentDate );
            var iconImg = $("<img>").attr("src", iconurl);
            hCity.append(iconImg);
            var pTemp = $("<p>").text("Temperature: " + response.main.temp + " \u00B0F");
            var pHum = $("<p>").text("Humidity: " + response.main.humidity + " %");
            var pWind = $("<p>").text("Humidity: " + response.wind.speed + " MPH");
            var pWind = $("<p>").text("Humidity: " + response.wind.speed + " MPH");
            var pUIndex = $("<p>").text("UV Index: Loading....").addClass("uvClass");
            

            $("#temp-goes-here").empty();
            $("#forecast-goes-here-0").empty();
            $("#forecast-goes-here-1").empty();
            $("#forecast-goes-here-2").empty();
            $("#forecast-goes-here-3").empty();
            $("#forecast-goes-here-4").empty();
            tempDiv.append(hCity, pTemp, pHum, pWind, pUIndex);
            $("#temp-goes-here").append(tempDiv);

        fiveDayForecast(cityName);
            
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

 
        function fiveDayForecast(cityName){
            var fiveDayForecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=9cb706456cc29e11df0385d8eb8de0f8";
            $.ajax({
                url: fiveDayForecastUrl,
                method: "GET",
            }).then(function(response) {
                var dayIndex = ["0", "8", "16", "24", "32"];
                console.log(response.list);
                for (let i = 0; i < dayIndex.length; i++) {
                    var index = dayIndex[i];
                    console.log(response.list[index]);
                    var result = response.list[index];

                    var wiconCode = result.weather[0].icon;
                    var iconurl = "http://openweathermap.org/img/w/" + wiconCode + ".png";

                    var iconImg = $("<img>").attr("src", iconurl);

                    var pTemp = $("<p>").text("Temperature: " + result.main.temp + " \u00B0F");
                    var pHum = $("<p>").text("Humidity: " + result.main.humidity + " %");

                    $("#forecast-goes-here-"+i).append(iconImg,pHum,pTemp);
                    
                }

            });
        }
});