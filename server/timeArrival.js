const axios = require('axios');
const moment = require('moment');

//arguments from command line
const chosenRoute = process.argv[2];
const chosenStop = process.argv[3];
let chosenDirection = process.argv[4];
chosenDirection = chosenDirection.toUpperCase();

//console.log('in timeArrival.js', chosenRoute, chosenStop, chosenDirection);

try{
    //make sure correct arguments are input
    if(process.argv.length != 5){
        throw "please enter the correct arguments a metrotransit route, stop, and direction";
    }
    else{
        getRoutes();
    }

    //function to get all routes available transit routes
    function getRoutes(){
        //console.log('in getRoutes');
        axios.get(`https://svc.metrotransit.org/NexTrip/Routes?format=json`)
            .then((response) => {
                if (response.data.length > 0) {
                    //console.log('got todays routes');
                    
                    //call function to get routeInfo
                    getChosenRouteInfo(response.data);
                    
                }
            })
            .catch((error) => {
                console.log('error getting todays routes', error);
            });
    }//end getRoutes

    //function to get info for chosen route
    getChosenRouteInfo = (routesArr) => {
        //console.log('in getChosenRouteInfo');
        //check array of routes against chosen route
        for(let i = 0; i < routesArr.length; i++){

            //if input route exists
            if (chosenRoute === routesArr[i].Description){
                
                //call function to get direction info
                getDirectionInfo(routesArr[i].Route);
                return routesArr[i].Route;
            }
            else if(i === routesArr.length - 1){
                console.log('route not found');
            }
        }
    }//end getChosenRouteInfo

    //function to get info for chosen direction
    getDirectionInfo = (routeNum) => {
        //console.log('in getDirectionInfo', routeNum);

        axios.get(`http://svc.metrotransit.org/NexTrip/Directions/${routeNum}`)
            .then((response) => {
            
                let directionArr = response.data; 

                for(let i = 0; i < directionArr.length; i++){
                    if (directionArr[i].Text.includes(chosenDirection)){
                        
                        //call function to get stop info
                        getStopInfo(routeNum, directionArr[i].Value)
                        return directionArr[i].Value;
                    }
                }
                    console.log('direction not found');
            })
            .catch((error) => {
                console.log('error getting direction info', error);
            });
    }//end getDirectionInfo

    //function to get info for chosen stop
    getStopInfo = (routeNum, directionNum) => {
        //console.log('in getStopInfo', routeNum, directionNum);
        axios.get(`https://svc.metrotransit.org/NexTrip/Stops/${routeNum}/${directionNum}?format=json`)
            .then((response) => {
                let stopArr = response.data;
                for(let i = 0; i < stopArr.length; i++){
                    if(chosenStop === stopArr[i].Text){
                        
                        //call function to get time until next bus/train arrives
                        getTime(routeNum, directionNum, stopArr[i].Value);
                        return stopArr[i].Value;
                    }
                    else if(i = stopArr.length - 1){
                        console.log('stop not found');
                    }
                }

            })
            .catch((error) => {
                console.log('error getting stop info', error);
            });

    }//end getStopInfo

    getTime = (routeNum, directionNum, stopId)=> {
        //console.log('in getTime');
        axios.get(`https://svc.metrotransit.org/NexTrip/${routeNum}/${directionNum}/${stopId}?format=json`)
            .then((response) => {

                let time;

                if (response.data.length === 0) { //if no response
                    
                    time = 'No bus or Train coming';
                }
                else if (response.data.length > 0) {
                    let nextBusTrain = response.data[0];

                    if (nextBusTrain.Actual) {
                        if (nextBusTrain.DepartureText === 'Due') {
                            
                            time = 'Any minute';
                        }
                        else {

                            time = nextBusTrain.DepartureText.replace('Min', 'minutes');
                        }
                    }
                    else {
                        //round time to minutes
                        moment.relativeTimeThreshold('m', 60);

                        time = moment(nextBusTrain.DepartureTime).fromNow();
                        time = time.substring(3, time.length);
                    }
                }

                console.log(time);
            })
            .catch((error) => {
                console.log('error getting time unitl next bus/train', error);
            });
    }//end getTime


} catch(error){
    console.log(error, process.argv.length);
}
