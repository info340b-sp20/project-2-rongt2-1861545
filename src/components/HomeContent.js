import React, { Component } from 'react';
import SignUpForm from './SignUpForm';
import "firebase/auth"


export default class HomeContent extends Component {
  render() {
    return(
      <div className="section">
        <div className="container">
          <div className=" is-8 is-offset-1 is-hidden-touch" id="front-page-img">
            <div className="d-flex flex-row justify-content-between">
              <div className="left">
                <p className="title"><span id="front-page-title">Collaborative todos & goals management with friends, family and teams!</span></p>
                <p className="subtitle is-3 has-text-grey">It's so easy, you'll be amazed.</p>
                <div className="tags">
                  <a href="/"><span className="tag is-warning is-medium"><span role="img" aria-label="heart">❤️&nbsp;</span>Made with love in Seattle</span></a>
                </div>
              </div>
              <div className="right">
                <SignUpForm 
                  signUpCallback={this.props.signUpCallback} 
                  signInCallback={this.props.signInCallback} 
                />
              </div>
            </div>
            {/* <a href="/" className="button button-special is-large is-rounded box-shadow-lift front-page-link">
              <span>Go to Board</span>
              <span className="icon has-text-link">
                <i className="fad fa-arrow-alt-right"></i>
              </span>
            </a> */}
          </div>
          <div className="column is-11 is-offset-4 is-hidden-touch">
            <br />
            <figure className="image">
              <img alt="home-page-banner-3d-figure" src="img/front.png" />
            </figure>
          </div>
          {/* <div className="column has-text-centered is-hidden-desktop">
            <p className="title is-1">Collaborative todos & goals management with friends, family and teams!</p>
            <p className="subtitle is-4">It's so easy, you'll be amazed.</p>
            <div className="column">
              <div className="tags is-centered">
                <span className="tag is-warning"><span role="img" aria-label="heart">❤️&nbsp;</span>Made with love in Seattle</span>
              </div>
              <a href="/" className="button button-special is-large is-rounded box-shadow-lift front-page-link">
                <span>Go to Board</span>
                <span className="icon has-text-danger">
                  <i className="fad fa-arrow-alt-right"></i>
                </span>
              </a>
            </div>
          </div> */}
        </div>
      </div>
    )
  }
}
