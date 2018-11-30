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
router.get('/directions', (req, res) => {
    let chosenRoute = req.body;

    console.log(chosenRoute);
}); //end get directions route

module.exports = router;