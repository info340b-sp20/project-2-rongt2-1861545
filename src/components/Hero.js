import React, { Component } from 'react';
import 'firebase/database';
import firebase from 'firebase/app';

class Hero extends Component {
  constructor(props) {
    super(props);
    this.name = firebase.auth().currentUser.displayName;
  }


  render() {
    return(
      <section className="hero is-medium is-primary is-bold">
        <div className="hero-body bg-img img-responsive">
            <div className="container">
                <h1 id="hero-title" className="title">Good Afternoon, {this.name}</h1>
                <h2 id="hero-subtitle" className="subtitle">What's your focus today?</h2>
            </div>
        </div>
      </section>
    )
  }
}

export default Hero;
