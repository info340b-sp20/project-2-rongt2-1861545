import React, { Component } from 'react'; //import React Component
import 'firebase/database';
import firebase from 'firebase/app';

//A form the user can use to post a Chirp
function Todo(props) {
  let date = new Date(props.info.timestamp);
  let formattedDate = date.toLocaleTimeString();

    return (
      <div className="draggable">
        <div className="todo-item todo" draggable="false">
          <div className="icon">
            <button className="circle" onClick/>
          </div>
          <input className="ipt-todo ipt-all input" type="text">{props.info.text}</input>
        </div>
        <div className="is-divider" />
      </div>
    );
  }
// }

export default Todo;
