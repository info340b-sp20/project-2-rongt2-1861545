import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import firebase from "firebase/app";
import firebaseConfig from "./Config"

import 'bootstrap/dist/css/bootstrap.css';
// import 'font-awesome/css/font-awesome.css';

firebase.initializeApp(firebaseConfig)

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));
