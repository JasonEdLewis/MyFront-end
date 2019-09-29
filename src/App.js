import React from "react";
import Login from "./Login";
import "./App.css";
import Profile from "./Profile";
import Signup from "./Signup";
import Home from "./Homepage";
import { Switch, Route } from "react-router-dom";

class App extends React.Component {
  state = {
    page: "login"
  };

  redirect = page => {
    this.setState({ page: page });
  };

  componentDidMount() {
    // if (localStorage.token) {
      this.redirect("login");
    // }
  }

  logout = () => {
    localStorage.clear();
    this.setState({
      page: "login"
    });
  };
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/signup" component={Signup} />
      </Switch>
    );

    // switch (this.state.page) {
    //   case "profile":
    //     return <Profile logout={this.logout} />;
    //   case "login":
    //     return <Login redirect={this.redirect} logout={this.logout}/>;
    // }
  }
}

export default App;
