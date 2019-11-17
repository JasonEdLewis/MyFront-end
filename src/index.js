import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';


const onStartup = () => {
   var i = 0
   i === 0 && !!localStorage.token && localStorage.clear()
    return console.log("Index started")}
    const i = 1
onStartup()
ReactDOM.render(
  
    <App />,document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

