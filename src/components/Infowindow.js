import React, { Component } from 'react'
// import PropTypes from 'propTypes'

class Infowindow extends Component {
    render() {
        const markerInfo = this.props.state
        return (
            <div>
            {console.log(markerInfo.location)}
                <h2>{markerInfo.selectedPlace.name}</h2>
                <div>
                    <p>{markerInfo.location[0] && markerInfo.location[0].formattedAddress[0] ? markerInfo.location[0].formattedAddress[0] : ``}</p>
                    <p>{markerInfo.location[0] && markerInfo.location[0].formattedAddress[1] ? markerInfo.location[0].formattedAddress[1] : ``}</p>
                    <p>{markerInfo.selectedPlace.hours}</p>
                    <p>Rating: {markerInfo.selectedPlace.rating}</p>
                </div>
            </div>

        )
    }
}

export default Infowindow;