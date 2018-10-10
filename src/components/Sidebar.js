import React, { Component } from 'react';
import '../css/App.css'
import ListItems from './ListItems'
import PropTypes from 'prop-types'

class Sidebar extends Component {
    static propTypes = {
        searchResults: PropTypes.array
    }
    state = {
        searchResults: []
    }
    componentDidMount() {
        this.setState({ searchResults: this.props.nightSpots })
    }

    render() {
        return (
            <div className="sidebar">
                {console.log(this.state.searchResults)}
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
                    {this.props.nightSpots.map(spot => (
                        <ListItems key={spot.venueId}
                            nightSpots={this.props.nightSpots}
                            spot={spot} />
                    ))}
                </ul>
            </div>
        )
    }
}

export default Sidebar