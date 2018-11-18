import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { fetchUser } from './../actions/userActions';

import Chat from './Chat';


class ChatContainer extends Component {
    componentDidMount() {
      this.props.onFetchUser();
    }
    render() {
      if(this.props.user.id)
        return (
          <React.Fragment>
            <Chat />
          </React.Fragment>
        );
      else
        return null;
    }
}

const mapStateToProps = state => ({
  user: state.user
});

const mapActionsToProps = {
  onFetchUser: fetchUser
}

export default connect(mapStateToProps, mapActionsToProps)(ChatContainer);
