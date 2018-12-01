const express = require('express');
const router = express.Router();
const axios = require('axios');

//GET  route to get transit routes available today
router.get('/', (req, res) => {
    console.log('in get todays routes router');

    axios.get(`https://svc.metrotransit.org/NexTrip/Routes?format=json`)
        .then((response) => {
            if(response.data.length > 0){
                console.log('got todays routes');
                res.send(response.data);
            }
        })
        .catch((error) => {
            console.log('error getting todays routes', error);
            res.sendStatus(500);
        });
}); //end get route

//GET route to get directions available for chosen route
router.get('/directions/:routeNum', (req, res) => {
    let chosenRoute = req.params.routeNum;
    console.log('in get directions router', chosenRoute);

    axios.get(`http://svc.metrotransit.org/NexTrip/Directions/${chosenRoute}`)
        .then((response) => {
            console.log(response);
            res.send(response.data);
        })
        .catch((error) => {
            console.log('error getting directions for route', error);
            res.sendStatus(500);
        });

}); //end get directions route

//GET route to get stops for chosen route 
router.get('/stops/:routeNum/:directionNum', (req, res) => {
    
    let chosenRoute = req.params.routeNum;
    let direction = req.params.directionNum

    console.log('in get stops router', chosenRoute, direction);

    axios.get(`https://svc.metrotransit.org/NexTrip/Stops/${chosenRoute}/${direction}?format=json`)
        .then((response) => {
            console.log(response);
            res.send(response.data);
        })
        .catch((error) => {
            console.log('error getting stops for route', error);
            res.sendStatus(500);
        });
}); //end get stops route

//GET route to get time until next bus/train arrives
router.get('/time/:routeNum/:directionNum/:stopId', (req, res) => {

    let chosenRoute = req.params.routeNum;
    let chosenDirection = req.params.directionNum;
    let chosenStop = req.params.stopId;

    console.log('in get time router', chosenRoute, chosenDirection, chosenStop);

    axios.get(`https://svc.metrotransit.org/NexTrip/${chosenRoute}/${chosenDirection}/${chosenStop}?format=json`)
        .then((response) => {
            console.log(response);
            res.send(response.data);
        })
        .catch((error) => {
            console.log('error getting time until next bus/train', error);
            res.sendStatus(500);
        });
}); //end get time route

module.exports = router;