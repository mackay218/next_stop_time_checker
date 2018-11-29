import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

//function to get todays transit routes
function getTodaysRoutes() {
  console.log ('in getTodaysRoutes');
  
  let uneededVar = 0;

  axios.get('/api/nextStopRouter', uneededVar)
    .then((response) => {
      console.log(response);
      return
    })
    .catch((error) => {
      console.log('error getting todays routes', error);
      alert('error getting todays routes', error);
    });
}

class App extends Component {

  componentDidMount() {
    getTodaysRoutes();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
