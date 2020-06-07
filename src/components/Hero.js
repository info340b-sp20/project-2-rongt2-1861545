import React, { Component } from 'react';
import 'firebase/database';
import firebase from 'firebase/app';

class Hero extends Component {
  constructor(props) {
    super(props);
    this.userEmail = firebase.auth().currentUser.handle;
  }


  render() {
    return(
      <section className="hero is-medium is-primary is-bold">
        <div className="hero-body bg-img img-responsive">
            <div className="container">
    <h1 className="title">Good Afternoon, {this.userEmail}</h1>
                <h2 className="subtitle" id="greeter">Yesterday you said tomorrow...</h2>
            </div>
        </div>
      </section>
    )
  }
}

export default Hero;
