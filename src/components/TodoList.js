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

      let todoKeys = Object.keys(data);
      let todoArray = todoKeys.map((key) => {
        let todoObj = data[key];
        todoObj.id = key;
        return todoObj;
      })
      this.setState({ todos: todoArray });
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

    return ( 
      <div className="draggable">
        <div className="todo-item todo" draggable="false">
          <div className="icon">
            <button className="circle" onClick/>
          </div>
          <input className="ipt-todo ipt-all input" type="text" value={todo.text}/>
        </div>
         <div className="is-divider" />
      </div>
    );
  }
}
