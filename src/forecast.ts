import request from 'request'

export function getForecast(latitude : number, longitude : number, callback : (error : any, data : any) => void) 
: void {
    let url : string = `https://api.darksky.net/forecast/1fffd9ca1e0ac722c02a92d849f82650/${latitude},${longitude}?units=si`

    request({url : url, json : true}, (error : any, {body} : any) => {
        if(error) {
            callback('Unable to connecto to weather service', undefined);
        } else if(body.error) {
            callback('Unable to find location', undefined);
        } else {
            let currently : any = body.currently; 
            let today : any = body.daily.data[0];
            callback(undefined, `${today.summary} It is currently ${currently. temperature} degrees outside. There is a ${currently.precipProbability}% chance of rain.`);
        }
    });
}