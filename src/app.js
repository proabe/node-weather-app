const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode.js');
const weather = require('./utils/weather.js');
const port = process.env.PORT || 3000

const app = express();

// define paths for express config
const publicDirectoryAddress = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// setting handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// serves up static content for express server
app.use(express.static(publicDirectoryAddress));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Abhishek Singh'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Abhishek Singh'
    });
});

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Weather App Help',
        name: 'Abhishek Singh'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide address parameter'
        });
    }

    geocode(req.query.address.toString(), (error, {latitude, longitude, location} = {} ) => {
        if (error) {
           return res.send({error});
        }
        weather({latitude, longitude}, (w_error, {weather, forecast, temperatureHiLow} = {}) => {      
            if (w_error) {
               return res.send({error: w_error});
            }
            return res.send({location, weather, forecast, temperatureHiLow});
        });
    
    });
});

app.get('/help/*', (req, res) => {
    res.render('404_page', {
        title: '404 page',
        name: 'Abhishek Singh',
        message: 'Help article not found'
    });
});

app.get('*', (req, res) => {
    res.render('404_page', {
        title: '404 page',
        name: 'Abhishek Singh',
        message: 'Page not found'
    });
});

app.listen(port, () => {
    console.log(`Initiating server... @ port: ${port} `);
});