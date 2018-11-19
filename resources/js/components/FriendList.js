import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import Friend from './Friend';

class FriendList extends Component {
    render() {
        let friends = this.props.friends.map((friend, index) => {
            return (
              <Friend name={friend.name} id={friend.id} key={index}/>
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
  friends: state.friends
});


export default connect(mapStateToProps)(FriendList);
