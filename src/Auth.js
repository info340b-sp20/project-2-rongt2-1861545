import React, { Component } from 'react';
import './main.css';
import firebase from "firebase/app";
import "firebase/auth";

class Auth extends Component {
    constructor(props) {
      super(props);
      this.state = {
          user: null,
          email: '',
          password: '',
          username: '',
          errorMessage: ''
      };
  }
  componentDidMount() {
      firebase.auth().onAuthStateChanged((user) => {
        if(user) {
          this.setState({
            user: user,
            email: "",
            password: "",
            errorMessage: ""
          })
        } else {
          this.setState({user: null})
        }
      })
  }

  handleChange(event) {
    let field = event.target.name;
    let value = event.target.value;

    let changes = {};
    changes[field] = value;
    this.setState(changes);
  }

  handleSignUp() {
    firebase.auth().createUserWithEmailAndPassword(this.state.email,this.state.email)
      .then(() => {
      let profilePromise = firebase.auth().currentUser.updateProfile({
        displayName: this.state.username
      });
      return profilePromise;
    })
    .then(() => {
      this.setState({
        user: firebase.auth.currentUser,
        username: ""
      })
    })
  }

  handleSignIn() {
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .catch((err) => {
        this.setState({errorMessage: err.message });
        })
  }

  handleSignOut() {
    firebase.auth().signOut()
      .catch((err) => {
        this.setState({errorMessage: err.message });
      })
  }

  render() {
    let welcomeDiv = this.state.user === null ? "":<div className="alert alert-info">Hello, {this.state.user.displayName}</div>
    let errorDiv = this.state.errorMessage === "" ? "":<div className="alert alert-danger">Error: {this.state.user.errorMessage}</div>

    return (
          <div className="container">
            {errorDiv}
            {welcomeDiv}
              <div className="form-group">
                  <label>Email:</label>
                  <input className="form-control"
                      name="email"
                      value={this.state.email}
                      onChange={(event) => { this.handleChange(event) }}
                  />
              </div>

              <div className="form-group">
                  <label>Password:</label>
                  <input type="password" className="form-control"
                      name="password"
                      value={this.state.password}
                      onChange={(event) => { this.handleChange(event) }}
                  />
              </div>

              <div className="form-group">
                  <label>Username:</label>
                  <input className="form-control"
                      name="username"
                      value={this.state.username}
                      onChange={(event) => { this.handleChange(event) }}
                  />
              </div>

              <div className="form-group">
                  <button className="btn btn-primary mr-2" onClick={() => this.handleSignUp()}>
                      Sign Up
                   </button>
                  <button className="btn btn-success mr-2" onClick={() => this.handleSignIn()}>
                      Sign In
                  </button>
                  <button className="btn btn-danger mr-2" onClick={() => this.handleSignOut()}>
                      Sign Out
                  </button>
              </div>
          </div>

      );
  }
}

export default Auth;
