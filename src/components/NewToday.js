import React, { Component } from 'react';
import 'firebase/database';
import firebase from 'firebase/app';

//A form the user can use to post a Chirp
export default class NewToday extends Component {
  constructor(props){
    super(props);
    this.state = {todo:''};
    this.userId = firebase.auth().currentUser.uid
    this.userName = firebase.auth().currentUser.displayName
    this.userPhoto = firebase.auth().currentUser.photoURL
    this.time = firebase.database.ServerValue.TIMESTAMP

  }

  //when the text in the form changes
  updatePost = (event) => {
    this.setState({todo: event.target.value});
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
      time: this.time
    }
    firebase.database().ref('todos').push(newTodo);

    this.setState({todo:''}); //empty out post for next time
  }

  //You do not need to modify this method!
  render() {
    let user = this.props.currentUser; //the current user (convenience)

    return (
      <div className="container">
        <div className="row py-3 chirp-box">
          <div className="col-1">
            {/* <img className="avatar" src={user.photoURL} alt={user.displayName+' avatar'} /> */}
          </div>
          <div className="col pl-4 pl-lg-1">
            <form>
              <textarea name="text" className="form-control mb-2" placeholder="What's Happening...?" 
                value={this.state.post} 
                onChange={this.updatePost}
                onBlur = {this.postTodo} 
                />

              {/* Only show this if the post length is > 140 */}
              {/* {this.state.post.length > 140 &&
                <small className="form-text">140 character limit!</small>
              } */}
              
              {/* <div className="text-right"> */}
                {/* Disable if invalid post length */}
                {/* <button className="btn btn-primary" 
                  disabled={this.state.post.length === 0 || this.state.post.length > 140}
                  onClick={this.postTodo} 
                  >
                  <i className="fa fa-pencil-square-o" aria-hidden="true"></i> Share
                </button> 					
              </div> */}
            </form>
          </div>
        </div>
      </div>
    );
  }
}
