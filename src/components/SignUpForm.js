import React, { Component } from 'react';

class SignUpForm extends Component {
  constructor(props){
    super(props);

    this.state = {
      'email': undefined,
      'password': undefined,
      'handle': undefined,
      'avatar': ''
    }; 
  }

  //update state for specific field
  handleChange = (event) => {
    let field = event.target.name;
    let value = event.target.value;

    let changes = {};
    changes[field] = value;
    this.setState(changes);
  }

  //handle signUp button
  handleSignUp = (event) => {
    event.preventDefault(); //don't submit
    let avatar = this.state.avatar || 'img/no-user-pic.png'; //default to local pic
    this.props.signUpCallback(this.state.email, this.state.password, this.state.handle, avatar);
  }

  //handle signIn button
  handleSignIn = (event) => {
    event.preventDefault(); //don't submit
    this.props.signInCallback(this.state.email, this.state.password);
  }

  render() {
    return (
      <form>
        {/* email */}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input className="form-control" 
            id="email" 
            type="email" 
            name="email"
            onChange={this.handleChange}
            />
        </div>
        
        {/* password */}
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input className="form-control" 
            id="password" 
            type="password"
            name="password"
            onChange={this.handleChange}
            />
        </div>

        {/* handle */}
        <div className="form-group">
          <label htmlFor="handle">Nickname</label>
          <input className="form-control" 
            id="handle" 
            name="handle"
            onChange={this.handleChange}
            />
        </div>

        {/* buttons */}
        <div className="form-group">
          <button className="btn btn-primary mr-2" onClick={this.handleSignUp}>Sign-up</button>
          <button className="btn btn-primary" onClick={this.handleSignIn}>Sign-in</button>
        </div>
      </form>
    )
  }
}

export default SignUpForm