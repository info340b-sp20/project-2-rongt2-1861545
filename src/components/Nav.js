import React, { Component } from 'react';
import NavLine from "./NavLine";

class Nav extends Component {
  constructor(props) {
    super(props);
  }
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
          <NavLine handleSignOut={this.props.handleSignOut}/>
        </div>
      </nav>
    )
  }
}

export default Nav;
