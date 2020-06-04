import React, { Component } from 'react';

class Hero extends Component {
  render() {
    return(
      <section class="hero is-medium is-primary is-bold">
        <div class="hero-body bg-img img-responsive">
            <div class="container">
                <h1 class="title"></h1>
                <h2 class="subtitle" id="greeter"></h2>
            </div>
        </div>
      </section>
    )
  }
}

export default Hero;
