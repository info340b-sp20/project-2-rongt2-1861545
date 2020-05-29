// Date: May 4, 2020
//
// This is the JS(index.js) to implement the UI for index.html;
// It contains all the functions to ...

"use strict";

(function() {

  window.addEventListener("load", init);

  function init() {
    id("goal-input-form").addEventListener("submit", setForm);
    id("btn-new-goal").addEventListener("click", setEntryPopUp);
    id("fst-view-btn").addEventListener("click", showDetailGoal);
    fetch("../data/goal-data.json")
      .then(checkStatus)
      .then(resp => resp.json())
      .then(loadGoals)
      .catch(console.error);
    // id("submit-btn").disabled = true;
  }

  function setForm(event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
  }

  // load all the existing goals from json
  function loadGoals(data) {
    for (let i = 0; i < data.goals.length; i++) {
      addGoalHelper(data.goals[i]);
    }
  }

  function setEntryPopUp() {
    let popup = id("goal-enter-area");
    let close = document.getElementsByClassName("close")[0];
    close.addEventListener("click", function(){id("goal-enter-area").style.display = "none"});
    id("btn-new-goal").addEventListener("click", function(){id("goal-enter-area").style.display = "flex"});
    window.addEventListener("click", function(event) {
        if (event.target == popup) {
          popup.style.display = "none";
      }
    });
    id("submit-btn").addEventListener("click", getGoals);
  }

  function showDetailGoal() {
    id("fst-matrix-view").classList.toggle("hidden");
    if (id("fst-view-btn").innerText === "View") {
      id("fst-view-btn").innerText = "Hide";
    } else {
      id("fst-view-btn").innerText = "View";
    }
  }

  function getGoals() {
    id("goal-enter-area").style.display = "none";
    // id("error").textContent = "";
    let goal = id("goal").value;
    let metrics = id("metrics").value;
    let date = id("due-date").value;
    if (goal === "") {
      id("submit-btn").disabled = true;
    } else {
      id("submit-btn").disabled = false;
    }
    
    let data = {"goal": goal, "metrics": metrics, "date": date}
    getGoalData(data);
    getGoalDetail(data);
  }

  /**
   * generate each goal card with all the information requested from the external data.
   * @param {object} data - json response with the goal information;
   */
  function getGoalData(data) {
    addGoalHelper(data);
    id("submit-btn").disabled = false;
    id("goal").value = "";
  }

  function getGoalDetail(data) {
    let card = gen("div");
    card.classList.add("hidden");
    card.classList.add("fst-matrix-view");
    let h1 = gen("h1");
    h1.textContent = "Key Results";
    let p = gen("p");
    p.textContent = data.detail;

    card.appendChild(h1);
    card.appendChild(p);

    id("metrics").value = "";
  }

  // helper function for adding goals to the dom
  function addGoalHelper(data) {
    let card1 = gen("div");
    card1.classList.add("goal-area");
    let card2 = gen("div");
    card2.classList.add("objective");
    let card3 = gen("div");
    card3.classList.add("objective-item");
    let goal = gen("p");
    goal.textContent = data.goal;

    let btn = gen("button");
    btn.textContent = "View";
    btn.classList.add("my-2");
    // btn.addEventListener("click", showDetailGoal);

    let cirl = gen("i");
    cirl.classList.add("fa");
    cirl.classList.add("fa-circle-thin");
    
    card3.appendChild(cirl);
    card3.appendChild(goal);
    card3.appendChild(btn);
    card2.appendChild(card3);
    card1.appendChild(card2);

    let today = new Date();
    if (data.date == formatDate(today)) {
      id("today").appendChild(card1);
    } else if (data.date >= formatDate(today)){
      id("todo").appendChild(card1);
    } else {
      id("past").appendChild(card1);
    }
  }

/* ------------------------------ Helper Functions  ------------------------------ */
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
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} id - element ID
   * @return {object} DOM object associated with id.
   */
  function id(id) {
    return document.getElementById(id);
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

  // helper methos to format date in yyyy/mm/dd
  function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
  }

})();