import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
// import PropTypes from 'propTypes'


class MapContainer extends Component {

    render() {
        const style = {
            height: '100%',
            // width: '50%'
        }

        return (
            // <div style={style}>
            <div>

                <div className="drop-down-menu">
                    <select>
                        <option value="Select a">Select a</option>
                        <option value="2">Buckhead</option>
                        <option value="3">Downtown</option>
                        <option value="4">Midtown</option>
                    </select>
                </div>
                <div>
                    <img src="https://maps.googleapis.com/maps/api/staticmap?zoom=10&size=300x300&center=33.748995,-84.387982&key=AIzaSyBR94Y6cJWdYrdIJ_LjSites5nBTwL9yhs&markers=color:red%7Clabel:A%7Clocation:33.748995,-84.387982" alt="map of Atlanta" />
                    {/* <img src={this.url} alt="map" /> */}
                    {/* <Map
                        google={this.props.google}
                        style={style}
                        initialCenter={{
                            lat: 33.748995,
                            lng: -84.387982
                        }}
                        zoom={10}
                    />
                        <Marker
                            title={'The marker`s title will appear as a tooltip.'}
                            name={'SOMA'}
                            // position={{ lat: 37.74899, lng: -84.387982 }}
                        /> */}
                </div>
            </div>
        )
    }
}

// export default MapContainer
export default GoogleApiWrapper({
    apiKey: 'AIzaSyBR94Y6cJWdYrdIJ_LjSites5nBTwL9yhs'
})(MapContainer)