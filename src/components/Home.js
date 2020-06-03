import React, { Component } from 'react';
import HomeContent from "./HomeContent";
import HomeNav from "./HomeNav";
import 'firebase/database';

class Home extends Component {
  render() {
    return (
      <div>
        <HomeNav />
        <HomeContent />
      </div>
    );
  }
}

export default Home;
