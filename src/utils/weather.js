const request = require('request');
const dsky = process.env.dsky_token;

const getWeather = ({latitude, longitude} , callback) => {
    
    const url = `https://api.darksky.net/forecast/${dsky}/${latitude},${longitude}?units=si`;
    request({url, json: true}, (error, {body} ={} ) => {
        if (error) {
            callback('Something went wrong! (darksky)', undefined);
        }else if (body.error) {        
            callback("Error description (darksky) : " + body.error, undefined);
        }else{
            callback(undefined, {weather: `Currently the temperature is ${body.currently.temperature} degrees, with ${body.currently.precipProbability}% chances of rain`, forecast: body.daily.data[0].summary, temperatureHiLow:`High: ${body.daily.data[0].temperatureMax} | Low: ${body.daily.data[0].temperatureMin}` });   
        }
    });
}

module.exports = getWeather;