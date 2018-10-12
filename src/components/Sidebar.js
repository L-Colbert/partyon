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

    // // https://eddyerburgh.me/toggle-visibility-with-react
    toggleDiv(spot) {
        let searchResults = this.props.currentlyShowing
        console.log(searchResults)
        searchResults.forEach(result => {
            console.log(result)
            if (spot.venueId === result.venueId) {
                result.listDetailVisible = !result.listDetailVisible
            }
        })

        this.setState({ searchResults:searchResults })
    }


    render() {
        return (
            <div className="sidebar">
                <DropDown
                    changeSelection={this.props.changeSelection} />
                <h2>Search Results</h2>
                <ul>
                    {this.props.currentlyShowing.map(spot => (
                        <div className="list-items">
                            {console.log(spot)}
                            <a href="#/" onClick={() => this.toggleDiv(spot)}>
                                {spot.name ? spot.name : `Name unknown`}
                            </a>
                            {
                                spot.listDetailVisible && <ListItems
                                    key={spot.venueId}
                                    state={this.props.state}
                                    updateState={this.props.updateState}
                                    spot={spot} />
                            }
                        </div>
                    ))}
                </ul>
            </div >
        )
    }
}

export default Sidebar