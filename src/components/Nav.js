import React, { Component } from 'react';
import NavLine from "./NavLine";

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
          <NavLine />
        </div>
      </nav>
    )
  }
}

export default Nav;
