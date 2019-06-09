
import express, { response } from 'express'
import path from 'path'
import hbs from 'hbs'
import { partials } from 'handlebars';
import * as geocode from '../../weather-app/utils/geocode';
import * as weather from '../../weather-app/utils/forecast';

let app  = express();
const dir : string = path.join(__dirname, '../public');
const viewsPath : string = path.join(__dirname, './templates/views');
const partialsPath : string = path.join(__dirname, './templates/partials')

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(dir));

app.get('', (req, res) => {
    res.render('index', {
        title : "Weather App",
        name : "Takula Lenyatso"
    });
});

app.get('/about', (re, res) => {
    res.render('about',  {
        title : "About",
        name : "Takula Lenyatso"
    });
});

app.get('/help', (req, res) => {
    
    res.render('help', {
        title : "Help",
        message : 'Location not found, try another search.',
        name : 'Takula Lenyatso'
    });
});

app.get('/weather', (req, res) => {
    const address : string = req.query.address;

    if(!address) {
        return res.send({
            error : 'An address is required'
        });
    }

    geocode.getCoordinates(address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({
                error : error
            });
        }

        weather.getForecast(latitude, longitude, (error, data) => {
            if(error) {
                return res.send({
                    error
                });
            }

            res.send({
                forecast : data,
                location,
                address
            });
        });

    });

})

app.get('/help/*', (request, response) => {
    response.render('404', {
        title : 'Error',
        errorMessage : 'Help article not found.',
        name : 'Takula Lenyatso'
    });
})

app.get('*', (request, response) => {
    response.render('404', {
        title : "Error",
        errorMessage : 'Page not found.',
        name : 'Takula Lenyatso'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})