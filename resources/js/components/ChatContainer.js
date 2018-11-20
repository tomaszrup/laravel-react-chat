import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { SET_ACTIVE_USER_ID, SEND_MESSAGE_TO } from './../actions/constants';
import { fetchConversationWith, fetchLastMessages, fetchLastMessageWith } from './../actions/conversationActions';
import { fetchFriends } from './../actions/friendsActions';
import { fetchUser } from './../actions/userActions';

import FriendList from './FriendList';
import UserPanel from './UserPanel';
import EventBus from 'eventing-bus';
import Chat from './Chat';


class ChatContainer extends Component {
    constructor() {
      super();
      this.state = {
        timeline: new TimelineMax,
        notification: new Audio('/sounds/notification.mp3')
      };

      this.startConversation = this.startConversation.bind(this);
    }
    componentDidMount() {
      EventBus.on(SET_ACTIVE_USER_ID, this.startConversation);
      EventBus.on(SEND_MESSAGE_TO, () => {this.props.onFetchConversationWith(this.props.activeUserId)} );

      this.props.onFetchFriends();
      this.props.onFetchLastMessages();

      this.props.onFetchUser().then(() => {
        Echo.private(`message-to.${this.props.user.id}`)
          .listen('MessageSent', (e) => {
            let msg = e.message;

            if(msg.sender_id === this.props.activeUserId)
              this.props.onFetchConversationWith(msg.sender_id);
            else
              this.props.onFetchLastMessageWith(msg.sender_id);

            if(!document.hasFocus()) this.state.notification.play();
        });

        this.state.timeline.from('.chat-container', 0.8, {
          height: 0,
          opacity: 0,
          ease: Power4.easeOut
        });
      });
    }
    startConversation() {
      this.props.onFetchConversationWith(this.props.activeUserId).then(() => {
        this.state.timeline.staggerFrom('.messages .message', 0.5, {
          opacity: 0,
          y: 30
        }, -0.03);
      });
    }
    render() {
      if(this.props.user.id && this.props.friends.length && Object.keys(this.props.lastMessages).length)
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
  friends: state.friends,
  activeUserId: state.activeUserId,
  lastMessages: state.lastMessages
});

const mapActionsToProps = {
  onFetchUser: fetchUser,
  onFetchFriends: fetchFriends,
  onFetchConversationWith: fetchConversationWith,
  onFetchLastMessageWith: fetchLastMessageWith,
  onFetchLastMessages: fetchLastMessages
}

export default connect(mapStateToProps, mapActionsToProps)(ChatContainer);
