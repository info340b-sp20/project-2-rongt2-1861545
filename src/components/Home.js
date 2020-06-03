import React, { Component } from 'react';
import HomeContent from "./components/HomeContent";
import HomeNav from "./components/HomeNav";
import 'firebase/database';
import './main.css';

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
