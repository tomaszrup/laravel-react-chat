import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Parallax from './basic-parallax';

export default class MockChat extends Component {
    componentDidMount() {
      Parallax.add(['.user-info', '.user-avatar'], {
        speed: 0.4
      });

      Parallax.add(['.friend-avatar', '.friend-text'], {
        speed: 0.6
      });

      Parallax.add('.message', {
        speed: 0.3
      });

      Parallax.add('.chat-container', {
        speed: 1.3,
        inverseX: true,
        inverseY: true
      });

      Parallax.add('.send-button', {
        speed: 0.8
      });

    }
    render() {
        return (
          <div className="chat-container mock-chat-container z-depth-4">
            <div className="left-section">
              <div className="user-panel">
                <div className="user-avatar">
                </div>
                <div className="user-info">
                  <div className="user-text">
                    <div className="user-name">
                    </div>
                    <div className="user-email">
                    </div>
                  </div>
                </div>
              </div>
              <div className="friend-list">
                <div className="friend-card">
                  <div className="friend-avatar"></div>
                  <div className="friend-text">
                    <div className="friend-name"></div>
                    <div className="friend-last-message"></div>
                  </div>
                </div>
                <div className="friend-card active">
                  <div className="friend-avatar"></div>
                  <div className="friend-text">
                    <div className="friend-name"></div>
                    <div className="friend-last-message"></div>
                  </div>
                </div>
                <div className="friend-card">
                  <div className="friend-avatar"></div>
                  <div className="friend-text">
                    <div className="friend-name"></div>
                    <div className="friend-last-message"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="right-section">
              <div className="user-panel in-chat">
                <div className="user-info justify-right">
                  <div className="user-name">
                  </div>
                </div>
              </div>
              <div className="chat">
                <div className="messages styled-scrollbar">
                  <div className="message">
                    <span className="message-body received"> &nbsp; </span>
                  </div>
                  <div className="message">
                    <span className="message-body sent"> &nbsp; </span>
                  </div>
                  <div className="message">
                    <span className="message-body received"> &nbsp; </span>
                  </div>
                </div>
                <div className="inputs">
                  <input type="text"/>
                  <button className="send-button">
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
    }
}
