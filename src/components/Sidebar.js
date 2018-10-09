import React, { Component } from 'react';
import '../css/App.css'
import ListItems from './ListItems'
import PropTypes from 'prop-types'

class Sidebar extends Component {
    static propTypes = {
        serachResults: PropTypes.array
    }
    // state = {
    //     serachResults : this.props.nightSpots
    // }
    componentDidMount() {

    }

    render() {
        return (
            <div className="sidebar">
                <div className="drop-down-menu">
                    <select>
                        <option value="Select a">Select a neighborhood</option>
                        <option value="2">Buckhead</option>
                        <option value="3">Downtown</option>
                        <option value="4">Midtown</option>
                        <option value="5">Little Five Points</option>
                    </select>
                </div>
                <h2>Search Results</h2>
                <ul>
                    {/* {console.log(this.state.serachResults)} */}
                    {this.props.nightSpots.map(spot => (
                        <ListItems key={spot.venueId}
                            spot={spot} />

                        // <Marker
                        //     name={spot.name}
                        //     key={spot.venueId}
                        //     address={[spot.location]}
                        //     state={spot.state}
                        //     city={spot.city}
                        //     postalCode={spot.postalCode}
                        //     hours={spot.hours}
                        //     rating={spot.rating}

                        //     // selectedPlace={this.state.selectedPlace}
                        //     position={{ lat: spot.lat, lng: spot.lng }}
                        //     onClick={this.openInfoWindow}
                        // />
                    ))}
                </ul>
            </div>
        )
    }
}

export default Sidebar