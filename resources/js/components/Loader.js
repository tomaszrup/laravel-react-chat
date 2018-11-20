import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './../styles/loader.css';

export default class Loader extends Component {
    render() {
        return (
          <div className="loader-container">
            <div className="loader">Loading...</div>
          </div>
        );
    }
}
