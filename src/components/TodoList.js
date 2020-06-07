import React, { Component } from 'react'; //import React Component
import firebase from 'firebase/app';

//A list of todos that have been posted
export default class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos:[]
    };
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

  render() {
    if(!this.state.todos) return null; //if no todos, don't display  
    let todoItems = this.state.todos
      .filter(todo => todo.type === this.props.containerType)
      .map((todo) => <TodoItem  key={todo.id} todo={todo} currentUser={this.props.currentUser} />)

    return (
      <div className="container d-flex flex-column-reverse">
        {/* the latest todo will appear on the top */}
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
    this.userId = firebase.auth().currentUser.uid;
    this.toggleComplete = this.toggleComplete.bind(this);
  }

  toggleComplete = () => {
    let uid = this.userId;
    let ref = firebase.database().ref(uid + '/todos/' + this.props.todo.id).child("type")

    ref.once('value').then((snapshot) => {
      if(snapshot.val() === "complete") {
        ref.set("todo");
      } else {
        ref.set("complete");
      }
    });
  }

  setStyle = () => {
    if(this.props.todo.type !== "complete") {
      this.setState({
        btnColor: "red",
        strike: ""
      })
    } else {
      this.setState({
        btnColor: "blue",
        strike: "line-through"
      })
    }
    console.log(this.state.btnColor)
    return this.state.btnColor;
  }

  render() {
    let todo = this.props.todo;
    return ( 
      // <NewToday />
      <div className="draggable">
        <div className="todo-item todo" draggable="false">
          <div className="icon">
            <button className="circle"
                    onClick={this.toggleComplete} 
                    style={{backgroundColor: this.setStyle}}
            />
          </div>
          <input 
            className="ipt-todo ipt-all input" 
            type="text" 
            value={todo.text} 
            disabled="disabled"
            onChange={this.updatePost}
            onBlur = {this.checkInput}
            style={{textDecorationLine: this.state.strike}}
          />
        </div>
         <div className="is-divider" />
      </div>
    );
  }
}
