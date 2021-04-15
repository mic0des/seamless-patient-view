import React, { useEffect, useContaxt } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

function App() {

  useEffect(() => {
    axios
      .get(
        'https://hapi.fhir.org/baseR4/Patient?birthdate=1950-01-01&_format=json&_pretty=true'
      )
      .then(function (response) {
        debugger
        // dispatch({ type: 'SET_DEFAULT_SETTINGS', payload: [response.data] })
      })
      .catch((err) => new Error('Error fetching performance trend data', err))
  }, [])

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

export default App;
