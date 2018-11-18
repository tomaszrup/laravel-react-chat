import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { fetchConversationWith, addLocalMsgToConversation } from './../actions/conversationActions';
import { setMessage, sendMessageTo } from './../actions/messageActions';
import { connect } from 'react-redux';
import Message from './Message';

class Chat extends Component {
    constructor(props) {
      super(props);

      this.updateMessage = this.updateMessage.bind(this);
      this.sendMessage = this.sendMessage.bind(this);

      this.state = {
        id: this.props.user.id === 1 ? 2 : 1,
        timeline: new TimelineMax
      }
    }
    scrollToBottom() {
      let div = document.querySelector(".messages");
      div.scrollTop = div.scrollHeight * 2;
    }
    componentDidMount() {
      this.props.onFetchConversationWith(this.state.id).then(response => {
        this.state.timeline.staggerFrom('.messages .message', 1, {
          opacity: 0,
          y: 50,
          ease: Power4.easeInOut
        }, -0.03);
      });

      Echo.private(`message-to.${this.props.user.id}`)
        .listen('MessageSent', (e) => {
            this.props.onFetchConversationWith(this.state.id);
        });
    }
    updateMessage(e) {
      this.props.onUpdateMessage(e.target.value);
    }
    componentDidUpdate(props) {
      this.scrollToBottom();
    }
    sendMessage() {
      if(!this.props.message) return;

      this.props.onSendMessage(this.state.id);
      this.props.onAddLocalMsgToConversation(this.props.message);

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
  message: state.message
});

const mapActionsToProps = {
  onUpdateMessage: setMessage,
  onSendMessage: sendMessageTo,
  onAddLocalMsgToConversation: addLocalMsgToConversation,
  onFetchConversationWith: fetchConversationWith
}

export default connect(mapStateToProps, mapActionsToProps)(Chat);
