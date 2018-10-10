import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import '../css/App.css'
import Infowindow from './Infowindow'
// import propTypes from 'Prop-types'



class MapContainer extends Component {
    //code from https://www.npmjs.com/package/google-maps-react
    state = {
        selectedPlace: {},
        activeMarker: {},
        showingInfoWindow: false,
        // nightSpots: this.props.nightSpots,
        location: []
    };

    // static PropTypes = {
    //     google: PropTypes.object,
    //     zoom: PropTypes.number,
    //     initialCenter: PropTypes.object
    // }

    openInfoWindow = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true,
            location: props.address
        });

    render() {

        // const defaultMapProps = this.props.defaultMapProps
        const [lat, lng] = this.props.defaultMapProps[0].center
        const zoom = this.props.defaultMapProps[1].zoom

        return (
            <main role="main">
                <div>
                    <div id="map" role="application">
                        {/* <img src={this.props.copyOfMapAtl} alt="map" /> */}
                        <Map
                            google={this.props.google}
                            initialCenter={
                                { lat: lat, lng: lng }}
                            zoom={zoom}
                        >
                            {this.props.currentlyShowing.map(spot => (
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

// export default MapContainer