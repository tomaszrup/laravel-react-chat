import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setActiveUserId } from './../actions/conversationActions';
import { SET_ACTIVE_USER_ID } from './../actions/constants';
import EventBus from './../EventBus';



class Friend extends Component {
    constructor(props) {
      super(props);

      this.setActiveUser = this.setActiveUser.bind(this);
    }
    setActiveUser() {
      this.props.onSetActiveUserId(this.props.id).then(() => {
        EventBus.emit(SET_ACTIVE_USER_ID);
      });
    }
    render() {
        let classNames = 'friend-card' + (this.props.active ? ' active' : '');
        return (
            <div className={classNames} onClick={this.setActiveUser}>
              <div className="friend-avatar">
              </div>
              <div className="friend-text">
                <div className="friend-name">
                  {this.props.name} {!this.props.lastMessage || this.props.lastMessage.read_at
                                    || this.props.lastMessage.sender_id !== this.props.id ? '' : <span className="new badge" data-badge-caption="unread"> </span>}
                </div>
                <div className="friend-last-message">
                  {this.props.lastMessage ? this.props.lastMessage.body : ''}
                  <span className="time">
                    { this.props.lastMessage ? this.props.lastMessage.created_at : ''}
                  </span>
                </div>
              </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  onSetActiveUserId: setActiveUserId
};

export default connect(mapStateToProps, mapDispatchToProps)(Friend);
