require('./../bootstrap');
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './app.css';

class App extends Component {
    render() {
          return (
              <div className="landing">

              </div>
          );
    }
}

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}

export default App;
