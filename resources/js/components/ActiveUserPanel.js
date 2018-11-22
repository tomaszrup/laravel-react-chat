import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';

import UserPanel from './UserPanel';

class ActiveUserPanel extends Component {
  render() {
      return (
        <div className="user-panel in-chat">
          <div className="user-info justify-right">
            <div className="user-name">
              {this.props.user.name}
            </div>
          </div>
        </div>
      );
  }
}

const mapStateToProps = state => ({
  user: state.friends.find(({id}) => id === state.activeUserId)
});


export default connect(mapStateToProps)(ActiveUserPanel)
