import React, { Component } from 'react'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import '../css/App.css'
import Infowindow from './Infowindow'
// import propTypes from 'Prop-types'



class MapContainer extends Component {

    openInfoWindow = (props, marker, e) =>
        this.props.updateState(props, marker, e)

    render() {

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
                                    position={{ lat: spot.lat, lng: spot.lng }}
                                    onClick={this.openInfoWindow}
                                    animation={spot.listDetailVisible ? '1' : '0'}
                                />
                            ))}
                            <InfoWindow
                                marker={this.props.state.activeMarker}
                                visible={this.props.state.showingInfoWindow}>
                                <Infowindow state={this.props.state} />
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