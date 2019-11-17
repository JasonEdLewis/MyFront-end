import React from 'react';
import {Fragment} from "react";
import Login from "./Login";
import "./App.css";
import Profile from "./Profile";
import Signup from "./Signup";
import Home from "./Homepage";
import Layout from './components/Layout'

import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import { Provider } from 'react-redux';
import store from './redux/store'


class App extends React.Component {
  
  state ={
    page: "/"
  }

  redirect = page => {
    this.setState({ page});
  };

  componentDidMount() {
    console.log("App MOUNTED")
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
     <Provider store={store}>
      <Router>
       <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/home"
        render={routerProps => <Home  {... routerProps}  history={this.props.history}/>} 
        component={Home} 
        />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/signup" component={Signup} />
        <Route  component={Login} />
        </Switch>
      </Router>
      </Provider>
      </Fragment> 
    )

  
  }
}

export default App;
