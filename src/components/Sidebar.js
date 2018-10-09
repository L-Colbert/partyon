import React, { Component } from 'react';
import '../css/App.css'
import PropTypes from 'prop-types'

class Sidebar extends Component {
    state = {
        results: []
    }

    componentDidMount() {

    }



    render() {
        return (
            <div className="sidebar">
                <h2>Search Results</h2>
                <ul>
                    <li>item</li>
                    <li>item</li>
                    <li>item</li>
                    <li>item</li>
                    <li>item</li>
                </ul>
            </div>
        )
    }
}

export default Sidebar