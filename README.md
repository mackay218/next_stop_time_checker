# Next Stop Time Checker

An application to get the time in minutes before the next bus or train departs 
at the users stop on their chosen route and going their chosen direction.

## Built with
- ReactJS
- NodeJS/ExpressJS
- MomentJS
- Axios
- Metrotansit API


## Setup

1. Requires NodeJS install it [here](https://nodejs.org/en/download/)
2. To run on your computer clone the repository
3. Run ```npm install``` in terminal to install needed dependencies

## Running Application

1. Try a hosted Demo [here](https://glacial-gorge-14469.herokuapp.com/)
    1. Select a route from the route drop down
    2. Select a stop from the stop drop down
    3. Select a directon from the directon drop down
    4. Click submit

    The result will display on the DOM.

2. To run in terminal:
    1. Navigate to the server folder of the application ```cd server``` 
    2. Enter a route, stop, and direction e.g. 
    ```node timeArrival.js "METRO Blue Line" "Mall of America Station" "North"```

    The result will be logged to the console.

3. To run the app via the GUI locally on your computer
    1. Make sure you have Nodemon installed
    2. run ```npm run server``` and then ```npm run client``` in terminal

### Testing

- In terminal run ```npm test```

## Next Steps

- responsive layout and styling
- testing for edge cases
- disable or give notifications possible choices that will never have a result 
    because the bus/train does not extend in that direction from the last stop on the line.
    e.g. "METRO GEEN Line" "Target Field Station Platform 2" "West"  