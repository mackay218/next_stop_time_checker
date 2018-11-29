const express = require('express');
const router = express.Router();
const axios = require('axios');

//GET  route to get transit routes available today
router.get('/', (req, res) => {
    console.log('in get todays routes router');

    let uneededVar = 0;

    axios.get(`https://svc.metrotransit.org/NexTrip/Routes?format=json`, uneededVar)
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
});

module.exports = router;