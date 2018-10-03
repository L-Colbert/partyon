import React, { Component } from 'react';
import './css/App.css';
import Map from './components/MapContainer'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>
            Party On!
          </h1>
          <Map/>
        </header>
      </div>
    );
  }
}

export default App;
