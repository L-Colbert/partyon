import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import '../css/App.css'
import Infowindow from './Infowindow'
import PropTypes from 'prop-types'



class MapContainer extends Component {
    //code from https://www.npmjs.com/package/google-maps-react
    state = {
        selectedPlace: {},
        activeMarker: {},
        showingInfoWindow: false,
        nightSpots: this.props.nightSpots,
        location: []
    };

    static PropTypes = {
        google: PropTypes.object,
        zoom: PropTypes.number,
        initialCenter: PropTypes.object
    }

    openInfoWindow = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true,
            location: props.address
        });

    render() {
        // console.log(this.state.nightSpots)

        // const defaultMapProps = this.props.defaultMapProps
        const [lat, lng] = this.props.defaultMapProps[0].center
        const zoom = this.props.defaultMapProps[1].zoom

        return (
            <main role="main">
                <div>
                    <div className="drop-down-menu">
                        <select>
                            <option value="Select a">Select a neighborhood</option>
                            <option value="2">Buckhead</option>
                            <option value="3">Downtown</option>
                            <option value="4">Midtown</option>
                            <option value="5">Little Five Points</option>
                        </select>
                    </div>
                    <div id="map" role="application">
                        {/* <img src={this.props.copyOfMapAtl} alt="map" /> */}
                        {/* {console.log(this.props.nightSpots)} */}
                        {/* {console.log(this.state.selectedPlace)} */}
                        <Map
                            google={this.props.google}
                            initialCenter={
                                { lat: lat, lng: lng }}
                            zoom={zoom}
                        >
                            {/* <Marker
                                name={this.props.nightSpots.name}
                                key={this.props.nightSpots.venueId}
                                address={this.props.nightSpots.address}
                                state={this.props.nightSpots.state}
                                city={this.props.nightSpots.city}
                                postalCode={this.props.nightSpots.postalCode}
                                hours={this.props.nightSpots.hours}
                                rating={this.props.nightSpots.rating}
                                //try to pass in this way
                                // spot={spot} then in infowindow, reference by spot.name
                                position={{ lat: this.props.nightSpots.lat, lng: this.props.nightSpots.lng }}
                                onClick={this.openInfoWindow}
                            /> */}
                            {this.props.nightSpots.map(spot => (
                                <Marker
                                    name={spot.name}
                                    key={spot.venueId}
                                    address={[spot.location]}
                                    state={spot.state}
                                    city={spot.city}
                                    postalCode={spot.postalCode}
                                    hours={spot.hours}
                                    rating={spot.rating}

                                    // selectedPlace={this.state.selectedPlace}
                                    position={{ lat: spot.lat, lng: spot.lng }}
                                    onClick={this.openInfoWindow}
                                />
                            ))}
                            <InfoWindow
                                //   onOpen={this.windowHasOpened}
                                //   onClose={this.windowHasClosed}
                                marker={this.state.activeMarker}
                                visible={this.state.showingInfoWindow}>
                                <Infowindow state={this.state} />
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