import React, { Component } from 'react'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import '../css/App.css'
import Infowindow from './Infowindow'
// import propTypes from 'Prop-types'



class MapContainer extends Component {
    state = {
        markers: []
    }

    mapClicked = () => {
        if (this.props.state.showingInfoWindow) {
            this.props.closeInfoWindow()
        }
    }

    updateMarkerArray = (array) => {
        this.props.updateMarkers(array)
    }

    onClose = () => {
        this.props.closeInfoWindow()
    }

    createArrayOfMarkers = () => {
        console.log(this.props.state.nightSpots)
        let markersArray = []
        markersArray = this.props.state.nightSpots.map(spot => {
            return new this.props.google.maps.Marker(
                {
                    // position: new this.props.google.maps.LatLng(spot.lat, spot.lng),
                    key: spot.venueId,
                    position: { lat: spot.lat, lng: spot.lng },
                    map: this.props.google.map,
                    title: spot.name,
                    onClick: () => this.props.openInfoWindow,
                    animation: ((spot.listDetailVisible && !this.props.state.showingInfoWindow)) ? '1' : '0'
                }
            )
        })
        this.setState({ markers: markersArray }, () => {
            console.log(this.state.markers)
        })
    }

    componentDidMount() {
        console.log(this.props.state.nightSpots)
        this.setState({ markers: this.props.state.nightSpots })
        this.createArrayOfMarkers()
    }



    render() {

        const [lat, lng] = this.props.state.defaultMapProps[0].center
        const zoom = this.props.state.defaultMapProps[0].zoom

        return (
            <main role="main">
                {console.log(`nightSpots`, this.props.state.nightSpots)}
                {console.log(`currentlyShowing`, this.props.state.currentlyShowing)}
                {console.log(`markers`, this.props.state.markers)}
                <div>
                    <div id="map" role="application">
                        {/* <img src={this.props.copyOfMapAtl} alt="map" /> */}
                        <Map
                            google={this.props.google}
                            initialCenter={{ lat: lat, lng: lng }}
                            zoom={zoom}
                            onClick={() => this.mapClicked}
                        >
                            {this.props.state.markers.map(spot => (
                                <Marker />
                            ))}
                            <InfoWindow
                                maxWidth={100}
                                marker={this.props.state.activeMarker}
                                onClose={() => this.onClose}
                                visible={this.props.state.showingInfoWindow}>
                                <Infowindow selectedPlace={this.props.state.selectedPlace} />
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