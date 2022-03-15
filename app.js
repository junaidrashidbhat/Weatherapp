const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const axios = require("axios");
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.static("static"))

app.use(bodyParser.urlencoded({extended:true}));

app.post("/", function(req, res){
    const query = req.body.cityName;
const apiKey = "69bd0b3cfe17b2b2c251a16ee7ef8acb";
const unit = "metric"
const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid="+ apiKey +"&units="+ unit;
axios.get(url)
    .then(function(response){
        console.log(response.status);
        const weatherData = response.data
        const temp = weatherData.main.temp
        const weatherDis = weatherData.weather[0].description
        const icon = weatherData.weather[0].icon
        const imageURL = "http://openweathermap.org/img/wn/"+ icon + "@2x.png" 
        res.write("<p>The weather is currently " + weatherDis + " </p>");
        res.write("<h1>The temperature in " + query +" is "+ temp + "degree Celcius.</h1>");
        res.write("<img src=" + imageURL + " >");
        res.send();
    }).catch(function(err){
        res.status(err.response.data.cod.toString());
        res.send(err.response.data.message);
    })
// https.get(url, function(response){
//  console.log(response.statusCode);
//  response.on("data", function(data){
//      const weatherData = JSON.parse(data)
//      const temp = weatherData.main.temp
//      const weatherDis = weatherData.weather[0].description
//      const icon = weatherData.weather[0].icon
//      const imageURL = "http://openweathermap.org/img/wn/"+ icon + "@2x.png"
//      res.write("<p>The weather is currently " + weatherDis + " </p>");
//      res.write("<h1>The temperature in " + query +" is "+ temp + "degree Celcius.</h1>");
//      res.write("<img src=" + imageURL + " >");
//      res.send()
//  })  
// })

})






app.listen(PORT, function() {
    console.log("running @ " + PORT)
})