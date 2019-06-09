
import request from 'request'

export function getCoordinates(address : string, callback : (error : any, data : any) => void) : void {
    let url : string = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoidGFrdWxhIiwiYSI6ImNqdm9hdjczYTFxbzEzenJ0bDdyMmM5MXMifQ.poM-qzA_7PUXGa1VqN4g7A&limit=1`

    request({url : url, json : true}, (error : any, {body} : any) => {
        if(error) {
            callback('Unable to connect to weather service!', undefined);
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined);
        } else {
            callback(undefined, {
                longitude : body.features[0].center[0],
                latitude : body.features[0].center[1],
                location : body.features[0].place_name
            });
        }
    });
}