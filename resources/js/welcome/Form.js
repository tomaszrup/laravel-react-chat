import React, { Component } from 'react';
import ReactDOM from 'react-dom';


export default class Form extends Component {
    constructor() {
      super();

      this.state = {
        loading: false,
        register: true,
        registerForm: {
          name: '',
          email: '',
          password: '',
          password_confirmation: ''
        },
        loginForm: {
          email: '',
          password: ''
        },
        errors: []
      };

      this.toggleForm = this.toggleForm.bind(this);
      this.register = this.register.bind(this);
      this.login = this.login.bind(this);
    }
    toggleForm() {
      this.setState({register: !this.state.register});
    }
    login(event) {
      event.preventDefault();
      this.setState({errors: [], loading: true});

      axios.post('/login', this.state.loginForm).then(response => {
        location.reload();
      }).catch(error => {
        this.setState({loading: false, errors: error.response.data.errors});
      });
    }
    register(event) {
      event.preventDefault();
      this.setState({errors: [], loading: true});

      axios.post('/register', this.state.registerForm).then(response => {
        location.reload();
      }).catch(error => {
        this.setState({loading: false, errors: error.response.data.errors});
      });
    }
    render() {
        let buttonText = this.state.loading ? (
                        <div className="preloader-wrapper small active mt-1">
                          <div className="spinner-layer spinner-red-only">
                            <div className="circle-clipper left">
                              <div className="circle"></div>
                            </div><div className="gap-patch">
                              <div className="circle"></div>
                            </div><div className="circle-clipper right">
                              <div className="circle"></div>
                            </div>
                          </div>
                        </div>
      ) : (this.state.register ? "Sign up" : "Sign in");

        let errors = Object.keys(this.state.errors).map((error, index) => {
          return (<p className="error" key={index}>{this.state.errors[error]}</p>)
        });

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
                    <input type="text" placeholder="Name" name="name" required onChange={e => this.setState({ registerForm: {...this.state.registerForm, name: e.target.value } }) }/>
                  </div>

                  <div className="input-field col s6">
                    <input type="email" placeholder="Email" name="email" required onChange={e => this.setState({ registerForm: {...this.state.registerForm, email: e.target.value } }) }/>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s6">
                    <input type="password" placeholder="Password" name="password" required onChange={e => this.setState({ registerForm: {...this.state.registerForm, password: e.target.value } }) } />
                  </div>

                  <div className="input-field col s6">
                    <input type="password" placeholder="Password Confirmation" name="password_confirmation" required onChange={e => this.setState({ registerForm: {...this.state.registerForm, password_confirmation: e.target.value } }) }/>
                  </div>
                </div>
                <div className="row submits">
                  <button className="btn waves-effect waves-light btn-large btn-wide" type="submit" name="action">{buttonText}</button>
                  <a href="#" onClick={this.toggleForm}>Already have an account?</a>
                </div>
                <div className="errors">
                  {errors}
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
                  <input type="email" placeholder="Email" name="email" required onChange={e => this.setState({ loginForm: {...this.state.loginForm, email: e.target.value } }) }/>
                </div>
                <div className="input-field col s6">
                </div>
              </div>
              <div className="row">
                <div className="input-field col s6">
                  <input type="password" placeholder="Password" name="password" required onChange={e => this.setState({ loginForm: {...this.state.loginForm, password: e.target.value } }) }/>
                </div>
                <div className="input-field col s6">
                </div>
              </div>
              <div className="row submits">
                <button className="btn waves-effect waves-light btn-large btn-wide" type="submit" name="action">{buttonText}</button>
                <a href="#" onClick={this.toggleForm}>Need a new account?</a>
              </div>
              <div className="errors">
                {errors}
              </div>
            </form>
          </div>
        )
    }
}
