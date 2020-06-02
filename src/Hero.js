import React, { Component } from 'react';

class Hero extends Component {
  render() {
    return(
      <section className="hero is-medium is-primary is-bold">
        <div className="hero-body bg-img img-responsive">
          <div className="container">
            <h1 className="title" />
            <h2 className="subtitle" id="greeter" />
          </div>
        </div>
      </section>
    )
  }
}

export default Hero;
