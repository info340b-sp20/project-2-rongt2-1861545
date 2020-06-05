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

  render() {
    if(!this.state.todos) return null; //if no todos, don't display

    let todoItems = this.state.todos.map((todo) => {
      return <TodoItem  key={todo.id} todo={todo} currentUser={this.props.currentUser} />
    })  

    return (
      <div className="container">
          {todoItems}
      </div>);
  }
}

//A single todo
class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: '#FFF'
    }
    this.clicked = this.clicked.bind(this);
  }

  toggleComplete = () => {
    let ref = firebase.database().ref('todos/' + this.props.todo.id).child("complete")
    ref.once('value').then(function(snapshot) {
      if(snapshot.val() === true){
        ref.set(false)
      } else {
        ref.set(true)
      }
    });
  }

  clicked(event) {
      let currentColor = event.target.attributes['btn-color'].value;
      let newColor = currentColor === "#FFF" ? "#3370ff" : "#FFF";
      event.target.style.backgroundColor = newColor;
      event.target.setAttribute('data-color' , newColor);
      let letter = event.target.innerText;
      this.setState({ currentWord: this.state.currentWord + letter })
  }
 
  render() {
    let todo = this.props.todo; //current todo (convenience)

    let likeCount = 0; //count likes
    let userLikes = false; //current user has liked
    // if(todo.complete) {
      // likeCount = Object.keys(chirp.likes).length;
      // if(chirp.likes[this.props.currentUser.uid]) //if user id is listed
      //   userLikes = true; //user liked!
      
    // }
    
    return ( 
      <div className="draggable">
        <div className="todo-item todo" draggable="false">
          <div className="icon">
            <button className="circle" 
                    btn-color='#FFF' 
                    onClick={
                      
                        // (e) => {this.clicked(e)};
                            this.toggleComplete}
                    // onClick={
                    //         toggleComplete}
           />
          </div>
          <input className="ipt-todo ipt-all input" type="text" value={todo.text} />
        </div>
         <div className="is-divider" />
      </div>
    );
  }
}
