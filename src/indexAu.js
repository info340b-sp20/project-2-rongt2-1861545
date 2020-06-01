import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import firebase from "firebase/app";
import firebaseConfig from "./Config"
// bootstrap

firebase.initializeApp(firebaseConfig)
