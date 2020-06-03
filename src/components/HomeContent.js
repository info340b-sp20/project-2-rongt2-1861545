import React, { Component } from 'react';
import firebase from "firebase/app";
import "firebase/auth"

class HomeContent extends Component {
  render() {
    return(
    <div className="section">
      <div className="container">
        <div className="column is-8 is-offset-1 is-hidden-touch" id="front-page-img">
          <p className="title"><span id="front-page-title">Collaborative todos & goals management with friends, family and teams!</span></p>
          <p className="subtitle is-3 has-text-grey">It's so easy, you'll be amazed.</p>
          <div className="tags">
            <a href="/about.html"><span className="tag is-warning is-medium">❤️&nbsp;Made with love in Seattle</span></a>
          </div>
          <a href="/index.html" className="button button-special is-large is-rounded box-shadow-lift front-page-link">
            <span>Go to Board</span>
            <span className="icon has-text-link">
              <i className="fad fa-arrow-alt-right"></i>
            </span>
          </a>
        </div>
        <div className="column is-11 is-offset-4 is-hidden-touch">
          <br />
          <figure className="image">
            <img alt="home-page-banner-3d-figure" src="img/front.png" />
          </figure>
        </div>
        <div className="column has-text-centered is-hidden-desktop">
          <p className="title is-1">Collaborative todos & goals management with friends, family and teams!</p>
          <p className="subtitle is-4">It's so easy, you'll be amazed.</p>
          <div className="column">
            <div className="tags is-centered">
              <span className="tag is-warning">❤️&nbsp;Made with love in Seattle</span>
            </div>
            <a href="/index.html" className="button button-special is-large is-rounded box-shadow-lift front-page-link">
              <span>Go to Board</span>
              <span className="icon has-text-danger">
                <i className="fad fa-arrow-alt-right"></i>
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
    )
  }
}