// Date: May 4, 2020
//
// This is the JS(index.js) to implement the UI for index.html;
"use strict";

(function() {
  const TIME_OUT = 500; // the time the stricked item will stay on the page
  const URL = "https://info340b-sp20.github.io/project-1-tichx/data/goals.json";

  window.addEventListener("load", init);

  // init the page and fetch the data from local json file
  function init() {
    let items = qsa(".todo-item");
    let circles = qsa(".circle");
    let inputs = qsa(".input");
    for (let i = 0; i < items.length; i ++) { // init all the existing todo item lines
      circles[i].disabled = true;
      inputs[i].addEventListener("blur", function() {
        initialInputHelper(inputs[i], items[i]);
      });
    }
    fetch(URL) // fetch data
      .then(checkStatus)
      .then(resp => resp.json())
      .then(loadAll)
      .catch(e=>console.log(e));
  }

  // helper function to create new lines based on the type of the new input
  function initialInputHelper(input, item) {
    if (input.value !== "") {
      let newLine;
      if (item.classList.contains("todo")) {
        newLine = newTodoLine(".todo-content", "todo");
        qs(".todo-content").appendChild(newLine[3]);
      } else if (item.classList.contains("goal")) {
        newLine = newTodoLine(".goal-content", "goal");
        qs(".goal-content").appendChild(newLine[3]);
      } else {
        newLine = newTodoLine(".today-content", "todo");
        qs(".today-content").appendChild(newLine[3]);
      }
      newLine[0].value = input.value;
      input.value = "";
    }
  }

  // load data by todo and goal
  function loadAll(data) {
    data.users[0].todos.forEach(data => loadSplitHelper(data, ".todo-content"));
    data.users[0].goals.forEach(data => loadSplitHelper(data, ".goal-content"));
  }

  // generate a new todo line
  function newTodoLine(container, todoType) {
    let draggable = createDraggable();
    let item = createItem(draggable, todoType);
    let icon = gen("div");
    icon.classList.add("icon"); // icon div
    let circl = createCircle(item, draggable, container);
    let ipt = createInput(draggable);
    let divider = gen("div");
    divider.classList.add("is-divider"); //divider
    icon.appendChild(circl);
    item.appendChild(icon);
    item.appendChild(ipt);
    draggable.appendChild(item);
    draggable.appendChild(divider);
    let elems = [ipt, item, circl, draggable];
    return elems;
  }

  // helper function to create the draggable div
  function createDraggable() {
    let draggable = gen("div");
    draggable.classList.add("draggable");
    setDraggable(draggable);
    return draggable;
  }

  // helper function to create the item div
  function createItem(draggable, todoType) {
    let item = gen("div");
    item.classList.add("todo-item");
    item.classList.add(todoType === "todo" ? "todo": "goal");
    item.draggable = "true"; // item div
    return item;
  }

  // helper function to create the circle div
  function createCircle(item, draggable, container) {
    let circl = gen("button");
    circl.classList.add("circle");
    circl.addEventListener("click", function() {
      toggleCheckMark(item, circl);
      toggleToNewTab(item, container, draggable);
    });
    return circl;
  }

  // helper function to create the input div
  function createInput(draggable) {
    let ipt = gen("input");
    ipt.classList.add("input");
    ipt.addEventListener("blur", function() {
      if (ipt.value === "") {
        draggable.remove();
      }
    });
    return ipt;
  }

  // move the completed item to complete tab
  // move the imcompleted item back to the original tab it came from
  function toggleToNewTab(item, container, draggable) {
    let containStrike = item.classList.contains("font-strike");
    if ((containStrike && container === ".todo-content") || (containStrike && container === ".today-content")) {
      setTimeOutHelper(".complete-content", draggable);
    } else if (containStrike && container === ".goal-content") {
      setTimeOutHelper(".complete-content", draggable);
    } else if (!containStrike) {
      if (item.classList.contains("todo")) {
        setTimeOutHelper(".todo-content", draggable);
      } else { // item contains goal
        setTimeOutHelper(".goal-content", draggable);
      }
    }
  }

  // helper function to set the time-out
  function setTimeOutHelper(container, draggable) {
    setTimeout(moveToComplete, TIME_OUT, container, draggable);
  }

  // helper function to move the item
  function moveToComplete(container, draggable) {
    qs(container).appendChild(draggable);
  }

  // split data into todo, today, complete, and goal categories
  function loadSplitHelper(data, container) {
    let elems = newTodoLine(container, container === ".todo-content" ? "todo" : "goal");
    if (container === ".todo-content") {
      elems[0].value = data.todo;
    } else {
      elems[0].value = data.goal;
    }
    if (data.today) {
      container = ".today-content";
    } else if (data.complete === true) {
      container = ".complete-content";
      elems[1].classList.toggle("font-strike");
      elems[2].style.backgroundColor = "#3370ff";
    }
    qs(container).appendChild(elems[3]);
  }

  // helper function to toggle the strike and the color of the checkmark
  function toggleCheckMark(item, circl) {
    item.classList.toggle("font-strike");
    if (item.classList.contains("font-strike")) {
      circl.style.backgroundColor = "#3370ff";
    } else {
      circl.style.backgroundColor = "";
    }
  }

  // make the new todo items draggable
  function setDraggable(draggable) {
    draggable.classList.add("draggable");
    draggable.addEventListener('dragstart', () => {
      draggable.classList.add('dragging')
    })
    draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging')
    })
  }

// ------------------------------ Additional Helper Functions  ------------------------------
  /**
   * Returns the response's result text if successful. If not successful, returns the response.
   * @param {object} response -  response to check for success/error.
   * @return {object} - valid response if successful, otherwise rejected Promise result
   */
  function checkStatus(response) {
    if (!response.ok) {
      throw Error("Error in request: " + response.statusText);
    }
    return response;
  }

  /**
   * Returns an new element with the tag name.
   * @param {string} tagName - the string name of the element to create
   * @returns {object} - the DOM element created with the text
   */
  function gen(tagName) {
    return document.createElement(tagName);
  }

  /**
   * Returns the first element that matches the given CSS selector.
   * @param {string} query - CSS query selector.
   * @returns {object} - The first DOM object matching the query.
   */
  function qs(query) {
    return document.querySelector(query);
  }

  /**
   * Returns an array of elements matching the given query.
   * @param {string} query - CSS query selector.
   * @returns {array} - Array of DOM objects matching the given query.
   */
  function qsa(query) {
    return document.querySelectorAll(query);
  }
})();