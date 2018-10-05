import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import '../css/App.css'
// import PropTypes from 'propTypes'


class MapContainer extends Component {

    render() {
        const [lat, lng] = this.props.defaultMapProps[0].center
        const zoom = this.props.defaultMapProps[1].zoom
        return (
            <main role="main">
                {console.log(zoom)}
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

                                {
                                    lat: lat,
                                    lng: lng
                                }}
                            zoom={zoom}
                            onReady={this.addMarkers}
                        >
                            {/* {this.props.nightSpots.map(spot => ( */}
                            <Marker
                                nightSpots={this.props.nightSpots}
                            />
                            {/* ))} */}
                            {/* // <Marker
                                // name={'test'}
                                // position={{ lat: 33.748995, lng: -84.387982 }}
                            // /> */}
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