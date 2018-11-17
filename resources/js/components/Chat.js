import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';
import { setMessage, sendMessageTo } from './../actions/messageActions';
import { fetchConversationWith } from './../actions/conversationActions';


class Chat extends Component {
    constructor(props) {
      super(props);
    }
    componentDidMount() {
      this.props.onFetchConversationWith(2);
    }
    render() {
        let messages = this.props.conversation.map(message => {
          return (
            <li>{message}</li>
          )
        })
        return (
          <div className="chat">
            <div className="messages">
              <ul>
                { messages }
              </ul>
            </div>
            <input type="text"/>
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
  onFetchConversationWith: fetchConversationWith
}

export default connect(mapStateToProps, mapActionsToProps)(Chat);
