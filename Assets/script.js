$(document).ready(function(){

    var weatherURL = "api.openweathermap.org/data/2.5/forecast?q=dallas&appid=9cb706456cc29e11df0385d8eb8de0f8";

    $.ajax({
        url: weatherURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
    });
  























});