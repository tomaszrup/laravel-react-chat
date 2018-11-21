import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import Friend from './Friend';

class FriendList extends Component {
    render() {
        let friends = this.props.friends.map((friend, index) => {
            return (
              <Friend name={friend.name} active={this.props.activeUserId === friend.id} lastMessage={this.props.lastMessages[friend.id]} id={friend.id} key={index}/>
            )
        });

        return (
          <div className="friend-list">
            { friends }
          </div>
        );
    }
}

const mapStateToProps = state => ({
  friends: state.friends,
  lastMessages: state.lastMessages,
  activeUserId: state.activeUserId
});


export default connect(mapStateToProps)(FriendList);
