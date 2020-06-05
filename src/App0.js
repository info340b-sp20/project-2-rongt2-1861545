import React, { Component } from 'react';
import {Route, BrowserRouter, Link, Switch, Redirect, NavLink, Router} from 'react-router-dom';
import SignUpForm from './components/SignUpForm';
import Hero from "./components/Hero";
import Profile from "./components/Profile";
import Nav from "./components/Nav";
import Home from "./components/Home"
import NewToday from "./components/NewToday"
import TodoList from "./components/TodoList"
import MainFooter from "./components/MainFooter"
import firebase from 'firebase/app';
import 'firebase/database';
import './main.css';

class App extends Component {
  constructor(props) {
    super(props);
    // this.state = {loading: true};
    this.state = {
      user: null, 
      loading: true
      };
  }

  componentDidMount() {
    this.authUnregFunc = firebase.auth().onAuthStateChanged((user)=> {
      if (user) {
        this.setState({
          user: user,
          loading: false
        });
      } else {
        this.setState({ 
          user: null, 
          loading: false
        })
      }
    })
  }

  componentWillUnmount() {
    // this.authUnRegFunc();
  }

  //A callback function for registering new users
  handleSignUp = (email, password, handle, avatar) => {
    this.setState({errorMessage:null}); //clear any old errors

    /*  sign up user here */
    firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
              let profilePromise = firebase.auth().currentUser.updateProfile({
                displayName: handle,
                photoURL: avatar
              });
              return profilePromise;
            })
            .then(() => {
              this.setState({
                user: firebase.auth.currentUser,
                displayName: handle,
                photoURL: avatar
              })
            })
            .catch((err) => {
              this.setState({errorMessage: err.message });
            })
    }
  
    //A callback function for logging in existing users
    handleSignIn = (email, password) => {
      this.setState({errorMessage:null}); //clear any old errors

      /* sign in user here */
      firebase.auth().signInWithEmailAndPassword(email, password)
              .catch((err) => {
                this.setState({errorMessage: err.message });
                })
    }
  
    //A callback function for logging out the current user
    handleSignOut = () => {
      this.setState({errorMessage:null}); //clear any old errors
  
      firebase.auth().signOut()
      .catch((err) => {
        this.setState({errorMessage: err.message });
      })
    }

  render() {
    let content = null; //content to render

    if(!this.state.user) { //if logged out, show signup form
      content = (
        <div className="container">
                      <h1>Sign Up</h1>
            <SignUpForm 
              signUpCallback={this.handleSignUp} 
              signInCallback={this.handleSignIn} 
            />
            <Home />

        </div>
      );
    } else { // else show the main todo board
      content = (
          <Main currentUser={this.state.user}/>
      )
    }
    if (this.state.loading) { // if loading, show spinner
      content = (
        <div className="text-center hello">
          <i className="fa fa-spinner fa-spin fa-3x" aria-label="Connecting..."></i>
        </div>
      )
    }
    return (
      <div>
        <Nav handleSignOut={this.handleSignOut}/>
        {this.state.errorMessage && // show error message 
          <p className="alert alert-danger">{this.state.errorMessage}</p>
        }
        {content} 
        <MainFooter />
      </div>
    );
  }
}

class Main extends Component {
  render() {
    return(
      <div>
        <Hero />
        <Content currentUser={this.props.user} />
      </div>
    )
  }
}

class Content extends Component {
  render() {
    let pathname = window.location.pathname;
    return(
      <section className="section">
        <div className="container">
          <div className="tabs is-centered">
            <ul>
              <li className={pathname=="/"?"tab is-active":"tab"}><a href="/">Todos</a></li>
              <li className={pathname=="/complete"?"tab is-active":"tab"}><a href="/complete">Completed</a></li>
              <li className={pathname=="/goals"?"tab is-active":"tab"}><a href="/goals">Goals</a></li>
            </ul>
          </div>
          <div className="tile is-ancestor"> 
          {/* outside container */}
            <Switch>
            <Route path="/complete" component={Complete} />
            <Route path="/goals" component={Goals} />
            <Route path="/" component={ () => <Todos currentUser={this.props.user} /> } />
            </Switch>
            <Profile />
          </div>
          {/* <Profile /> */}
        </div>
      </section>
    )
  }
}

class Todos extends Component {
  render() {
    return(
      <div class="tile is-9 content-tab" id="today">
        <div className="tile is-parent is-vertical .scroll-containerr">
          <article className="tile is-child notification">
            <p className="title">Today</p>
            <div className="today-content content scroll-boxx">
              <NewToday currentUser={this.props.user} currentType={"today"}/>
              <TodoList currentUser={this.props.user} containerType={"today"}/>
            </div>
          </article>
        </div>
        <div className="tile is-parent .scroll-containerr">
          <article className="tile is-child notification draggable-area">
            <p className="title">Todos</p>
            <div className="today-content content scroll-boxx">
              <NewToday currentUser={this.props.user} currentType={"todo"}/>
              <TodoList currentUser={this.props.user} containerType={"todo"}/>
            </div>
          </article>
        </div>
      </div>
    )
  }
}

class Complete extends Component {
  render() {
    return(
      <div className="tile is-parent is-vertical .scroll-containerr">
        <article className="tile is-child notification">
          <p className="title">Complete</p>
          <div className="today-content content scroll-boxx">
            <TodoList currentUser={this.props.user} />
          </div>
        </article>
      </div>
    )
  }
}

class Goals extends Component {
  render() {
    return(
      <div className="tile is-parent is-vertical .scroll-containerr">
        <article className="tile is-child notification">
          <p className="title">Goals</p>
          <div className="today-content content scroll-boxx">
            <NewToday currentUser={this.props.user} currentType={"goal"}/>
            <TodoList currentUser={this.props.user} containerType={"goal"}/>
          </div>
        </article>
      </div>
    )
  }
}

export default App;
