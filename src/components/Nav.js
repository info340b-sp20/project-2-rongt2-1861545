import React, { Component } from 'react';

class Nav extends Component {
  render() {
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="container">
          <div className="navbar-brand">
            <a className="navbar-item" href="#">
              <img src="img/logo.png" alt="goallab" />
            </a>
            <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
              <span aria-hidden="true" />
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </a>
          </div>
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
        </div>
      </nav>
    )
  }
}

export default Nav;
