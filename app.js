const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
app.post("/", function (req, res) {
  const cityName = req.body.city;
  const unit = req.body.units;
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&APPID=c638f122ad5d3333a05018384ba38c1f&" +
    unit;
  https.get(url, function (response) {
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const icn = weatherData.weather[0].icon;
      const icnUrl = "http://openweathermap.org/img/wn/" + icn + "@2x.png";
      res.write("<p>The current weather condition is " + description + "</p>");
      res.write(
        "<h1>Temperature in " + cityName + " is " + temp + " " + unit + "</h1>"
      );
      res.write("<img src=" + icnUrl + ">");
      res.send();
    });
  });
});

app.listen(3000);
