import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import Markers from './Markers'
import '../css/App.css'
// import PropTypes from 'propTypes'


class MapContainer extends Component {
    //code from https://www.npmjs.com/package/google-maps-react
    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
    };

    openInfoWindow = (props, marker, e) =>
    this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true
    });
    
    render() {
        console.log(this.state.selectedPlace)
        const defaultMapProps = this.props.defaultMapProps
        const [lat, lng] = this.props.defaultMapProps[0].center
        const zoom = this.props.defaultMapProps[1].zoom

        return (
            <main role="main">
                <div>
                    <div className="drop-down-menu">
                        <select>
                            <option value="Select a">Select a</option>
                            <option value="2">Buckhead</option>
                            <option value="3">Downtown</option>
                            <option value="4">Midtown</option>
                        </select>
                    </div>
                    <div id="map" role="application">
                        {/* <img src={this.props.copyOfMapAtl} alt="map" /> */}
                        <Map
                            google={this.props.google}
                            initialCenter={
                                { lat: lat, lng: lng }}
                            zoom={zoom}
                        >
                            {this.props.nightSpots.map(spot => (
                                <Marker
                                    name={spot.name}
                                    key={spot.venueId}
                                    position={{ lat: spot.lat, lng: spot.lng }}
                                    onClick={this.openInfoWindow}
                                />
                            ))}
                            <InfoWindow
                            //   onOpen={this.windowHasOpened}
                            //   onClose={this.windowHasClosed}
                            marker={this.state.activeMarker}
                            visible={this.state.showingInfoWindow}>
                                <div>
                                        <h2>{this.state.selectedPlace.name}</h2>
                                        
                                </div>
                            </InfoWindow>
                        </Map>
                    </div>
                </div>
            </main >
        )
    }
}


export default GoogleApiWrapper({
    apiKey: 'AIzaSyBR94Y6cJWdYrdIJ_LjSites5nBTwL9yhs'
})(MapContainer)