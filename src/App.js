import React from 'react';
import { Fragment } from "react";
import Login from "./Login";
import "./App.css";
import Profile from "./Profile";
import Signup from "./Signup";
import Home from "./Homepage";


import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { connect } from 'react-redux';
import { getPost } from './redux/actions/PostActions'
import { fetchAllUsers } from './redux/actions/UserActions'
import { getFollows } from './redux/actions/FollowActions'


class App extends React.Component {

  state = {
    page: "/"
  }

  redirect = page => {
    this.setState({ page });
  };

  componentDidMount() {
    const { getPost, fetchAllUsers, getFollows } = this.props
    console.log("App MOUNTED")
    if (!localStorage.token) {
      this.redirect("/");

    }
   


  }

  logout = () => {

    localStorage.clear();
    this.redirect("/")

    localStorage.clear()
  };
  render() {

    return (
      <div>
        
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/home"
              // render={routerProps => <Home  {... routerProps}  history={this.props.history}/>} 
              component={Home}
            />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/signup" component={Signup} />
            <Route component={Login} />
          </Switch>
        </Router>
      </div>
    )


  }
}


export default connect(null, { getPost, fetchAllUsers, getFollows })(App);
