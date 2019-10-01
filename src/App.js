import React from 'react';
import {Fragment} from "react";
import Login from "./Login";
import "./App.css";
import Profile from "./Profile";
import Signup from "./Signup";
import Home from "./Homepage";

import Layout from './components/Layout'

import { BrowserRouter as Router, Switch, Route} from "react-router-dom";

class App extends React.Component {
  
  state ={
    page: "/"
  }

  redirect = page => {
    this.setState({ page});
  };

  componentDidMount() {
    // if (localStorage.token) {
      this.redirect("/");
    // }
  }

  logout = () => {
   
  localStorage.clear();
    this.redirect("/")
    debugger
    localStorage.clear()
  };
  render() {
    return (
     <Fragment>
      <Layout>
      <Router>
       <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/signup" component={Signup} />
        <Route  component={Login} />
        </Switch>
      </Router>
      </Layout>
      </Fragment> 
    )

  
  }
}

export default App;
