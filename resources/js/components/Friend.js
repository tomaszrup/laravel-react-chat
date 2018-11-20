import { setActiveUserId } from './../actions/conversationActions';
import { SET_ACTIVE_USER_ID } from './../actions/constants';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import EventBus from 'eventing-bus';
import ReactDOM from 'react-dom';


class Friend extends Component {
    constructor(props) {
      super(props);

      this.setActiveUser = this.setActiveUser.bind(this);
    }
    setActiveUser() {
      this.props.onSetActiveUserId(this.props.id).then(() => {
        EventBus.publish(SET_ACTIVE_USER_ID);
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
                  {this.props.name} <br/>
                </div>
                <div className="friend-last-message">
                  <span className="time"> { this.props.lastMessage ? (this.props.lastMessage.created_at ? this.props.lastMessage.created_at : 'sending...') : ''} </span>
                  {this.props.lastMessage ? this.props.lastMessage.body : ''}

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
