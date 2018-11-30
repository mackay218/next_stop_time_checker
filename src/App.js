import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

//function to get todays transit routes
function getTodaysRoutes() {
  console.log ('in getTodaysRoutes');
  
  //disable direction dropdown
  document.getElementById('directionDropDown').disabled = true;

  axios.get('/api/nextStopRouter')
    .then((response) => {
      console.log(response.data);

      // call function to populate routes drop down
      populateRouteDropDown(response.data);

    })
    .catch((error) => {
      console.log('error getting todays routes', error);
      alert('error getting todays routes', error);
    });
}//end getTodaysRoutes

//function to populate Route dropdown
function populateRouteDropDown(routesArr){
  console.log('in populateRouteDropDown', routesArr);
  //get  route drop down
  let routeDropDown = document.getElementById('routeDropDown');

  //loop through routesArr to create options for dropdown
  for(let item of routesArr){
    let newOption = document.createElement('option');

    newOption.value = item.Route
    newOption.innerHTML = item.Description

    routeDropDown.appendChild(newOption);

  }

}// end populateRouteDropDown

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      route: '',
      stops: '',
      directions: '',
      chosenStop: '',
      chosenDirection: '',
    }
  }

  componentDidMount() {
    getTodaysRoutes();
  }

  //function to handle selection or route
  handleRouteChange = (event) => {
    console.log('in handleRouteChange', event.target.value);

    let routeNum = event.target.value;

    axios.get(`/api/nextStopRouter/directions/${routeNum}`)
      .then((response) => {
        console.log(response.data);

        this.setState({
          route: routeNum,
          directions: response.data,
        });
        
        //call function to populate direction drop down
        this.populateDirectionDropDown();
      })
      .catch((error) => {
        console.log('error getting directions for route', error);
        alert('error getting directions for route', error);
      });

  }//end handleRouteChange

  //function to populateDirectonDropDown
  populateDirectionDropDown = () => {

    let directionsArr = this.state.directions;

    let directionDropDown = document.getElementById('directionDropDown');

    //clear previous options
    let optionArr = directionDropDown.getElementsByTagName('option');
    
    if(optionArr.length > 1){
      for (let i = optionArr.length - 1; i >= 0; i--) {
        directionDropDown.remove(optionArr[i]);
      }

      let chooseOne = document.createElement('option');
      chooseOne.innerHTML = 'Choose Direction';
      chooseOne.selected = true;
      chooseOne.disabled = true;

      directionDropDown.appendChild(chooseOne);
    }
    
    //enable directionDropDown
    directionDropDown.disabled = false;

    if(directionsArr.length > 0){
      for(let item of directionsArr){
        let newOption = document.createElement('option');
        newOption.innerHTML = item.Text;
        newOption.value= item.Value;

        directionDropDown.appendChild(newOption);
      }

    }

  }//end populateDirectionDropDown

  //function to handle selection of directoin
  handleDirectionChange = (event) => {
    console.log('in handleDirectionChange', event.target.value);

    let chosenDirection = event.target.value;

    this.setState({
      chosenDirection: chosenDirection,
    });

  }//end handleDirectonChange

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Next Stop Time Checker</h1>
        </header>
        <div className="form-container">
          <form>
            {/* drop down to be populated with routes on componentDidMount */}
            <label htmlFor="#routeDropDown">Routes</label>
            <select id="routeDropDown" onChange={this.handleRouteChange}>
              <option disabled selected>Choose Route</option>
            </select>
            {/* drop down to be populated and enabled when route is selected */}
            <label htmlFor="#directionDropDown">Direction</label>
            <select id="directionDropDown" onChange={this.handleDirectionChange}>
              <option disabled selected>Choose Direction</option>
            </select>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
