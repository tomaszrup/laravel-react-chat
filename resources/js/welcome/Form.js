import React, { Component } from 'react';
import ReactDOM from 'react-dom';


export default class Form extends Component {
    render() {
        return (
            <div className="login-modal">
              <h1>Join and get connected.</h1>
              <h4>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis interdum diam vel magna sollicitudin interdum.
                Fusce ut mollis mi, ut blandit velit. Suspendisse potenti. Aliquam pharetra sapien erat, quis suscipit lorem porta id.
              </h4>
              <form className="col s12">
                <div className="row">
                  <div className="input-field col s6">
                    <input type="text" placeholder="Name"/>
                  </div>

                  <div className="input-field col s6">
                    <input type="text" placeholder="Email"/>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s6">
                    <input type="password" placeholder="Password"/>
                  </div>

                  <div className="input-field col s6">
                    <input type="password" placeholder="Password Confirmation"/>
                  </div>
                </div>
                <div className="row submits">
                  <button className="btn waves-effect waves-light btn-large btn-wide" type="submit" name="action">Submit</button>
                  <a href="#">Already have an account?</a>
                </div>
              </form>
            </div>
        );
    }
}
