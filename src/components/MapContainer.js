import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import '../css/App.css'
// import PropTypes from 'propTypes'


class MapContainer extends Component {

    render() {
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
                        <img src={this.props.copyOfMapAtl} alt="map" />
                        {/* <Map
                            google={this.props.google}
                            initialCenter={{
                                lat: 33.748995,
                                lng: -84.387982
                            }}
                            zoom={10} >
                            <Marker
                                name={'test'}
                                position={{ lat: 33.748995, lng: -84.387982 }} />
                        </Map> */}
                    </div>
                </div>
            </main >
        )
    }
}


export default GoogleApiWrapper({
    apiKey: 'AIzaSyBR94Y6cJWdYrdIJ_LjSites5nBTwL9yhs'
})(MapContainer)