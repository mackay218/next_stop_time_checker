import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

//function to get todays transit routes
function getTodaysRoutes() {
  console.log ('in getTodaysRoutes');
  
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

//function to populate Route drop down
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

  componentDidMount() {
    getTodaysRoutes();
  }

  //handle change of route drop down menu

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
            <select id="routeDropDown">
              <option>Choose Route</option>
            </select>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
