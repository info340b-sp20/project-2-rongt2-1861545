import React, { Component } from 'react';
import 'firebase/database';
import firebase from 'firebase/app';

class Profile extends Component {
  constructor(props){
    super(props);
    this.state = {
      todos:[]
    };
    this.userEmail = firebase.auth().currentUser.email;
    this.userId = firebase.auth().currentUser.uid;
  }

  componentDidMount() {
    let uid = this.userId;
    let todosRef = firebase.database().ref(uid).child("todos");
    
    todosRef.on('value', (snapshot) => {
      let data = snapshot.val();
      if (data) {
        let todoKeys = Object.keys(data);
        let todoArray = todoKeys.map((key) => {
          let todoObj = data[key];
          todoObj.id = key;
          return todoObj;
        })
        this.setState({ todos: todoArray });
      } else {
        return
      }
    })
  }

  // countTodos = () => {
  //   if(!this.state.todos) return null; //if no todos, don't display  
  //   let count = this.state.todos
  //     .map((todo) => {
  //       if( todo.type === "complete") {
  //         let todoCount = this.todoCount;
  //         this.setState({ todoCount: todoCount++ });
  //       } else if ( todo.type === "goal" ) {
  //         this.setState({ goalCount: todoArray });
  //       } else {
  //         this.setState({ completeCount: todoArray });
  //       }
  //     })
  //     return count;
  // }

  render() {
    return(
      <div className="tile is-parent profile-card">
        <article className="tile is-child">
          <div className="card is-mobile">
            <div className="card-image">
              <figure className="image is-4by3">
                <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder" />
              </figure>
            </div>
            <div className="card-content">
              <div className="d-flex flex-row justify-content-between">
                <div className="media-left">
                  <figure className="image is-48x48">
                    <img src="https://bulma.io/images/placeholders/128x128.png" alt="Placeholder" />
                    {/* <img src="img/avatar.jpeg" alt="Small Avatar" /> */}
                  </figure>
                </div>
                <div className="media-content">
                  <p className="title is-4 pt-2" id="profile_name">User1865</p>
                  {/* <p className="subtitle is-6">@jamesk97</p> */}
                </div>
              </div>
              {/* <div className="is-divider" /> */}
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
                    <p className="heading">Completed</p>
                    <p className="title">35</p>
                  </div>
                </div>
              </nav>
              <div className="accomplishments">
                <span className="tag is-link is-light mb-2"><i className="fas fa-trophy"></i>Kind of a big deal</span>
                {/* <span className="tag is-primary is-light mb-2"><i className="fas fa-medal" />100TodosCompleted</span> */}
                <span className="tag is-danger is-light"><i className="far fa-hand-rock" />StayAtHome2020</span>
              </div>
              <div className="is-divider" />
              <div className="content">
                <p>Bio: You can add things to your bio.</p>
                {/* <input className="ipt-today ipt-all input" placeholder="Please input something to your bio." type="text" ></input> */}
                <a href="/">#css</a> <a href="/">#responsive</a>
                <br />
                <a href="/">{this.userEmail}</a>
                {/* <time dateTime="2016-1-1">Last seen: few minutes ago</time> */}
              </div>
            </div>
          </div>
        </article>
      </div>
    )
  }
}

export default Profile;
