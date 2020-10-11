const request = require('request')

const forecast = (lat,long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=85a0c9758bc630c9432f363323aa8d1f&query=' + lat + ',' + long + '&units=m'

    request({url: url, json:true},(error,response) => {
        if(error){
            callback("Error: Unable to connect to weather service", undefined)
        }else if(response.body.error){
            console.log(url)
            callback("Invalid Location Coordinates",undefined)
        }else{
            callback(undefined, response.body.current['weather_descriptions'][0] + ". It is currently " + response.body.current['temperature'] + " degress out. It feels like " + response.body.current['feelslike'] + " degress out. Humidity is " + response.body.current.humidity + "%")
        }
    })
}

module.exports = forecast