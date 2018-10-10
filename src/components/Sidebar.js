import React, { Component } from 'react';
import '../css/App.css'
import ListItems from './ListItems'
import PropTypes from 'prop-types'
import DropDown from './DropDown'

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
                <DropDown
                changeSelection={this.props.changeSelection}/>
                <h2>Search Results</h2>
                <ul>
                    {this.props.currentlyShowing.map(spot => (
                        <ListItems key={spot.venueId}
                            // nightSpots={this.state.currentlyShowing}
                            spot={spot} />
                    ))}
                </ul>
            </div >
        )
    }
}

export default Sidebar