import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { TimelineMax, Power4 } from "gsap/TweenMax";
import Parallax from './basic-parallax';

export default class MockChat extends Component {
    constructor() {
      super();

      this.state = {
        messages: []
      }
    }
    componentDidMount() {
      (new TimelineMax).from('.chat-container', 1, {
        height: 0,
        opacity: 0,
        ease: Power4.easeOut
      });

      Parallax.add(['.user-info', '.user-avatar'], {
        speed: 0.5
      });

      Parallax.add(['.friend-avatar', '.friend-text'], {
        speed: 0.5
      });

      Parallax.add('.message', {
        speed: 0.1
      });

      Parallax.add('.chat-container', {
        speed: 0.3,
        inverseX: true,
        inverseY: true
      });

      Parallax.add('.send-button', {
        speed: 0.5
      });
    }
    pushMsg(e) {
      if(!this.refs.input.value) return;

      let msgs = this.state.messages;
      msgs.push(this.refs.input.value);

      this.setState({messages: msgs});
      this.refs.input.value = '';
    }
    render() {
        let messagesMock = this.state.messages.map((msg, index) => {
          return (
            <div className="message" key={index}>
              <span className="message-body sent"> {msg} </span>
            </div>
          )
        });

        return (
          <div className="chat-container mock-chat-container z-depth-4">
            <div className="left-section">
              <div className="user-panel">
                <div className="user-avatar z-depth-0">
                </div>
                <div className="user-info">
                  <div className="user-text">
                    <div className="user-name z-depth-0">
                    </div>
                    <div className="user-email z-depth-0">
                    </div>
                  </div>
                </div>
              </div>
              <div className="friend-list">
                <div className="friend-card">
                  <div className="friend-avatar z-depth-0"></div>
                  <div className="friend-text">
                    <div className="friend-name z-depth-0"></div>
                    <div className="friend-last-message z-depth-0"></div>
                  </div>
                </div>
                <div className="friend-card active">
                  <div className="friend-avatar z-depth-0"></div>
                  <div className="friend-text">
                    <div className="friend-name z-depth-0"></div>
                    <div className="friend-last-message z-depth-0"></div>
                  </div>
                </div>
                <div className="friend-card">
                  <div className="friend-avatar z-depth-0"></div>
                  <div className="friend-text">
                    <div className="friend-name z-depth-0"></div>
                    <div className="friend-last-message z-depth-0"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="right-section">
              <div className="user-panel in-chat">
                <div className="user-info justify-right">
                  <div className="user-name z-depth-0">
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
                  {messagesMock}
                </div>
                <div className="inputs">
                  <input type="text" ref="input" maxLength="180" onKeyPress={e => {if(e.key === 'Enter') this.pushMsg();} }/>
                  <button className="send-button z-depth-1" onClick={e => this.pushMsg()}>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
    }
}
