require('./../bootstrap');
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MockChat from './MockChat';

import './../styles/app.css';
import './app.css';

class App extends Component {
    render() {
          return (
              <div className="landing">
                  <div className="top-bar">
                  </div>
                  <div className="left-container">
                    <MockChat />
                  </div>
              </div>
          );
    }
}

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}

export default App;
