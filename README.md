# Next Stop Time Checker

## Built with
- ReactJS
- NodeJS/ExpressJS
- MomentJS
- Axios


## Setup

1. Required NodeJS install it [here](https://nodejs.org/en/download/)
2. To run on your computer clone the repository
3. Run ```npm install``` in terminal to install needed dependencies

## Running Application

1. Try hosted Demo [here](https://glacial-gorge-14469.herokuapp.com/)
    1. Select a route from the route drop down
    2. Select a stop from the stop drop down
    3. Select a directon from the directon drop down
    4. Click submit

    The result will display on the DOM.

2. To run in terminal:
    1. Navigate to the server folder of the application ```cd server``` 
    2. Enter a route stop and direction e.g. 
    ```node timeArrival.js "METRO Blue Line" "Mall of America Station" "North"```

    The result will be logged to the console.

3. To run the GUI on your computer
    1. Make sure you have Nodemon installed
    2. run ```npm run server``` and then ```npm run client``` in terminal

### Testing

- In terminal run ```npm test```