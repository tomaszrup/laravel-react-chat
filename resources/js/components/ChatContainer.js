import { fetchUser } from './../actions/userActions';
import { fetchFriends } from './../actions/friendsActions';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';

import FriendList from './FriendList';
import UserPanel from './UserPanel';
import Chat from './Chat';


class ChatContainer extends Component {
    constructor() {
      super();
      this.state = {
        timeline: new TimelineMax
      };
    }
    componentDidMount() {
      this.props.onFetchFriends();
      this.props.onFetchUser().then(() => {
        this.state.timeline.from('.chat-container', 0.8, {
          height: 0,
          opacity: 0,
          ease: Power4.easeOut
        });
      });
    }
    render() {
      if(this.props.user.id && this.props.friends.length)
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
  user: state.user,
  friends: state.friends
});

const mapActionsToProps = {
  onFetchUser: fetchUser,
  onFetchFriends: fetchFriends
}

export default connect(mapStateToProps, mapActionsToProps)(ChatContainer);
