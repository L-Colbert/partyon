import React, { Component } from 'react';
import './css/App.css';
import MapContainer from './components/MapContainer';

class App extends Component {
      state = {
        staticMap: [],
        defaultMapProps: 
        [
          {center : [33.748995, -84.387982]},
          {zoom : 10}
        ]
    }


    componentDidMount() {
        let key = `key=AIzaSyBR94Y6cJWdYrdIJ_LjSites5nBTwL9yhs`
        let center = `center=33.748995,-84.387982`
        let size = `size=400x400`
        let zoom = `zoom=10`
        const parameters = [
            `${size}`,
            `${center}`,
            `${zoom}`,
            `${key}`,
        ].join("&")
        let url = `https://maps.googleapis.com/maps/api/staticmap?${parameters}`
        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.blob()
                }
            })
            .then(data => {
                this.setState({ staticMap: URL.createObjectURL(data) });
                return(this.state.staticMap)
            })
            .catch(err => {
                console.log(`didn't fetch map: err ${err}`)
            })
    }

  render() {
    return (
      <div className="App">
        <header role="banner" className="App-header">
          <h1>
            Party On!
          </h1>
        </header>
          <MapContainer copyOfMapAtl={this.state.staticMap} />
      </div>
    );
  }
}

export default App;
