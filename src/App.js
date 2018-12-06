import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import moment from 'moment';

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      routes: '',
      stops: '',
      directions: '',
      chosenRoute: '',
      chosenStop: '',
      chosenDirection: '',
      time: ''
    }
  }

  componentDidMount() {
    this.getTodaysRoutes();
  }

  //function to clear options
  clearOptions = (elementId) => {
    console.log('in clearOptions', elementId);

    let targetElement = document.getElementById(elementId);

    let optionArr = targetElement.getElementsByTagName('option');

    if (optionArr.length > 1) {
      for (let i = optionArr.length - 1; i >= 0; i--) {
        targetElement.remove(optionArr[i]);
      }

      let chooseOne = document.createElement('option');
      let innerString = elementId.split('D')[0];
      
      chooseOne.innerHTML = `Choose ${innerString}`;
      chooseOne.selected = true;
      chooseOne.disabled = true;

      targetElement.appendChild(chooseOne);
    }

  }//end clearOptions

  //function to populate dropdown
  populateDropDown = (elementId, optionArr, targetVal, targetText) => {
    console.log('in populateDropDown', elementId, optionArr, targetVal, targetText);

    let targetElement = document.getElementById(elementId);

    if (optionArr.length > 0) {

      optionArr.forEach((item) => {
        let newOption = document.createElement('option');

        newOption.innerHTML = item[targetText];
        newOption.value = item[targetVal];

        targetElement.appendChild(newOption);
      });
    }
  }//end populateDropDown

  //function to get todays transit routes
  getTodaysRoutes = () => {
    console.log('in getTodaysRoutes');

    //disable direction dropdown
    document.getElementById('directionDropDown').disabled = true;

    //disble stop dropdown
    document.getElementById('stopDropDown').disabled = true;

    axios.get('/api/nextStopRouter')
      .then((response) => {
        console.log(response.data);

        this.setState({
          routes: response.data,
        });

        // call function to populate routes drop down
        this.populateRouteDropDown();
      })
      .catch((error) => {
        console.log('error getting todays routes', error);
        alert('error getting todays routes', error);
      });
  }//end getTodaysRoutes

  //function to populate Route dropdown
  populateRouteDropDown = () => {

    let routesArr = this.state.routes;

    console.log('in populateRouteDropDown', routesArr);
   
    this.populateDropDown('routeDropDown', routesArr, 'Route', 'Description');

}// end populateRouteDropDown

  //function to handle selection or route
  handleRouteChange = (event) => {
    console.log('in handleRouteChange', event.target.value);

    let routeNum = event.target.value;

    this.setState({
      chosenRoute: routeNum,
    });

    //call function to get directions
    this.getDirections(routeNum);
    
  }//end handleRouteChange

  //function to get directions available for route
  getDirections = (routeNum) => {
    console.log('in getDirections');

    axios.get(`/api/nextStopRouter/directions/${routeNum}`)
      .then((response) => {
        console.log(response.data);

        this.setState({
          directions: response.data,
        });

        //call function to get stops
        this.getStops();

        // //call function to populate direction drop down
         this.populateDirectionDropDown();
      })
      .catch((error) => {
        console.log('error getting directions for route', error);
        alert('error getting directions for route', error);
      });
  } //end getDirections

  //function to get stops available for route
  getStops = () => {
    
    let routeNum = this.state.chosenRoute;

    let directionNum = this.state.directions[0].Value;

    console.log('in getStops', routeNum, directionNum);

    axios.get(`/api/nextStopRouter/stops/${routeNum}/${directionNum}`)
      .then((response) => {
        console.log(response.data)

        this.setState({
          stops: response.data,
        });

        //call function to populate stop drop down
        this.populateStopDropDown();

      })
      .catch((error) => {
        console.log('error getting stops for route and direction', error);
        alert('error getting stops for route and direction', error);
      });

  }//end getStops

  //function to populate direction drop down
  populateDirectionDropDown = () => {
    
    let directionsArr = this.state.directions;

    console.log('in populateDirectionDropDown', directionsArr);

    let directionDropDown = document.getElementById('directionDropDown');

    //clear previous options
    this.clearOptions('directionDropDown');

    //call fucntion to populate drop down
    this.populateDropDown('directionDropDown', directionsArr, 'Value', 'Text');
    
    //enable directionDropDown
    directionDropDown.disabled = false;

  }//end populateDirectionDropDown

  //function to handle selection of direction
  handleDirectionChange = (event) => {
    console.log('in handleDirectionChange', event.target.value);

    let chosenDirection = event.target.value;

    this.setState({
      chosenDirection: chosenDirection,
    });

  }//end handleDirectonChange

  //function to populate stops dropdown
  populateStopDropDown = () => {

    let stopsArr = this.state.stops;

    console.log('in populateStopDropDown', stopsArr);

    //clear previous options
    this.clearOptions('stopDropDown');

    //call fucntion to populate drop down
    this.populateDropDown('stopDropDown', stopsArr, 'Value', 'Text');

    let stopDropDown = document.getElementById('stopDropDown');

    //enable stop dropdown
    stopDropDown.disabled = false;
  }

  //function to handle selection of stop
  handleStopChange = (event) => {
    console.log('in handleStopChange', event.target.value);

    let chosenStop = event.target.value;

    this.setState({
      chosenStop: chosenStop,
    });

  }//end handleStopChange

  //functionto handle form submission
  handleSubmit = (event) => {
    event.preventDefault();

    console.log('in handleSubmit', this.state);

    let chosenRoute =  this.state.chosenRoute;
    let chosenDirection = this.state.chosenDirection;
    let chosenStop = this.state.chosenStop;

    //make sure user has chosen all needed parameters
    if(chosenRoute != '' && chosenDirection != '' && chosenStop != ''){
      axios.get(`/api/nextStopRouter/time/${chosenRoute}/${chosenDirection}/${chosenStop}`)
        .then((response) => {
          console.log(response.data);

          this.handleResponse(response.data);

        })
        .catch((error) => {
          console.log('error getting time until next bus/train', error);
          alert('error getting time until next bus/train', error);
        });

    }
    else{
      console.log('please choose a route, stop, and direction');
      alert('please choose a route stop and direction');
    }
    
  }//end handleSubmit

  //function to handle response for getting next time of bus/train
  handleResponse = (data) => {
    console.log('in handleResponse');

    let responseDisplay = document.getElementById('nextTime');

    //clear responseDisplay
    responseDisplay.innerHTML = '';

    if (data.length === 0) { //if no response
      console.log('No bus or Train coming');
      responseDisplay.innerHTML = 'No bus or train coming';
    }
    else if(data.length > 0){
      let nextBusTrain = data[0];

      let time;

      if(nextBusTrain.Actual){
        if(nextBusTrain.DepartureText === 'Due'){
          console.log('Any minute');
          time = 'Any minute';
        }
        else{
          time = nextBusTrain.DepartureText.replace('Min', 'minutes');
        }

        responseDisplay.innerHTML = time;
      }
      else{
        //round time to minutes
        moment.relativeTimeThreshold('m', 60);
        
        time = moment(nextBusTrain.DepartureTime).fromNow();
        
        //remove beginning of string e.g. "in"
        time = time.substring(3, time.length);
        
        responseDisplay.innerHTML = time;
      }
    }
  }//end handleResponse

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Next Stop Time Checker</h1>
        </header>
        <div className="form-container">
          <form onSubmit={this.handleSubmit}>
            {/* dropdown to be populated with routes on componentDidMount */}
            <label htmlFor="#routeDropDown">Routes</label>
            <select defaultValue="choose" id="routeDropDown" onChange={this.handleRouteChange}>
              <option disabled value="choose">Choose route</option>
            </select>
            {/* dropdown to be populated with stops when route is selected */}
            <label htmlFor="#stopDropDown" >Stops</label>
            <select defaultValue="choose" id="stopDropDown" onChange={this.handleStopChange}>
              <option disabled value="choose">Choose stop</option>
            </select>
            {/* dropdown to be populated and enabled when route is selected */}
            <label htmlFor="#directionDropDown">Direction</label>
            <select defaultValue="choose" id="directionDropDown" onChange={this.handleDirectionChange}>
              <option disabled value="choose">Choose direction</option>
            </select>
            <button>Submit</button>
          </form>
        </div>
        <div className="resultContainer">
          <h3>Next Bus/Train: <p id="nextTime"></p></h3>
        </div>
      </div>
    );
  }
}

export default App;
