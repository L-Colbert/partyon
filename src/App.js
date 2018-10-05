import React, { Component } from 'react';
import './css/App.css';
import MapContainer from './components/MapContainer';

class App extends Component {
  state = {
    staticMap: [],
    defaultMapProps:
      [
        { center: [33.748995, -84.387982] },
        { zoom: 10 }],
    nightSpots: []
  }
  
  loadStaticMap = () => {
    let key = `key=AIzaSyBR94Y6cJWdYrdIJ_LjSites5nBTwL9yhs`
    let center = `center=33.748995,-84.387982`
    let size = `size=300x300`
    let zoom = `zoom=10`
    
    const mapParams = [
      `${size}`,
      `${center}`,
      `${zoom}`,
      `${key}`,
    ].join("&")
    let mapUrl = `https://maps.googleapis.com/maps/api/staticmap?${mapParams}`

    fetch(mapUrl)
    .then(response => {
      if (response.ok) {
        return response.blob()
      }
    }).then(data => {
      this.setState({ staticMap: URL.createObjectURL(data) });
      return (this.state.staticMap)
    }).catch(err => {
      console.log(`didn't fetch map: err ${err}`)
    })

  }

  getNightSpots = () => {
    // GET https://api.foursquare.com/v2/venues/search
    // GET https://api.foursquare.com/v2/venues/explore
    // 4d4b7105d754a06376d81259 nightlight spot
    let fourSqParams = [
      `ll=33.748995,-84.387982`,
      // `categoryId=4d4b7105d754a06376d81259`,
      `query=club`,
      `limit=20`,
      `client_id=3ZV20H0X5WOSYXQQ2FVI0NHCNGPYLTHUZQLRE1EVOTRGHYKP`,
      `client_secret=3AOFNXLIEMMCFLR3VSXRALYVCWUYFT4SEVXYUTSKKD3WJWXV`,
      `v=20181003`
    ].join('&')

    let fourSqUrl = `https://api.foursquare.com/v2/venues/explore?${fourSqParams}`


    fetch(fourSqUrl)
      .then(response => {
        if (response.ok) {
          return response.json()
        }
      }).then(data => {
        console.log(data.response.groups[0].items)
        let venueIds = data.response.groups[0].items.map(dataItem => {
          return { "name":dataItem.venue.name, "venueId": dataItem.venue.id, "lat": dataItem.venue.location.lat, "long": dataItem.venue.location.lng }
        })
        this.setState({ nightSpots: venueIds })
        return venueIds
      }).then(() => { console.log(this.state.nightSpots) })
      .catch(error => {
        console.log(`this is your error ${error}`)
      })

  }

  componentDidMount() {
    this.loadStaticMap()
    this.getNightSpots()
  }

  render() {
    return (
      <div className="App">
        <header role="banner" className="App-header">
          <h1>
            Party On!
          </h1>
        </header>
        <MapContainer
          defaultMapProps={this.state.defaultMapProps}
          copyOfMapAtl={this.state.staticMap}
          nightSpots={this.state.nightSpots}
        />
      </div>
    );
  }
}

export default App;
