"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var request_1 = __importDefault(require("request"));
function getCoordinates(address, callback) {
    var url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json?access_token=pk.eyJ1IjoidGFrdWxhIiwiYSI6ImNqdm9hdjczYTFxbzEzenJ0bDdyMmM5MXMifQ.poM-qzA_7PUXGa1VqN4g7A&limit=1";
    request_1.default({ url: url, json: true }, function (error, _a) {
        var body = _a.body;
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        }
        else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined);
        }
        else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            });
        }
    });
}
exports.getCoordinates = getCoordinates;
