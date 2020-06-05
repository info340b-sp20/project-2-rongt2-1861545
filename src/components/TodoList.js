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
      let ref = firebase.database().ref('todos/' + todo.id).child("type")
      let data;
      let item = async () => {
        let snapshot = await ref.once("value");
        data = snapshot.val();
        // console.log(data === this.props.containerType)
        if  (data === this.props.containerType) {
          // console.log(<TodoItem  key={todo.id} todo={todo} currentUser={this.props.currentUser} />)
          return <TodoItem  key={todo.id} todo={todo} currentUser={this.props.currentUser} />
        }
      }
      return item;
    })  

    return (
      <div className="container">
          {todoItems}
      </div>
    );
  } 
}

//A single todo
class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.toggleComplete = this.toggleComplete.bind(this);
  }

  toggleComplete = (event) => {
    let ref = firebase.database().ref('todos/' + this.props.todo.id).child("complete")
    ref.once('value').then((snapshot) => {
      if(snapshot.val() === true) {
        ref.set(false);
      } else {
        ref.set(true);
      }
    });
    if (window.getComputedStyle(event.target, null).getPropertyValue("background-color") === "rgb(255, 255, 255)") {
      event.target.style.backgroundColor = "#3370ff";
    } else {
      event.target.style.backgroundColor = "#FFF";
    }
  }
 
  // toggleStrike = (event) => {
  //   if (window.getComputedStyle(event.target, null).getPropertyValue("text-decoration-line") !== "line-through") {
  //     event.target.style.textDecorationLine = "line-through";
  //   } else {
  //     // event.target.style.backgroundColor = "#FFF";
  //   }
  // }

  render() {
    let todo = this.props.todo;
    
    return ( 
      <div className="draggable">
        <div className="todo-item todo" draggable="false">
          <div className="icon">
            <button className="circle"
                    onClick={(e) => { this.toggleComplete(e) }}
            />
          </div>
          <input className="ipt-todo ipt-all input" type="text" value={todo.text} />
        </div>
         <div className="is-divider" />
      </div>
    );
  }
}
