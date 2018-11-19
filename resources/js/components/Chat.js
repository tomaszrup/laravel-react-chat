import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { fetchConversationWith, addLocalMsgToConversation } from './../actions/conversationActions';
import { setMessage, sendMessageTo } from './../actions/messageActions';
import { SET_ACTIVE_USER_ID } from './../actions/constants';
import { connect } from 'react-redux';
import EventBus from 'eventing-bus';
import Message from './Message';

// this component might be too big

class Chat extends Component {
    constructor(props) {
      super(props);

      this.state = {
        previousId: 0,
        tween: new TimelineMax,
        notification: new Audio('./../sounds/notification.mp3')
      }

      this.updateMessage = this.updateMessage.bind(this);
      this.sendMessage = this.sendMessage.bind(this);
      this.startConversation = this.startConversation.bind(this);
    }
    componentDidMount() {
      EventBus.on(SET_ACTIVE_USER_ID, this.startConversation);

      /*
      if(this.props.activeUserId) {
        this.startConversation();
      }
      */
    }
    componentDidUpdate(props) {
      this.scrollToBottom();
    }
    scrollToBottom() {
      let div = document.querySelector(".messages");
      div.scrollTop = div.scrollHeight * 2;
    }
    startConversation(unsubscribe = true) {
      if(this.previousId === this.props.activeUserId) return;

      if(unsubscribe && this.state.previousId) {
        Echo.leave(`message-to.${this.state.previousId}`);
      }

      this.previousId = this.props.activeUserId;

      this.props.onFetchConversationWith(this.props.activeUserId).then(() => {
        this.state.tween.staggerFrom('.messages .message', 1, {
          opacity: 0,
          y: 50,
          ease: Power4.easeInOut
        }, -0.03);
      });

      Echo.private(`message-to.${this.props.user.id}`)
        .listen('MessageSent', (e) => {
            if(!document.hasFocus()) this.state.notification.play();

            if(e.message.sender_id === this.props.activeUserId)
              this.props.onFetchConversationWith(this.props.activeUserId);
        });
    }
    updateMessage(e) {
      this.props.onUpdateMessage(e.target.value);
    }
    sendMessage() {
      if(!this.props.message) return;

      this.props.onSendMessage(this.props.activeUserId);
      this.props.onAddLocalMsgToConversation(this.props.message);

      this.props.onFetchConversationWith(this.props.activeUserId);
      // Not the best implementation
      this.refs.input.value = '';
      this.props.onUpdateMessage('');
    }
    render() {
        let messages = this.props.conversation.map((message, index) => {
          return (
            <Message data={message} key={index}></Message>
          )
        })
        return (
          <div className="chat">
            <div className="messages styled-scrollbar">
              { messages }
            </div>
            <div className="inputs">
              <input ref="input" onInput={this.updateMessage} onKeyPress={e => {if(e.key === 'Enter') this.sendMessage();} } type="text"/>
              <button className="send-button" onClick={this.sendMessage}>
                <i className="fa fa-paper-plane" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        );
    }
}

const mapStateToProps = state => ({
  conversation: state.conversation,
  user: state.user,
  message: state.message,
  activeUserId: state.activeUserId
});

const mapActionsToProps = {
  onUpdateMessage: setMessage,
  onSendMessage: sendMessageTo,
  onAddLocalMsgToConversation: addLocalMsgToConversation,
  onFetchConversationWith: fetchConversationWith
}

export default connect(mapStateToProps, mapActionsToProps)(Chat);
