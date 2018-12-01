const axios = require('axios');
const moment = require('moment');

//arguments from command line
const chosenRoute = process.argv[2];
const chosenStop = process.argv[3];
const chosenDirection = process.argv[4];

console.log('in timeArrival.js', chosenRoute, chosenStop, chosenDirection);

try{
    //make sure correct arguments are input
    if(process.argv.length != 5){
        throw "please enter the correct arguments a metrotransit route, stop, and direction";
    }
    else{
        getRoutes();
    }

    getRoutes = () => {
        axios.get(`https://svc.metrotransit.org/NexTrip/Routes?format=json`)
            .then((response) => {
                if (response.data.length > 0) {
                    console.log('got todays routes');
                    
                }
            })
            .catch((error) => {
                console.log('error getting todays routes', error);
            });
    }

}
catch(error){
    console.log("too many arguments input");
}
