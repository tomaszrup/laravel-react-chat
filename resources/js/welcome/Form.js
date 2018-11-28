import React, { Component } from 'react';
import ReactDOM from 'react-dom';


export default class Form extends Component {
    constructor() {
      super();

      this.state = {
        register: true
      };

      this.toggleForm = this.toggleForm.bind(this);
    }
    toggleForm() {
      this.setState({register: !this.state.register});
    }
    login(event) {
      event.preventDefault();  
    }
    register(event) {
      event.preventDefault();
    }
    render() {
        let buttonText = this.register ? "Sign up" : "Sign in";

        if(this.state.register)
        return (
            <div className="login-modal">
              <h1>Join and get connected.</h1>
              <h4>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis interdum diam vel magna sollicitudin interdum.
                Fusce ut mollis mi, ut blandit velit. Suspendisse potenti. Aliquam pharetra sapien erat, quis suscipit lorem porta id.
              </h4>
              <form className="col s12" onSubmit={this.register}>
                <div className="row">
                  <div className="input-field col s6">
                    <input type="text" placeholder="Name" required />
                  </div>

                  <div className="input-field col s6">
                    <input type="email" placeholder="Email" required />
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s6">
                    <input type="password" placeholder="Password" required />
                  </div>

                  <div className="input-field col s6">
                    <input type="password" placeholder="Password Confirmation" required />
                  </div>
                </div>
                <div className="row submits">
                  <button className="btn waves-effect waves-light btn-large btn-wide" type="submit" name="action">Sign Up</button>
                  <a href="#" onClick={this.toggleForm}>Already have an account?</a>
                </div>
              </form>
            </div>
        );
        else
        return (
          <div className="login-modal">
            <h1>Join and get connected.</h1>
            <h4>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis interdum diam vel magna sollicitudin interdum.
              Fusce ut mollis mi, ut blandit velit. Suspendisse potenti. Aliquam pharetra sapien erat, quis suscipit lorem porta id.
            </h4>
            <form className="col s12" onSubmit={this.login}>
              <div className="row">
                <div className="input-field col s6">
                  <input type="email" placeholder="Email" required/>
                </div>
                <div className="input-field col s6">
                </div>
              </div>
              <div className="row">
                <div className="input-field col s6">
                  <input type="password" placeholder="Password" required/>
                </div>
                <div className="input-field col s6">
                </div>
              </div>
              <div className="row submits">
                <button className="btn waves-effect waves-light btn-large btn-wide" type="submit" name="action">{buttonText}</button>
                <a href="#" onClick={this.toggleForm}>Need a new account?</a>
              </div>
            </form>
          </div>
        )
    }
}
