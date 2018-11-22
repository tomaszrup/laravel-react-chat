import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { SET_ACTIVE_USER_ID, SEND_MESSAGE_TO } from './../actions/constants';
import { fetchConversationWith, fetchLastMessages, fetchLastMessageWith } from './../actions/conversationActions';
import { fetchFriends } from './../actions/friendsActions';
import { fetchUser } from './../actions/userActions';
import { TimelineMax, Power4 } from "gsap/TweenMax";

import ActiveUserPanel from './ActiveUserPanel';
import FriendList from './FriendList';
import EventBus from './../EventBus';
import UserPanel from './UserPanel';
import Loader from './Loader';
import Chat from './Chat';


import * as _ from 'lodash';


class ChatContainer extends Component {
    constructor() {
      super();
      this.state = {
        notification: new Audio('/sounds/notification.mp3'),
        loadingConversation: false,
        timeline: new TimelineMax,
        alreadyOpened: {},
      };

      this.startConversation = this.startConversation.bind(this);
    }
    componentDidMount() {
      EventBus.on(SET_ACTIVE_USER_ID, this.startConversation);
      EventBus.on(SEND_MESSAGE_TO, () => {this.props.onFetchConversationWith(this.props.activeUserId)} );

      this.state.timeline.from('.chat-container', 1.3, {
        height: 0,
        opacity: 0,
        ease: Power4.easeOut
      });

      this.props.onFetchFriends();
      this.props.onFetchLastMessages();
      this.props.onFetchUser().then(() => {
        Echo.private(`message-to.${this.props.user.id}`)
          .listen('MessageSent', (e) => {
            let msg = e.message;

            if(msg.sender_id === this.props.activeUserId)
              this.props.onFetchConversationWith(msg.sender_id, true);
            else
              this.props.onFetchLastMessageWith(msg.sender_id);

            if(!document.hasFocus()) this.state.notification.play();
        });
      });
    }
    startConversation() {
      // Add some conversation caching, to prevent multiple requests in a short time + make app faster
      this.setState({loadingConversation: true});

      this.props.onFetchConversationWith(this.props.activeUserId).then(() => {
        this.setState({loadingConversation: false});

        if(this.state.alreadyOpened[this.props.activeUserId]) return;
        this.state.timeline.staggerFrom('.messages .message', 0.6, {
          opacity: 0,
          y: -30,
          ease: Power4.easeInOut
        }, -0.03);

        let newAlreadyOpened = this.state.alreadyOpened;
        newAlreadyOpened[this.props.activeUserId] = true;
        this.setState({ alreadyOpened: newAlreadyOpened });
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
              {this.props.activeUserId ? (<ActiveUserPanel />) : ''}
              {!this.state.loadingConversation ? (<Chat />) : (<div className="chat"><Loader/></div>)}
            </div>
          </div>
        );
      else
        return (
          <div className="chat-container z-depth-1">
            <Loader />
          </div>
        )
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
