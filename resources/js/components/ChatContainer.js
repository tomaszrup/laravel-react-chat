import { fetchUser } from './../actions/userActions';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';

import FriendList from './FriendList';
import UserPanel from './UserPanel';
import Chat from './Chat';


class ChatContainer extends Component {
    componentDidMount() {
      this.props.onFetchUser();
    }
    render() {
      if(this.props.user.id)
        return (
          <div className="chat-container z-depth-1">
            <div className="left-section">
              <UserPanel />
              <FriendList />
            </div>
            <div className="right-section">
              <Chat />
            </div>
          </div>
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
