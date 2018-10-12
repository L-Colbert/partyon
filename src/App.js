import React, { Component } from 'react'
import './css/App.css'
import MapContainer from './components/MapContainer'
import Sidebar from './components/Sidebar'
import { strictEqual } from 'assert'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react'

class App extends Component {
  //   constructor(props){
  //     super(props)
  //   }
  state = {
    staticMap: [],
    defaultMapProps:
      [
        { center: [33.748995, -84.387982] },
        { zoom: 10 }],
    nightSpots: [],
    currentlyShowing: [], //mutable is that ok
    // bounds: []
    //code from https://www.npmjs.com/package/google-maps-react
    selectedPlace: {},
    activeMarker: {},
    showingInfoWindow: false,
    location: []
  }

  // updateStateTwo = (key, value) => {
  //   console.log(key,value)

  //   this.setState({
  //     currentlyShowing: value
  //   })
  // }

  updateState = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
      location: props.address
    })
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
        this.setState({ staticMap: URL.createObjectURL(data) })
        return (this.state.staticMap)
      }).catch(err => {
        console.log(`didn't fetch map: err ${err}`)
      })

  }

  getNightSpots = () => {
    let fourSqParams = [
      // `ll=33.748995,-84.387982`,
      `near=Atlanta,GA`,
      `query=club`,
      `limit=3`,
      // `openNow=1`,
      `radius=25000`,
      `client_id=3ZV20H0X5WOSYXQQ2FVI0NHCNGPYLTHUZQLRE1EVOTRGHYKP`,
      `client_secret=3AOFNXLIEMMCFLR3VSXRALYVCWUYFT4SEVXYUTSKKD3WJWXV`,
      `v=20181003`
    ].join('&')

    // let fourSqUrl = `https://api.foursquare.com/v2/venues/explore?${fourSqParams}`

    fetch('../firstsample.json')
      .then(response => {
        if (response.ok) {
          return response.json()
        }
      }).then(data => {
        let venueInfo = data.response.groups[0].items.map(dataItem => {
          return {
            "name": dataItem.venue.name,
            "venueId": dataItem.venue.id,
            "lat": dataItem.venue.location.lat,
            "lng": dataItem.venue.location.lng,
            "neighborhood": dataItem.venue.location.neighborhood,
            "isVisible": true, //marker visibility
            "listDetailVisible": false
          }
        })
        this.setState({ nightSpots: venueInfo, currentlyShowing: venueInfo })
        return venueInfo
      }).then(venueInfoArray => {
        // let newBounds = this.getBounds(venueInfoArray)
        this.getSpotDetails(venueInfoArray)
        // this.setState({ bounds: newBounds })
      })
      .catch(error => {
        console.log(`This is the problem: ${error}`)
      })
  }

  // getBounds = (arrayWithCoordinates) => {
  //   console.log(arrayWithCoordinates)
  //   var bounds = new this.props.google.maps.LatLngBounds()
  //   console.log(bounds)
  //   arrayWithCoordinates.forEach(site => {
  //     let lat = site.lat
  //     let lng = site.lng
  //     bounds.extend(new this.props.google.maps.LatLng(lat, lng))
  //     console.log(bounds)
  //   })
  //   return bounds
  // }

  getSpotDetails = (spotsArray) => {
    if (!spotsArray) {
      return null
    }
    spotsArray.map(spot => {
      let DetailParams = [
        // 'id=' + spot.venueId,
        `client_id=3ZV20H0X5WOSYXQQ2FVI0NHCNGPYLTHUZQLRE1EVOTRGHYKP`,
        `client_secret=3AOFNXLIEMMCFLR3VSXRALYVCWUYFT4SEVXYUTSKKD3WJWXV`,
        `v=20181003`
      ].join('&')

      // let detailsUrl = `https://api.foursquare.com/v2/venues/${spot.venueId}?${DetailParams}`

      // fetch(detailsUrl)
      fetch('../sample.json')
        .then(response => {
          if (response.ok) {
            return response.json()
          }
        }).then(data => {
          const match = this.state.nightSpots.find(spot => spot.venueId === data.response.venue.id)
          return (Object.assign(match, data.response.venue))
        }).then(addSpot => {
          this.setState({ nightSpots: Object.assign(this.state.nightSpots, addSpot) })
        }).catch(error => {
          console.log(`No spot details because: ${error}`)
        })
    })
  }

  changeSelection = (selectedValue) => {
    if (selectedValue === "Select a") {
      this.setState({ currentlyShowing: this.state.nightSpots })
    } else {
      const holder = this.state.nightSpots.filter(spot => spot.neighborhood === selectedValue)
      this.setState({ currentlyShowing: holder })
    }
  }


  componentDidMount() {
    this.loadStaticMap()
    this.getNightSpots()
  }

  render() {
    // var bounds = new this.props.google.maps.LatLngBounds()
    // for (var i = 0; i < this.state.nightSpots.length; i++) {
    //   bounds.extend(new this.props.google.maps.LatLng(this.state.nightSpots.lat, this.state.nightSpots.lng))
    // }

    return (
      <div className="App" >
        <header role="banner" className="App-header">
          <h1>
            Party On!
          </h1>
        </header>
        <nav>
          <Sidebar
            currentlyShowing={this.state.currentlyShowing}
            changeSelection={this.changeSelection}
            state={this.state}
            updateState={this.updateState}
            updateStateTwo={this.updateStateTwo}
          />
        </nav>
        <MapContainer
          copyOfMapAtl={this.state.staticMap}
          currentlyShowing={this.state.currentlyShowing}
          defaultMapProps={this.state.defaultMapProps}
          state={this.state}
          updateState={this.updateState}
        // bounds={bounds}
        />
      </div >
    )
  }
}

// export default App
export default GoogleApiWrapper({
  apiKey: 'AIzaSyBR94Y6cJWdYrdIJ_LjSites5nBTwL9yhs'
})(App)