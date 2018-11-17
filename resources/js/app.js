require('./bootstrap');

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Chat from './components/Chat';
import { Provider } from 'react-redux';
import store from './store';
import { fetchUser } from './actions/userActions';

export default class App extends Component {
    componentDidMount() {
      store.dispatch(fetchUser());
    }
    render() {
        if(store.getState().user)
          return (
            <Provider store={store}>
              <div className="wrapper">
                <Chat />
              </div>
            </Provider>
          );
        else
          return null;
    }
}

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
