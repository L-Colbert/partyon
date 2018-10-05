import React, { Component } from 'react'
// import PropTypes from 'propTypes'

class Infowindow extends Component {
    render() {
        const markerInfo = this.props.state
    return (
        <div>
            <h2>{markerInfo.selectedPlace.name}</h2>

        </div>

    )
}
}

export default Infowindow;