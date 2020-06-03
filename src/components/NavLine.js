import React, { Component } from 'react';
import 'firebase/database';

class NavLine extends Component {
  render() {
    return(
      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <a className="navbar-item" href="test.html">Home</a>
          <a className="navbar-item is-active" href="/">Board</a>
          <a className="navbar-item" href="followed.html">Followed</a>
          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">More</a>
            <div className="navbar-dropdown">
              <a className="navbar-item" href="/about">About</a>
              <a className="navbar-item">Contact</a>
              <hr className="navbar-divider" />
              <a className="navbar-item">Report an issue</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default NavLine;
