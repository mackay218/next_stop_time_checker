//file to test functions before using

const axios = require('axios');

module.exports = {

    //function to get todays transit routes
    getTodaysRoutes() {
        console.log('in getTodaysRoutes');

        return axios.get(`https://svc.metrotransit.org/NexTrip/Routes?format=json`);
    },//end getTodaysRoutes
    
    getRouteDirections(routeNum) {
        console.log('in getRouteDirections');
    
        return axios.get(`https://svc.metrotransit.org/NexTrip/Directions/${routeNum}?format=json`);
    },//end getRouteDirections

    getStops(routeNum, directionNum) {
        console.log('in getStops');

        return axios.get(`https://svc.metrotransit.org/NexTrip/Stops/${routeNum}/${directionNum}?format=json`);
    },//end getStops

    getTime(routeNum, directionNum, stopId) {
        console.log('in getTime');

        return axios.get(`https://svc.metrotransit.org/NexTrip/${routeNum}/${directionNum}/${stopId}?format=json`);
    }//end getTime
}