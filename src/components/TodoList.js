import React, { Component } from 'react'; //import React Component
import Moment from 'react-moment';
import firebase from 'firebase/app';

//A list of todos that have been posted
export default class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos:[]
    };
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
      if (todo.type === this.props.containerType) {
        return <TodoItem  key={todo.id} todo={todo} currentUser={this.props.currentUser} />
      }
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
    this.state = {
      btnColor: "white",
      strike: ""
    };
    // this.toggleComplete = this.toggleComplete.bind(this);
  }

  toggleComplete = () => {
    let ref = firebase.database().ref('todos/' + this.props.todo.id).child("complete")

    ref.once('value').then((snapshot) => {
      if(snapshot.val() === true) {
        ref.set(false);
      } else {
        ref.set(true);
      }
    });
    if(this.props.todo.complete === false) {
      this.setState({
        btnColor: "white",
        strike: "line-through"
      })
    } else {
      this.setState({
        btnColor: "blue",
        strike: ""
      })
    }
  }

  render() {
    let todo = this.props.todo;
    return ( 
      <div className="draggable">
        <div className="todo-item todo" draggable="false">
          <div className="icon">
            <button className="circle"
                    onClick={this.toggleComplete} 
                    style={{backgroundColor: this.state.btnColor}}
            />
          </div>
          <input className="ipt-todo ipt-all input" type="text" value={todo.text} style={{textDecorationLine: this.state.strike}}/>
        </div>
         <div className="is-divider" />
      </div>
    );
  }
}
