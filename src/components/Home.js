import React, { Component } from 'react';
import HomeContent from "./HomeContent";
import HomeNav from "./HomeNav";
import 'firebase/database';

class Home extends Component {
  render() {
    return (
      <div>
        <HomeNav />
        <HomeContent 
          signUpCallback={this.props.signUpCallback} 
          signInCallback={this.props.signInCallback}
        />
      </div>
    );
  }
}

export default Home;
