"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var request_1 = __importDefault(require("request"));
function getForecast(latitude, longitude, callback) {
    var url = "https://api.darksky.net/forecast/1fffd9ca1e0ac722c02a92d849f82650/" + latitude + "," + longitude + "?units=si";
    request_1.default({ url: url, json: true }, function (error, _a) {
        var body = _a.body;
        if (error) {
            callback('Unable to connecto to weather service', undefined);
        }
        else if (body.error) {
            callback('Unable to find location', undefined);
        }
        else {
            var currently = body.currently;
            var today = body.daily.data[0];
            console.log(today);
            callback(undefined, today.summary + " It is currently " + currently.temperature + " degrees outside. There is a " + currently.precipProbability + "% chance of rain. Maximum temperature is " + today.temperatureMax + ", minimum temperature is " + today.temperatureMin + ".");
        }
    });
}
exports.getForecast = getForecast;
