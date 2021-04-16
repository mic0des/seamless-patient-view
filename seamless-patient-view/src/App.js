import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import { Context } from './state/Store';

import logo from './logo.svg';
import './App.css';

function App() {
  const [state, dispatch] = useContext(Context);

  useEffect(() => {
    axios
      .get(
        'https://hapi.fhir.org/baseR4/Patient?birthdate=1950-01-01&_format=json&_pretty=true'
      )
      .then(function (response) {
        let massagedData = response.data.entry.map(patient => {
          let resource = patient.resource;
          return {
            name: resource.name[0].text ? resource.name[0].text : resource.name[0].given.reverse().map(w => w[0].toUpperCase() + w.substr(1).toLowerCase()).join(' '),
            gender: resource.gender,
            birthDate: resource.birthDate
          }
        })
        debugger
        dispatch({ type: 'SET_DATA', payload: massagedData }) 
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
