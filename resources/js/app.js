require('./bootstrap');

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ChatContainer from './components/ChatContainer';
import { Provider } from 'react-redux';
import store from './store';

import './styles/app.css';

class App extends Component {
    render() {
          return (
            <Provider store={store}>
              <div>
                <div className="top-bar"></div>
                <ChatContainer />
              </div>
            </Provider>
          );
    }
}

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}

export default App;
