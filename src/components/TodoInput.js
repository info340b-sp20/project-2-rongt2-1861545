import React, { Component } from 'react';
import 'firebase/database';
import firebase from 'firebase/app';

//A form the user can use to post a todo
export default class NewToday extends Component {
  constructor(props){
    super(props);
    this.state = {
      todo:''
    };
    this.userId = firebase.auth().currentUser.uid;
    this.userName = firebase.auth().currentUser.displayName;
    this.userPhoto = firebase.auth().currentUser.photoURL;
    this.time = firebase.database.ServerValue.TIMESTAMP;
  }

  //when the text in the form changes
  updatePost = (event) => {
    this.setState({
      todo: event.target.value
    });
  }

  // check if the input is empty, do not post as a new todo
  checkInput = (event) => {
    if (event.target.value !== "" && this.state.todo.length <= 35) {
      this.postTodo(event);
    } else {
      return;
    }
  }

  //post a new todo to the database
  postTodo = (event) => {
    event.preventDefault(); //don't submit
    let newTodo = {
      text: this.state.todo,
      userId: this.userId,
      userName: this.userName,
      userPhoto: this.userPhoto,
      time: this.time,
      type: this.props.currentType
    }
    let uid = this.userId;
    firebase.database().ref(uid).child("todos").push(newTodo);
    this.setState({todo:''}); //empty out post for next time
  }

  render() {
    return (
      <div className="draggable">
        {/* Only show this if the post length is > 35 */}
        {this.state.todo.length > 35 &&
          <small className="form-text alert-primary mb-3 p-2 pl-3 rounded"> Reached 35 character limit!</small>
        }
        <div className="todo-item today" draggable="false">
          <div className="icon">
            <button className="circle btn-outline-dark" />
          </div>
          <input 
            className="ipt-today ipt-all input" 
            type="text" 
            placeholder="Write a smallest task..." 
            value={this.state.todo}
            onChange={this.updatePost}
            onBlur = {this.checkInput} 
          />
        </div>
        <div className="is-divider" />
      </div>
    );
  }
}
