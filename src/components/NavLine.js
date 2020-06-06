import React, { Component } from 'react';
import 'firebase/database';

class NavLine extends Component {
  render() {
    return(
      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          {/* <a className="navbar-item" href="">Home</a> */}
          <a className="navbar-item is-active" href="/">Board</a>
          <a className="navbar-item" href="/">Followed</a>
          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link" href="/">More</a>
            <div className="navbar-dropdown">
              <a className="navbar-item" href="/">About</a>
              <a className="navbar-item" href="/">Contact</a>
              <hr className="navbar-divider" />
              <a className="navbar-item" href="/">Report an issue</a>
            </div>
          </div>
          <button className="navbar-item" onClick={this.props.handleSignOut}>
                Log out 
          </button>
        </div>
      </div>
    )
  }
}

export default NavLine;
