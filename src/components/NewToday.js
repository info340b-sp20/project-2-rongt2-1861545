import React, { Component } from 'react';
import 'firebase/database';
import firebase from 'firebase/app';

//A form the user can use to post a Chirp
export default class NewToday extends Component {
  constructor(props){
    super(props);
    this.state = {
      todo:'',
      complete: false
    };
    this.userId = firebase.auth().currentUser.uid;
    this.userName = firebase.auth().currentUser.displayName;
    this.userPhoto = firebase.auth().currentUser.photoURL;
    this.time = firebase.database.ServerValue.TIMESTAMP;
  }

  //when the text in the form changes
  updatePost = (event) => {
    this.setState({
      todo: event.target.value,
      complete: false
    });
  }

  //post a new chirp to the database
  postTodo = (event) => {
    event.preventDefault(); //don't submit
    console.log(this.props.currentUser);
    /* TODO: add a new Chirp to the database */
    let newTodo = {
      text: this.state.todo,
      userId: this.userId,
      userName: this.userName,
      userPhoto: this.userPhoto,
      time: this.time,
      complete: this.state.complete
    }
    firebase.database().ref('todos').push(newTodo);

    this.setState({todo:''}); //empty out post for next time
  }

  //You do not need to modify this method!
  render() {
    let user = this.props.currentUser; //the current user (convenience)

    return (
      // <div className="tile is-parent is-vertical">
      //   <article className="tile is-child notification">
      //     <p className="title">Today</p>
      //     <div className="today-content content">
            <div className="draggable">
              <div className="todo-item today" draggable="false">
                <div className="icon">
                  <button className="circle" />
                </div>
                <input 
                  className="ipt-today ipt-all input" 
                  type="text" 
                  placeholder="Write a smallest task..." 
                  value={this.state.post}
                  onChange={this.updatePost}
                  onBlur = {this.postTodo} 
                />
              </div>
              <div className="is-divider" />
            {/* </div> */}
            {/* <div>
              <TodoLine todos={this.props.todos} sendTodo={this.props.sendTodo} callback={this.props.callback}/>
            </div> */}
                           {/* Only show this if the post length is > 140 */}
               {/* {this.state.post.length > 140 &&
                 <small className="form-text">140 character limit!</small>
               } */}
           </div>
      //   </article>
      // </div>
    );
  }
}
