import React, { Component } from 'react'; //import React Component
import './main.css'; //import css file!
import {Route, Link, Switch, Redirect, NavLink} from 'react-router-dom'

function importAll(r) {
  return r.keys().map(r);
}
  
const images = importAll(require.context('./img', false, /\.(png|jpe?g|svg)$/));
  
class App extends Component {
  constructor(props){
    super(props);
    this.state = {}; //initialize as empty
  }

  componentDidMount() {
    
  }

  render() {
    return (
        <div>
            <Nav></Nav>
            <Hero></Hero>
            <Main></Main>
            <Footer></Footer>
        </div>
    );
  }
}

class Nav extends Component {
  render() {
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="container">
          <div className="navbar-brand">
            <a className="navbar-item" href="#">
              <img src="img/logo.png" alt="goallab" />
            </a>
            <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
              <span aria-hidden="true" />
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </a>
          </div>
          <div id="navbarBasicExample" className="navbar-menu">
            <div className="navbar-start">
              <a className="navbar-item" href="test.html">Home</a>
              <a className="navbar-item is-active" href="#">Board</a>
              <a className="navbar-item" href="followed.html">Followed</a>
              <div className="navbar-item has-dropdown is-hoverable">
                <a className="navbar-link">More</a>
                <div className="navbar-dropdown">
                  <a className="navbar-item">About</a>
                  <a className="navbar-item">Contact</a>
                  <hr className="navbar-divider" />
                  <a className="navbar-item">Report an issue</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

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

class Today extends Component {
  render () {
    return(
      <div className="tile is-parent is-vertical">
        <article className="tile is-child notification">
          <p className="title">Today</p>
          <div className="today-content content">
            <div className="draggable">
              <div className="todo-item today" draggable="false">
                <div className="icon">
                  <button className="circle" />
                </div>
                <input className="ipt-today ipt-all input" type="text" placeholder="Write a smallest task..." />
              </div>
              <div className="is-divider" />
            </div>
          </div>
        </article>
      </div>
    )
  }
}

class Todo extends Component {
  render () {
    return(
      <div className="tile is-parent">
        <article className="tile is-child notification draggable-area">
          <p className="title">Todos</p>
          <div className="todo-content content">
            <div className="draggable">
              <div className="todo-item todo" draggable="false">
                <div className="icon">
                  <button className="circle" />
                </div>
                <input className="ipt-todo ipt-all input" type="text" placeholder="Do one task at a time..." />
              </div>
              <div className="is-divider" />
            </div>
          </div>
        </article>
      </div>
    )
  }
}

class Main extends Component {
    render() {
      return(
        <section className="section">
        <div className="container">
          <div className="tabs is-centered">
            <ul>
              <li className="tab is-active" onclick="openTab(event,'today')"><a>Todos</a></li>
              <li className="tab" onclick="openTab(event,'completed')"><a>Completed</a></li>
              <li className="tab" onclick="openTab(event,'goals')"><a>Goals</a></li>
            </ul>
          </div>
          <div className="tile is-ancestor">
            {/* Start of Today tab*/}
            <div className="tile is-9 content-tab" id="today">
              <Today />
              <Todo />
              {/* <div className="tile is-parent is-vertical">
                <article className="tile is-child notification">
                  <p className="title">Today</p>
                  <div className="today-content content">
                    <div className="draggable">
                      <div className="todo-item today" draggable="false">
                        <div className="icon">
                          <button className="circle" />
                        </div>
                        <input className="ipt-today ipt-all input" type="text" placeholder="Write a smallest task..." />
                      </div>
                      <div className="is-divider" />
                    </div>
                  </div>
                </article>
              </div> */}
              {/* <div className="tile is-parent">
                <article className="tile is-child notification draggable-area">
                  <p className="title">Todos</p>
                  <div className="todo-content content">
                    <div className="draggable">
                      <div className="todo-item todo" draggable="false">
                        <div className="icon">
                          <button className="circle" />
                        </div>
                        <input className="ipt-todo ipt-all input" type="text" placeholder="Do one task at a time..." />
                      </div>
                      <div className="is-divider" />
                    </div>
                  </div>
                </article>
              </div> */}
            </div>
            {/* End of Today tab*/}
            {/* Start of Completed tab*/}
            <div className="tile is-vertical is-9 content-tab" id="completed">
              <div className="tile is-parent is-vertical">
                <article className="tile is-child notification">
                  <p className="title">Completed</p>
                  <div className="complete-content content">
                  </div>
                </article>
              </div>
            </div>
            {/* End of Completed tab*/}
            {/* Start of Goals tab*/}
            <div className="tile is-vertical is-9 content-tab" id="goals">
              <div className="tile is-parent is-vertical">
                <article className="tile is-child notification">
                  <p className="title">Goals</p>
                  <div className="goal-content content">
                    <div className="draggable">
                      <div className="todo-item goal" draggable="false">
                        <div className="icon">
                          <button className="circle" />
                        </div>
                        <input className="ipt-goal input ipt-all" type="text" placeholder="Write a smallest task..." />
                      </div>
                      <div className="is-divider" />
                    </div>
                  </div>
                </article>
              </div>
            </div>
            {/* End of Goals tab*/}
            {/* Start of Profile section (shared across all tabs)*/}
            <div className="tile is-parent">
              <article className="tile is-child">
                <div className="card is-mobile">
                  <div className="card-image">
                    <figure className="image is-4by3">
                      <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image" />
                    </figure>
                  </div>
                  <div className="card-content">
                    <div className="media">
                      <div className="media-left">
                        <figure className="image is-48x48">
                          <img src="img/avatar.jpeg" alt="Small Avatar" />
                        </figure>
                      </div>
                      <div className="media-content">
                        <p className="title is-4" id="profile_name">James Kim</p>
                        <p className="subtitle is-6">@jamesk97</p>
                      </div>
                    </div>
                    <div className="is-divider" />
                    <div className="accomplishments">
                      <span className="tag is-primary is-light"><i className="fas fa-medal" />Kind of a big deal</span>
                      <span className="tag is-danger is-light"><i className="far fa-hand-rock" />StayAtHome2020</span>
                      {/*<span class="tag is-link is-light"><i class="fas fa-trophy"></i>100TodosCompleted</span>*/}
                    </div>
                    <nav className="level is-mobile">
                      <div className="level-item has-text-centered">
                        <div>
                          <p className="heading">todos</p>
                          <p className="title">12</p>
                        </div>
                      </div>
                      <div className="level-item has-text-centered">
                        <div>
                          <p className="heading">Goals</p>
                          <p className="title">6</p>
                        </div>
                      </div>
                      <div className="level-item has-text-centered">
                        <div>
                          <p className="heading">Likes</p>
                          <p className="title">35</p>
                        </div>
                      </div>
                    </nav>
                    <div className="content">
                      <p>TA for info340: client-side programming <a>jamesk97@uw.edu</a>.</p>
                      <a href="#">#css</a> <a href="#">#responsive</a>
                      <br />
                      <time dateTime="2016-1-1">Last seen: few minutes ago</time>
                    </div>
                  </div>
                </div>
              </article>
            </div>
            {/* End of Profile section*/}
          </div>
        </div>
      </section>
    )
  }
}

class Footer extends Component {
  render() {
    return(
      <footer className="footer">
        <div className="content has-text-centered">
        <p>
          <strong>GoalLab</strong> made with ❤️ in Seattle. by <a href="#">Group 9</a>
        </p>
        </div>
      </footer>
    )
  }
}

export default App;
