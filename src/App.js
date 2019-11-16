import React from 'react';
import {Fragment} from "react";
import Login from "./Login";
import "./App.css";
import Profile from "./Profile";
import Signup from "./Signup";
import Home from "./Homepage";
// import Layout from './components/Layout'

import { BrowserRouter as Router, Switch, Route} from "react-router-dom";


import { connect } from 'react-redux';
import { getPost } from './redux/actions/PostActions'


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
      this.props.getPost()
    // }
   
  }

  logout = () => {
   
  localStorage.clear();
    this.redirect("/")

    localStorage.clear()
  };
  render() {
 
    return (
     <Fragment>
      <Router>
       <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/home"
        // render={routerProps => <Home  {... routerProps}  history={this.props.history}/>} 
        component={Home} 
        />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/signup" component={Signup} />
        <Route  component={Login} />
        </Switch>
      </Router>
      </Fragment> 
    )

  
  }
}
const mapStateToProps = state =>{
  return {

  }
}
export default connect(null,{ getPost } )(App);
