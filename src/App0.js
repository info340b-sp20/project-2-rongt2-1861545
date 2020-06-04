import React, { Component } from 'react';
import {Route, BrowserRouter, Link, Switch, Redirect, NavLink, Router} from 'react-router-dom';
import Auth from "./components/Auth";
import SignUpForm from './components/SignUpForm';
import Hero from "./components/Hero";
import Profile from "./components/Profile";
import Nav from "./components/Nav";
import Todo from "./components/Todo"
import Home from "./components/Home"
import NewToday from "./components/NewToday"
// import TodoList from "./components/TodoList"
import MainFooter from "./components/MainFooter"
import firebase from 'firebase/app';
import 'firebase/database';
import './main.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {loading: true};
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
    this.authUnRegFunc();
  }

    //A callback function for registering new users
    handleSignUp = (email, password, handle, avatar) => {
      this.setState({errorMessage:null}); //clear any old errors
  
      /* TODO: sign up user here */
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
  
      /* TODO: sign in user here */
      firebase.auth().signInWithEmailAndPassword(email, password)
      .catch((err) => {
        this.setState({errorMessage: err.message });
        })
    }
  
    //A callback function for logging out the current user
    handleSignOut = () => {
      this.setState({errorMessage:null}); //clear any old errors
  
      /* TODO: sign out user here */
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
          <Home />
          <h1>Sign Up</h1>
          <SignUpForm 
            signUpCallback={this.handleSignUp} 
            signInCallback={this.handleSignIn} 
          />
        </div>
      );
    } else {
      content = (
          <Main currentUser={this.state.user}/>
      )
    }
    if (this.state.loading) {
      content = (
        <div className="text-center">
          <i className="fa fa-spinner fa-spin fa-3x" aria-label="Connecting..."></i>
        </div>
      )
    }
    return (
      <div>
        <Nav />
        {this.state.errorMessage &&
          <p className="alert alert-danger">{this.state.errorMessage}</p>
        }
        {content}
        {this.state.user &&
          <button className="btn btn-warning" onClick={this.handleSignOut}>
            Log Out {this.state.user.displayName}
          </button>
        }
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
          <NewToday currentUser={this.props.user} />
          {/* <TodoList currentUser={this.props.user}/> */}
          {/* <Switch>
            <Route path="/complete" component={Complete} />
            <Route path="/goals" component={Goals} />
            <Route path="/" component={ () => <NewToday currentUser={this.props.user} /> } />
          </Switch> */}
          <Profile />
        </div>
      </div>
    </section>
  )}
}

class Today extends Component {
  render() {
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
                <input 
                  className="ipt-today ipt-all input" 
                  type="text" 
                  placeholder="Write a smallest task..." 
                  value={ this.props.todoText }
                  onChange={ (event) => {this.props.callback(event.target.value)} }
                  onKeyDown={ this.props.sendTodo } 
                />
              </div>
              <div className="is-divider" />
            </div>
            <div>
              <TodoLine todos={this.props.todos} sendTodo={this.props.sendTodo} callback={this.props.callback}/>
            </div>
          </div>
        </article>
      </div>
    )
  }
}

class TodoLine extends Component {
  render() {
    if (this.props.todos) {
      Object.keys(this.props.todos).map((d) => {
        return <Todo id={d} key={d} info={this.props.todos[d]} />
      })
    } else {
      return <div />
    }
  }
}

class TodoSec extends Component {
  render() {
    return(
      <div className="tile is-parent">
        <article className="tile is-child notification draggable-area">
          <p className="title">Todos</p>
          <div className="todo-content content">
            <TodoLine />
          </div>
        </article>
      </div>
    )
  }
}

class Todos extends Component {
  render () {
    return(
      <div className="tile is-9 content-tab" id="today">
        <Today todos={this.props.todos} sendTodo={this.props.sendTodo} callback={this.props.callback}/>
        <TodoSec />
      </div>
    )
  }
}

class Complete extends Component {
  render() {
    return(
      <div className="tile is-vertical is-9 content-tab" id="completed">
        <div className="tile is-parent is-vertical">
          <article className="tile is-child notification">
            <p className="title">Completed</p>
            <div className="complete-content content"></div>
          </article>
        </div>
      </div>
    )
  }
}

class Goals extends Component {
  render() {
    return(
      <div className="tile is-vertical is-9 content-tab" id="goals">
        <div className="tile is-parent is-vertical">
          <article className="tile is-child notification">
            <p className="title">Goals</p>
            {/* <div className="goal-content content">
              <div className="draggable">
                <div className="todo-item goal" draggable="false">
                  <div className="icon">
                    <button className="circle" />
                  </div>
                  <input className="ipt-goal input ipt-all" type="text" placeholder="Write a smallest task..." />
                </div>
                <div className="is-divider" />
              </div>
            </div> */}
          </article>
        </div>
      </div>
    )
  }
}

export default App;
