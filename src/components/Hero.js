import React, { Component } from 'react';

class Hero extends Component {
  render() {
    return(
      <section className="hero is-medium is-primary is-bold">
        <div className="hero-body bg-img img-responsive">
            <div className="container">
                <h1 className="title">Good Afternoon,</h1>
                <h2 className="subtitle" id="greeter">Yesterday you said tomorrow...</h2>
            </div>
        </div>
      </section>
    )
  }
}

export default Hero;
