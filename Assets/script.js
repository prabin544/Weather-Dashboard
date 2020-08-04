$(document).ready(function(){

    var cityName = prompt("Enter city name: ");

    var weatherURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=9cb706456cc29e11df0385d8eb8de0f8";
    

    $.ajax({
        url: weatherURL,
        method: "GET",
    }).then(function(response) {
        console.log("city: " + response.city.name);
        console.log("Current Temp: " + response.list[0].main.temp);
        console.log("Feels_like: " + response.list[0].main.feels_like);
        console.log("Temp_min: " + response.list[0].main.temp_min);
        console.log("Temp_max: " + response.list[0].main.temp_max);
        var results = response.list[0];
        console.log(results);
        var tempDiv = $("<div>");
        var p = $("<p>").text("city: " + response.city.name);
        var p = $("<p>").text("Current Temp: " + results.main.temp);
        var p = $("<p>").text("Feels_like: " + results.main.feels_like);
        var p = $("<p>").text("Temp_min: " + results.main.temp_min);
        var p = $("<p>").text("Temp_max: " + results.main.temp_max);
        tempDiv.append(p);
        $("#temp-goes-here").append(tempDiv);

    });
  



});