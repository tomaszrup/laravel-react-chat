import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import UserAvatar from './UserAvatar';

class UserPanel extends Component {
    render() {
        return (
          <div className="user-panel">
            <UserAvatar />
            <div className="user-info">
              <div className="user-name">
                {this.props.user.name}
              </div>
              <div className="user-email">
                {this.props.user.email}
              </div>
            </div>
          </div>
        );
    }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(UserPanel);
