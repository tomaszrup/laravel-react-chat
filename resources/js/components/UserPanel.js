import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import UserAvatar from './UserAvatar';

class UserPanel extends Component {
    constructor() {
      super();

      this.state = {
        menuOpen: false
      }

      this.toggleMenu = this.toggleMenu.bind(this);
      this.logout = this.logout.bind(this);
    }
    toggleMenu() {
      this.setState({
        menuOpen: !this.state.menuOpen
      });
    }
    logout() {
      this.refs.form.submit();
    }
    render() {
        let menu = this.state.menuOpen ? (<ul className="collection menu">
              <li className="collection-item" onClick={this.logout}><a href="#">Logout</a></li>
              </ul>) : '';
        return (
          <div className="user-panel">
            <UserAvatar />
            <div className="user-info">
              <div className="user-text">
                <div className="user-name">
                  {this.props.user.name}
                </div>
                <div className="user-email">
                  {this.props.user.email}
                </div>
              </div>
              <div className="menu-container">
                <i className={'fa fa-ellipsis-v ' + (this.state.menuOpen ? 'open' : '')} aria-hidden="true" onClick={this.toggleMenu}></i>
                { menu }
                <form ref="form" action="/logout" method="post" className="hidden">
                  <input type="hidden" name="_token" value={window.token} />
                </form>
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
