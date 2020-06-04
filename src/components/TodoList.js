import React, { Component } from 'react'; //import React Component
import Moment from 'react-moment';
import firebase from 'firebase/app';

//A list of todos that have been posted
export default class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {todos:[]};
  }

componentDidMount() {
  let todosRef = firebase.database().ref('todos');
  
  todosRef.on('value', (snapshot) => {
    let data = snapshot.val();

    // if (this.props.todos) {
      let todoKeys = Object.keys(data);
      let todoArray = todoKeys.map((key) => {
        let todoObj = data[key];
        todoObj.id = key;
        return todoObj;
      })
      this.setState({ todos: todoArray });
    // } else {
    //   return
    // }
  

  })
}

  render() {
    if(!this.state.todos) return null; //if no todos, don't display

    /* TODO: produce a list of `<todoItems>` to render */
    let TodoItems = this.state.todos.map((todo) => {
      return <TodoItem  key={todo.id} todo={todo} currentUser={this.props.currentUser} />
    })  

    return (
      <div className="container">
          {TodoItems}
      </div>);
  }
}

//A single todo
class TodoItem extends Component {

  liketodo = () => {
    /* TODO: update the todo when it is liked */
    let todo = firebase.database().ref('todos/' + this.props.todo.id + '/likes');//.child(this.props.todo.id).child('likes');
    let current = this.props.todo.likes;
    let id = this.props.currentUser.uid;
    if (current === undefined) {
      current = {};
    }
    if (current[id] !== undefined) {
      current[id] = null;
    } else {
      current[id] = true;
    }
    todo.set(current)
      .catch((err) => {
        console.log(err);
      });
  }
 
  render() {
    let todo = this.props.todo; //current todo (convenience)

    //counting likes
    let likeCount = 0; //count likes
    let userLikes = false; //current user has liked
    if(todo.likes){
      likeCount = Object.keys(todo.likes).length;
      if(todo.likes[this.props.currentUser.uid]) //if user id is listed
        userLikes = true; //user liked!
    }

    return (
      <div className="row py-4 bg-white border">
        {/* <div className="col-1">
          <img className="avatar" src={todo.userPhoto} alt={todo.userName+' avatar'} />
        </div> */}
        <div className="col pl-4 pl-lg-1">

          <span className="handle">{todo.userName} {/*space*/}</span>

          {/* <span className="time"><Moment date={todo.time} fromNow/></span> */}

          <div className="todo">{todo.text}</div>

          {/* A section for showing todo likes */}
          {/* <div className="likes">          
            <i className={'fa fa-heart '+(userLikes ? 'user-liked': '')} aria-label="like" onClick={this.liketodo} ></i>
            <span> {likeCount}</span>
          </div> */}
        </div>
      </div>      
    );
  }
}
