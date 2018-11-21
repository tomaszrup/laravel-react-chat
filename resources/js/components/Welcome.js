import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { TweenMax, Power4 } from "gsap/TweenMax";

export default class Welcome extends Component {
    componentDidMount() {
      TweenMax.from('.welcome', 0.5, {
        opacity: 0,
        ease: Power4.easeInOut,
        y: 15
      });
    }
    render() {
        return (
          <div className="welcome">
            <h1>Hello!</h1>
            <h3>What are you up to today?</h3>
          </div>
        );
    }
}
