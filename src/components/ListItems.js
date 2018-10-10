import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ListItems extends Component {
    static propTypes = {
    }

    // state = {
    //     serachResults: this.props.nightSpots
    // }

    render() {

        const { spot } = this.props
        return (
            <div className="list-items">
                {console.log(spot)}
                <p>{spot.name ? spot.name : `Name unknown`}</p>
                {/* <div className="venue-photo">Photo goes here</div> */}
                <p>Rating: {spot.rating ? spot.rating : `rating : Unpublished rating`}</p>
                <p></p>{`${spot.location ? spot.location.formattedAddress[0] : `Address: Not found address`} 
                ${spot.location ? spot.location.formattedAddress[1] : ``}`}
            </div>
        )
    }
}

export default ListItems
