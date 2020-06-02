import React, { Component } from 'react'; //import React Component
import 'firebase/database';
import firebase from 'firebase/app';

//A form the user can use to post a Chirp
export default class ChirpBox extends Component {
  constructor(props){
    super(props);
    this.state = {
      post:''};
  }

  updatePost = (event) => {
    this.setState({post: event.target.value});
  }

  postChirp = (event) => {
    event.preventDefault(); //don't submit
    
    /* TODO: add a new Chirp to the database */
    let newChirp = {
      text: this.state.post,
      userId: this.props.currentUser.uid,
      userName: this.props.currentUser.displayName,
      userPhoto: this.props.currentUser.photoURL,
      time: firebase.database.ServerValue.TIMESTAMP
    }
    firebase.database().ref('chirps').push(newChirp);

    this.setState({post:''}); //empty out post for next time
  }

  render() {
    let user = this.props.currentUser; //the current user (convenience)

    return (
      <div className="draggable">
      <div className="todo-item todo" draggable="false">
        <div className="icon">
          <button className="circle" />
        </div>
        <input className="ipt-todo ipt-all input" type="text" placeholder="Do one task at a time...">{props.info.text}</input>
      </div>
      <div className="is-divider" />
    </div>
    );
  }
}
