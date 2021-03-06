"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var hbs_1 = __importDefault(require("hbs"));
var geocode_1 = require("./geocode");
var forecast_1 = require("./forecast");
var app = express_1.default();
var dir = path_1.default.join(__dirname, '../public');
var viewsPath = path_1.default.join(__dirname, './templates/views');
var partialsPath = path_1.default.join(__dirname, './templates/partials');
var port = process.env.PORT || 3000;
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs_1.default.registerPartials(partialsPath);
app.use(express_1.default.static(dir));
app.get('', function (req, res) {
    res.render('index', {
        title: "Weather App",
        name: "Takula Lenyatso"
    });
});
app.get('/about', function (re, res) {
    res.render('about', {
        title: "About",
        name: "Takula Lenyatso"
    });
});
app.get('/help', function (req, res) {
    res.render('help', {
        title: "Help",
        message: 'Location not found, try another search.',
        name: 'Takula Lenyatso'
    });
});
app.get('/weather', function (req, res) {
    var address = req.query.address;
    if (!address) {
        return res.send({
            error: 'An address is required'
        });
    }
    geocode_1.getCoordinates(address, function (error, _a) {
        var _b = _a === void 0 ? {} : _a, latitude = _b.latitude, longitude = _b.longitude, location = _b.location;
        if (error) {
            return res.send({
                error: error
            });
        }
        forecast_1.getForecast(latitude, longitude, function (error, data) {
            if (error) {
                return res.send({
                    error: error
                });
            }
            res.send({
                forecast: data,
                location: location,
                address: address
            });
        });
    });
});
app.get('/help/*', function (request, response) {
    response.render('404', {
        title: 'Error',
        errorMessage: 'Help article not found.',
        name: 'Takula Lenyatso'
    });
});
app.get('*', function (request, response) {
    response.render('404', {
        title: "Error",
        errorMessage: 'Page not found.',
        name: 'Takula Lenyatso'
    });
});
app.listen(port, function () {
    console.log('Server is up on port ' + port);
});
